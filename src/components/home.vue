<template>
  <el-container class="home-container">
    <el-header>
      <div>
        <img src="../assets/heima.png" alt="" />
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <el-container>
      <el-aside :width="isCollapse?'64px':'200px'">
        <div class="toggle-buton" @click="toggleCollapse">|||</div>
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409eff"
          unique-opened
          :collapse="isCollapse"
          :collapse-transition="false"
          router
          :default-active="activePath"
        >
          <!-- 一级菜单 -->
          <!-- 绑定index为了让每个li不一样 -->
          <el-submenu :index="item.id+''" v-for="item in menulist" :key="item.id">
            <template slot="title">
              <i :class="iconobj[item.id]"></i>
              <span>{{item.authName}}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item :index="'/'+it.path" v-for="it in item.children" :key="it.id"
            @click="saveNavStatus('/'+it.path)">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{it.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
    data() {
        return {
            menulist:[],
            iconobj:{
              '125':"iconfont icon-user",
              '103':"iconfont icon-tijikongjian",
              '101':"iconfont icon-shangpin",
              '102':"iconfont icon-danju",
              '145':"iconfont icon-baobiao",
            },
            isCollapse:false,
            activePath:'',
        }
    },
  created() {
    this.getMenuList()
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    logout() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    toggleCollapse(){
      this.isCollapse = !this.isCollapse
    },
    saveNavStatus(activePath){
      window.sessionStorage.setItem('activePath',activePath)
      this.activePath = activePath
    },
    async getMenuList() {
        const {data:res} = await this.$http.get('menus')
        // console.log(res);
        if(res.meta.status !== 200) return this.$message.error(res.meta.msg)
        this.menulist = res.data
    },
  },
}
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}
.el-header {
  display: flex;
  background-color: #373d41;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  color: #fff;
  div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
}
.el-aside {
  background-color: #333744;
  .el-menu{
    border-right: none;
    
  }
}
.el-main {
  background-color: #eaedf1;
}
.iconfont{
  margin-right: 10px;
}
.toggle-buton{
      background-color: #4a5064;
      text-align: center;
      height: 24px;
      line-height: 24px;
      color: #fff;
      letter-spacing: 0.2em;
      cursor: pointer;
    }
</style>