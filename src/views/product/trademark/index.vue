<template>
  <!-- element-plus 中的组件 -->
  <!-- 卡片组件 -->
  <el-card shadow="hover">
    <el-button type="primary" :icon="Plus" @addTrademark>添加品牌</el-button>
    <!-- 表格组件: 展示品牌数据 -->
    <!-- 使用 table 展示数据: 必须为数组 -->
    <el-table :data="trademarkArr" border style="margin:10px 0px">
      <el-column prop="" label="序号" align="center" width="80px"></el-column>
      <el-column prop="name" label="品牌名称"></el-column>
      <el-column prop="date" label="品牌LOGO">
        <!-- 具名插槽 : table-column Slots -->
        <template #="{ row, $index }">
          <img :src="row.logoUrl" alt="" style="width:100px;height:100px">
        </template>
      </el-column>
      <el-column prop="address" label="品牌操作">
        <template #default="scope">
          <el-button size="small" type="warning" :icon="Edit" @click=""></el-button>
          <el-button size="small" type="danger" :icon="Delete" @click=""></el-button>
        </template>
      </el-column>
    </el-table>
    <!-- 分页器组件 -->
    <el-pagination @current-change="getTrademarkList" @size-change="sizeHandler" v-model:current-page="currentPage"
      v-model:page-size="pageSize" :page-sizes="[3, 5, 7, 9]" layout="prev, pager, next, jumper,->,sizes,total"
      :total="total" />
  </el-card>
</template>

<script setup lang="ts">
// 引入 + 图标
import { Plus, Edit, Delete } from '@element-plus/icons-vue'
// 引入 ref 响应式函数
import { onMounted, ref } from 'vue';
// 引入类型
import type { TrademarkList, TrademarkResponseData } from '@/api/product/trademark/types'
// 引入 请求数据的 API 函数
import { reqTrademarkList } from '@/api/product/trademark'
// 当前页面
const currentPage = ref<number>(1);
// 页面条数
const pageSize = ref<number>(3);
// 声明响应式数据存储商标列表与总条数
const trademarkArr = ref<TrademarkList>([]);
const total = ref<number>(0);

// 组件挂载钩子
onMounted(() => {
  // 从服务端获取商标数据
  getTrademarkList();
})
// 封装获取商标数据的函数
// val: 当前页码数
// 注: 这里把改变页码的回调和挂载时从后台获取数据的请求进行了合并,传参方式是 element-plus 组件规定的
const getTrademarkList = async (val: number = 1) => {
  // 获取当前页码
  currentPage.value = val;
  // 从后台获取数据
  const result: TrademarkResponseData = await reqTrademarkList(currentPage.value, pageSize.value);
  // 更新已有商标的数据
  trademarkArr.value = result.records;
  // 更新已有商标的总数
  total.value = result.total;
}
// ----------------分页器回调---------------------
// val: 页面展示条数
const sizeHandler = (val: number) => {
  // 获取页面展示条数
  pageSize.value = val;
  // 发送请求更新数据
  // 此时, 获取新的页面商标数据
  getTrademarkList();
}
// 增加新的商标的回调
const addTrademark = () => {

}

</script>

<style scoped></style>