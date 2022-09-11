<template>
  <div class="profile">
    <!-- 头部 -->
    <header>
      <div class="login banner" v-if="isLogin">
        <van-row> </van-row>
        <van-row>
          <van-col span="12">
            <van-row
              type="flex"
              style="height: 100%"
              justify="space-around"
              align="center"
            >
              <van-image
                round
                width="1.5rem"
                height="1.5rem"
                :src="useriofo.photo"
              />
              <span class="mobile">{{ useriofo.name }}</span>
            </van-row>
          </van-col>
          <van-col span="7"></van-col>
          <van-col span="5"
            ><van-row
              type="flex"
              style="height: 100%"
              justify="center"
              align="center"
              ><van-button round class="edit-btn">编辑按钮</van-button></van-row
            >
          </van-col>
        </van-row>
        <van-row>
          <van-grid class="grid" :border="false">
            <van-grid-item text="头条">
              <template #icon>{{ useriofo.art_count }}</template>
            </van-grid-item>
            <van-grid-item text="粉丝">
              <template #icon>{{ useriofo.fans_count }}</template>
            </van-grid-item>
            <van-grid-item text="关注">
              <template #icon>{{ useriofo.follow_count }}</template>
            </van-grid-item>
            <van-grid-item text="获赞">
              <template #icon>{{ useriofo.like_count }}</template>
            </van-grid-item>
          </van-grid>
        </van-row>
      </div>
      <div class="logout banner" v-else>
        <img src="../../assets/images/mobile.png" alt="" />
        <span class="text" @click="$router.push('/login')">登录 / 注册</span>
      </div>
    </header>
    <!-- 头部 -->

    <!-- 主体 -->
    <main>
      <van-grid column-num="2" clickable>
        <van-grid-item text="收藏"
          ><template #icon
            ><span class="toutiao toutiao-shoucang"></span></template
        ></van-grid-item>
        <van-grid-item text="历史"
          ><template #icon><span class="toutiao toutiao-lishi"></span></template
        ></van-grid-item>
      </van-grid>
      <div class="link">
        <van-cell title="消息通知" is-link />
        <van-cell title="小智同学" is-link />
      </div>
    </main>
    <!-- 主体 -->

    <!-- 底部 -->
    <footer>
      <van-button class="btn" block v-if="isLogin" @click="logout"
        >退出</van-button
      >
    </footer>
    <!-- 底部 -->
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import { getUserIofoApi } from '@/api'
export default {
  data() {
    return {
      useriofo: {}
    }
  },
  created() {
    this.getUserIofo()
  },
  computed: {
    ...mapGetters(['isLogin']),
    ...mapState(['tokenObj'])
  },
  methods: {
    async logout() {
      try {
        await this.$dialog.confirm({
          title: '黑马头条',
          message: '是否退出当前账号'
        })

        this.$store.commit('SET_TOKEN', {})
      } catch (error) {}
    },
    async getUserIofo() {
      if (!this.isLogin) return
      try {
        const { data } = await getUserIofoApi(this.tokenObj.token)
        console.log(data.data)
        this.useriofo = data.data
      } catch (error) {
        if (error.response && error.response.status === 401) {
          this.$toast.fail('用户认证失败，请重新登录')
        } else {
          throw error
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.profile {
  height: 100vh;
  background-color: #f5f7f9;
  .toutiao {
    font-size: 40px;
  }
  .toutiao-shoucang {
    color: red;
  }
  .toutiao-lishi {
    color: orange;
  }
  .btn {
    color: red;
  }
}
.link {
  margin: 10px 0;
}
.banner {
  width: 100%;
  height: 5.333rem;
  background-image: url('../../assets/images/banner.png');
  background-size: cover;
}
.logout {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    width: 1.76rem;
    height: 1.76rem;
  }
  .text {
    margin-top: 10px;
    color: #fff;
    font-size: 30px;
  }
}
.login {
  display: flex;
  flex-direction: column;
  > .van-row {
    flex: 1;
    .van-col {
      height: 100%;
    }
  }
  .mobile {
    font-size: 30px;
    color: #fff;
  }
  .edit-btn {
    width: 1.6rem;
    height: 0.4267rem;
    color: #666;
    font-size: 12px;
    padding: 0;
    margin: 0;
  }
}
:deep(.grid) {
  .van-grid-item__content {
    font-size: 30px;
    background-color: inherit;
    color: #fff;
    .van-grid-item__text {
      color: #fff;
    }
  }
}
</style>
