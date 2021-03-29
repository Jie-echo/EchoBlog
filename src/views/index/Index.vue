<template>
  <div class="index">
    <div>
      <a-row :gutter="16">
        <a-col :span="4">
          <div class="left">
            <div style="margin-bottom: 20px;margin-right: 80px">
              <a-button type="primary" @click="goWrite">
                写文章
              </a-button>
            </div>
            <div>
              <a-input-search
                placeholder="搜索文章"
                style="width: 160px"
                @search="onSearch"
              />
            </div>
          </div>
        </a-col>
        <a-col :span="18" class="col-width">
          <div class="container-out">
            <div class="layout-flex-col">
              <div v-if="articleList.length !== 0">
                <div
                  class="container-inner"
                  v-for="item in articleList"
                  :key="item.id"
                >
                  <div class="content">
                    <div class="layout-flex-bet">
                      <div>
                        <div
                          class="title-text"
                          @click="toArticleDetail(item.id)"
                        >
                          {{ item.title }}
                        </div>
                        <div class="remark-text">{{ item.ramark }}</div>
                      </div>
                      <div class="content-img">
                        <img
                          :src="item.cover"
                          width="60"
                          height="60"
                          v-if="item.cover"
                        />
                      </div>
                    </div>
                    <div class="layout-flex-bet foot-text">
                      <div>
                        <a-icon type="user" /> {{ item.author }}
                        <a-icon type="tags" style="margin-left:20px" />
                        <span v-if="item.category == 1">
                          JavaScript
                        </span>
                        <span v-if="item.category == 2">
                          React
                        </span>
                        <span v-if="item.category == 3">
                          Vue
                        </span>
                        <span v-if="item.category == 4">
                          CSS
                        </span>
                      </div>
                      <div>
                        {{ item.add_time }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="container-inner" v-else>
                <div class="content-no-data">
                  <div>
                    <img
                      src="../../assets/noData.png"
                      width="100"
                      height="100"
                      alt=""
                    />
                  </div>
                  <div class="no-data-text">
                    暂无文章
                  </div>
                  <div class="go-write" @click="goWrite">
                    去创作? -->
                  </div>
                </div>
              </div>
            </div>
            <div class="float-left">
              <div class="left-title">框架类库导航</div>
              <!-- React -->
              <a href="https://reactjs.org/" target="_blank">
                <div class="left-div-out">
                  <div>
                    <div class="title">
                      <img
                        width="40"
                        height="40"
                        class="loaded"
                        src="../../assets/React.png"
                      />
                      React
                    </div>
                    <div class="footer-text">
                      用于构建用户界面的Javascript库
                    </div>
                  </div>
                </div>
              </a>
              <!-- Vue -->
              <a href="https://cn.vuejs.org/" target="_blank">
                <div class="left-div-out">
                  <div>
                    <div class="title">
                      <img
                        width="40"
                        height="40"
                        class="loaded"
                        src="../../assets/Vue.png"
                      />
                      Vue
                    </div>
                    <div class="footer-text">
                      构建数据驱动的web界面的渐进式框架
                    </div>
                  </div>
                </div>
              </a>
              <!-- jQuery -->
              <a href="https://www.jquery123.com/" target="_blank">
                <div class="left-div-out">
                  <div>
                    <div class="title">
                      <img
                        width="40"
                        height="40"
                        class="loaded"
                        src="../../assets/jQuery.png"
                      />
                      jQuery
                    </div>
                    <div class="footer-text">
                      优秀的JavaScript代码库
                    </div>
                  </div>
                </div>
              </a>
              <!-- Bootstrap -->
              <a href="https://www.bootcss.com/" target="_blank">
                <div class="left-div-out">
                  <div>
                    <div class="title">
                      <img
                        width="40"
                        height="40"
                        class="loaded"
                        src="../../assets/Bootstrap.png"
                      />
                      Bootstrap
                    </div>
                    <div class="footer-text">
                      基于HTML、CSS、JavaScript的前端框架
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </a-col>
        <a-col :span="2"></a-col>
      </a-row>
    </div>
    <div>
      <Footer />
    </div>
  </div>
</template>
<script>
import Footer from "../compontents/footer/footer.vue";
export default {
  components: { Footer },
  mounted() {
    let user_id = localStorage.getItem("id");
    this.$axios({
      method: "get",
      url: "/api/getArticleListById",
      params: { user_id }
    }).then(res => {
      this.articleList = res.data.data ? res.data.data : [];
    });
  },
  data() {
    return {
      articleList: [] //文章列表
    };
  },
  methods: {
    toArticleDetail(id) {
      this.$router.push({ name: "articleDetail", query: { id: id } });
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
    },
    //跳转写作页面
    goWrite() {
      this.$router.push({ path: "/wirteArticle" });
    }
  }
};
</script>
<style lang="less" scoped>
.index {
  background-color: #f6f6f6;
  padding-bottom: 40px;
  position: relative;
}
.left {
  margin-top: 20px;
  text-align: right;
  color: #999;
  cursor: pointer;
  font-size: 16px;
}
.left:hover {
  color: cadetblue;
  font-weight: bold;
}
.col-width {
  //min-width: 1100px;
  margin-top: 18px;
}
.content:hover {
  // border: 1px solid darkcyan;
}
.container-out {
  display: flex;
  justify-content: center;
  .container-inner {
    display: flex;
    .content {
      width: 810px;
      padding: 20px 30px;
      background-color: #fff;
      margin-bottom: 20px;
      border-radius: 8px;
      box-shadow: 1px 1px 1px #888888;
    }
  }
  .content-no-data {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 810px;
    height: 300px;
    padding: 20px 30px;
    background-color: #fff;
    margin-bottom: 20px;
    border-radius: 8px;
    box-shadow: 1px 1px 1px #888888;
    .no-data-text {
      margin-top: 18px;
      color: #999;
    }
    .go-write {
      margin-top: 40px;
      margin-left: 600px;
      color: cadetblue;
      cursor: pointer;
    }
    .go-write:hover {
      font-weight: bold;
    }
  }
  .left-title {
    font-size: 18px;
    padding: 12px 0 0 12px;
  }
  .float-left {
    width: 260px;
    margin: 0 10px 10px 10px;
    background-color: #fff;
    .left-div-out {
      width: 228px;
      height: 100px;
      margin: 18px 0 0 16px;
      padding: 10px;
      border-radius: 4px;
      border: 1px solid #e4ecf3;
      cursor: pointer;
      .title {
        font-weight: bold;
      }
      img {
        width: 40px;
        height: 40px;
      }
      .footer-text {
        padding-top: 10px;
        height: 35px;
        font-size: 12px;
        color: gray;
      }
    }
    .left-div-out:last-child {
      margin-bottom: 20px;
    }
    .left-div-out:hover {
      border: 2px solid darkcyan;
    }
  }
  .layout-flex-row {
    display: flex;
  }
  .layout-flex-col {
    display: flex;
    flex-direction: column;
  }
  .layout-flex-bet {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .content-head {
  }
  .content-foot {
  }
  .title-text {
    font-weight: 600;
    line-height: 1.5;
    font-size: 24px;
    margin-bottom: 15px;
    color: darkcyan;
    cursor: pointer;
  }
  .title-text:hover {
    color: #000;
  }
  .remark-text {
    font-weight: 600;
    line-height: 1.8;
    margin-bottom: 15px;
  }
  .content-img {
    width: 60px;
    height: 60px;
  }
  .foot-text {
    color: #999;
  }
}
</style>
