<template>
  <div class="container-login">
    <div class="left">
      <div class="logo">
        <img src="@/assets/img/loginLogo.png" alt />
        <span style="margin-left:12px">黑马面面</span>
        <span class="sybmol" style="color:#C7C7C7">丨</span>
        <span>用户登录</span>
      </div>
      <el-form :model="logForm" class="form" :rules="loginRules" ref="logForm">
        <el-form-item prop="phone">
          <el-input placeholder="请输入手机号" v-model="logForm.phone" prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            placeholder="请输入密码"
            v-model="logForm.password"
            prefix-icon="el-icon-lock"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-row>
            <el-col :span="17">
              <el-input placeholder="请输入验证码" v-model="logForm.code" prefix-icon="el-icon-key"></el-input>
            </el-col>
            <el-col :span="7">
              <img
                :src="imgUrl"
                alt
                style="height:39px;width:111px"
                @click="toggleImg"
                ref="toggle"
              />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item prop="checked">
          <el-checkbox v-model="logForm.checked">
            我已阅读并同意
            <el-link type="primary">用户协议</el-link>
            <span>和</span>
            <el-link type="primary">隐私条款</el-link>
          </el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login()">登录</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="right">
      <img src="@/assets/img/login_banner_ele.png" alt />
    </div>
  </div>
</template>

<script>
import { enter } from "@/api/login";
export default {
  name: "login",
  data() {
    const checkArgee = (rule, value, callback) => {
      if (!value) return callback(new Error("请勾选用户协议和隐私条款"));
      callback();
    };
    const checkPhone = (rule, value, callback) => {
      if (!/^1[3-9]\d{9}/.test(value))
        return callback(new Error("请输入正确的手机号"));
      callback();
    };
    return {
      logForm: {
        phone: "",
        password: "",
        code: "",
        checked: false
      },
      imgUrl: "http://127.0.0.1/heimamm/public/captcha?type=login",
      loginRules: {
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validator: checkPhone }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 12, message: "密码长度为6~12个字符" }
        ],
        code: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 4, max: 4, message: "验证码长度为4" }
        ],
        checked: [{ validator: checkArgee }]
      }
    };
  },
  methods: {
    //获取验证码图片
    toggleImg() {
      this.$refs.toggle.src = `http://127.0.0.1/heimamm/public/captcha?type=login&${Date.now()}`;
    },
    //登录
    login() {
      this.$refs.logForm.validate(async valid => {
        if (valid) {
          try {
            const res = await enter(this.logForm);
            console.log(res);
            if (res.data.code == 200) {
              this.$message.success("登录成功");
              localStorage.setItem("token", res.data.data.token);
            }
          } catch (e) {
            console.log(e);

            this.$message.error("手机号、密码或验证码有误");
          }
        } else {
          this.$message.warning("请正确输入");
        }
      });
    }
  }
};
</script>

<style lang="less">
.container-login {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100%;
  background: linear-gradient(225deg, #1493fa, #01c6fa);
  .left {
    width: 478px;
    height: 550px;
    background: #f5f5f5;
    padding: 47px;
    .logo {
      img {
        width: 22px;
        height: 17px;
      }
      span {
        font-size: 22px;
        color: #0c0c0c;
      }
    }
    .form {
      margin-top: 30px;
      .el-button {
        width: 100%;
      }
    }
  }
}
.el-form-item__content {
  line-height: 20px;
}
</style>