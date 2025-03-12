<template>
  <div class="query-container">
    <div class="query-item-container">
      <div class="query-item">
        <div class="query-item-title">厂家名称</div>
        <el-input v-model="factoryName" placeholder="请输入厂家名称"></el-input>
      </div>
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
      <!-- <div class="query-item">
        <div class="query-item-title">外径范围</div>
        <el-radio-group>
          <el-radio>精确</el-radio>
          <el-radio>±1</el-radio>
          <el-radio>±2</el-radio>
        </el-radio-group>
      </div>
      <div class="query-item">
        <div class="query-item-title">壁厚范围</div>
        <el-radio-group>
          <el-radio>精确</el-radio>
          <el-radio>±0.25</el-radio>
          <el-radio>±0.5</el-radio>
          <el-radio>±0.75</el-radio>
        </el-radio-group>
      </div>
      <div class="query-item">
        <div class="query-item-title">显示模式</div>
        <el-radio-group>
          <el-radio>显示1条</el-radio>
          <el-radio>显示3条</el-radio>
          <el-radio>显示全部</el-radio>
        </el-radio-group>
      </div> -->
      <div class="query-item query-item-btn">
        <el-button type="primary" @click="query">搜索</el-button>
        <el-button type="primary" @click="dialogVisible = true">投诉&查看虚假库存</el-button>
      </div>
    </div>
    <div class="table-container">
      <el-tabs v-model="activeName" type="card" @tab-click="handleTabClick" @tab-remove="handleTabRemove">
        <el-tab-pane label="全部厂家" name=""></el-tab-pane>
        <el-tab-pane v-for="item in tabList" :key="item.id" :label="item.name" :name="item.id + ''" closable></el-tab-pane>
        <el-table border style="width: 100%;" :data="tableData">
          <el-table-column v-for="item in tableColumns" :key="item.prop" :prop="item.prop" :label="item.label">
            <template v-slot="{ row }">
              <template v-if="item.prop === 'name'">
                <el-button type="text" @click="jumpProductPage(row)">{{ row[item.prop] }}</el-button>
              </template>
              <template v-else-if="item.prop === 'mobiles'">
                <p v-for="mobile in row[item.prop]" :key="mobile">{{ mobile }}</p>
              </template>
              <template v-else-if="item.prop === 'productTypes'">
                <span v-for="(item1, index) in row[item.prop]" :key="index" style="margin-right: 5px;">{{ item1.name }}</span>
              </template>
              <template v-else>{{ row[item.prop] }}</template>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          @size-change="getFactoryList"
          @current-change="getFactoryList"
          :current-page="pageNum"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </el-tabs>
    </div>
    <el-dialog title="投诉虚假库存" :visible.sync="dialogVisible" width="50%">
      <el-form label-position="right" label-width="80px">
        <el-form-item label="厂家名称">
          <el-input placeholder="请输入厂家名称" v-model="complainForm.factoryName"></el-input>
        </el-form-item>
        <el-form-item label="产品类型">
          <el-select v-model="complainForm.productTypeId" placeholder="请选择产品类型" style="width: 100%;">
            <el-option v-for="item in productTypeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="规格">
          <el-input v-model="complainForm.specification" placeholder="请输入规格"></el-input>
        </el-form-item>
        <el-form-item label="投诉类型">
          <el-select v-model="complainForm.complainType" placeholder="请选择投诉类型" style="width: 100%;">
            <el-option label="虚假库存" :value="1"></el-option>
            <el-option label="虚假价格" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea" v-model="complainForm.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="createComplain">投诉库存</el-button>
          <el-button type="primary" @click="queryComplainList">刷新投诉记录</el-button>
        </el-form-item>
      </el-form>
      <el-table border :data="tableData1">
        <el-table-column v-for="item in columns" :key="item.prop" :prop="item.prop" :label="item.label"></el-table-column>
      </el-table>
      <el-pagination
        background
        @size-change="getComplainList"
        @current-change="getComplainList"
        :current-page="complainForm.pageNum"
        layout="total, prev, pager, next"
        :total="complainForm.total">
      </el-pagination>
    </el-dialog>
  </div>
</template>

<script>
import { getFactoryListApi } from '@/api/factory'
import { getProductTypeListApi } from '@/api/product'
import { createComplainApi, getComplainListApi } from '@/api/complain'
import { resetObj } from '@/utils'

export default {
  name: 'SteelPipeQuery',
  data() {
    return {
      activeName: '',
      columns1: [
        {
          prop: 'name',
          label: '厂家名称'
        },
        {
          prop: 'mobiles',
          label: '联系方式'
        },
        {
          prop: 'productTypes',
          label: '产品'
        }
      ],
      columns2: [
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
      factoryName: '',
      productTypeId: '',
      specification: '',
      delFlag: '',
      pageSize: 100,
      pageNum: 1,
      total: 0,
      tableData: [],
      productTypeList: [],
      tabList: [],
      dialogVisible: false,
      complainForm: {
        factoryId: '',
        productTypeId: '',
        specification: '',
        complainType: 1,
        desc: '',
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
      columns: [
        {
          prop: 'factoryName',
          label: '厂家名称'
        },
        {
          prop: 'complainExponent',
          label: '投诉指数'
        },
        {
          prop: 'productTypeName',
          label: '产品类型'
        },
        {
          prop: 'specification',
          label: '规格'
        },
        {
          prop: 'complainType',
          label: '投诉类型'
        },
        {
          prop: 'complainDesc',
          label: '描述'
        },
        {
          prop: 'complainTime',
          label: '投诉时间'
        }
      ],
      tableData1: []
    }
  },
  created() {
    this.getProductTypeList()
    this.query()
    this.queryComplainList()
  },
  computed: {
    tableColumns() {
      return this.specification ? this.columns2 : this.columns1
    }
  },
  methods: {
    query() {
      if (this.productTypeId) {
        const tab = this.productTypeList.find(item => item.id === this.productTypeId)
        this.tabList.push(tab)
        this.activeName = tab.id + ''
        console.log(this.activeName)
      }
      this.pageNum = 1
      this.getFactoryList()
    },
    async getFactoryList() {
      const { data } = await getFactoryListApi({
        factoryName: this.factoryName,
        productTypeId: this.productTypeId,
        specification: this.specification,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      })
      this.tableData = data.data
      this.total = data.total
    },
    async getProductTypeList() {
      const { data } = await getProductTypeListApi()
      this.productTypeList = data
    },
    handleTabClick(tab) {
      console.log(tab)
      this.productTypeId = tab.name ? +tab.name : ''
      this.pageNum = 1
      this.getFactoryList()
    },
    handleTabRemove(targetName) {
      if (this.tabList.length === 1) {
        this.tabList = []
        this.activeName = ''
        this.productTypeId = ''
      } else {
        let tabList = this.tabList
        let activeName = this.activeName
        if (activeName === targetName) {
          tabList.forEach((tab, index) => {
            if (tab.id === +targetName) {
              let nextTab = tabList[index + 1] || tabList[index - 1]
              if (nextTab) activeName = nextTab.id + ''
            }
          })
        }
        this.activeName = activeName
        this.tabList = tabList.filter(tab => tab.id !== +targetName)
        this.productTypeId = +activeName
      }
      this.pageNum = 1
      this.getFactoryList()
    },
    queryComplainList() {
      this.complainForm.pageNum = 1
      this.getComplainList()
    },
    async createComplain() {
      const { factoryName, productTypeId, specification, complainType, desc } = this.complainForm
      const { data } = await createComplainApi({
        factoryName,
        productTypeId,
        specification,
        complainType,
        desc
      })
      if (data) {
        this.$message.success('投诉成功')
        resetObj(this.complainForm)
        this.complainForm.pageNum = 1
        this.complainForm.pageSize = 10
        this.queryComplainList()
      }
    },
    async getComplainList() {
      const { pageNum, pageSize } = this.complainForm
      const { data } = await getComplainListApi({ pageNum, pageSize })
      this.tableData1 = data.data
      this.complainForm.total = data.total
    },
    jumpProductPage(row) {
      window.open(location.origin + `/product/${row.id}`)
    }
  }
}
</script>

<style scoped>
.query-container {
  padding: 0 20px;
  margin-top: 30px;
  margin-bottom: 50px;
}
.query-item-container {
  display: flex;
  flex-wrap: wrap;
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
.query-item-btn {
  width: 100%;
  justify-content: flex-end;
}
</style>