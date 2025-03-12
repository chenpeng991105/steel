<template>
  <div 
    class="infinite-ad-scroll"
    @mouseenter="pause"
    @mouseleave="resume"
    @touchstart.passive="pause"
    @touchend.passive="resume"
    ref="container"
  >
    <div 
      class="scroll-track"
      :style="trackStyle"
      ref="track"
    >
      <div
        v-for="item in renderList"
        :key="item.uid"
        class="ad-item"
        :style="item.style"
        @mouseenter="handleItemHover"
        @mouseleave="handleItemLeave"
      >
        <div class="content">
          <slot :message="item.message"></slot>
        </div>
        <div class="hover-effect"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { nanoid } from 'nanoid'

export default {
  name: 'InfiniteAdScroll',
  props: {
    messages: {
      type: Array,
      required: true
    },
    speed: {
      type: Number,
      default: 1.5,
      validator: v => v > 0 && v <= 3
    },
    hoverPause: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      scrollPosition: 0,
      rafId: null,
      isPaused: false,
      baseItems: [],
      cloneCount: 2,
      currentHoverIndex: -1
    }
  },
  computed: {
    trackStyle() {
      return {
        transform: `translateX(${this.scrollPosition}px)`,
        transition: this.isPaused ? 'none' : 'transform 0.1s linear'
      }
    },
    renderList() {
      return [
        ...this.baseItems,
        ...Array(this.cloneCount).fill().flatMap((_, index) => 
          this.baseItems.map(item => ({
            ...item,
            uid: `${item.uid}-clone-${index}`
          }))
        )
      ]
    }
  },
  watch: {
    messages: {
      immediate: true,
      handler(newVal) {
        this.initBaseItems(newVal)
      }
    }
  },
  mounted() {
    this.calculateCloneCount()
    this.startAnimation()
    window.addEventListener('resize', this.handleResize)
    document.addEventListener('visibilitychange', this.handleVisibilityChange)
  },
  beforeUnmount() {
    this.stopAnimation()
    window.removeEventListener('resize', this.handleResize)
    document.removeEventListener('visibilitychange', this.handleVisibilityChange)
  },
  methods: {
    initBaseItems(messages) {
      this.baseItems = messages.map((message, index) => ({
        uid: nanoid(),
        message,
        style: this.generateStyle(index)
      }))
    },

    generateStyle(index) {
      const hue = (index * 360 / this.messages.length) % 360
      const saturation = 65 + Math.random() * 15
      const lightness = 40 + Math.random() * 15
      
      return {
        '--bg-color': `hsl(${hue}, ${saturation}%, ${lightness}%)`,
        '--border-color': `hsl(${(hue + 30) % 360}, ${saturation}%, ${lightness - 10}%)`,
        '--text-color': lightness > 50 ? '#222' : '#fff'
      }
    },

    handleItemHover(event) {
      if (this.hoverPause) this.pause()
      event.currentTarget.classList.add('active')
    },

    handleItemLeave(event) {
      if (this.hoverPause) this.resume()
      event.currentTarget.classList.remove('active')
    },

    handleVisibilityChange() {
      if (document.visibilityState === 'visible') {
        this.startAnimation()
      } else {
        this.stopAnimation()
      }
    },

    calculateCloneCount() {
      const containerWidth = this.$refs.container?.offsetWidth || 0
      const itemWidth = 300
      this.cloneCount = Math.ceil(containerWidth / itemWidth) * 2
    },

    animate() {
      if (this.isPaused) return

      this.scrollPosition -= this.speed
      const trackWidth = this.$refs.track?.scrollWidth || 0
      
      if (Math.abs(this.scrollPosition) >= trackWidth / 2) {
        this.scrollPosition = 0
      }

      this.rafId = requestAnimationFrame(this.animate)
    },

    startAnimation() {
      if (!this.rafId) {
        this.animate()
      }
    },

    stopAnimation() {
      if (this.rafId) {
        cancelAnimationFrame(this.rafId)
        this.rafId = null
      }
    },

    pause() {
      this.isPaused = true
      this.stopAnimation()
    },

    resume() {
      if (!this.isPaused) return
      this.isPaused = false
      this.startAnimation()
    },

    handleResize() {
      this.calculateCloneCount()
      this.stopAnimation()
      this.scrollPosition = 0
      this.$nextTick(this.startAnimation)
    }
  }
}
</script>

<style scoped>
.infinite-ad-scroll {
  width: 100%;
  overflow: hidden;
  position: relative;
  margin-bottom: 1.2rem;
}

.scroll-track {
  display: inline-flex;
  white-space: nowrap;
  will-change: transform;
  backface-visibility: hidden;
  padding-right: 50px;
}

.ad-item {
  --scale-factor: 1;
  --shadow-intensity: 0.15;
  position: relative;
  display: inline-flex;
  align-items: center;
  padding: 1rem 3rem;
  font-size: 1.2rem;
  font-weight: 600;
  flex-shrink: 0;
  min-width: 280px;
  justify-content: center;
  cursor: pointer;
  user-select: none;
  transform: scale(var(--scale-factor));
  transition: 
    transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1),
    box-shadow 0.3s ease;
  background-color: var(--bg-color);
  color: var(--text-color);
}

.ad-item .content {
  position: relative;
  z-index: 2;
}

.ad-item .hover-effect {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    45deg,
    rgba(255,255,255,0.15),
    rgba(255,255,255,0)
  );
  opacity: 0;
  transition: opacity 0.3s ease;
}

.ad-item.active {
  --scale-factor: 1.05;
  --shadow-intensity: 0.25;
  z-index: 10;
}

.ad-item.active .hover-effect {
  opacity: 1;
}

@media (max-width: 768px) {
  .ad-item {
    margin: 0 1rem;
    font-size: 1rem;
    min-width: 220px;
  }
}
</style>