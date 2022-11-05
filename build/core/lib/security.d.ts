export declare type PermissionsFetcher = (this: SecurityManager, role: string) => Promise<string[] | "*"> | string[] | "*";
export declare type TPermission<P extends Record<string, string | boolean> = {}> = {
    props: P;
};
export declare class SecurityManager {
    protected Role?: string;
    protected FetchedRoles: Set<string>;
    protected PermissionsFetcher?: PermissionsFetcher;
    protected FullAccess: boolean;
    protected Permissions: Set<string>;
    protected PlainPermissions: Map<string, TPermission<{}>>;
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
    /**
     * Get Permission
     * @param permission Target permission name.
     * @returns
     */
    getPermission<P extends Record<string, string | boolean>>(permission: string): TPermission<P>;
    /**
     * Check if has full access
     * @returns
     */
    hasFullAccess(): boolean;
}
