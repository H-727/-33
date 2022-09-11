<template>
  <div>
    <article-itme
      v-for="item in articles"
      :key="item.art_id"
      :article="item"
    ></article-itme>
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
      articles: []
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
      } catch (error) {
        const status = error.response?.status
        if (!error.response || status === 507) {
          throw error
        } else if (status === 400) {
          throw new Error(error.response.data.message)
        }
      }
    }
  }
}
</script>

<style></style>
