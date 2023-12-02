//登录需要携带的参数ts类型
export interface LoginData {
  username: string;
  password: string;
}
//登录接口返回的数据ts类型
export interface LoginResponseData {
  token: string;
}

// 定义用户信息的ts类型
export interface UserInfo {
  name: string;
  avatar: string;
  roles: string[];
  buttons: string[];
  routes: string[];
}
