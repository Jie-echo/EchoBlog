<template>
  <div class="out">
    <div class="head"></div>
    <a-row>
      <a-col :span="4"></a-col>
      <a-col :span="16">
        <div class="content">
          <div class="title">
            <div>文章详情</div>
            <div><a-icon type="arrow-left" @click="goBack" /></div>
          </div>
          <div class="content-div">
            <div class="content-title">{{ articleObj.title }}</div>
            <div class="content-header">
              <div><a-icon type="user" /> 作者：{{ articleObj.author }}</div>
              <div>
                <a-icon type="history" /> 发布时间: {{ articleObj.add_time }}
              </div>
              <div><a-icon type="eye" /> 浏览次数: 3 次</div>
            </div>
            <div class="body" v-html="articleObj.content">
              {{ articleObj.content }}
            </div>
          </div>
        </div>
      </a-col>
      <a-col :span="4">
        <div class="edit" @click="toEdit" v-if="showEdit">
          编辑
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  mounted() {
    let id = this.$route.query.id;
    this.getarticleDetail(id);
  },
  data() {
    return {
      articleObj: {}, //文章内容
      showEdit: false //是否能够对当前文章进行编辑
    };
  },
  methods: {
    getarticleDetail(id) {
      this.$axios({
        method: "get",
        url: "/api/getArticleDetail",
        params: {
          id
        }
      }).then(res => {
        if (res.data.code == 200) {
          this.articleObj = res.data.data[0];
          this.articleObj.add_time = this.formatTime(this.articleObj.add_time);
          let user_id = localStorage.getItem("id");
          if (user_id == this.articleObj.user_id) {
            this.showEdit = true;
          } else {
            this.showEdit = false;
          }
        } else {
          this.$message.error("查询失败");
        }
      });
    },
    goBack() {
      this.$router.go(-1);
    },
    toEdit() {
      this.$router.push({
        path: "/wirteArticle",
        query: { id: this.articleObj.id }
      });
    },
    //日期格式化
    formatTime: function(val) {
      if (!val) return "- -";
      var date = new Date(val);
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      month = month < 10 ? "0" + month : month;
      var day = date.getDate();
      day = day < 10 ? "0" + day : day;
      var h = date.getHours();
      h = h < 10 ? "0" + h : h;
      var m = date.getMinutes();
      m = m < 10 ? "0" + m : m;
      return year + "-" + month + "-" + day + " " + h + ":" + m;
    }
  }
};
</script>

<style lang="less" scoped>
.out {
  position: relative;
  background: #f6f6f6;
  //height:100vh;
  height: 980px;
}
.head {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 430px;
  background-color: #363636;
}
.content {
  position: absolute;
  z-index: 1;
  font-size: 16px;
  .title {
    color: #339999;
    font-size: 32px;
    font-weight: bold;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
  }
  .content-div {
    background: #fff;
    //width: 50vw;
    width: 60vw;
    padding: 30px;
    border-radius: 16px;
    min-height: 500px;
    padding-bottom: 50px;
  }
  .content-title {
    font-size: 1.146vw;
    font-weight: 700;
    text-align: center;
    color: #339999;
    margin-bottom: 1vw;
  }
  .content-header {
    display: flex;
    justify-content: space-between;
    font-size: 0.833vw;
    color: #969696;
    font-weight: 400;
  }
  .body {
    padding: 1.302vw 1.563vw;
    font-size: 14px;
  }
}
.edit {
  color: #999;
  font-size: 20px;
  font-weight: bold;
  margin-top: 40px;
  cursor: pointer;
}
</style>
