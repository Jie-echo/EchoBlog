<template>
  <div class="talk">
    <a-row :gutter="16" type="flex">
      <a-col :span="2"></a-col>
      <a-col :span="20" class="col-style">
        <div class="container">
          <div class="talk-left">
            <div class="time">
              2021.01.08 搭建项目
            </div>
            <div>
              <p class="foreword">说明：</p>
              <ul>
                <li>富强、民主、文明、和谐</li>
                <li>自由、平等、公正、法治</li>
                <li>爱国、敬业、诚信、友善</li>
                <li>留言过程希望大家文明用语，感谢配合</li>
              </ul>
            </div>
            <!-- 留言区 -->
            <div class="show-view-out">
              <div class="show-view">
                <h3>
                  留言：
                </h3>
                <a-divider type="horizontal" />
              </div>
              <div>
                <a-textarea
                  placeholder="请输入留言内容"
                  :rows="4"
                  v-model="remark"
                />
              </div>
              <div class="show-view-btn">
                <a-button @click="handleSub">提交</a-button>
              </div>
            </div>
            <!-- 留言展示区 -->
            <div></div>
          </div>
          <div class="talk-right">
            <div class="right-title">
              <h3>公告</h3>
            </div>
            <div>
              这里是孟杰的个人博客，总结自己在前端领域的所学
              分为原创文章板块，杂谈板块，收藏板块和留言板
              如果内容对您有所帮助，欢迎点赞评论
            </div>
            <div class="right-footer">
              联系我: 1609790272@qq.com
            </div>
          </div>
        </div>
      </a-col>
      <a-col :span="2"></a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  mounted() {
    let user_id = localStorage.getItem("id");
    this.user_id = user_id;
    this.getReviewList();
  },
  data() {
    return {
      remark: "", //留言内容
      remarkList: [], //回复列表
      user_id: "" //存储用户id
    };
  },
  methods: {
    //查询留言
    getReviewList() {
      this.$axios({
        method: "get",
        url: "/api/getRemarkList",
        params: {}
      }).then(res => {
        this.remarkList = res.data.data ? res.data.data : [];
      });
    },
    //提交留言
    handleSub() {
      let date = new Date();
      let params = {
        user_id: this.user_id,
        review: this.remark,
        add_date: date.toLocaleDateString()
      };
      this.$axios({
        method: "post",
        url: "/api/postCreateRemark",
        data: params
      }).then(res => {});
    }
  }
};
</script>

<style lang="less" scoped>
.talk {
  //   padding-top: 6px;
  //   display: flex;
}
.ant-input {
  border: 1px solid #fff;
}
.ant-input:hover {
  border: 1px solid #fff;
}
.container {
  display: flex;
}
.time {
  margin: 32px 0;
  font-size: 16px;
  font-style: italic;
}
.foreword {
  font-size: 18px;
  font-weight: bold;
}
li {
  letter-spacing: 2pt;
}
.talk-left {
  width: 750px;
}
.talk-right {
  margin: 30px;
  padding: 0 20px;
  width: 450px;
  height: 200px;
  line-height: 1.8em;
  box-shadow: 5px 5px 20px #e4e3e3;
  background-color: #fff;
  .right-title {
    margin-bottom: 10px;
    font-weight: bold;
  }
  .right-footer {
    padding: 10px 20px 20px;
    background-color: #f6f6f6;
    margin-top: 15px;
  }
}
.col-style {
  display: flex;
  align-content: center;
  justify-content: center;
}
.show-view-out {
  border: 1px solid #f0f0f0;
  border-radius: 4px;
  .show-view {
    margin-top: 10px;
    padding: 10px;
  }
  .show-view-btn {
    text-align: right;
    margin: 12px;
  }
}
</style>
