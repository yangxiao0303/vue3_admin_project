<template>
    <div>
        <!-- 全局组件,分类 -->
        <Category></Category>
        <!-- 增加属性的按钮 -->
        <el-button type="primary" :icon="Plus"></el-button>
        <!-- 展示属性的表格 -->
        <el-card shadow="hover" style="margin: 10px 0">
            <el-table>
                <el-table-column label="序号" type="index" prop=""></el-table-column>
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

</script>

<script lang="ts">
export default {
    name: 'Attr'
}
</script>

<style scoped></style>