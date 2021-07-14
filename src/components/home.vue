<template>
    <el-container class="home-container">
        <el-header>
            <div>
                <img src="../assets/heima.png" alt="">
                <span>电商后台管理系统</span> 
            </div>
            <el-button type="info" @click="logout">退出</el-button>
        </el-header>
        <el-container>
            <el-aside width="200px">Aside</el-aside>
            <el-main>Main</el-main>
        </el-container>
    </el-container>
</template>

<script>
export default {
    methods: {
        logout(){
            window.sessionStorage.clear();
            this.$router.push("/login")
        }
    },
}
</script>

<style lang="less" scoped>
    .home-container{
        height: 100%;
    }
    .el-header{
        display: flex;
        background-color: #373d41;
        justify-content: space-between;
        align-items: center;
        font-size: 20px;
        color: #fff;
        div{
            display: flex;
            align-items: center;
            span{
            }
        }
    }
    .el-aside{
        background-color: #333744;
    }
    .el-main{
        background-color: #eaedf1;
    }
</style>