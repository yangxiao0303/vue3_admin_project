// 引入二次封装的请求
import request from "@/utils/request";
import type { TrademarkResponseData } from "./types";
// 引入商标返回数据的类型

// 品牌模块请求地址枚举
enum API_URL {
  // 品牌分页的接口地址
  TRADEMARK_LIST = "/admin/product/baseTrademark/",
}
// 获取现有的品牌分页接口数据
export const reqTrademarkList = (page: number, limit: number) =>
  request.get<any, TrademarkResponseData>(
    API_URL.TRADEMARK_LIST + `${page}/${limit}`
  );
