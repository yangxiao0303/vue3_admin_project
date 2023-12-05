// 引入 request
import request from "@/utils/request";
import type { CategoryResponseData } from "./types";
// 引入

// 地址枚举
enum API {
  // 一级分类请求地址
  C1_URL = "/admin/product/getCategory1",
  // 二级分类请求地址
  C2_URL = "/admin/product/getCategory2/",
  // 三级分类请求地址
  C3_URL = "/admin/product/getCategory3/",
}

// 定义获取一级分类的请求
export const reqC1 = () => request.get<any, CategoryResponseData>(API.C1_URL);
// 定义获取二级分类的请求
export const reqC2 = (category1Id: number) =>
  request<any, CategoryResponseData>({
    url: API.C2_URL + category1Id,
    method: "GET",
  });
// 定义获取三级分类的请求
export const reqC3 = (category2Id: number) =>
  request.get<any, CategoryResponseData>(API.C3_URL + category2Id);
