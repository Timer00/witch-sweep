/**
 * Single source of truth for app paths (overlay / menu routes).
 * Game flow paging stays state-based in App; only these URLs are routed.
 */
export const ROUTES = {
  root: "/",
  info: "/info",
  legal: "/legal",
  spend: "/spend",
  spendContractEdit: "/spend/contract/edit",
} as const;

export type AppRoutePath = (typeof ROUTES)[keyof typeof ROUTES];
