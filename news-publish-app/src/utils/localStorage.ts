const item_token = "TOKEN";
export const GET_TOKEN = () => {
  return localStorage.getItem(item_token);
};
export const SET_TOKEN = (token: string) => {
  localStorage.setItem(item_token, token);
};
export const REMOVAE_TOKEN = () => {
  localStorage.removeItem(item_token);
};