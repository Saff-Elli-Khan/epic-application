export type PermissionsFetcher = (
  this: SecurityManager,
  role: string
) => Promise<string[] | "*"> | string[] | "*";

export type TPermission<P extends Record<string, string | boolean> = {}> = {
  props: P;
};

export class SecurityManager {
  protected Role?: string;
  protected FetchedRoles = new Set<string>();
  protected PermissionsFetcher?: PermissionsFetcher;

  protected FullAccess = false;
  protected Permissions = new Set<string>();
  protected PlainPermissions = new Map<string, TPermission>();
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
      else {
        // Split Permission & Props
        const PermissionParts = Permission.split("?");

        // Set Permission
        this.PlainPermissions.set(PermissionParts.shift()!, {
          props: {
            ...PermissionParts.join("?")
              .split("&")
              .reduce((props, pair) => {
                const Pair = pair.split("=");
                const Key = Pair.shift()!;
                const Value = Pair.join("=");
                return {
                  ...props,
                  [Key]: Pair.length ? Value : true,
                };
              }, {}),
          },
        });
      }
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
   * Get Permission
   * @param permission Target permission name.
   * @returns
   */
  public getPermission<P extends Record<string, string | boolean>>(
    permission: string
  ) {
    return this.PlainPermissions.get(permission) as TPermission<P>;
  }

  /**
   * Check if has full access
   * @returns
   */
  public hasFullAccess() {
    return this.FullAccess;
  }
}
