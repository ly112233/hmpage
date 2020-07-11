<template>
  <div class="login">
    <div class="left">
      <div class="logo">
        <img src="@/assets/img/loginLogo.png" alt />
        <span>黑马面面</span>
        <span class="symbol">|</span>
        <span>用户登录</span>
      </div>
      <el-form :model="form" class="form" :rules="rules" ref="form">
        <el-form-item prop="phone">
          <el-input v-model="form.phone" placeholder="请输入手机号" prefix-icon="el-icon-user"></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
            :show-password="true"
          ></el-input>
        </el-form-item>

        <el-form-item prop="code">
          <el-row>
            <el-col :span="16">
              <el-input v-model="form.code" placeholder="请输入验证码" prefix-icon="el-icon-key"></el-input>
            </el-col>
            <el-col :span="8">
              <img class="key" :src="codeUrl" @click='keyimg' ref="keyimgtoggle" alt />
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item prop="checked">
          <el-checkbox v-model="form.checked">
            我已阅读并同意
            <el-link type="primary">用户协议</el-link>和
            <el-link type="primary">隐私条款</el-link>
          </el-checkbox>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" style="width: 100%" @click="submit">登录</el-button>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" style="width: 100%" @click="register">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <img src="@/assets/img/login_banner_ele.png" alt />
    <register ref="register"></register>
  </div>
</template>
<script>
import register from "@/views/login/register.vue";
export default {
  components: {
    register
  },
  data() {
    var checkAge = (rule, value, callback) => {
      if (!/^1[3456789]\d{9}$/.test(value))
        return callback(new Error("手机号码格式不对"));
      callback();
    };
    return {
      codeUrl:process.env.VUE_APP_URL+'/captcha?type=login',
      form: { phone: "", password: "", code: "", checked: "" },
      rules: {
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            validator: checkAge
          }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 16, message: "长度在 6 到 16 个字符", trigger: "blur" }
        ],
        code: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 4, max: 4, message: "长度是 4 个字符", trigger: "blur" }
        ],
        checked: [
          { required: true, message: "请阅读隐私条款并勾选", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    //登录验证
    submit() {
      this.$refs.form.validate(result => {
        if (result) {
          this.$message.success("登录成功");
        } else {
          this.$message.error("登录失败");
        }
      });
    },
    register() {
      this.$refs.register.isShow = true;
    },
    keyimg(){
         this.$refs.keyimgtoggle.src=process.env.VUE_APP_URL+'/captcha?type=login&t'+Math.random()*111
    }
  }
};
</script>
<style lang='less'>
.login {
  background: linear-gradient(to right, #0f99ef, #11b8fb);
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  .left {
    width: 478px;
    height: 550px;
    background: #f5f5f5;
    padding: 47px;

    .logo {
      display: flex;
      align-items: center;
      img {
        width: 22px;
        height: 17px;
      }
      span {
        font-size: 22px;
        color: #0c0c0c;
        // margin: 0 20px;
        &:nth-of-type(1) {
          margin: 12px;
        }
        &:nth-of-type(3) {
          margin: 12px;
        }
      }
      .symbol {
        // width: 1px;
        // height: 28px;
        color: #c7c7c7;
      }
    }
    .form {
      margin-top: 20px;
      .key {
        width: 100%;
        height: 40px;
      }
    }
  }
}
</style>