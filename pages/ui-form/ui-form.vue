<template>
  <view class="form-validate">
    <view class="">
      <view class="body">
        <ui-form ref="myform" :rules="rules" :value="params">
          <ui-form-item prop="cnName">
            <input
              class="input"
              label="中文姓名"
              placeholder="请输入中文姓名"
              v-model="params.cnName"
            />
          </ui-form-item>
          <ui-form-item prop="password">
            <input
              class="input"
              label="输入密码"
              placeholder="请输入密码"
              v-model="params.password"
            />
          </ui-form-item>
          <ui-form-item prop="passwordConfirm">
            <input
              class="input"
              label="确认密码"
              placeholder="请输入密码"
              v-model="params.passwordConfirm"
            />
          </ui-form-item>
        </ui-form>
      </view>
    </view>
    <button type="primary" @click="toConfirm">下一步</button>
  </view>
</template>

<script>
export default {
  data() {
    return {
      params: {
        cnName: "",
        cnTrs: "",
        password: "",
        passwordConfirm: "",
      },
      rules: {
        cnName: [
          {
            required: true,
            message: "未输入姓名",
          },
        ],
        cnTrs: [
          {
            required: true,
            message: "未输入拼音",
          },
        ],
        password: [
          {
            required: true,
            message: "未输入证件号码",
          },
        ],
        passwordConfirm: [
          {
            required: true,
            message: "未输入手机号",
          },
          {
            callback: (value) => {
              return value == this.params.password;
            },
            message: "两次输入密码不一致",
          },
        ],
      },
    };
  },
  methods: {
    toConfirm() {
      this.$refs.myform
        .submit()
        .then(() => {
          console.log(true);
        })
        .catch((error) => {
          uni.showModal({
            content: error,
          });
        });
    },
  },
};
</script>

<style>
.ui-invalid .input {
  border: 1px solid red;
}
.input {
  margin: 20rpx;
  padding: 10rpx;
  border: 1px solid gray;
}
</style>
