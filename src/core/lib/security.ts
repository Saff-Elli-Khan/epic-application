export type PermissionsFetcher = (
  this: SecurityManager,
  role: string
) => Promise<string[] | "*"> | string[] | "*";

export class SecurityManager {
  protected Role?: string;
  protected FetchedRoles = new Set<string>();
  protected PermissionsFetcher?: PermissionsFetcher;

  protected FullAccess = false;
  protected Permissions = new Set<string>();
  protected PlainPermissions = new Set<string>();
  protected PermissionPatterns: RegExp[] = [];

  /**
   * Get current role.
   * @returns
   */
  public getRole() {
    return this.Role;
  }

  /**
   * Get current permissions list.
   * @returns
   */
  public getPermissions() {
    return this.Permissions;
  }

  /**
   * Set a permissions fetcher function.
   * @param callback Fetcher function.
   * @returns
   */
  public setPermissionsFetcher(callback: PermissionsFetcher) {
    this.PermissionsFetcher = callback;
    return this;
  }

  /**
   * Set a role on the Security Manager.
   * @param role A valid Security Role.
   * @returns
   */
  public async setRole(role: string) {
    this.Role = role;
    this.FetchedRoles.clear();
    this.FullAccess = false;
    this.PlainPermissions.clear();
    this.PermissionPatterns = [];

    const FetchPermissions = async (role: string) => {
      if (typeof this.PermissionsFetcher !== "function")
        throw new Error(`A permissions fetcher method was not defined!`);

      if (!this.FetchedRoles.has(role)) {
        // Fetch Initial Permissions
        const Permissions = await this.PermissionsFetcher.bind(this)(role);

        // Push Fetched Role
        this.FetchedRoles.add(role);

        // Resolve Permissions
        if (Permissions === "*") this.FullAccess = true;
        else if (Permissions instanceof Array)
          if (Permissions.includes("*")) this.FullAccess = true;
          else
            return Permissions.reduce<Promise<string[]>>(
              async (permissionsPromise, permission): Promise<string[]> =>
                this.FullAccess
                  ? await permissionsPromise
                  : [
                      ...(await permissionsPromise),
                      ...(/^\.\.\..+/.test(permission)
                        ? await FetchPermissions(
                            permission.replace(/^\.\.\./, "")
                          )
                        : [permission]),
                    ],
              Promise.resolve([])
            );
      }

      return [];
    };

    // Fetch Permissions
    this.Permissions = new Set(await FetchPermissions(this.Role));

    // Categorize Permissions
    for (const Permission of this.Permissions)
      if (/^MATCH:.+/.test(Permission))
        this.PermissionPatterns.push(
          new RegExp(Permission.replace(/^MATCH:/, ""))
        );
      else this.PlainPermissions.add(Permission);
  }

  /**
   * Check if permission exists.
   * @param permission Target permission to check.
   * @returns
   */
  public isPermitted(permission: string) {
    if (this.FullAccess) return true;

    if (this.PlainPermissions.has(permission)) return true;

    for (const Pattern of this.PermissionPatterns)
      if (Pattern.test(permission)) return true;

    return false;
  }

  /**
   * Check if has full access
   * @returns
   */
  public hasFullAccess() {
    return this.FullAccess;
  }
}
