<template>
  <div class="home-container">
    <div class="home-left">
      <div>
        <img src="@/assets/1.gif" alt="">
      </div>
      <Navbar />
      <div class="img-container">
        <img src="@/assets/2.jpg" alt="">
        <img src="@/assets/3.jpg" alt="">
        <img src="@/assets/4.jpg" alt="">
      </div>
      <div>
        <img src="@/assets/5.gif" alt="">
      </div>
    </div>
    <div class="home-right">
      <div>
        <img src="@/assets/9.jpg" alt="">
      </div>
      <div style="margin: 10px 0;">
        <h1>产品查询概况</h1>
        <el-table :data="tableData" border>
          <el-table-column label="产品类型" prop="productTypeName"></el-table-column>
          <el-table-column label="查询次数" prop="count"></el-table-column>
        </el-table>
      </div>
      <div>
        <img src="@/assets/7.jpg" alt="">
      </div>
      <div>
        <img src="@/assets/8.jpg" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import { getProductStaticsApi } from '@/api/product';
export default {
  name: 'Home',
  components: {
    Navbar: () => import('@/components/Navbar.vue')
  },
  data() {
    return {
      tableData: []
    }
  },
  created() {
    this.getProductStatics()
  },
  methods: {
    async getProductStatics() {
      const { data } = await getProductStaticsApi()
      this.tableData = data
      console.log(data)
    }
  }
}
</script>

<style scoped>
.home-container {
  display: flex;
  justify-content: center;
}
.img-container {
  display: flex;
  justify-content: space-between;
}
.home-left {
  margin-right: 20px;
}
</style>