<template>
  <div>
    <van-cell>
      搜索历史
      <template #extra>
        <van-icon name="delete-o" v-if="!isEdit" @click="isEdit = true" />
        <div v-else>
          <span @click="$store.commit('SET_HISTORYLIST', [])">全部删除</span>
          &nbsp;<span @click="isEdit = false">完成</span>
        </div>
      </template>
    </van-cell>
    <van-cell
      :title="item"
      v-for="(item, index) in historylist"
      :key="index"
      @click="!isEdit && $emit('change-keydorws', item)"
    >
      <template #extra
        ><van-icon
          @click="
            $store.commit(
              'SET_HISTORYLIST',
              historylist.filter((i) => item !== i)
            )
          "
          name="close"
          v-show="isEdit"
        />
      </template>
    </van-cell>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      isEdit: false
    }
  },
  computed: {
    ...mapState(['historylist'])
  }
}
</script>

<style></style>
