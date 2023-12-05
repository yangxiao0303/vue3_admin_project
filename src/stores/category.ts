// 引入新仓库的创建函数
import { reqC1 } from "@/api/product/attr";
import type { CategoryResponseData } from "@/api/product/attr/types";
import { defineStore } from "pinia";
import type { CategoryState } from "./interface";
// 调用此函数生成一个仓库, 同时返回一个use函数,用来调用生成的仓库, 并暴露此返回的函数

export const useCategoryStore = defineStore("categoryStore", {
  // 存储数据
  state: (): CategoryState => {
    return {
      c1Arr: [], // 一级分类的数据的数组
      c1Id: '',
    };
  },
  // 发送请求
  actions: {
    // 获取一级分类的请求的函数
    async getC1() {
      // 获取结果
      const result: CategoryResponseData = await reqC1();
      // 将获取的一级分类数组储存到 state 中
      this.c1Arr = result;
    },
  },
  // 计算属性
  getters: {},
});
