<template>
  <div class="index">
    <div class="category-header" v-if="isCategoryList">
      文章
    </div>
    <a-row :gutter="16">
      <a-col :span="3">
        <div class="left" v-if="!isCategoryList">
          <a-input-search
            placeholder="搜索文章"
            style="width: 160px"
            @search="onSearch"
            v-model="query"
          />
        </div>
        <div v-if="isCategoryList" class="outGoback">
          <a-icon type="arrow-left" @click="goBack" class="goback" />
        </div>
      </a-col>
      <a-col :span="20" class="col-width">
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
                      <div class="title-text" @click="toArticleDetail(item.id)">
                        {{ item.title }}
                      </div>
                      <div class="remark-text">{{ item.remark }}</div>
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
                      <a-icon type="tags" style="margin-left:20px;" />
                      <span @click="goArticeLable(item.category)">
                        {{ item.category_name }}
                      </span>
                    </div>
                    <div class="layout-flex-row">
                      <div>
                        {{ item.add_time | format("YYYY-MM-DD HH:mm:ss") }}
                      </div>
                      <div style="margin-left: 20px">
                        <a-icon type="eye" />
                        {{ item.read_num ? item.read_num : 0 }} 次
                      </div>
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
            <div class="left-title">推荐书籍导航</div>
            <!-- 深入React技术栈 -->
            <a href="https://book.douban.com/subject/26918038/" target="_blank">
              <div class="left-div-out">
                <div>
                  <div class="title">
                    <img
                      width="40"
                      height="40"
                      class="loaded"
                      src="https://img9.doubanio.com/view/subject/s/public/s29162154.jpg"
                    />
                    深入React技术栈
                  </div>
                  <div class="footer-text">
                    前端组件化主流解决方案，一本书玩转React“全家桶”
                  </div>
                </div>
              </div>
            </a>
            <!-- JavaScript高级程序设计（第4版） -->
            <a href="https://book.douban.com/subject/35175321/" target="_blank">
              <div class="left-div-out">
                <div>
                  <div class="title">
                    <img
                      width="40"
                      height="40"
                      class="loaded"
                      src="https://img9.doubanio.com/view/subject/s/public/s33703494.jpg"
                    />
                    JavaScript高级程序设计（第4版）
                  </div>
                  <div class="footer-text">
                    深入地介绍了JavaScript开发者必须掌握的前端开发技术
                  </div>
                </div>
              </div>
            </a>
            <!-- JavaScript设计模式与开发实践 -->
            <a href="https://book.douban.com/subject/26382780/" target="_blank">
              <div class="left-div-out">
                <div>
                  <div class="title">
                    <img
                      width="40"
                      height="40"
                      class="loaded"
                      src="https://img9.doubanio.com/view/subject/s/public/s28065006.jpg"
                    />
                    JavaScript设计模式与开发实践
                  </div>
                  <div class="footer-text">
                    教会你如何把经典的设计模式应用到JavaScript语言中
                  </div>
                </div>
              </div>
            </a>
            <!-- Python编程 -->
            <a href="https://book.douban.com/subject/26829016/" target="_blank">
              <div class="left-div-out">
                <div>
                  <div class="title">
                    <img
                      width="40"
                      height="40"
                      class="loaded"
                      src="https://img9.doubanio.com/view/subject/s/public/s28891775.jpg"
                    />
                    Python编程
                  </div>
                  <div class="footer-text">
                    一本针对所有层次的Python 读者而作的Python 入门书
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </a-col>
      <a-col :span="1"></a-col>
    </a-row>
    <a-back-top :visibilityHeight="100">
      <div class="ant-back-top-inner">
        UP
      </div>
    </a-back-top>
  </div>
</template>
<script>
export default {
  mounted() {
    console.log(this.$route.query);
    if (this.$route.query.lableId) {
      let lableId = this.$route.query.lableId;
      this.isCategoryList = true;
      this.findCategoryArticleList(lableId);
    } else {
      this.getArticleList();
      this.isCategoryList = false;
    }
  },
  data() {
    return {
      articleList: [], //文章列表
      query: "", // 模糊搜索
      isCategoryList: false //分类文章
    };
  },
  methods: {
    //文章列表
    getArticleList() {
      this.$axios({
        method: "get",
        url: "/api/getArticleList",
        params: {
          query: this.query
        }
      }).then(res => {
        this.articleList = res.data.data ? res.data.data : [];
      });
    },
    onSearch() {
      this.getArticleList();
    },
    toArticleDetail(id) {
      this.$router.push({ name: "articleDetail", query: { id: id } });
    },
    //跳转写作页面
    goWrite() {
      this.$router.push({ path: "/wirteArticle" });
    },
    //搜索索引标签
    goArticeLable(id) {
      let lableId = id;
      this.$router.push({ path: "/article/category", query: { lableId } });
    },
    //标签类列表
    getCategoryArticleList() {},
    //查询当前分类文章
    findCategoryArticleList(lableId) {
      let category = lableId;
      this.$axios({
        method: "get",
        url: "/api/getArticleList",
        params: {
          category
        }
      }).then(res => {
        this.articleList = res.data.data ? res.data.data : [];
      });
    },
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>
<style lang="less" scoped>
#components-back-top-demo-custom .ant-back-top {
  bottom: 100px;
}
#components-back-top-demo-custom .ant-back-top-inner {
  height: 40px;
  width: 40px;
  line-height: 40px;
  border-radius: 4px;
  background-color: #1088e9;
  color: #fff;
  text-align: center;
  font-size: 20px;
}
.index {
  background-color: #f6f6f6;
  padding-bottom: 40px;
  .category-header {
    height: 100px;
    line-height: 100px;
    text-align: center;
    background-color: #363636;
    color: #fff;
    font-weight: bold;
    font-size: 18px;
  }
}
.col-width {
  //min-width: 1100px;
  margin-top: 18px;
}
.left {
  margin: 18px 0 0 80px;
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
      height: 110px;
      margin: 18px 0 0 16px;
      padding: 10px;
      border-radius: 4px;
      border: 1px solid #e4ecf3;
      cursor: pointer;
      .title {
        font-weight: bold;
        width: 200px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      img {
        width: 40px;
        height: 40px;
      }
      .footer-text {
        padding-top: 10px;
        height: 60px;
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
    span {
      cursor: pointer;
    }
  }
}
.outGoback {
  position: relative;
  margin-top: 18px;
  .goback {
    font-size: 18px;
    color: #339999;
    cursor: pointer;
    position: absolute;
    right: 0;
  }
}
</style>
