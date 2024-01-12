/*
 * @Author: ChuandongHuang chuandong_huang@human-horizons.com
 * @Date: 2024-01-08 11:28:25
 * @LastEditors: ChuandongHuang chuandong_huang@human-horizons.com
 * @LastEditTime: 2024-01-12 14:35:27
 * @Description:
 */
const TOKEN_KEY = "Token";
const ID = "id";
export const setToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};
export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};
export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const setUserId = (id: string) => {
  localStorage.setItem(ID, id);
};
export const getUserId = () => {
  return localStorage.getItem(ID);
};
