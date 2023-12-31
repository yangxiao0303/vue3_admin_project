// 引入二次封装的请求
import request from "@/utils/request";
import type { Trademark, TrademarkResponseData } from "./types";
// 引入商标返回数据的类型

// 品牌模块请求地址枚举
enum API_URL {
  // 品牌分页的接口地址
  TRADEMARK_LIST = "/admin/product/baseTrademark/",
  // 新增商标的接口地址
  ADD_TRADEMARK = "/admin/product/baseTrademark/save",
  // 更新商标的接口地址
  UPDATE_TRADEMARK = "/admin/product/baseTrademark/update",
  // 删除现有商标的接口地址
  DELETE_TRADEMARK = "/admin/product/baseTrademark/remove/",
}
// 获取现有的品牌分页接口数据
export const reqTrademarkList = (page: number, limit: number) =>
  request.get<any, TrademarkResponseData>(
    API_URL.TRADEMARK_LIST + `${page}/${limit}`
  );
// 添加或更新品牌的接口数据
export const reqAddOrUpdateTrademark = (data: Trademark) => {
  if (data.id) {
    return request.put<any, any>(API_URL.UPDATE_TRADEMARK, data);
  } else {
    return request.post<any, any>(API_URL.ADD_TRADEMARK, data);
  }
};
// 删除已有商标的请求
export const reqDeleteTrademark = (id: Trademark["id"]) => {
  request<any, any>({ url: API_URL.DELETE_TRADEMARK + `/${id}`, method: "DELETE" });
};
