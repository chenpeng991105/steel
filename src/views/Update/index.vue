<template>
  <div class="update-container">
    <Navbar />
    <h1 style="margin-top: 20px;">修改密码</h1>
    <el-form label-position="right" label-width="100px">
      <el-form-item label="旧密码">
        <el-input type="password" v-model="password"></el-input>
      </el-form-item>
      <el-form-item label="新密码">
        <el-input type="password" v-model="newPassword"></el-input>
      </el-form-item>
      <el-form-item label="再次输入密码">
        <el-input type="password" v-model="newPassword1"></el-input>
      </el-form-item>
    </el-form>
    <div>
      <el-button type="primary" style="width: 100%;" @click="updatePassword">保存</el-button>
    </div>
  </div>
</template>

<script>
import { checkPasswordApi, updatePasswordApi } from '@/api/auth';
export default {
  name: 'Update',
  components: {
    Navbar: () => import('@/components/Navbar.vue')
  },
  data() {
    return {
      password: '',
      newPassword: '',
      newPassword1: ''
    }
  },
  methods: {
    async updatePassword() {
      const mobile = localStorage.getItem('mobile')
      if (this.newPassword !== this.newPassword1) {
        this.$message.error('两次新密码输入不一致，请重新输入')
      } else {
        const { data } = await checkPasswordApi(
          {
            mobile,
            password: this.password
          }
        )
        if (!data) {
          this.$message.error('旧密码输入错误，请重新输入')
        } else {
          const { data } = await updatePasswordApi({
            mobile,
            password: this.password,
            newPassword: this.newPassword
          })
          if (data) {
            this.$message.success('修改密码成功')
            this.password = ''
            this.newPassword = ''
            this.newPassword1 = ''
          }
        }
      }
    }
  }
}
</script>

<style scoped>
.update-container {
  width: 1000px;
  margin: 0 auto;
  padding-top: 30px;
}
h1 {
  margin-bottom: 30px;
}
</style>