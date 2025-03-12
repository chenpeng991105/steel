<template>
  <div class="category-container">
    <h1>单据查询</h1>
    <div class="query-item-container">
      <div class="query-item">
        <div class="query-item-title">单据来源单位名称</div>
        <el-input></el-input>
      </div>
      <div class="query-item">
        <div class="query-item-title">订单号</div>
        <el-input></el-input>
      </div>
      <div class="query-item">
        <div class="query-item-title">车号</div>
        <el-input></el-input>
      </div>
      <div class="query-item">
        <div class="query-item-title">购货单位名称</div>
        <el-input></el-input>
      </div>
      <div class="query-item">
        <div class="query-item-title">单据日期</div>
        <el-input></el-input>
      </div>
      <div class="query-item">
        <el-button type="primary">查询</el-button>
      </div>
    </div>
    <el-table border style="width: 100%;">
      <el-table-column v-for="item in columns" :key="item.label" :prop="item.prop" :label="item.label"></el-table-column>
    </el-table>
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'Category',
  data() {
    return {
      columns: [
        {
          prop: '',
          label: 'ID'
        },
        {
          prop: '',
          label: '单据来源单位名称'
        },
        {
          prop: '',
          label: '购货单位名称'
        },
        {
          prop: '',
          label: '单据日期	'
        },
        {
          prop: '',
          label: '订单号'
        },
        {
          prop: '',
          label: '车号'
        },
        {
          prop: '',
          label: '合计重量'
        },
        {
          prop: '',
          label: '合计价格'
        },
        {
          prop: '',
          label: '备注1'
        },
        {
          prop: '',
          label: '备注2'
        },
        {
          prop: '',
          label: '单据详情'
        }
      ]
    }
  }
}
</script>

<style scoped>
.category-container {
  width: 1200px;
  margin: 0 auto;
}
.query-item-container {
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
}
.query-item {
  display: flex;
  align-items: center;
  margin-right: 20px;
  margin-bottom: 20px;
}
.query-item-title {
  flex-shrink: 0;
  margin-right: 20px;
}
</style>