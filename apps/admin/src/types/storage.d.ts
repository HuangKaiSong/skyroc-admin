/**
 * Admin app specific storage type extensions
 *
 * This file extends the base StorageType namespace from @skyroc/core-types
 * using TypeScript's declaration merging feature.
 *
 * Base types are defined in: packages/core-types/src/app/storage.d.ts
 */
declare global {
  namespace StorageType {
    /**
     * Extend Session storage with admin-specific fields
     *
     * Base fields (from core-types): themeColor
     */
    interface Session {
      /** Admin user session ID (admin-specific) */
      adminSessionId?: string;
      /** Current workspace ID (admin-specific) */
      workspaceId?: string;
    }

    /**
     * Extend Local storage with admin-specific fields
     *
     * Base fields (from core-types): token, refreshToken, themeColor, lang, etc.
     */
    interface Local {
      /** Admin dashboard layout preference (admin-specific) */
      dashboardLayout?: 'grid' | 'list';
      /** Recently viewed admin items (admin-specific) */
      recentlyViewed?: string[];
    }
  }
}

export {};
