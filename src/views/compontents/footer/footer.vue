<template>
  <div class="footer">
    <div>{{ userName }}的个人博客</div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.userName = localStorage.getItem("user");
  },
  data() {
    return {
      userName: ""
    };
  }
};
</script>

<style lang="less" scoped>
.footer {
  position: absolute;
  bottom: 30px;
  left: 50%;
}
</style>
