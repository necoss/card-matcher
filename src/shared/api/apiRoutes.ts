/**
 * Centralized API endpoint definitions.
 * Single source of truth for all external service URLs.
 */

if (!import.meta.env.VITE_ONLINER_BASE_URL || !import.meta.env.VITE_ONLINER_CATALOG_URL) {
  console.error("Missing required environment variables: VITE_ONLINER_BASE_URL or VITE_ONLINER_CATALOG_URL")
}

export const API_ROUTES = {
  onliner: {
    sdCards: `${import.meta.env.VITE_ONLINER_BASE_URL}/search/memcards`,
    catalog: `${import.meta.env.VITE_ONLINER_CATALOG_URL}/memcards`,
  },
} as const
