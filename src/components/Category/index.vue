<template>
  <el-card shadow="hover">
    <!-- form 表单展示分类 -->
    <el-form>
      <el-form-item label="一级分类">
        <el-select placeholder="请选择一级分类" v-model="temprary">
          <el-option label="Zone one" value="shanghai" />
          <el-option label="Zone two" value="beijing" />
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
import { ref } from 'vue';
const temprary = ref('');
</script>


<script lang="ts">
export default {
  name: 'Category'
}
</script>

<style scoped></style>