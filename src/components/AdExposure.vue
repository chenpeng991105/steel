<template>
  <div class="ad-container">
    <div class="ad-container-left">
      <div class="ad-container-left-inner">
        <div class="ad-container-left-1">
          <div class="ad-img">
            <img v-for="(item, index) in leftImages" :key="index" :src="item.imageUrl" alt="" :class="[(item.jumpImageUrl || item.externalLink) ? 'cursor-pointer' : '']" @click="onJump(item)">
          </div>
        </div>
        <div class="ad-container-left-2">
          <div class="ad-img">
            <img v-for="(item, index) in centerImages" :key="index" :src="item.imageUrl" alt="" :class="[(item.jumpImageUrl || item.externalLink) ? 'cursor-pointer' : '']" @click="onJump(item)">
          </div>
        </div>
      </div>
    </div>
    <div class="ad-container-right">
      <div class="ad-img">
        <img v-for="(item, index) in rightImages" :key="index" :src="item.imageUrl" alt="" :class="[(item.jumpImageUrl || item.externalLink) ? 'cursor-pointer' : '']" @click="onJump(item)">
      </div>
    </div>
  </div>
</template>

<script>
import { getImageInfoApi } from '@/api/file';
export default {
  name: 'AdExposure',
  data() {
    return {
      leftImages: [],
      centerImages: [],
      rightImages: []
    }
  },
  created() {
    this.getImageInfo()
  },
  computed: {
    imageClass(item) {
      if (item.jumpImageUrl || item.externalLink) {
        return 'cursor-pointer'
      } else {
        return ''
      }
    }
  },
  methods: {
    async getImageInfo() {
      const { data } = await getImageInfoApi()
      const imageInfo = JSON.parse(data)
      this.leftImages = imageInfo.leftImages || []
      this.centerImages = imageInfo.centerImages || []
      this.rightImages = imageInfo.rightImages || []
    },
    onJump(item) {
      if (item.jumpImageUrl || item.externalLink) window.open(item.jumpImageUrl || item.externalLink)
    }
  }
}
</script>

<style scoped>
.ad-container {
  display: flex;
  margin-top: 20px;
}
.ad-container-left {
  width: 80%;
}
.ad-container-left-inner {
  width: 100%;
  display: flex;
}
.ad-container-right {
  width: 20%;
  margin-left: 15px;
}
.ad-container-left-1 {
  width: 20%;
}
.ad-container-left-2 {
  flex: 1;
  margin-left: 15px;
}
.ad-img {
  width: 100%;
}
.ad-img img {
  width: inherit;
  height: 100%;
  margin-bottom: 1px;
}
.cursor-pointer {
  cursor: pointer;
}
</style>