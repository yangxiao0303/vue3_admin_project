//书写接口API请求函数
import request from '@/utils/request';
import type { LoginData,LoginResponseData, UserInfo } from './types/acl';
//枚举用途:枚举请求地址
enum API_URL {
    //登录接口 POST {username,password}
    LOGIN = "/admin/acl/index/login",
    // 获取用户 信息 POST (请求拦截器携带请求头)
    USERINFO = "/admin/acl/index/info",
    // 通知服务器 退出登录 重置登陆信息
    LOGOUT = "/admin/acl/index/logout"
}

//登录接口
//<>泛型:逗号第二个参数,定义当前后台接口返回的数据的ts类型
export const reqUserLogin = (data:LoginData)=>request.post<any,LoginResponseData>(API_URL.LOGIN,data);
// 获取用户信息接口 : 携带的 token 在请求拦截器内发送
export const reqUserInfo = () => request.get<any, UserInfo>(API_URL.USERINFO);
// 通知服务器退出登陆: post, 携带 token 在请求拦截器发送
export const requestLogout = () => request.post<any, any>(API_URL.LOGOUT);


