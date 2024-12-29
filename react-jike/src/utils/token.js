// 封装基于localStorage存,取,删的三个方法
const TOKENKEY = "token_key";

const setToken = (token) => localStorage.setItem(TOKENKEY, token);

const getToken = () => localStorage.getItem(TOKENKEY);

const removeToken = () => localStorage.removeItem(TOKENKEY);

export { setToken, getToken, removeToken };
