<template>
  <div class="home" style="min-width:700px">
    <div class="head">
      <!-- 标签头部 -->
      <div class="nav">
        <div class="left">
          <font>{{ userName }}个人博客</font>
        </div>
        <div class="right">
          <a-menu v-model="current" mode="horizontal" @click="changeTitle">
            <a-menu-item v-for="item in menuPath" :key="item.path">
              <router-link :to="item.path" style="color:#fff">
                <span class="lable">{{ item.title }}</span>
              </router-link>
            </a-menu-item>
          </a-menu>
          <!-- <div>
            <router-link to="/index" style="color:#fff">
              <span @click="changeTitle('1')" class="lable">首页</span>
            </router-link>
          </div>
          <div>
            <router-link to="/article">
              <span @click="changeTitle('2')" class="lable">
                文章
              </span>
            </router-link>
          </div>
          <div>
            <router-link to="/lable">
              <span @click="changeTitle('3')" class="lable">标签</span>
            </router-link>
          </div>
          <div>
            <router-link to="/talk">
              <span @click="changeTitle('6')" class="lable">留言</span>
            </router-link>
          </div>
          <div>
            <router-link to="/time">
              <span @click="changeTitle('4')" class="lable">时间戳</span>
            </router-link>
          </div>
          <div>
            <router-link to="/about">
              <span @click="changeTitle('5')" class="lable">关于</span>
            </router-link>
          </div> -->
        </div>
      </div>
      <div class="nav-content">
        {{ title }}
      </div>
      <div class="nav-content-sub">
        {{ subTitle }}
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
  mounted() {
    this.userName = localStorage.getItem("user");
    let pathSrc = window.location.pathname;

    if (pathSrc == "/index") {
      this.title = this.userName;
    }
    this.current = [pathSrc];
    this.changeText(pathSrc);
  },
  data() {
    return {
      title: "Echo", //标题
      subTitle: "Keep on going never give up", //子标题
      userName: "",
      current: ["1"],
      menuPath: [
        {
          title: "首页",
          path: "/index",
          id: "1"
        },
        {
          title: "文章",
          path: "/article",
          id: "2"
        },
        {
          title: "标签",
          path: "/lable",
          id: "3"
        },
        {
          title: "留言",
          path: "/talk",
          id: "4"
        },
        {
          title: "时间戳",
          path: "/time",
          id: "5"
        },
        {
          title: "关于",
          path: "/about",
          id: "6"
        }
      ]
    };
  },
  methods: {
    changeTitle(e) {
      console.log(e);
      let index = e.key;
      this.current = index;
      this.changeText(index);
    },

    changeText(index) {
      if (index == "/index") {
        this.title = this.userName;
        this.subTitle = "Keep on going never give up";
      } else if (index == "/article") {
        this.title = "Article";
        this.subTitle = "Here is the information you need";
      } else if (index == "/lable") {
        this.title = "Category";
        this.subTitle = "Sow nothing, reap nothing";
      } else if (index == "/talk") {
        this.title = "Talk";
        this.subTitle = "技术交流区";
      } else if (index == "/time") {
        this.title = "Time";
        this.subTitle = "Record bit by bit";
      } else if (index == "/about") {
        this.title = "About";
        this.subTitle = "All things in their being are good for something";
      }
    }
  }
};
</script>
<style scoped lang="less">
.ant-menu {
  background-color: #363636;
}
.ant-menu-item {
  border-bottom: 2px solid #363636 !important;
}
.ant-menu-item-selected {
  border-bottom: 2px solid #339999 !important;
}
.head {
  width: 100%;
  height: 360px;
  color: #fff;
  background-color: #363636;
}
.nav {
  display: flex;
  justify-content: space-between;
  padding: 16px 16px 16px 32px;
  .left {
    display: flex;
    width: 65%;
    font-size: 18px;
    font-weight: bold;
  }
  .right {
    display: flex;
    width: 35%;
    min-width: 422px;
    font-size: 14px;
    font-weight: bold;
  }
  div {
    margin-right: 40px;
  }
}
.nav-content {
  margin-top: 120px;
  font-size: 72px;
  font-weight: bold;
  text-align: center;
}
.nav-content-sub {
  margin-top: 8px;
  font-size: 18px;
  text-align: center;
}
a {
  text-decoration: none;
}
.lable {
  color: #fff;
}
.lable:hover {
  color: #339999;
}
.lable:checked {
  color: #339999;
}
</style>
