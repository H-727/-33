<template>
  <div>
    <van-cell
      v-for="(item, index) in highLightsuggestion"
      :key="index"
      icon="search"
      @click="$emit('change-keydorws', suggestion[index])"
    >
      <template #title>
        <span v-html="item"></span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestionAPI } from '@/api'
import { debounce } from 'lodash'
export default {
  props: {
    keywords: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      suggestion: []
    }
  },
  computed: {
    highLightsuggestion() {
      const reg = new RegExp(this.keywords, 'ig')
      return this.suggestion.map((str) => {
        return str.replace(
          reg,
          (match) => `<span style="color:red">${match}</span>`
        )
      })
    }
  },
  watch: {
    keywords: {
      immediate: true,
      handler: 'getSearchSuggestion'
    }
  },
  methods: {
    getSearchSuggestion: debounce(async function () {
      try {
        const { data } = await getSearchSuggestionAPI(this.keywords)
        this.suggestion = data.data.options.filter(Boolean)
      } catch (error) {
        if (error.response) {
          this.$toast.fail('获取搜索建议失败')
        } else {
          throw error
        }
      }
    }, 300)
  }
}
</script>

<style></style>
