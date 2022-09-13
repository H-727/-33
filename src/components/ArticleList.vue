<template>
  <div class="article">
    <van-pull-refresh
      :disabled="disabled"
      v-model="isLoading"
      @refresh="getNextPageArticle"
    >
      <van-list
        @load="getNextPageArticle"
        offset="100"
        :immediate-check="false"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了哦~~~"
        :error.sync="error"
        error-text="请求失败请点击重试"
        ><article-itme
          v-for="item in articles"
          :key="item.art_id"
          :article="item"
        ></article-itme
      ></van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticlesAPI } from '@/api'
import ArticleItme from './ArticleItme.vue'
export default {
  components: { ArticleItme },
  props: {
    id: [String, Number]
  },
  data() {
    return {
      articles: [],
      pirtimestamp: '',
      loading: false,
      finished: false,
      error: false,
      isLoading: false,
      disabled: false
    }
  },
  created() {
    this.getFirstPageArticles()
  },

  methods: {
    async getFirstPageArticles() {
      try {
        const { data } = await getArticlesAPI(this.id, +new Date())
        this.articles = data.data.results
        this.pirtimestamp = data.data.pre_timestamp
      } catch (error) {
        const status = error.response?.status
        if (!error.response || status === 507) {
          throw error
        } else if (status === 400) {
          throw new Error(error.response.data.message)
        }
      }
    },
    async getNextPageArticle() {
      try {
        const { data } = await getArticlesAPI(this.id, this.pirtimestamp)
        if (!data.data.pre_timestamp) {
          this.finished = true
          this.disabled = true
        }
        if (this.loading) {
          this.articles.push(...data.data.results)
        } else {
          this.articles.unshift(...data.data.results)
        }
        this.pirtimestamp = data.data.pre_timestamp
      } catch (error) {
        this.error = true
      } finally {
        this.loading = false
        this.isLoading = false
      }
    }
  }
}
</script>

<style></style>
