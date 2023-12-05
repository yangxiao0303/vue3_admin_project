// 定义category 中 attribute 属性值的类型
export interface CategoryObj {
  category1Id?: number;
  category2Id?: number,
  id: number;
  name: string;
}
// 定义返回的category 列表的类型
export type CategoryResponseData = CategoryObj[];
