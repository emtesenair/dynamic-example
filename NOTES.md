## Notes & Known Issues

### Project Initialization

- Issue: `package-lock.json` created despite using `pnpm`  
  Resolved by deleting the lockfile and reinstalling with `pnpm`

- Issue: Both `next.config.js` and `next.config.ts` were generated  
  Resolved by migrating config to `.ts` and deleting the `.js` file

---

### UI Hydration

- Issue: Hydration error in `useDarkMode` due to premature `window` access  
  Fixed by checking `typeof window !== 'undefined'` before accessing user preference

---

### Cookie-Based Authentication

- Setup Note: Cookie mode must be enabled at https://app.dynamic.xyz/dashboard/security

- Docs Issue: Cookie-based auth docs reference a toggle (Step 7) but do not specify its location. Should be clarified it’s in Account Security settings

- Issue: Cookie name `DYNAMIC_JWT_TOKEN` is undocumented. Discovered through inspection and used directly

- Issue: Docs state the JWT is “minified” but do not provide a type. Manually extracted and inspected the payload structure

- Issue: `[DynamicSDK] [ERROR]: Error refreshUserJwt {}` appears when not logged in. It appears this can be safely ignored during unauthenticated states.

---

### Account Abstraction / ZeroDev

- Suggestion: Export `KernelClient` type from `@dynamic-labs/ethereum-aa` to improve DX for typed hooks
