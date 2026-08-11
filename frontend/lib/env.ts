const normalizeApiUrl = (value?: string) => value?.replace(/\/+$/, "");

export const env = {
  apiUrl:
    normalizeApiUrl(process.env.NEXT_PUBLIC_API_URL) ??
    "http://localhost:4000/api",
};
