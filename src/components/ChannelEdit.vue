<template>
  <div>
    <!-- 我的频道 -->
    <div class="channeledit">
      <van-cell title="我的频道">
        <van-button
          size="mini"
          class="btn"
          round
          style="color: red; border-color: red"
          @click="isEdit = !isEdit"
          >{{ isEdit ? '完成' : '编辑' }}</van-button
        >
      </van-cell>
    </div>

    <div class="my-pannel">
      <van-grid gutter="10" :border="false">
        <van-grid-item
          :icon="isEdit && item.name !== '推荐' ? 'cross' : ''"
          v-for="(item, index) in myChannels"
          :key="item.id"
          :text="item.name"
          :class="{ active: item.name === '推荐' }"
          @click="handleMyChannel(item, index)"
        >
        </van-grid-item>
      </van-grid>
    </div>

    <!-- 推荐频道 -->
    <van-cell title="推荐频道"></van-cell>
    <div class="recommend-pannel">
      <van-grid gutter="10" :border="false">
        <van-grid-item
          v-for="value in recommendChannles"
          :key="value.id"
          :text="value.name"
          icon="plus"
        >
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
import { getAllChannelAPI } from '@/api'
export default {
  name: 'channeledit',
  props: {
    myChannels: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      isEdit: false,
      allChannels: []
    }
  },
  created() {
    this.getAllChannel()
  },
  computed: {
    recommendChannles() {
      return this.allChannels.filter((item) => {
        return !this.myChannels.find((value) => value.id === item.id)
      })
    }
  },
  methods: {
    async getAllChannel() {
      const { data } = await getAllChannelAPI()
      this.allChannels = data.data.channels
    },
    handleMyChannel({ name }, index) {
      if (this.isEdit && name !== '推荐') {
        console.log(132)
      } else {
        this.$emit('change-active', index)
      }
    }
  }
}
</script>

<style lang="less" scoped>
:deep(.active) {
  .van-grid-item__text {
    color: red;
  }
}
.channeledit {
  padding-top: 92px;
  .btn {
    width: 100px;
    font-size: 25px;
  }
}
:deep(.van-grid-item__content) {
  background-color: #f4f5f6;
}
// 我的频道
.my-pannel {
  // 编辑按钮居中
  .van-cell__value {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  // 关闭按钮样式
  :deep(.van-grid-item__content) {
    position: relative;

    .van-grid-item__content {
      position: absolute;
      top: 0;
      right: 0;
    }
  }
}
:deep(.van-grid-item__icon-wrapper) {
  position: sticky !important;
}
:deep(.van-icon-cross) {
  position: absolute;
  top: 0;
  right: 0;
  font-size: 25px;
  transform: translate(20%, -35%);
  border: 0.02667rem solid #000;
  border-radius: 50%;
  text-align: center;
  line-height: 0.32rem;
}
// 推荐频道
.recommend-pannel {
  // 推荐频道加号样式
  :deep(.van-grid-item__content) {
    flex-direction: row;

    .van-grid-item__icon {
      font-size: 0.5rem;
    }

    .van-grid-item__text {
      margin-top: 0;
    }
  }
}
</style>
