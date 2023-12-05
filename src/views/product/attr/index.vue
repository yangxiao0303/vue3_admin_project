<template>
    <div>
        <!-- 全局组件,分类 -->
        <Category></Category>
        <!-- 展示属性的表格 -->
        <el-card shadow="hover" style="margin: 10px 0">
            <!-- 增加属性的按钮 -->
            <!-- 在没有确定第三级数据的时候,不能点击添加上商品属性 -->
            <el-button type="primary" :icon="Plus" :disabled="!!!categoryStore.c3Id">添加商品属性</el-button>
            <el-table border style="margin:10px 0">
                <el-table-column label="序号" type="index" width="80px" align="center" prop=""></el-table-column>
                <el-table-column label="属性名称" prop=""></el-table-column>
                <el-table-column label="属性值名称" width="600px" prop=""></el-table-column>
                <el-table-column label="属性操作" prop=""></el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script setup lang="ts">
// 引入图标
import { Plus, Edit, Delete } from "@element-plus/icons-vue";
// 引入小仓库的函数
import { useCategoryStore } from "@/stores/category";
// 调用小仓库函数,获取仓库数据
const categoryStore = useCategoryStore();

</script>

<script lang="ts">
export default {
    name: 'Attr'
}
</script>

<style scoped></style>