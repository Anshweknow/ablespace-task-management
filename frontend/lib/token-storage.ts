const key = "ablespace_access_token";
export const tokenStorage = {
  get: () => (typeof window === "undefined" ? null : localStorage.getItem(key)),
  set: (v: string) => localStorage.setItem(key, v),
  clear: () => localStorage.removeItem(key),
};
