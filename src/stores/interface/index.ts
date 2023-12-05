import type { RouteRecordRaw } from "vue-router";

// 用户信息包括权限数据
export interface UserInfoState {
  token: string;
  avatar: string;
  name: string;

  menuRoutes: RouteRecordRaw[]; // 用于生成导航菜单的路由列表
}

import type { CategoryResponseData } from "@/api/product/attr/types";
// 分类小仓库state函数返回对象的类型约束
export interface CategoryState {
  c1Arr: CategoryResponseData;
  c1Id: string | number;
}
