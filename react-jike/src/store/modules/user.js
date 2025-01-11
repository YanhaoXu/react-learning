import { loginAPI, getProfileAPI } from "@/apis/user";
import { getToken, setToken as _setToken, removeToken } from "@/utils/token";
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  // 数据状态
  initialState: {
    token: getToken() || "",
    userInfo: {},
  },
  // 同步修改方法
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      // 存入本地
      _setToken(state.token);
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    clearUserInfo: (state) => {
      state.token = "";
      state.userInfo = {};
      removeToken();
    },
  },
});

// 每个 case reducer 函数会生成对应的 Action createor
// 解构出actionCreater
const { setToken, setUserInfo, clearUserInfo } = userSlice.actions;

// 登录获取token异步方法封装
const fetchLogin = (loginForm) => {
  return async (dispatch) => {
    const res = await loginAPI(loginForm);
    console.log("res", res);
    console.log("res.data.token", res.data.token);
    dispatch(setToken(res.data.token));
  };
};
// 获取用户信息
const fetchUserInfo = () => {
  return async (dispatch) => {
    const res = await getProfileAPI();
    dispatch(setUserInfo(res.data));
  };
};

export { fetchLogin, fetchUserInfo, clearUserInfo };

//! 获取 & 导出 reducer函数
export default userSlice.reducer;
