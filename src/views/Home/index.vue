<template>
  <div>
    <!-- 搜索框 -->
    <van-nav-bar class="navbar">
      <template #title
        ><van-button icon="search" size="small" to="/search" round block
          >搜索</van-button
        >
      </template>
    </van-nav-bar>
    <!-- 频道及文章展示 -->
    <van-tabs v-model="active" swipeable>
      <van-tab :title="item.name" v-for="item in channels" :key="item.id">
        <article-list :id="item.id"></article-list>
      </van-tab>
      <span @click="show = true" class="toutiao toutiao-gengduo"></span>
    </van-tabs>
    <!-- 弹出层 -->
    <van-popup
      v-model="show"
      closeable
      close-icon-position="top-left"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <channel-edit
        v-if="show"
        :my-channels="channels"
        @change-active=";[(show = false), (active = $event)]"
        @del-channel="delChannel"
        @add-channel="addChannel"
      ></channel-edit>
    </van-popup>
  </div>
</template>

<script>
import { getChannelAPI, getDelChannelAPI, AddChannelAPI } from '@/api'
import ArticleList from '@/components/ArticleList.vue'
import ChannelEdit from '@/components/ChannelEdit.vue'
import { mapGetters, mapMutations } from 'vuex'
export default {
  components: { ArticleList, ChannelEdit },
  created() {
    this.initChannels()
  },
  data() {
    return {
      active: 0,
      channels: [],
      show: false
    }
  },

  methods: {
    ...mapMutations(['SET_MY_CHANNELS']),
    async delChannel(id) {
      try {
        const newChannels = this.channels.filter((item) => item.id !== id)
        if (this.isLogin) {
          await getDelChannelAPI(id)
        } else {
          this.SET_MY_CHANNELS(newChannels)
        }

        this.channels = newChannels
        this.$toast.success('删除频道成功')
      } catch (error) {
        if (error.response && error.response.status === 401) {
          this.$toast.fail('请登录再删除')
        } else {
          throw error
        }
      }
    },
    initChannels() {
      if (this.isLogin) {
        this.getUserIofo()
      } else {
        if (this.$store.state.mychannels.length === 0) {
          this.getUserIofo()
        } else {
          this.channels = this.$store.state.mychannels
        }
      }
    },
    async addChannel(channel) {
      try {
        if (this.isLogin) {
          await AddChannelAPI(channel.id, this.channels.length - 1)
        } else {
          this.SET_MY_CHANNELS([...this.channels, channel])
        }

        this.channels.push(channel)
        this.$toast.success('添加频道成功~~')
      } catch (error) {
        if (error.response && error.response.status === 401) {
          this.$toast.fail('请登录再删除')
        } else {
          throw error
        }
      }
    },
    async getUserIofo() {
      try {
        const { data } = await getChannelAPI()
        this.channels = data.data.channels
      } catch (error) {
        if (!error.response) {
          throw error
        } else {
          const status = error.response.status
          status === 507 ?? this.$toast.fail('服务器异常，请刷新')
        }
      }
    }
  },
  computed: {
    ...mapGetters(['isLogin'])
  }
}
</script>

<style lang="less" scoped>
.navbar {
  background-color: #3296fa;
  :deep(.van-nav-bar__title) {
    max-width: unset;
  }
  .van-button--block {
    width: 7.4rem;
    background-color: #5babfb;
  }
  .van-button--default {
    background-color: #5babfb;
    border: 0;
    color: #fff;
    font-size: 30px;
  }

  .van-icon {
    color: #fff;
  }
}

:deep(.van-tabs__content) {
  height: calc(100vh - 275px);
  overflow: auto;
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background: lawngreen;
    border-radius: 10px;
  }
}

/* tabs导航条样式 */
:deep(.van-tabs__wrap) {
  padding-right: 66px;

  .van-tabs__nav {
    padding-left: 0;
    padding-right: 0;

    /* tab标签 */
    .van-tab {
      border: 1px solid #eee;
      width: 200px;
      height: 82px;
    }

    /* tab标签下划线 */
    .van-tabs__line {
      width: 31px;
      height: 6px;
      background-color: #3296fa;
      bottom: 40px;
    }
  }
}

/* 字体图标 */
.toutiao-gengduo {
  position: absolute;
  top: 0;
  right: 0;
  width: 66px;
  height: 82px;
  font-size: 40px;
  line-height: 82px;
  text-align: center;
  opacity: 0.6;
  border-bottom: 1px solid #eee;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 70%;
    width: 1px;
    background-image: url('~@/assets/images/gradient-gray-line.png');
  }
}
</style>
