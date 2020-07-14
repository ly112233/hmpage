<template>
  <el-container class="layout">
    <el-header class="Header" style="background-color: #fff">
      <ul class="layout-ul">
        <li class="el-icon-s-fold t20" @click="collapse=!collapse"></li>
        <li>
          <img src="@/assets/img/layout-logo.png" alt />
        </li>
        <li class="t21">黑马面面</li>
        <li class="t1"></li>
        <li>
          <img v-if="userInfo!=''" class="layout-img" :src="baseUrl+'/'+userInfo.avatar" alt />
        </li>
        <li class="t22">{{userInfo.username}},您好</li>
        <li>
          <el-button type="primary" @click="quit">退出</el-button>
        </li>
      </ul>
    </el-header>

    <el-container>
      <el-aside width="auto" class="left">
        <el-menu :default-active="$route.path" class="el-menu-vertical-demo" :router="true" :collapse='collapse'>
          <el-menu-item index="/chart">
            <i class="el-icon-pie-chart"></i>
            <span slot="title">数据概览</span>
          </el-menu-item>
          <el-menu-item index="/userList">
            <i class="el-icon-user"></i>
            <span slot="title">用户列表</span>
          </el-menu-item>
          <el-menu-item index="/question">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">题库列表</span>
          </el-menu-item>
          <el-menu-item index="/business">
            <i class="el-icon-office-building"></i>
            <span slot="title">企业列表</span>
          </el-menu-item>
          <el-menu-item index="/subject">
            <i class="el-icon-notebook-2"></i>
            <span slot="title">学科列表</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main class="right" style="background-color: #e8e9ec">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import { grtUserInfo, logout } from "@/api/layout.js";
import { removeLocal } from "@/utils/local.js";
export default {
  data() {
    return {
      baseUrl: process.env.VUE_APP_URL,
      userInfo: "",
      collapse: false
    };
  },
  created() {
    grtUserInfo().then(res => {
      console.log(res);
      this.userInfo = res.data;
    });
  },
  // 退出登录
  methods: {
    quit() {
      logout().then(() => {
        this.$message.success("退出成功");
        removeLocal();
        this.$router.push("/login");
      });
    }
  }
};
</script>
<style lang='less'>
.layout {
  height: 100%;
  .Header {
    .layout-ul {
      display: flex;
      align-items: center;
      padding-top: 7px;
    }
    .t1 {
      flex: 1;
    }
    .t20 {
      font-size: 20px;
      margin-right: 15px;
    }
    .t21 {
      font-size: 22px;
      font-family: Microsoft YaHei Regular, Microsoft YaHei Regular-Regular;
      font-weight: bold;
      text-align: left;
      color: #49a1ff;
      letter-spacing: 1px;
      margin-left: 15px;
    }
    .t22 {
      font-size: 14px;
      font-family: Microsoft YaHei Regular, Microsoft YaHei Regular-Regular;
      font-weight: bold;
      text-align: left;
      color: #636363;
      letter-spacing: 0px;
      margin: 0 15px;
    }
    .layout-img {
      width: 43px;
      height: 43px;
    }
  }
  .left {
    background-color: #fff;
  }
  .Header {
    background-color: #e8e9ec;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    // min-height: 400px;
  }
}
</style>