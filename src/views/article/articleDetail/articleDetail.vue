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
              <div>
                <a-icon type="eye" /> 浏览次数:
                {{ articleObj.read_num ? articleObj.read_num : 0 }} 次
              </div>
            </div>
            <div class="body container" v-html="html" v-highlight>
              {{ html }}
            </div>
          </div>
        </div>
      </a-col>
      <a-col :span="4">
        <div>
          <div class="edit" @click="toEdit" v-if="showEdit">
            编辑
          </div>
          <div class="edit del" v-if="showEdit">
            <a-popconfirm
              title="确定要删除此文章?"
              ok-text="Yes"
              cancel-text="No"
              @confirm="handleDel"
            >
              删除</a-popconfirm
            >
          </div>
        </div>
      </a-col>
    </a-row>
    <a-back-top :visibilityHeight="100">
      <div class="ant-back-top-inner">
        UP
      </div>
    </a-back-top>
  </div>
</template>

<script>
import marked from "marked";
import "mavon-editor/dist/css/index.css";
marked.setOptions({
  // 他是底层的东西，一般不改，比如 **我是粗体** 解析成<strong>我是粗体</strong>，如果你不满意就可以改变他的结构，比较麻烦。
  renderer: new marked.Renderer(),
  // 默认：true， 启用Github的风格
  gfm: true,
  // 默认：true，启动表格， 前提必须gfm: true,
  tables: true,
  // 默认：false，启用回车换行，前提必须gfm: true,
  breaks: false,
  // 默认：false，尽可能地兼容 markdown.pl的晦涩部分。不纠正原始模型任何的不良行为和错误。
  pedantic: false,
  // 默认：false，对输出进行过滤（清理），将忽略任何已经输入的html代码（标签）
  sanitize: false,
  // 默认：true，使用比原生markdown更时髦的列表。 旧的列表将可能被作为pedantic的处理内容过滤掉
  smartLists: true,
  // 默认：false，使用更为时髦的标点，比如在引用语法中加入破折号。
  smartypants: false
});
export default {
  mounted() {
    let id = this.$route.query.id;
    this.articleId = id;
    this.getarticleDetail(id);
  },
  data() {
    return {
      articleObj: {}, //文章内容
      showEdit: false, //是否能够对当前文章进行编辑
      articleId: "",
      html: ""
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
          this.articleObj.content = marked(this.articleObj.content || "");
          this.html = marked(this.articleObj.content || "");
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
    handleDel() {
      this.$axios({
        method: "post",
        url: "/api/postDelArticleById",
        data: {
          articleId: this.articleId
        }
      }).then(res => {
        if (res.data.code == 200) {
          this.$message.success("删除成功");
          this.goBack();
        } else {
          this.$message.error("删除失败");
          this.goBack();
        }
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
.del {
  color: lightpink;
}
</style>
