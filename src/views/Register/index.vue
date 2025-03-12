<template>
  <div class="login-container">
    <div class="login-inner">
      <h1 class="login-title">注册账号 👋🏻</h1>
      <div class="login-item">
        <div class="login-item-title">用户名：</div>
        <el-input placeholder="请输入手机号" v-model="username"></el-input>
      </div>
      <div class="login-item">
        <div class="login-item-title">手机号：</div>
        <el-input placeholder="请输入手机号" v-model="mobile"></el-input>
      </div>
      <div class="login-item">
        <div class="login-item-title">密码：</div>
        <el-input type="password" placeholder="请输入密码" v-model="password"></el-input>
      </div>
      <div class="login-item">
        <div class="login-item-title">再次输入密码：</div>
        <el-input type="password" placeholder="请输入密码" v-model="password2"></el-input>
      </div>
      <div class="login-item">
        <el-button type="primary" style="width: 100%;" @click="onRegister">注册</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { registerApi } from '@/api/auth'
export default {
  data() {
    return {
      username: '',
      mobile: '',
      password: '',
      password2: ''
    }
  },
  methods: {
    async onRegister() {
      if (this.password.trim() !== this.password2.trim()) {
        this.$message.warning('两次密码输入不一致，请重新输入')
      } else {
        const { data } = await registerApi({
          username: this.username.trim(),
          mobile: this.mobile.trim(),
          password: this.password.trim(),
          password2: this.password2.trim()
        })
        if (data) {
          this.$message.success('注册成功，请登录')
          this.$router.replace('/login')
        }
      }
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
  width: 400px;
  height: 430px;
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
  width: 130px;
}
</style>