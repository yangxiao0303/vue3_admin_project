<template>
  <el-card shadow="hover">
    <!-- form 表单展示分类 -->
    <el-form inline>
      <el-form-item label="一级分类">
        <el-select placeholder="请选择一级分类" v-model="categoryStore.c1Id">
          <el-option v-for="(c1, index) in categoryStore.c1Arr" :key="c1.id" :label="c1.name" :value="c1.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select placeholder="请选择二级分类" v-model="temprary">
          <el-option label="Zone one" value="shanghai" />
          <el-option label="Zone two" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select placeholder="请选择三级分类" v-model="temprary">
          <el-option label="Zone one" value="shanghai" />
          <el-option label="Zone two" value="beijing" />
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
// 引入 ref函数 钩子函数
import { ref, onMounted } from 'vue';
// 引入 category 小仓库的调用函数
import {useCategoryStore} from '@/stores/category'
// 调用函数,获取小仓库
const categoryStore = useCategoryStore();
// 在组件挂载时,获取第一级分类的数据
onMounted(()=>{
  // 通知pinia仓库发请求
  categoryStore.getC1();
});

const temprary = ref('');
</script>


<script lang="ts">
export default {
  name: 'Category'
}
</script>

<style scoped></style>