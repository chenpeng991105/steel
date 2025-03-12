<template>
  <div class="category-container">
    <h1>分类信息</h1>
    <div class="query-item-container">
      <div class="query-item">
        <div class="query-item-title">分类</div>
        <el-select placeholder="请选择分类" v-model="webMessageTypeId" clearable>
          <el-option v-for="item in messageTypeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </div>
      <div class="query-item">
        <div class="query-item-title">详细描述</div>
        <el-input type="textarea" style="width: 400px;" v-model="content" clearable=""></el-input>
      </div>
      <div class="query-item">
        <el-button type="primary" @click="queryMessage">查询</el-button>
        <el-button type="primary" @click="queryAllMessage">显示全部</el-button>
        <el-button type="primary" @click="dialogVisible = true">发布信息</el-button>
      </div>
    </div>
    <el-table border :data="tableData" style="width: 100%;">
      <el-table-column v-for="item in columns" :key="item.label" :prop="item.prop" :label="item.label"></el-table-column>
    </el-table>
    <el-pagination
      background
      @size-change="getMessageList"
      @current-change="getMessageList"
      :current-page="pageNum"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    <el-dialog title="发布消息" :visible.sync="dialogVisible" width="600px" @closed="cancel">
      <el-form label-position="right" label-width="80px">
        <el-form-item label="分类">
          <el-select placeholder="请选择分类" style="width: 100%" v-model="messageForm.messageTypeId">
            <el-option v-for="item in messageTypeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="详细描述">
          <el-input type="textarea" v-model="messageForm.content"></el-input>
        </el-form-item>
        <el-form-item label="截止日期">
          <el-date-picker
            style="width: 100%"
            v-model="messageForm.deadline"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
            >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="createMessage">发布</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getMessageListApi, createMessageApi, createMessageTypeApi, getMessageTypeListApi } from '@/api/message'
import { resetObj } from '@/utils'
export default {
  name: 'Category',
  data() {
    return {
      columns: [
        {
          prop: 'messageTypeName',
          label: '分类'
        },
        {
          prop: 'content',
          label: '详细描述'
        },
        {
          prop: 'deadline',
          label: '截止日期'
        }
      ],
      webMessageTypeId: '',
      content: '',
      pageNum: 1,
      pageSize: 50,
      total: 0,
      tableData: [],
      dialogVisible: false,
      messageForm: {
        messageTypeId: '',
        content: '',
        deadline: ''
      },
      messageTypeList: []
    }
  },
  created() {
    this.getMessageList()
    // this.createMessageType()
    this.getMessageTypeList()
  },
  methods: {
    queryMessage() {
      this.pageNum = 1
      this.getMessageList()
    },
    queryAllMessage() {
      this.pageNum = 1
      this.webMessageTypeId = ''
      this.content = ''
      this.getMessageList()
    },
    async getMessageList() {
      const { data } = await getMessageListApi({
        webMessageTypeId: this.webMessageTypeId,
        content: this.content,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      })
      this.tableData = data.data
      this.total = data.total
    },
    async createMessage() {
      console.log(this.messageForm.deadline)
      const { messageTypeId, content, deadline } = this.messageForm
      const { data } = await createMessageApi({ messageTypeId, content, deadline })
      if (data) {
        this.$message.success('创建成功')
        this.cancel()
        this.getMessageList()
      }
    },
    async createMessageType() {
      await createMessageTypeApi({
        name: '提示'
      })
    },
    async getMessageTypeList() {
      const { data } = await getMessageTypeListApi()
      this.messageTypeList = data
    },
    cancel() {
      resetObj(this.messageForm)
      this.dialogVisible = false
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