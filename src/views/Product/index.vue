<template>
  <div class="product-container">
    <Navbar />
    <div class="query-item-container">
      <div class="query-item">
        <div class="query-item-title">产品类型</div>
        <el-select v-model="productTypeId" placeholder="请选择产品类型" style="width: 100%;">
          <el-option v-for="item in productTypeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </div>
        <div class="query-item">
          <div class="query-item-title">规格</div>
          <el-input v-model="specification" placeholder="请输入规格"></el-input>
        </div>
        <div class="query-item">
          <el-button type="primary" @click="query">搜索</el-button>
          <el-button type="primary" @click="queryAll">显示全部</el-button>
        </div>
    </div>
    <h1 class="factory-name">{{ factoryDetail.name }}</h1>
    <div class="data-container">
      <el-table border style="width: 100%;" :data="tableData">
        <el-table-column v-for="item in columns" :key="item.prop" :prop="item.prop" :label="item.label">
          <template v-slot="{ row }">
            <template v-if="item.prop === 'updateTime'">{{ formatTime(row[item.prop]) }}</template>
            <template v-else>{{ row[item.prop] }}</template>
          </template>
        </el-table-column>
      </el-table>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>厂家联系方式</span>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getFactoryDetailApi } from '@/api/factory';
import { getProductListApi, getProductTypeListApi } from '@/api/product';
import { parseTime } from '@/utils';
export default {
  name: 'Product',
  components: {
    Navbar: () => import('@/components/Navbar.vue')
  },
  data() {
    return {
      factoryId: '',
      productTypeId: '',
      specification: '',
      productTypeList: [],
      pageNum: 1,
      pageSize: 100,
      total: 0,
      tableData: [],
      columns: [
        {
          prop: 'productTypeName',
          label: '产品类型'
        },
        {
          prop: 'specification',
          label: '规格'
        },
        {
          prop: 'count',
          label: '件数'
        },
        {
          prop: 'number',
          label: '支数'
        },
        {
          prop: 'weight',
          label: '重量'
        },
        {
          prop: 'floatPrice',
          label: '浮动'
        },
        {
          prop: 'price',
          label: '价格'
        },
        {
          prop: 'units',
          label: '单位价格'
        },
        {
          prop: 'oldPrice',
          label: '昨日'
        },
        {
          prop: 'packageForm',
          label: '包装形式'
        },
        {
          prop: 'remark',
          label: '备注'
        },
        {
          prop: 'updateTime',
          label: '更新时间'
        }
      ],
      factoryDetail: {}
    }
  },
  created() {
    this.factoryId = this.$route.params.factoryId
    this.getFactoryDetail()
    this.getProductTypeList()
    this.getProductList()
  },
  methods: {
    async getProductTypeList() {
      const { data } = await getProductTypeListApi()
      this.productTypeList = data
    },
    async getFactoryDetail() {
      const { data } = await getFactoryDetailApi(this.factoryId)
      Object.assign(this.factoryDetail, data)
      console.log(this.factoryDetail)
    },
    async getProductList() {
      const { data } = await getProductListApi({
        factoryId: this.factoryId,
        productTypeId: this.productTypeId,
        specification: this.specification,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      })
      this.tableData = data.data
      this.total = data.total
    },
    query() {
      this.pageNum = 1
      this.getProductList()
    },
    queryAll() {
      this.pageNum = 1
      this.productTypeId = ''
      this.specification = ''
      this.getProductList()
    },
    formatTime(time) {
      return parseTime(time)
    }
  }
}
</script>

<style scoped>
.product-container {
  width: 1200px;
  margin: 0 auto;
}
.query-item-container {
  display: flex;
  flex-wrap: wrap;
}
.factory-name {
  margin: 30px 0;
}
.query-item {
  width: 30%;
  display: flex;
  align-items: center;
  margin-right: 15px;
  margin-top: 20px;
}
.query-item-title {
  width: 70px;
  flex-shrink: 0;
  margin-right: 15px;
  text-align: center;
}
.data-container {
  display: flex;
}
.box-card {
  width: 200px;
  margin-left: 20px;
}
</style>