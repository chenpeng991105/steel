<template>
  <div class="login-container">
    <div class="login-inner">
      <h1 class="login-title">欢迎使用 👋🏻</h1>
      <div class="login-item">
        <div class="login-item-title">手机号：</div>
        <el-input placeholder="请输入手机号" v-model="mobile"></el-input>
      </div>
      <div class="login-item">
        <div class="login-item-title">密码：</div>
        <el-input type="password" placeholder="请输入密码" v-model="password"></el-input>
      </div>
      <div class="login-item">
        <el-button type="primary" style="width: 100%;" @click="onLogin">登录</el-button>
      </div>
      <div class="login-tips">还没有账号？<span @click="jumpRegister">立即注册</span></div>
    </div>
  </div>
</template>

<script>
import { loginApi } from '@/api/auth'
import AutoColorAdScroll from '@/components/AutoColorAdScroll.vue'
import router from '@/router';
export default {
  name: 'Login',
  components: { AutoColorAdScroll },
  data() {
    return {
      mobile: '',
      password: ''
    }
  },
  methods: {
    async onLogin() {
      const res = await loginApi({
        mobile: this.mobile,
        password: this.password
      })
      const { username, token } = res.data
      localStorage.setItem('username', username)
      localStorage.setItem('mobile', this.mobile)
      localStorage.setItem('token', token)
      this.$router.replace('/')
    },
    jumpRegister() {
      this.$router.push('/register')
    }
  }
}
</script>

<style scoped>
.login-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-inner {
  width: 350px;
  height: 300px;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
.login-title {
  width: 100%;
  text-align: center;
}
.login-item {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-item-title {
  width: 100px;
}
.login-tips {
  width: 100%;
  margin-top: -18px;
  text-align: left;
  color: #aaa;
}
.login-tips span {
  cursor: pointer;
  transition: .25s;
}
.login-tips span:hover {
  color: #409eff;
}
</style>