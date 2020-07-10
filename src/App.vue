<template>
<div class="app">
    <router-view></router-view>
</div>
</template>
<script>
export default {
}
</script>

<style lang='less'>
 * {
    margin: 0;
    padding: 0;
    /* css3盒子模型 */
    box-sizing: border-box;
    list-style: none;
}
html,body,.app{
    width: 100%;
    height: 100%;
}
img {
    /* border 0 照顾低版本浏览器 如果 图片外面包含了链接会有边框的问题 */
    border: 0;
    /* 取消图片底侧有空白缝隙的问题 */
    vertical-align: middle
}
em,
i {
    font-style: normal
}
button,
input {
    /* "\5B8B\4F53" 就是宋体的意思 这样浏览器兼容性比较好 */
    font-family: Microsoft YaHei, Heiti SC, tahoma, arial, Hiragino Sans GB, "\5B8B\4F53", sans-serif;
    /* 默认有灰色边框我们需要手动去掉 */
    border: 0;
    outline: none;
}
</style>