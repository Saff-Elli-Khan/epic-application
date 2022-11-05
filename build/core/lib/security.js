"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecurityManager = void 0;
class SecurityManager {
    constructor() {
        this.FetchedRoles = new Set();
        this.FullAccess = false;
        this.Permissions = new Set();
        this.PlainPermissions = new Map();
        this.PermissionPatterns = [];
    }
    /**
     * Get current role.
     * @returns
     */
    getRole() {
        return this.Role;
    }
    /**
     * Get current permissions list.
     * @returns
     */
    getPermissions() {
        return this.Permissions;
    }
    /**
     * Set a permissions fetcher function.
     * @param callback Fetcher function.
     * @returns
     */
    setPermissionsFetcher(callback) {
        this.PermissionsFetcher = callback;
        return this;
    }
    /**
     * Set a role on the Security Manager.
     * @param role A valid Security Role.
     * @returns
     */
    async setRole(role) {
        this.Role = role;
        this.FetchedRoles.clear();
        this.FullAccess = false;
        this.PlainPermissions.clear();
        this.PermissionPatterns = [];
        const FetchPermissions = async (role) => {
            if (typeof this.PermissionsFetcher !== "function")
                throw new Error(`A permissions fetcher method was not defined!`);
            if (!this.FetchedRoles.has(role)) {
                // Fetch Initial Permissions
                const Permissions = await this.PermissionsFetcher.bind(this)(role);
                // Push Fetched Role
                this.FetchedRoles.add(role);
                // Resolve Permissions
                if (Permissions === "*")
                    this.FullAccess = true;
                else if (Permissions instanceof Array)
                    if (Permissions.includes("*"))
                        this.FullAccess = true;
                    else
                        return Permissions.reduce(async (permissionsPromise, permission) => this.FullAccess
                            ? await permissionsPromise
                            : [
                                ...(await permissionsPromise),
                                ...(/^\.\.\..+/.test(permission)
                                    ? await FetchPermissions(permission.replace(/^\.\.\./, ""))
                                    : [permission]),
                            ], Promise.resolve([]));
            }
            return [];
        };
        // Fetch Permissions
        this.Permissions = new Set(await FetchPermissions(this.Role));
        // Categorize Permissions
        for (const Permission of this.Permissions)
            if (/^MATCH:.+/.test(Permission))
                this.PermissionPatterns.push(new RegExp(Permission.replace(/^MATCH:/, "")));
            else {
                // Split Permission & Props
                const PermissionParts = Permission.split("?");
                // Set Permission
                this.PlainPermissions.set(PermissionParts.shift(), {
                    props: Object.assign({}, PermissionParts.join("?")
                        .split("&")
                        .reduce((props, pair) => {
                        const Pair = pair.split("=");
                        const Key = Pair.shift();
                        const Value = Pair.join("=");
                        return Object.assign(Object.assign({}, props), { [Key]: Pair.length ? Value : true });
                    }, {})),
                });
            }
    }
    /**
     * Check if permission exists.
     * @param permission Target permission to check.
     * @returns
     */
    isPermitted(permission) {
        if (this.FullAccess)
            return true;
        if (this.PlainPermissions.has(permission))
            return true;
        for (const Pattern of this.PermissionPatterns)
            if (Pattern.test(permission))
                return true;
        return false;
    }
    /**
     * Get Permission
     * @param permission Target permission name.
     * @returns
     */
    getPermission(permission) {
        return this.PlainPermissions.get(permission);
    }
    /**
     * Check if has full access
     * @returns
     */
    hasFullAccess() {
        return this.FullAccess;
    }
}
exports.SecurityManager = SecurityManager;
