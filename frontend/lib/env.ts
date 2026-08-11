const apiUrl = process.env.NEXT_PUBLIC_API_URL;

if (process.env.NODE_ENV === "production" && !apiUrl) {
  throw new Error("NEXT_PUBLIC_API_URL must be configured for production.");
}

export const env = {
  apiUrl: apiUrl ?? "http://localhost:4000/api",
};
