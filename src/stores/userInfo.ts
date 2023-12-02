import { defineStore } from "pinia";
import { getToken, removeToken, setToken } from "../utils/token-utils";
import type { UserInfoState } from "./interface";
import { ElMessage } from "element-plus";
import { staticRoutes } from "@/router/routes";
import { reqUserInfo, reqUserLogin, requestLogout } from "@/api/acl";
import type { UserInfo } from "@/api/acl/types/acl";

/**
 * 用户信息
 * @methods setUserInfos 设置用户信息
 */
export const useUserInfoStore = defineStore("userInfo", {
  state: (): UserInfoState => ({
    token: getToken() as string,
    name: "",
    avatar: "",
    menuRoutes: [],
  }),

  actions: {
    // 用户相关仓库进行登陆业务
    async login(username: string, password: string) {
      // 发送请求并获取数据
      const result = await reqUserLogin({ username, password });
      // pinia 存储获取到的 token
      this.token = result.token;
      // 本地化存储数据
      setToken(result.token);
    },
    // 获取用户信息
    async getInfo() {
      // 发送请求并获取数据
      const result: UserInfo = await reqUserInfo();
      // pinia 存储用户名
      this.name = result.name;
      // pinia 存储用户头像
      this.avatar = result.avatar;
      // 确定左侧导航菜单
      this.menuRoutes = staticRoutes;
    },

    async reset() {
      // 通知服务器 退出登陆
      const result = await requestLogout();
      // 删除local中保存的token
      removeToken();
      // 提交重置用户信息的mutation
      this.token = "";
      this.name = "";
      this.avatar = "";
    },
  },
});
