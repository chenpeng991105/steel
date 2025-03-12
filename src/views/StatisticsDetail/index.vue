<template>
  <div class="statistics-container">
    <Navbar />
    <h1 class="statistics-title">主要产品搜索热度指数</h1>
    <div class="query-container">
      <div class="query-item">
        <div class="query-title">统计日期</div>
        <el-date-picker
          style="width: 100%"
          v-model="searchDate"
          type="date"
          placeholder="选择日期"
          value-format="yyyy-MM-dd"
          >
        </el-date-picker>
      </div>
      <div class="query-item">
        <div class="query-title">产品类型</div>
        <el-select v-model="productTypeId">
          <el-option v-for="item in productTypeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </div>
      <div class="query-item">
        <div class="query-title">区间天数</div>
        <el-select v-model="days">
          <el-option label="7天" :value="7"></el-option>
          <el-option label="30天" :value="30"></el-option>
        </el-select>
      </div>
      <el-button type="primary" @click="query">查询</el-button>
    </div>
    <div class="data-container">
      <div class="category-container">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>产品分类</span>
            </div>
            <ul class="product-list">
              <li v-for="item in simpleRecordList" :key="item.productTypeId">{{ item.productTypeName }}{{ item.days }}搜索统计</li>
            </ul>
          </el-card>
      </div>
      <div class="table-container">
        <el-table border :data="tableData" style="width: 100%;">
          <el-table-column v-for="item in columns" :key="item.label" :prop="item.prop" :label="item.label"></el-table-column>
        </el-table>
        <el-pagination
          background
          @size-change="getRecordList"
          @current-change="getRecordList"
          :current-page="pageNum"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { getRecordListApi, getSimpleRecordListApi } from '@/api/record';
import { getProductTypeListApi } from '@/api/product';
export default {
  name: 'StatisticsDetail',
  components: {
    Navbar: () => import('@/components/Navbar.vue')
  },
  data() {
    return {
      searchDate: '',
      productTypeId: '',
      days: '',
      pageNum: 1,
      pageSize: 100,
      total: 0,
      columns: [
        {
          prop: '',
          label: '产品规格'
        },
        {
          prop: '',
          label: '指数'
        },
        {
          prop: '',
          label: '区间天数'
        }
      ],
      simpleRecordList: [],
      tableData: [],
      productTypeList: []
    }
  },
  created() {
    const { productTypeId, days } = this.$route.query
    console.log(this.$route.query)
    if (productTypeId && days) {
      this.productTypeId = productTypeId
      this.days = days
    }
    this.getRecordList()
    this.getSimpleRecordList()
    this.getProductTypeList()
  },
  methods: {
    query() {
      this.pageNum = 1
      this.getRecordList()
    },
    async getSimpleRecordList() {
      const { data } = await getSimpleRecordListApi()
      this.simpleRecordList = data.data
    },
    async getRecordList() {
      const { data } = await getRecordListApi({
        searchDate: this.searchDate,
        productTypeId: this.productTypeId,
        days: this.days,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      })
      this.tableData = data.data || []
      this.total = data.total || 0
    },
    async getProductTypeList() {
      const { data } = await getProductTypeListApi()
      this.productTypeList = data
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
  margin: 30px 0;
}
.query-container {
  display: flex;
  margin-bottom: 20px;
}
.query-item {
  display: flex;
  align-items: center;
  margin-right: 20px;
}
.query-title {
  flex-shrink: 0;
  margin-right: 20px;
}
.data-container {
  display: flex;
}
.box-card {
  width: 220px;
  margin-right: 20px;
}
.table-container {
  flex: 1;
}
.product-list li {
  margin: 10px 0;
  padding-bottom: 5px;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
}
.product-list li:first-child {
  margin-top: 0;
}
.product-list li:last-child {
  margin-bottom: 0;
}
</style>