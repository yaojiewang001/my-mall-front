<template>
  <div>
    <!-- 导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>参数列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <!-- 输入框/添加按钮 -->
      <el-row :gutter="20">
        <el-col :span="8"
          ><el-input v-model="queryInfo.query" placeholder="请输入内容" clearable @clear="getGoodsList"><el-button slot="append" icon="el-icon-search" @click="getGoodsList"></el-button></el-input>
        </el-col>
        <el-button type="primary" @click="goAddPage">添加商品</el-button>
        <el-col :span="6"> </el-col>
      </el-row>
      <!-- 表格主体区域 -->
      <el-table :data="goodsList" style="width: 100%" border stripe>
        <el-table-column type="index"> </el-table-column>
        <el-table-column prop="goods_name" label="商品名称" width="600"> </el-table-column>
        <el-table-column prop="goods_price" label="商品价格（元）" width="120"> </el-table-column>
        <el-table-column prop="goods_weight" label="商品重量" width="100"> </el-table-column>
        <el-table-column prop="add_time" label="创建时间">
          <template slot-scope="scope">
            {{ scope.row.add_time | dateFormat }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="编辑" placement="top" :enterable="false">
              <el-button type="primary" size="mini" icon="el-icon-edit" @click="showEditDialog(scope.row.goods_id)"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除" placement="top" :enterable="false">
              <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeById(scope.row.goods_id)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <!-- 底部分页区域-->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[5, 8, 10, 20]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        background
      >
      </el-pagination>
    </el-card>

    <!-- 修改参数对话框-->
    <el-dialog title="提示" :visible.sync="EditDialogVisible" width="50%">
      <el-form :model="EditForm" :rules="EditFormrules" ref="EditFormRef" label-width="100px" @close="EditDialogClosed">
        <el-form-item label="商品名称" prop="goods_name">
          <el-input v-model="EditForm.goods_name"></el-input>
        </el-form-item>
        <el-form-item label="商品价格(元)" prop="goods_price">
          <el-input v-model="EditForm.goods_price"></el-input>
        </el-form-item>
        <el-form-item label="商品重量" prop="goods_weight">
          <el-input v-model="EditForm.goods_weight"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="EditDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="EditUserInfo">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
export default {
  data() {
    return {
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 8,
      },
      goodsList: [],
      total: 0,
      addGoodsDialogVisible: false,
      EditDialogVisible: false,
      EditForm: {},
      EditFormrules: {
        goods_name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
          {
            min: 2,
            max: 50,
            message: '长度在 2 到 50 个字符',
            trigger: 'blur',
          },
        ],
      },
      addGoodsForm: {
        goods_name: '',
        goods_cat: '',
        goods_price: '',
        goods_number: '',
        goods_weight: '',
      },
      addGoodsRules: {
        goods_name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
          {
            min: 2,
            max: 50,
            message: '长度在 2 到 50 个字符',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  created() {
    this.getGoodsList()
  },
  methods: {
    async getGoodsList() {
      const { data: res } = await this.$http.get('goods', {
        params: this.queryInfo,
      })
      if (res.meta.status !== 200) {
        return this.$message.error('获取参数失败')
      }
      this.goodsList = res.data.goods
      this.total = res.data.total
      // console.log(res.data)
    },
    /* 分页区 */
    handleSizeChange(val) {
      this.queryInfo.pagesize = val
      this.getGoodsList()
    },
    handleCurrentChange(val) {
      this.queryInfo.pagenum = val
      this.getGoodsList()
    },
    addGoods() {
      this.addGoodsDialogVisible = true
    },
    addGoodsBtn() {
      this.$refs.addGoodsFormRef.validate((valid) => {
        if (!valid) {
          return this.$message.error('验证失败')
        }
      })
    },

    /* 编辑按钮 */
    async showEditDialog(id) {
      const { data: res } = await this.$http.get('goods/' + id)
      if (res.meta.status !== 200) {
        return this.$message.error('获取失败')
      }
      this.EditForm = res.data
      this.EditDialogVisible = true
    },
    EditDialogClosed() {
      this.$refs.EditFormRef.resetFields()
    },
    /* 确定后预验证 */
    EditUserInfo() {
      this.$refs.EditFormRef.validate(async (valid) => {
        if (!valid) return
        const { data: res } = await this.$http.put(
          'goods/' + this.EditForm.goods_id,
          /* 需要更新的用户数据 */
          {
            goods_name: this.EditForm.goods_name,
            goods_price: this.EditForm.goods_price,
            goods_number: this.EditForm.goods_number,
            goods_weight: this.EditForm.goods_weight,
            goods_cat:this.EditForm.goods_cat,
          }
        )
        console.log(res);
        console.log(this.EditForm);
        if (res.meta.status !== 200) {
          return this.$message.error('更新商品信息失败')
        }
        this.$message.success('更新商品信息成功')
        this.EditDialogVisible = false
        this.getGoodsList()
        // console.log(res);
      })
    },
    /* 删除按钮 */
    async removeById(id) {
      const confirmResult = await this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).catch((err) => err)
      // console.log(confirmResult);
      if (confirmResult !== 'confirm') {
        return this.$message.info('取消删除')
      }
      const { data: res } = await this.$http.delete(`goods/${id}`)
      if (res.meta.status !== 200) {
        return this.$message.error('删除失败')
      }
      this.$message.success('删除成功')
      this.getGoodsList()
    },
    goAddPage() {
      this.$router.push('/goods/add')
    },
  },
}
</script>

<style lang="less" scoped>
.el-pagination {
  margin-top: 15px;
}
</style>