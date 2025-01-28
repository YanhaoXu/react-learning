// 封装文章接口相关的函数
import { request } from "@/utils";

// 获取频道列表
export function getChannelAPI() {
  return request({ url: "/channels", method: "GET" });
}

// 文章发布
export function createArticleAPI(data) {
  return request({
    url: "/mp/articles?draft=false",
    method: "POST",
    data,
  });
}

// 获取文章列表
export function fetchArticleListAPI(params) {
  return request({
    url: "/mp/articles",
    method: "GET",
    params,
  });
}

// 删除文章
export function delArticleAPI(id) {
  return request({
    url: `/mp/articles/${id}`,
    method: "DELETE",
  });
}

// 获取文章详情
export function getArticleByIdAPI(id) {
  return request({
    url: `/mp/articles/${id}`,
    method: "GET",
  });
}

// 更新文章
export function updateArticleAPI(data) {
  return request({
    url: `/mp/articles/${data.id}?draft=false`,
    method: "PUT",
    data,
  });
}
