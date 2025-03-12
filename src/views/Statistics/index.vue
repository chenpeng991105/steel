<template>
  <div class="statistics-container">
    <Navbar />
    <div class="statistics-title">
      <h1>主要产品搜索热度指数</h1>
      <el-button type="primary" @click="onMoreContent">点击查询更多内容</el-button>
    </div>
    <div class="statistics-inner">
      <el-card class="box-card" v-for="(item, index) in recordList" :key="index">
        <div slot="header" class="clearfix">
          <span>{{ item.productTypeName }}{{ item.days }}天搜索统计</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="onMore(item)">更多></el-button>
        </div>
        <div class="statistics-header">
          <p>产品规格</p>
          <p>指数</p>
        </div>
        <div>
          <div class="statistics-data" v-for="(o, index) in item.productSearchNums" :key="index">
            <p>{{ o.specification }}</p>
            <p>{{ o.num }}</p>
          </div> 
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getSimpleRecordListApi } from '@/api/record';
export default {
  name: 'Statistics',
  components: {
    Navbar: () => import('@/components/Navbar.vue')
  },
  data() {
    return {
      recordList: []
    }
  },
  created() {
    this.getSimpleRecordList()
  },
  methods: {
    onMore(item) {
      this.$router.push({
        path: '/detail',
        query: {
          productTypeId: item.productTypeId,
          days: item.days
        }
      })
    },
    onMoreContent() {
      this.$router.push('/detail')
    },
    async getSimpleRecordList() {
      await getSimpleRecordListApi()
    }
  }
}
</script>

<style scoped>
.statistics-container {
  width: 1300px;
  margin: 0 auto;
}
.statistics-title {
  display: flex;
  justify-content: space-between;
  margin: 30px 0;
}
.statistics-inner {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.box-card {
  width: 300px;
  margin-bottom: 30px;
}
.statistics-header {
  width: 100%;
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
  color: #5585cb;
}
.statistics-data {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}
.statistics-data:last-child {
  margin-bottom: 0;
}
</style>