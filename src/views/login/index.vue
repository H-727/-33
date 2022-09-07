<template>
  <div>
    <van-nav-bar title="登录" class="navbar" />
    <van-form @submit="onSubmit" class="form" ref="form">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="mobileRules"
      >
        <template #label>
          <span class="toutiao toutiao-shouji"></span>
        </template>
      </van-field>
      <van-field
        v-model="code"
        name="code"
        placeholder="验证码"
        :rules="codeRules"
      >
        <template #label>
          <span class="toutiao toutiao-yanzhengma"></span>
        </template>
        <template #button>
          <van-button
            class="btn"
            block
            size="small"
            round
            native-type="button"
            type="default"
            v-if="isShowCodeBtn"
            @click="sendCode"
            >发送验证码</van-button
          >
          <van-count-down
            v-else
            :time="60 * 1000"
            format="ss秒"
            @finish="isShowCodeBtn = true"
          />
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { mobileRules, codeRules } from './rule'
import { login, sendCodeApi } from '@/api'
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      mobile: '',
      code: '',
      mobileRules,
      codeRules,
      isShowCodeBtn: true
    }
  },
  methods: {
    ...mapMutations(['SET_TOKEN']),
    loading() {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
    },
    async onSubmit() {
      try {
        this.loading()
        const { data } = await login(this.mobile, this.code)
        this.SET_TOKEN(data.data)
        this.$router.push('/profile')
        this.$toast.success('登录成功')
      } catch (error) {
        if (error.response && error.response.status === 400) {
          this.$toast.fail(error.response.data.message)
        } else {
          this.$toast.clear()
          throw error
        }
      }
    },
    async sendCode() {
      await this.$refs.form.validate('mobile')
      this.loading()
      try {
        await sendCodeApi(this.mobile)
        this.isShowCodeBtn = false
        this.$toast.success('发送验证码成功')
      } catch (error) {
        if (
          error.response &&
          (error.response.status === 404 || error.response.status === 429)
        ) {
          this.$toast.fail(error.response.data.message)
        } else {
          throw error
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.navbar {
  background-color: #1989fa;
  :deep(.van-nav-bar__title) {
    color: #fff !important;
  }
}
.form {
  :deep(.van-cell__title) {
    flex: 1;
  }
  :deep(.van-cell__value) {
    flex: 20;
  }
  .toutiao {
    font-size: 40px;
  }
}
.btn {
  height: 0.64rem;
  background-color: #eee;
  color: #a58594;
}
</style>
