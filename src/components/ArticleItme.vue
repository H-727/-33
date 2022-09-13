<template>
  <div>
    <!-- 没有图片的 -->
    <van-cell
      :title="article.title"
      v-if="article.cover.type === 0"
      :label="label"
    ></van-cell>
    <!-- 一张图片的 -->
    <van-cell
      :title="article.title"
      v-else-if="article.cover.type === 1"
      :label="label"
    >
      <van-image
        width="100"
        height="100"
        :src="article.cover.images[0]"
      ></van-image>
    </van-cell>
    <!-- 三张图片的 -->
    <van-cell v-else :title="article.title">
      <template #label>
        <van-image
          width="100"
          height="100"
          v-for="(item, index) in article.cover.images"
          :key="index"
          :src="item"
        ></van-image>
      </template>
    </van-cell>
  </div>
</template>

<script>
import dayjs from '@/utils/dayjs'
export default {
  created() {},
  props: {
    article: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    label() {
      const { aut_name, comm_count, pubdate } = this.article
      return `${aut_name} ${comm_count}评论 ${dayjs(pubdate).fromNow()}`
    }
  }
}
</script>

<style></style>
