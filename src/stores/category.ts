// 引入新仓库的创建函数
import { reqC1, reqC2, reqC3 } from "@/api/product/attr";
import type { CategoryResponseData } from "@/api/product/attr/types";
import { defineStore } from "pinia";
import type { CategoryState } from "./interface";
// 调用此函数生成一个仓库, 同时返回一个use函数,用来调用生成的仓库, 并暴露此返回的函数

export const useCategoryStore = defineStore("categoryStore", {
  // 存储数据
  state: (): CategoryState => {
    return {
      c1Arr: [], // 一级分类的数据的数组
      c1Id: "",
      c2Arr: [], // 二级分类的对象数组
      c2Id: "",
      c3Arr: [], // 三级分类的对象数组
      c3Id: "",
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
    // 获取二级分类的请求函数
    getC2() {
      reqC2(this.c1Id as number).then(
        (res: CategoryResponseData) => {
          this.c2Arr = res;
          console.log(this.c2Arr);
        },
        () => {}
      );
    },
    // 获取三级分类的请求函数
    getC3() {
      reqC3(this.c2Id as number).then(
        (res) => {
          this.c3Arr = res;
        },
        () => {}
      );
    },
  },
  // 计算属性
  getters: {},
});
