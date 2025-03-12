<template>
  <div>
    <AutoColorAdScroll 
      :messages="messageList" 
      :speed="0.8"
      :hover-pause="true"
    >
    <template v-slot="{ message }">
      <div class="message">
        <div class="message-title">{{ message.messageTypeName }}：</div>
        <div class="message-content">{{ message.content }}</div>
      </div>
    </template>
    </AutoColorAdScroll>
    <Navbar />
    <AdExposure />
    <SteelPipeQuery /> 
    <div class="qrcode">
      <p style="text-align: center;">联系我们</p>
      <img src="@/assets/qrcode.jpg" alt="">
    </div>
  </div>
</template>

<script>
import { getMessageListApi, getMessageConfigApi } from '@/api/message';
export default {
  name: 'Query',
  components: {
    AdExposure: () => import('@/components/AdExposure.vue'),
    SteelPipeQuery: () => import('@/components/SteelPipeQuery.vue'),
    AutoColorAdScroll: () => import('@/components/AutoColorAdScroll.vue'),
    Navbar: () => import('@/components/Navbar.vue')
  },
  data() {
    return {
      messageList: []
    }
  },
  created() {
    this.getMessageConfig()
  },
  methods: {
    async getMessageConfig() {
      const { data } = await getMessageConfigApi()
      this.getMessageList(data.count)
    },
    async getMessageList(count) {
      const { data } = await getMessageListApi({ pageNum: 1, pageSize: count })
      this.messageList = data.data
    }
  }
}
</script>

<style scoped>
.message {
  display: flex;
  align-items: center;
}
.message-title {
  font-size: 1.5rem;
}
.message-content {
  max-width: 40rem;
  white-space: normal;
}
.qrcode {
  position: fixed;
  top: 20%;
  left: 0;
  padding: 10px;
  background-color: #fff;
  font-size: 20px;
  border-radius: 4px;
  border: 1px solid #ddd;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
}
.qrcode img {
  width: 200px;
}
</style>