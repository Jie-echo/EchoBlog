<template>
  <div class="talk">
    <div class="talk-left">
      <div class="time">
        2021.01.08 搭建项目
      </div>
      <div>
        <p class="foreword">欢迎大家畅所欲言：</p>
        <ul>
          <li>可以是您发现文章有错别字、语句不通或者逻辑不正确的地方</li>
          <li>可以是您对博客中某篇文章有不同见解</li>
          <li>可以是您对博客有更好的建设性意见</li>
          <li>可以是您的经验与感悟，或者工作中遇到的困惑</li>
          <li>...</li>
        </ul>
        <p class="foreword">说明：</p>
        <ul>
          <li>富强、民主、文明、和谐</li>
          <li>自由、平等、公正、法治</li>
          <li>爱国、敬业、诚信、友善</li>
          <li>留言过程希望大家文明用语，感谢配合</li>
        </ul>
      </div>
    </div>
    <div class="talk-right">
      <div>
        打赏博主
      </div>
      <div style="margin: 10px 10px">
        <img src="../../assets/pay.jpg" style="width:180px;height:180px" />
      </div>
      <div style="margin-bottom: 6px">
        博客资源
      </div>
      <div class="share-icon">
        <div @mouseenter="overIcon('zhiUrl')" @mouseleave="outIcon('zhiUrl')">
          <a href=""><img :src="zhiUrl"/></a>
        </div>
        <div @mouseenter="overIcon('gitUrl')" @mouseleave="outIcon('gitUrl')">
          <a href=""><img :src="gitUrl"/></a>
        </div>
        <div @mouseenter="overIcon('weiUrl')" @mouseleave="outIcon('weiUrl')">
          <a href=""><img :src="weiUrl"/></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      zhiUrl: require("../../assets/zhihu.png"),
      weiUrl: require("../../assets/weibo.png"),
      gitUrl: require("../../assets/github.png")
    };
  },
  methods: {
    //鼠标移入分享链接图片
    overIcon(data) {
      if (data == "zhiUrl") {
        this.zhiUrl = require("../../assets/zhihuLight.png");
      } else if (data == "gitUrl") {
        this.gitUrl = require("../../assets/githubLight.png");
      } else if (data == "weiUrl") {
        this.weiUrl = require("../../assets/weiboLight.png");
      }
    },
    //鼠标移出分享链接图片
    outIcon(data) {
      if (data == "zhiUrl") {
        this.zhiUrl = require("../../assets/zhihu.png");
      } else if (data == "gitUrl") {
        this.gitUrl = require("../../assets/github.png");
      } else if (data == "weiUrl") {
        this.weiUrl = require("../../assets/weibo.png");
      }
    }
  }
};
</script>

<style lang="less" scoped>
.talk {
  padding-left: 300px;
  padding-top: 6px;
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
  width: 60%;
}
.talk-right {
  width: 40%;
  margin-top: 32px;
  margin-left: 10px;
}
.share-icon {
  display: flex;
  margin: 10px;
  justify-content: space-between;
  width: 120px;
  margin-left: 40px;
  img {
    width: 25px;
    height: 25px;
    cursor: pointer;
  }
}
</style>
