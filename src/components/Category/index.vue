<template>
  <el-card shadow="hover">
    <!-- form 表单展示分类 -->
    <el-form inline>
      <el-form-item label="一级分类">
        <el-select placeholder="请选择一级分类" v-model="categoryStore.c1Id" @change="c1ChangeHandler">
          <el-option v-for="(c1, index) in categoryStore.c1Arr" :key="c1.id" :label="c1.name" :value="c1.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select placeholder="请选择二级分类" v-model="categoryStore.c2Id" @change="c2changeHandler">
          <el-option v-for="(c2, indes) in categoryStore.c2Arr" :key="c2.id" :label="c2.name" :value="c2.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select placeholder="请选择三级分类" v-model="categoryStore.c3Id">
          <el-option v-for="(c3, index) in categoryStore.c3Arr" :key="c3.id" :label="c3.name" :value="c3.id" />
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
// 引入 ref函数 钩子函数
import { ref, onMounted } from 'vue';
// 引入 category 小仓库的调用函数
import { useCategoryStore } from '@/stores/category'
// 调用函数,获取小仓库
const categoryStore = useCategoryStore();
// 在组件挂载时,获取第一级分类的数据
onMounted(() => {
  // 通知pinia仓库发请求
  categoryStore.getC1();
});
// 一级菜单改变的回调
const c1ChangeHandler = () => {
  // 一级菜单改变,二级菜单清空,三级菜单清空
  categoryStore.c2Id = '';
  categoryStore.c3Id = '';
  categoryStore.c3Arr = [];
  // 通知pinia 小仓库发送请求,获取二级菜单
  categoryStore.getC2();
}
// 二级菜单改变的回调
const c2changeHandler = () => {
  // 二级菜单改变,三级菜单清空
  categoryStore.c3Id = '';
  // 通知pinia 小仓库发送请求,获取三级菜单
  categoryStore.getC3();
}

const temprary = ref('');
</script>


<script lang="ts">
export default {
  name: 'Category'
}
</script>

<style scoped></style>