<template>
  <el-dialog :visible="isShow" width="600px" class="register" :show-close="false">
    <div slot="title" class="register_title">用户注册</div>

    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="头像" prop="avatar">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          name="image"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="昵称" prop="username">
        <el-input v-model="ruleForm.username"></el-input>
      </el-form-item>

      <el-form-item label="邮箱" prop="email">
        <el-input v-model="ruleForm.email"></el-input>
      </el-form-item>

      <el-form-item label="手机" prop="phone">
        <el-input v-model="ruleForm.phone"></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password"></el-input>
      </el-form-item>

      <el-form-item label="图形码" required>
        <el-col :span="14">
          <el-form-item prop="code">
            <el-input v-model="ruleForm.code"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="9" :offset="1">
          <img class="register-code" :src="registerUrl" @click="imgclick" ref="toggle" alt />
        </el-col>
      </el-form-item>

      <el-form-item label="验证码" required>
        <el-col :span="14">
          <el-form-item prop="rcode">
            <el-input v-model="ruleForm.rcode"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="9" :offset="1">
          <el-button @click="getRcode" :disabled="tolalTime<5">
            获取用户验证码
            <span v-if="tolalTime!=5">{{tolalTime+1}}秒</span>
          </el-button>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button @click="isShow = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
// import axios from "axios";
import { getrcode,registerUser} from "@/api/login.js";
export default {
  watch: {
    isShow(newVal){
      if(newVal == false){
        this.$refs.ruleForm.resetFields()
        this.imageUrl=''
      }
    }
  },
  data() {
    var checkAge = (rule, value, callback) => {
      if (!/^1[3456789]\d{9}$/.test(value))
        return callback(new Error("手机号码格式不对"));
      callback();
    };
    var postbox = (rule, value, callback) => {
      if (!/^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/.test(value))
        return callback(new Error("邮箱格式不对"));
      callback();
    };
    return {
      tolalTime: 5,
      isShow: false,
      registerUrl: process.env.VUE_APP_URL + "/captcha?type=sendsms",
      uploadUrl: process.env.VUE_APP_URL + "/uploads",
      ruleForm: {
        //   imageUrl:'',
        avatar: "", //是	string	头像地址
        username: "", //是	string	用户名
        email: "", //是	string	邮箱
        phone: "", //是	string	手机号
        password: "", //是	string	密码
        code: "", //是	string	图形码
        rcode: "" //是	string	验证码
      },
      imageUrl: "",
      rules: {
        avatar: [
          { required: true, message: "请选择一张头像", trigger: "blur" }
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        username: [
          { required: true, message: "用户名", trigger: "blur" },
          { min: 3, max: 15, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        email: [
          { required: true, message: "邮箱", trigger: "blur" },
          { validator: postbox }
        ],
        phone: [
          { required: true, message: "手机号", trigger: "blur" },
          { validator: checkAge }
        ],
        password: [
          { required: true, message: "密码", trigger: "blur" },
          { min: 3, max: 16, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        code: [
          { required: true, message: "图形码", trigger: "blur" },
          { min: 3, max: 15, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        rcode: [
          { required: true, message: "验证码", trigger: "blur" },
          { min: 3, max: 15, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ]
      }
    };
  },

  methods: {
    handleAvatarSuccess(res) {
      console.log(res);
      this.ruleForm.avatar = res.data.file_path;
      this.$refs.ruleForm.validateField(["avatar"]);
      this.imageUrl = process.env.VUE_APP_URL + "/" + res.data.file_path;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG或png 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // cancel() {
    //   this.$refs.ruleForm.clearValidate();
    //   this.$refs.ruleForm.resetFields();
    //   this.ruleForm.avatar.resetFields();
    // },
    //确定按钮点击
    submit() {
      this.$refs.ruleForm.validate(result => {
        if (result) {
          registerUser(this.ruleForm).then(res=>{
            console.log(res);
          if (res.code==200) {
            this.$message.success("注册成功");
            this.isShow=false;

          }
            
          })
        } else {
          this.$message.error("验证失败");
        }
      });
    },

    resetForm() {
      (this.imageUrl = ""),
        (this.ruleForm.avatar = ""),
        this.$refs.ruleForm.resetFields();
    },
    // 点击换验证码图片
    imgclick() {
      this.$refs.toggle.src =
        process.env.VUE_APP_URL +
        "/captcha?type=sendsms&t" +
        Math.random() * 111;
    },
    getRcode() {
      let num = 0;
      this.$refs.ruleForm.validateField(["phone", "code"], errorMessage => {
        if (errorMessage == "") {
          num++;
        }
        if (num == 2) {
          // axios({
          //   url: process.env.VUE_APP_URL + "/sendsms",
          //   method: "post",
          //   data: {
          //     code: this.ruleForm.code,
          //     phone: this.ruleForm.phone
          //   },
          //   withCredentials: true

          this.tolalTime--;
          let _interval = setInterval(() => {
            this.tolalTime--;
            if (this.tolalTime <= -1) {
              clearInterval(_interval);
              this.tolalTime = 5;
            }
          }, 1000);

          getrcode({
            code: this.ruleForm.code,
            phone: this.ruleForm.phone
          }).then(res => {
            console.log(res);
            this.$message.success(res.data.captcha + "");
          });
        }
      });
    }
  }
};
</script>
<style lang='less'>
.register_title {
  height: 52px;
  background: linear-gradient(to right, #02c4fa, #1394fa);
  text-align: center;
  line-height: 52px;
  color: #fff;
}
.el-dialog__header {
  padding: 0;
}
.register_footer {
  text-align: center;
}
.avatar-uploader {
  width: 178px;
  margin: 0 auto;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.register-code {
  width: 100%;
  height: 40px;
}
</style>