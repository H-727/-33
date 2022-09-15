<template>
  <div>
    <form action="/">
      <van-search
        class="search"
        v-model.trim="keywords"
        background="#3296fa"
        placeholder="请输入搜索关键词"
        show-action
        @search="onsearch"
        @focus="isShowSearchResult = false"
        @cancel="$roture.push('/')"
      />
    </form>
    <!-- <search-history></search-history>
    <search-result><  /search-result>
    <search-suggestion></search-suggestion> -->
    <component
      @change-keydorws="onsearch"
      :keywords="keywords"
      :is="searchName"
    ></component>
  </div>
</template>

<script>
import SearchHistory from './components/SearchHistory.vue'
import SearchResult from './components/SearchResult.vue'
import SearchSuggestion from './components/SearchSuggestion.vue'
import { mapMutations, mapState } from 'vuex'
export default {
  components: { SearchHistory, SearchResult, SearchSuggestion },
  data() {
    return {
      keywords: '',
      isShowSearchResult: false
    }
  },
  computed: {
    ...mapState(['historylist']),
    searchName() {
      if (this.keywords === '') return 'SearchHistory'
      if (this.isShowSearchResult) return 'SearchResult'
      return 'SearchSuggestion'
    }
  },
  methods: {
    ...mapMutations(['SET_HISTORYLIST']),
    onsearch(keywords) {
      this.SET_HISTORYLIST([...new Set([this.keywords, ...this.historylist])])
      this.keywords = keywords
      this.isShowSearchResult = true
    }
  }
}
</script>

<style lang="less" scoped>
.search {
  [role='button'] {
    color: #fff;
  }
}
</style>
