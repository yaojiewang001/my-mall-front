<template>
    <div class="login_container">
        <div class="login_box">
            <!-- 登录头像 -->
            <div class="avatar_box">
                <img src="../assets/logo.png" alt="">
            </div>
            <!-- 登录框 -->
            <el-form ref="loginFormRef" label-width="0px" class="login_form" :model="loginForm" :rules="loginFormRules">
                <!-- 用户名 -->
                <el-form-item prop="username">
                    <el-input prefix-icon="iconfont icon-user" v-model="loginForm.username"></el-input>
                </el-form-item>
                <!-- 密码 -->
                <el-form-item prop="password">
                    <el-input prefix-icon="iconfont icon-3702mima" v-model="loginForm.password" type="password"></el-input>
                </el-form-item>
                <!-- 按钮 -->
                <el-form-item class="btns">
                    <el-button type="primary" @click="login">登录</el-button>
                    <el-button type="info" @click="resetloginForm">重置</el-button>
                </el-form-item>
                
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            /* 登录表单的数据绑定对象 */
            loginForm: {
                username:"admin",
                password:"123456"
            },
            /* 表单验证规则 */
            loginFormRules: {
                username: [
                    { required: true, message: '请输入用户名称', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入登录名称', trigger: 'blur' },
                    { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
                ]
            }
        }
    },
    methods:{
        /* 重置表单设置 */
        resetloginForm(){
            this.$refs.loginFormRef.resetFields()
        },
        login(){
            this.$refs.loginFormRef.validate(async valid =>{
                /* false直接退出不发起请求 */
                if(!valid) return;
                const { data: res } = await this.$http.post("login",this.loginForm)
                if(res.meta.status !== 200) return this.$message.error("登录失败");
                this.$message.success("登录成功");
                /* 将登录后的token保存到sessionStorage中，
                其他API接口必须在登录后才能访问，
                只在当前打开期间有效，所以放在 sessionStorage中*/
                window.sessionStorage.setItem("token",res.data.token);
                // 通过编程式导航跳转到后台主页，路由地址是/home
                this.$router.push("/home")
            })
        }
    }
}
</script>

<style lang="less" scoped>
    .login_container{
        background-color: #2b4b6b;
        height: 100%;
    }
    .login_box{
        position: relative;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        width: 450px;
        height: 300px;
        background-color: #fff;
        border-radius: 3px;
        .avatar_box{
            position: absolute;
            left: 50%;
            transform: translate(-50%,-50%);
            width: 130px;
            height: 130px;
            border: 1px solid #eee;
            border-radius: 50%;
            box-shadow: 0 0 10px #ddd;
            padding: 10px;
            background-color: #fff;
            img{
                width: 100%;
                height: 100%;
                border-radius: 50%;
                background-color: #eee;
            }
        }
    }
    .login_form{
        position: absolute;
        bottom: 0;
        width: 100%;
        padding: 0 10px;
        box-sizing: border-box;
    }
    .btns{
        display: flex;
        justify-content: flex-end;
    }
</style>