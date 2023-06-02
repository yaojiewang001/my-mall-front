<template>
  <div>
    <!-- 导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <!-- 消息提示 -->
      <el-alert title="消息提示的文案" type="info" center show-icon :closable="false"> </el-alert>
      <!-- 步骤区域 -->
      <el-steps :space="200" :active="activeIndex - 0" finish-status="success" align-center>
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <!-- Tab栏区域 -->
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px" label-position="top">
        <el-tabs :tab-position="'left'" v-model="activeIndex" :before-leave="beforeTabLeave" @tab-click="tabClick">
          <el-tab-pane label="基本信息" name="0">
            <el-form-item label="商品名称" prop="goods_name">
              <el-input v-model="addForm.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="goods_price">
              <el-input v-model="addForm.goods_price" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品重量" prop="goods_weight">
              <el-input v-model="addForm.goods_weight" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品数量" prop="goods_number">
              <el-input v-model="addForm.goods_number" type="number"></el-input>
            </el-form-item>
            <!-- prop校验规则，addFormRules里的goods_cat -->
            <el-form-item label="商品分类" prop="goods_cat">
              <!-- v-model输入的双向绑定，options数据源，props配置对象，@change输入框变化 -->
              <el-cascader v-model="addForm.goods_cat" :options="cateList" :props="cateProps" @change="handleChange"></el-cascader>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品参数" name="1">
            <el-form-item :label="item.attr_name" v-for="item in manyTabData" :key="item.attr_id">
              <!-- v-model="item.attr_vals与label如果存在指定的值则为选中状态-->
              <el-checkbox-group v-model="item.attr_vals">
                <el-checkbox :label="it" v-for="(it, i) in item.attr_vals" :key="i" border></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品属性" name="2">
            <el-form-item :label="item.attr_name" v-for="item in onlyTabData" :key="item.attr_id">
              <el-input v-model="item.attr_vals"></el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品图片" name="3">
            <el-upload :action="uploadURL" :on-preview="handlePreview" :on-remove="handleRemove" list-type="picture" :headers="headersObj" :on-success="handleSuccess">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-tab-pane>
          <el-tab-pane label="商品内容" name="4">
            <!-- 富文本编辑器组件 -->
            <!-- <quill-editor v-model="addForm.goods_introduce"> </quill-editor> -->
            <el-button type="primary" class="btnAdd" @click="add">添加商品</el-button>
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>

    <el-dialog title="图片预览" :visible.sync="dialogVisible" width="50%">
      <img :src="previewPath" alt="" />
    </el-dialog>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  data() {
    return {
      activeIndex: 0,
      addForm: {
        goods_name: '',
        goods_price: 0,
        goods_weight: 0,
        goods_number: 0,
        /* 以为','分割的分类列表 */
        goods_cat: [],
        goods_introduce: '',
        pics: [],
        attrs: [],
      },
      addFormRules: {
        goods_name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
          {
            min: 2,
            max: 20,
            message: '长度在 2 到 20 个字符',
            trigger: 'blur',
          },
        ],
        goods_price: {
          required: true,
          message: '请输入商品价格',
          trigger: 'blur',
        },
        goods_weight: {
          required: true,
          message: '请输入商品重量',
          trigger: 'blur',
        },
        goods_number: {
          required: true,
          message: '请输入商品数量',
          trigger: 'blur',
        },
        goods_cat: {
          required: true,
          message: '请选择',
          trigger: 'blur',
        },
      },
      cateList: [],
      value: '',
      cateProps: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children',
        expandTrigger: 'hover',
      },
      manyTabData: [],
      onlyTabData: [],
      uploadURL: 'https://lianghj.top:8888/api/private/v1/upload',
      headersObj: {
        Authorization: window.sessionStorage.getItem('token'),
      },
      previewPath: '',
      dialogVisible: false,
      path: '',
    }
  },
  created() {
    this.getCateList()
  },
  methods: {
    async getCateList() {
      const { data: res } = await this.$http.get('categories')
      if (res.meta.status !== 200) {
        return this.$message.error('获取参数失败')
      }
      this.cateList = res.data
      // console.log(res)
    },
    /* 不是第三级不能选 */
    handleChange(val) {
      if (this.addForm.goods_cat.length !== 3) {
        this.addForm.goods_cat = []
      }
    },
    beforeTabLeave(activeName, oldActiveName) {
      if (oldActiveName == 0 && this.addForm.goods_cat.length !== 3) {
        this.$message.error('请选择商品分类')
        return false
      }
    },
    async tabClick() {
      if (this.activeIndex === '1') {
        const { data: res } = await this.$http.get(`categories/${this.cateId}/attributes`, {
          params: { sel: 'many' },
        })
        res.data.forEach((item) => {
          item.attr_vals = item.attr_vals.length === 0 ? [] : item.attr_vals.split(',')
        })
        this.manyTabData = res.data
      }
      if (this.activeIndex === '2') {
        const { data: res } = await this.$http.get(`categories/${this.cateId}/attributes`, {
          params: { sel: 'only' },
        })
        if (res.meta.status !== 200) {
          return this.$message.error('获取信息失败')
        }
        this.onlyTabData = res.data
        console.log(this.onlyTabData)
      }
    },
    /* 图片移除 */
    handleRemove(file) {
      const filePath = file.response.data.tmp_path
      /* 从数组中找到索引值i */
      const i = this.addForm.pics.findIndex((x) => x.pic === filePath)
      /* 移除当前 */
      this.addForm.pics.splice(i, 1)
    },
    /* 图片上传事件 */
    handleSuccess(res, file) {
      const picInfo = { pic: res.data.tmp_path }
      this.addForm.pics.push(picInfo)
      this.path = res.data.tmp_path
    },
    /* 图片预览 */
    handlePreview(file) {
      this.previewPath = 'https://lianghj.top:8888/' + this.path
      this.dialogVisible = true
    },
    /* 进行添加 */
    add() {
      /* 表单预验证 */
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) {
          return this.$message.error('请填写必要表单项')
        }
        /* 深拷贝前先导入 */
        const form = _.cloneDeep(this.addForm)
        form.goods_cat = form.goods_cat.join(',')

        /* 处理动态静态参数 */
        this.manyTabData.forEach((item) => {
          const newInfo = {
            attr_id: item.attr_id,
            attr_value: item.attr_vals.join(' '),
          }
          this.addForm.attrs.push(newInfo)
        })
        this.onlyTabData.forEach((item) => {
          const newInfo = { attr_id: item.attr_id, attr_value: item.attr_vals }
          this.addForm.attrs.push(newInfo)
        })
        form.attrs = this.addForm.attrs

        /* 发起请求 */
        const { data: res } = await this.$http.post('goods', form)
        console.log(res)
        if (res.meta.status !== 201) {
          return this.$message.error('添加商品失败')
        }
        this.$message.success('添加商品成功')
        this.$router.push('/goods')
      })
    },
  },
  computed: {
    cateId() {
      if (this.addForm.goods_cat.length === 3) {
        return this.addForm.goods_cat[2]
      }
      return null
    },
  },
}
</script>

<style lang="less" scoped>
.el-checkbox {
  margin: 0 15px 0 0 !important;
}
img {
  width: 100%;
}
.btnAdd {
  margin-top: 15px;
}
</style>