// 用户相关的所有请求
import { request } from "@/utils";

// 1. 请求登录
export function loginAPI(formData) {
  return request({
    url: "/authorizations",
    method: "POST",
    data: formData,
  });
}

// 2. 获取用户信息
export function getProfileAPI() {
  return request({
    url: "/user/profile",
    method: "GET",
  });
}
