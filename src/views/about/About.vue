<template>
  <div class="about">
    <div class="talk-left">
      <div class="time">
        关于博主
      </div>
      <div>
        <p class="foreword">个人简介</p>
        <ul>
          <li>学校：内江师范学院</li>
          <li>专业：物联网工程</li>
          <li>从业：前端工程师</li>
          <li>技术栈：React、Vue</li>
          <li>爱好：健身、敲敲代码</li>
          <li>...</li>
        </ul>
        <p class="foreword">博客说明：</p>
        <ul>
          <li>
            Echo是一个前端工程师，热爱前端技术、喜欢分享自己总结的前端知识点。
          </li>
          <li>
            将自己‘搬砖’过程中遇到问题的解决方案记录并分享。
          </li>
        </ul>
      </div>
    </div>
    <div class="talk-right">
      <div>
        加V
      </div>
      <div style="margin: 10px 10px">
        <img src="../../assets/pay.jpg" style="width:180px;height:180px" />
      </div>
      <div style="margin-bottom: 6px">
        博客资源
      </div>
      <div class="share-icon">
        <div @mouseenter="overIcon('zhiUrl')" @mouseleave="outIcon('zhiUrl')">
          <a href="https://www.zhihu.com/people/meng-96-26" target="_blank"
            ><img :src="zhiUrl"
          /></a>
        </div>
        <div @mouseenter="overIcon('gitUrl')" @mouseleave="outIcon('gitUrl')">
          <a href="https://github.com/1609790272/EchoBlog" target="_blank"
            ><img :src="gitUrl"
          /></a>
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
.about {
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
  min-width: 600px;
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
