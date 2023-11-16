export const imageUrl = (path: string) => {
  return import.meta.env.VITE_APP_BASE_API + path;
}