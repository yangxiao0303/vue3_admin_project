// 定义商标的类型
export interface Trademark {
  id?: number;
  tmName: string;
  logoUrl: string;
}

// 定义商标列表的类型
export type TrademarkList = Trademark[];

// 定义分页列表渲染返回的数据类型
export interface TrademarkResponseData {
  records: TrademarkList;
  total: number;
  size: number;
  current: number;
  searchCount: boolean;
  pages: number;
}
