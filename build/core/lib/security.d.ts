export declare type PermissionsFetcher = (this: SecurityManager, role: string) => Promise<string[] | "*"> | string[] | "*";
export declare class SecurityManager {
    protected Role?: string;
    protected FetchedRoles: Set<string>;
    protected PermissionsFetcher?: PermissionsFetcher;
    protected FullAccess: boolean;
    protected Permissions: Set<string>;
    protected PlainPermissions: Set<string>;
    protected PermissionPatterns: RegExp[];
    /**
     * Get current role.
     * @returns
     */
    getRole(): string | undefined;
    /**
     * Get current permissions list.
     * @returns
     */
    getPermissions(): Set<string>;
    /**
     * Set a permissions fetcher function.
     * @param callback Fetcher function.
     * @returns
     */
    setPermissionsFetcher(callback: PermissionsFetcher): this;
    /**
     * Set a role on the Security Manager.
     * @param role A valid Security Role.
     * @returns
     */
    setRole(role: string): Promise<void>;
    /**
     * Check if permission exists.
     * @param permission Target permission to check.
     * @returns
     */
    isPermitted(permission: string): boolean;
}
