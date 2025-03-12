<template>
  <div class="tab-container">
    <div style="color: #f4ed37;">{{ username }}你好！</div>
    <ul class="tab-item-container">
      <li v-for="item in tabList" :key="item.id" @click="handleTabClick(item.id)">{{ item.label }}</li>
    </ul>
  </div>
</template>

<script>
import { logoutApi } from '@/api/auth';
export default {
  data() {
    return {
      username: '',
      tabList: [
        {
          id: 0,
          label: '欢迎页面'
        },
        {
          id: 1,
          label: '现货查询'
        },
        {
          id: 3,
          label: '搜索统计'
        },
        {
          id: 4,
          label: '修改密码'
        },
        {
          id: 5,
          label: '退出系统'
        }
      ]
    }
  },
  created() {
    this.username = localStorage.getItem('username')
  },
  methods: {
    handleTabClick(id) {
      switch (id) {
        case 0:
          this.$router.push('/')
          break
        case 1:
          this.$router.push('/query')
          break
        case 3:
          this.$router.push('/statistics')
          break
        case 4:
          this.$router.push('/update')
          break
        case 5:
          this.$confirm('确认退出系统吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(async () => {
            const Authorization = localStorage.getItem('token')
            await logoutApi({ Authorization })
            localStorage.clear()
            this.$router.replace('/login')
          }).catch(() => {})
          break
      }
    }
  }
}
</script>

<style scoped>
.tab-container {
  display: flex;
  align-items: center;
  padding: 0 30px;
  box-sizing: border-box;
  width: 100%;
  height: 40px;
  background-color: #972251;
}
.tab-item-container {
  flex: 1;
  display: flex;
  justify-content: space-between;
  color: #fff;
  list-style: none;
  margin-left: 20px;
  cursor: pointer;
}
</style>