<template>
  <!-- element-plus 中的组件 -->
  <!-- 卡片组件 -->
  <el-card shadow="hover">
    <el-button type="primary" :icon="Plus" @click="addTrademark">添加品牌</el-button>
    <el-button type="primary" @click="addTrademark">导出表格</el-button>
    <!-- 表格组件: 展示品牌数据 -->
    <!-- 使用 table 展示数据: 必须为数组 -->
    <el-table :data="trademarkArr" border style="margin:10px 0px">
      <el-table-column type="index" label="序号" align="center" width="80px"></el-table-column>
      <el-table-column prop="tmName" label="品牌名称"></el-table-column>
      <el-table-column label="品牌LOGO">
        <!-- 具名插槽 : table-column Slots -->
        <template #="{ row, $index }">
          <img :src="row.logoUrl" alt="" style="width:100px;height:100px">
        </template>
      </el-table-column>
      <el-table-column prop="address" label="品牌操作">
        <template #="{ row, $index }">
          <el-button size="small" type="warning" :icon="Edit" @click="updateTrademark(row)"></el-button>
          <el-popconfirm @confirm="handler(row.id)" :title="`你确定要删除${row.tmName}?`" width="250px" icon-color="red"
            :icon="Delete">
            <template #reference>
              <el-button size="small" type="danger" :icon="Delete" @click=""></el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器组件 -->
    <el-pagination @current-change="getTrademarkList" @size-change="sizeHandler" v-model:current-page="currentPage"
      v-model:page-size="pageSize" :page-sizes="[3, 5, 7, 9]" layout="prev, pager, next, jumper,->,sizes,total"
      :total="total" />
  </el-card>
  <!-- 对话框 -->
  <el-dialog v-model="dialogVisite" style="top:100px" :title="tmParams.id ? '更新品牌' : '添加品牌'">
    <!-- 表单 -->
    <!-- 校验 三个属性 model:校验的信息在哪个对象上 rules: 自定义校验的规则 prop: 校验对象上的具体哪个属性 -->
    <el-form label-width="100px" style="width:80%" :model="tmParams" :rules="rules" ref="formRef">
      <el-form-item label="品牌名称" prop="tmName">
        <el-input placeholder="请你输入品牌名称" v-model="tmParams.tmName"></el-input>
      </el-form-item>
      <el-form-item label="品牌LOGO" prop="logoUrl">
        <!-- 上传文件 -->
        <!-- upload:
                       action:向服务器上传文件,务必 发请求,action设置上传文件的地址-POST
                       因为上传图片POST,路径前缀需要加上app-dev,代理服务器不工作！！！
                       show-file-list:用于设置文件名字是否显示
                -->
        <!-- action 为上传的目标地址 -->
        <el-upload class="avatar-uploader" action="/app-dev/admin/product/fileUpload" :show-file-list="false"
          :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
          <img v-if="tmParams.logoUrl" :src="tmParams.logoUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon">
            <Plus />
          </el-icon>
        </el-upload>
      </el-form-item>
    </el-form>
    <!-- 对话框底部的具名插槽:按钮 -->
    <template #footer>
      <el-button @click="dialogVisite = false">取消</el-button>
      <el-button @click="confirm" type="primary">确定</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
// 引入 + 图标
import { Plus, Edit, Delete } from '@element-plus/icons-vue'
// 引入 ref 响应式函数
import { nextTick, onMounted, ref } from 'vue';
// 引入 element-plus 提供的提示框组件
import { ElMessage } from 'element-plus';
// 引入类型
import type { TrademarkList, TrademarkResponseData, Trademark } from '@/api/product/trademark/types'
// 引入element-plus提供的类型
import type { UploadProps } from 'element-plus'
// 引入 请求数据的 API 函数
import { reqTrademarkList, reqAddOrUpdateTrademark, reqDeleteTrademark } from '@/api/product/trademark'

// 当前页面
const currentPage = ref<number>(1);
// 页面条数
const pageSize = ref<number>(3);
// 声明响应式数据存储商标列表与总条数
const trademarkArr = ref<TrademarkList>([]);
const total = ref<number>(0);
// 获取组件的的实例对象
const formRef = ref<any>();
// -------对话框的回调和校验用到的数据--------
// 控制添加商标与更新商标的对话框的显示与隐藏
const dialogVisite = ref<boolean>(false);
// 收集新增品牌的数据
const tmParams = ref<Trademark>({
  tmName: '',
  logoUrl: ''
})

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
  //立马清空上一次收集到数据
  tmParams.value.tmName = '';
  tmParams.value.logoUrl = '';
  tmParams.value.id = 0;
  //显示对话框
  dialogVisite.value = true;
  // 移除校验结果,初次的子组件El-form并未渲染完毕,所以要用nextTick()
  nextTick(() => {
    formRef.value.clearValidate('tmName');
    formRef.value.clearValidate('logoUrl');
  });
  // 或者可以利用ts的特性
  // formRef.value?.clearValidate('tmName');
  // formRef.value?.clearValidate('logoUrl');
}

// ----------上传文件的回调和参数-----------
// 上传照片之前的钩子函数
//上传文件组件:上传文件成功之前钩子,约束上传文件的大小与文件格式
const beforeAvatarUpload: UploadProps['beforeUpload'] = (file: any) => {
  //注入上传文件对象
  //上传文件格式:png|jpg|gif 且不能大于2M
  if (file.type == 'image/png' || file.type == 'image/jpeg' || file.type == 'image/gif') {

    if (file.size / 1024 / 1024 < 2) {
      return true;
    } else {
      ElMessage({
        type: 'error',
        message: '文件过大'
      })
      return false;
    }

  } else {
    ElMessage({
      type: 'error',
      message: '文件格式不正确'
    })
    //文件格式不对
    return false;
  }
}
// 上传照片成功的钩子函数
const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
  // response 上传网址返回的数据, 包含上传的照片的地址
  // uploadFile 上传的文件对象

  // 将获取到的地址赋值给 tmParams
  tmParams.value.logoUrl = response.data;
  // 图片上传成功:清除图片没有上传的校验结果
  formRef.value.clearValidate('logoUrl');
  ElMessage({
    type: "success",
    message: "文件上传成功"
  })
}

// 对话框 确认按钮的点击回调
const confirm = async () => {
  // 点击确定,校验表单文件
  // validate 函数会调用写好的校验函数 validateTmName, validateLogoUrl
  // 此函数会返回一个Promise对象, 如为失败状态的promise. await 等待不到成功的结果, 后面不会执行.
  await formRef.value.validate();
  try {
    // 发送请求,增加新的商标
    await reqAddOrUpdateTrademark(tmParams.value);
    // 更新本地的商标数据: 如是更新,保留当前页,如是增加,返回第一页
    getTrademarkList(tmParams.value.id ? currentPage.value : 1);
    // 关闭对话框
    dialogVisite.value = false;
    // 提示
    ElMessage({
      type: "success",
      message: "操作成功"
    })
  } catch (error) {
    //添加成功提示
    ElMessage({
      type: 'error',
      message: '操作失败'
    })
  }
}

// ----------------表单校验--------------------
// 自定义校验规则函数
// rule: 规则对象, value: 表单元素内容, callback: 校验结束执行的回调
const validateTmName = (rule: any, value: any, callback: any) => {
  // 品牌名最少两位
  if (value.length >= 2) callback();
  else callback(new Error('品牌名称至少两位'));
}
const validateLogoUrl = (rule: any, value: any, callback: any) => {
  // 有图片地址
  if (value.length) callback();
  else callback(new Error('请上传图片'));
}

// 校验规则对象
const rules = {
  // 数组为不同的需要填写的选项
  tmName: [
    // 校验对象
    { required: true, trigger: 'blur', validator: validateTmName }
  ],
  logoUrl: [
    { required: true, validator: validateLogoUrl }
  ]
}

// --------------------更新商标与删除现有商标--------------------
const updateTrademark = (row: Trademark) => {
  // 弹出对话框
  dialogVisite.value = true;
  // 在页面中展示对应的商标
  tmParams.value.id = row.id;
  tmParams.value.tmName = row.tmName;
  tmParams.value.logoUrl = row.logoUrl;
}

// 弹出确认框的回调
const handler = async (id: Trademark["id"]) => {
  try {
    //删除已有品牌成功
    await reqDeleteTrademark(id);
    //再次获取最新的品牌的数据
    getTrademarkList(trademarkArr.value.length > 1 ? currentPage.value : currentPage.value - 1);
    //提示消息
    ElMessage({
      type: 'success',
      message: '操作成功'
    })

  } catch (error) {
    ElMessage({
      type: 'error',
      message: '操作失败'
    })
  }
}
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>