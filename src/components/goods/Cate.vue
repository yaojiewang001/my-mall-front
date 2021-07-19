<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <!-- 搜索与添加区域 -->
      <el-row :gutter="20">
        <el-col :span="4">
          <el-button type="primary" @click="showAddCateDialog"
            >添加分类</el-button
          >
        </el-col>
      </el-row>

      <!-- 用户列表区 -->
      <!-- 属性为布尔值  前加 : -->
      <tree-table
        class="treeTable"
        border
        show-index
        index-text="#"
        :expand-type="false"
        :selection-type="false"
        :data="cateList"
        :columns="columns"
      >
        <!-- 是否有效 -->
        <template slot="isOk" slot-scope="scope">
          <i
            class="el-icon-success"
            style="color: lightgreen"
            v-if="scope.row.cat_deleted === false"
          ></i>
          <i class="el-icon-error" style="color: red" v-else></i>
        </template>
        <!-- 排序 -->
        <template slot="order" slot-scope="scope">
          <el-tag v-if="scope.row.cat_level === 0">一级</el-tag>
          <el-tag type="success" v-else-if="scope.row.cat_level === 1"
            >二级</el-tag
          >
          <el-tag type="danger" v-else>三级</el-tag>
        </template>
        <!-- 操作 -->
        <template slot="opt" slot-scope="scope">
          <el-button size="mini" type="primary">编辑</el-button>
          <el-button size="mini" type="danger">删除</el-button>
        </template>
      </tree-table>
      <!-- 分页区 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="querInfo.pagenum"
        :page-sizes="[3, 5, 10, 15]"
        :page-size="querInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>

    <!-- 添加分类对话框 -->
    <el-dialog
      title="添加分类"
      :visible.sync="addCateDialogVisible"
      width="50%"
      @close="addCateDialogClosed"
    >
      <el-form
        :model="addCateForm"
        :rules="addCateRules"
        ref="addCateFormRef"
        label-width="100px"
      >
        <el-form-item label="分类名称：" prop="cat_name">
          <el-input v-model="addCateForm.cat_name"></el-input>
        </el-form-item>
        <el-form-item label="父级分类：">
          <el-cascader
            clearable
            v-model="selectedKeys"
            :options="parentCateList"
            :props="cascaderProps"
            @change="parentCateChanged"
          ></el-cascader>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addCateDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCate">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      /* 查询条件，文档中的请求参数 */
      querInfo: {
        type: 3,
        /* 当前页码 */
        pagenum: 1,
        /* 每页显示 */
        pagesize: 5,
      },
      /* 商品分类数据列表 */
      cateList: [],
      /* 总数据条数 */
      total: 0,
      /* 为table指定列定义 */
      columns: [
        {
          label: '分类名称',
          prop: 'cat_name',
        },
        {
          label: '是否有效',
          type: 'template',
          template: 'isOk',
        },
        {
          label: '排序',
          type: 'template',
          template: 'order',
        },
        {
          label: '操作',
          type: 'template',
          template: 'opt',
        },
      ],
      /* 添加分类对话框 */
      addCateDialogVisible: false,
      addCateForm: {
        cat_name: '',
        /* 分类父 ID */
        cat_pid: 0,
        /* 分类层级 */
        cat_level: 0,
      },
      addCateRules: {
        cat_name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' },
        ],
      },
      /* 父级分类列列表 */
      parentCateList: [],
      /* 选中父级分类的ID数组 */
      cascaderProps: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children',
        checkStrictly: true,
        expandTrigger: 'hover',
      },
      selectedKeys: [],
    }
  },
  created() {
    this.getCateList()
  },
  methods: {
    /* 商品分类数据 */
    async getCateList() {
      const { data: res } = await this.$http.get('categories', {
        params: this.querInfo,
      })
      if (res.meta.status !== 200) {
        return this.$message.error('获取数据失败')
      }
      this.cateList = res.data.result
      this.total = res.data.total
    },
    /* 每页显示条数 */
    handleSizeChange(size) {
      // console.log(`每页 ${val} 条`)
      this.querInfo.pagesize = size
      this.getCateList()
    },
    /* 当前为几页 */
    handleCurrentChange(num) {
      // console.log(`当前页: ${val}`)
      this.querInfo.pagenum = num
      this.getCateList()
    },
    showAddCateDialog() {
      this.getParentCateList()
      this.addCateDialogVisible = true
    },
    async getParentCateList() {
      const { data: res } = await this.$http.get('categories', {
        params: { type: 2 },
      })
      if (res.meta.status !== 200) {
        this.$message.error('获取父级分类数据失败')
      }
      this.parentCateList = res.data
    },
    /* 选择项发生变化时触发函数 */
    parentCateChanged() {
        // console.log(this.selectedKeys);
        if (this.selectedKeys.length > 0) {
            /* 父级分类ID */

        this.addCateForm.cat_pid =
          this.selectedKeys[this.selectedKeys.length - 1]
        /* 父级分类等级 */
        this.addCateForm.cat_level = this.selectedKeys.length
          // console.log('level'+ this.addCateForm.cat_level);
        return
      } else {
          /* 父级分类ID */
        this.addCateForm.cat_pid = 0
        /* 父级分类等级 */
        this.addCateForm.cat_level = 0
          // console.log('level'+this.addCateForm.cat_level);
      }
    },
    /* 确定后添加 */
    addCate() {
        // console.log(this.addCateForm);
        /* 表单预验证 */
      this.$refs.addCateFormRef.validate( async valid => {
        if (!valid) return

        const { data: res } = await this.$http.post('categories', this.addCateForm)
        if (res.meta.status !== 201) {
            return this.$message.error('添加分类失败')
        }
            console.log(res);
        this.$message.success('添加分类成功')
        this.getCateList()
        this.addCateDialogVisible = false
      })
    },
    /* 关闭后取消所有数据 */
    addCateDialogClosed() {
      /* 重置表单需要用到引用 */
      this.$refs.addCateFormRef.resetFields()
      this.selectedKeys = []
      this.addCateForm.cat_level = 0
      this.addCateForm.cat_pid = 0
    },
  },
}
</script>

<style lang="less" scoped>
.treeTable {
  margin-top: 15px;
}
.el-pagination {
  margin-top: 15px;
}
.el-cascader {
  width: 100%;
}
</style>