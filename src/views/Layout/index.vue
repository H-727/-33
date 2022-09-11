<template>
  <div>
    <router-view></router-view>
    <van-tabbar route class="tabbar">
      <van-tabbar-item to="/ ">
        <template #icon>
          <span class="toutiao toutiao-shouye"></span>
        </template>
        首页
      </van-tabbar-item>
      <van-tabbar-item to="/video">
        <template #icon>
          <span class="toutiao toutiao-shipin"></span>
        </template>
        视频
      </van-tabbar-item>
      <van-tabbar-item to="/qa">
        <template #icon>
          <span class="toutiao toutiao-wenda"></span>
        </template>
        文档
      </van-tabbar-item>
      <van-tabbar-item to="/profile">
        <template #icon>
          <span class="toutiao toutiao-wode"></span>
        </template>
        {{ isLogin ? '我的' : '未登录' }}
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['isLogin'])
  }
}
</script>

<style lang="less" scoped>
:deep(.tabbar) {
  .van-tabbar-item__icon {
    font-size: 40px;
  }
  .van-tabbar-item__text {
    font-size: 30px;
  }
}
</style>
