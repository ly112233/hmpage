<template>
  <div class="login">
    <div class="left">
      <div class="logo">
        <img src="@/assets/img/loginLogo.png" alt />
        <span>黑马面面</span>
        <span class="symbol">|</span>
        <span>用户登录</span>
      </div>
    </div>
    <img src="@/assets/img/login_banner_ele.png" alt />
  </div>
</template>
<script>
export default {};
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
    padding: 47px 42px;

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
  }
}
</style>