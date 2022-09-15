<template>
  <div>
    <van-list
      class="result"
      v-model="loading"
      @load="getResults"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
    >
      <van-cell
        v-for="item in results"
        :key="item.art_id"
        :title="item.title"
        @click="
          $router.push({
            path: '/detail',
            query: { articleId: item.art_id }
          })
        "
      ></van-cell>
    </van-list>
  </div>
</template>

<script>
import { getResultsAPI } from '@/api'
export default {
  props: {
    keywords: {
      type: String,
      reqeired: true
    }
  },
  created() {
    this.getResults()
  },
  data() {
    return {
      loading: false,
      page: 1,
      perpage: 10,
      results: [],
      finished: false,
      error: false
    }
  },
  methods: {
    async getResults() {
      try {
        const { data } = await getResultsAPI(
          this.page++,
          this.perpage,
          this.keywords
        )
        const results = data.data.results
        console.log(results)
        if (results.length === 0) this.finished = true
        this.results = [...this.results, ...results]
        this.loading = false
      } catch {
        this.error = true
      }
    }
  }
}
</script>

<style lang="less" scoped>
.result {
  height: calc(100vh - 108px);
  overflow: auto;
}
</style>
