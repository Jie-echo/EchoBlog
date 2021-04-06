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
        </div>
        <div class="drop-out" @click="dropOut">
          <svg
            t="1617289549919"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="2037"
            width="30"
            height="30"
          >
            <path
              d="M467.8656 453.632a48.725333 48.725333 0 0 0 88.098133 0s33.262933-70.2464 71.0144-150.357333c34.338133-71.867733 71.918933-153.088 93.4912-197.632a35.9424 35.9424 0 0 1 50.875734-15.803734c193.877333 116.445867 286.225067 347.8016 225.757866 565.589334C936.635733 873.2672 738.2016 1024 512 1024S87.381333 873.250133 26.897067 655.445333C-33.570133 437.640533 58.7776 206.2848 252.654933 89.838933a35.976533 35.976533 0 0 1 50.688 15.803734l93.4912 197.632 71.031467 150.357333z m23.722667-165.2736l-47.445334-192.238933A81.527467 81.527467 0 0 1 467.848533 16.725333a66.389333 66.389333 0 0 1 88.098134 0 81.527467 81.527467 0 0 1 23.722666 79.394134l-47.445333 192.238933a21.4016 21.4016 0 0 1-40.6528 0z"
              fill="#00A99D"
              p-id="2038"
            ></path>
          </svg>
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
      current: ["/index"],
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
        // {
        //   title: "时间戳",
        //   path: "/time",
        //   id: "5"
        // },
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
      switch (index) {
        case "/index":
          this.title = this.userName;
          this.subTitle = "Keep on going never give up";
          break;
        case "/article":
          this.title = "Article";
          this.subTitle = "Here is the information you need";
          break;
        case "/lable":
          this.title = "Category";
          this.subTitle = "Sow nothing, reap nothing";
          break;
        case "/talk":
          this.title = "Talk";
          this.subTitle = "Say Something";
          break;
        // case "/time":
        //   this.title = "Time";
        //   this.subTitle = "Record bit by bit";
        //   break;
        case "/about":
          this.title = "About";
          this.subTitle = "All things in their being are good for something";
          break;
      }
    },

    //退出登录
    dropOut() {
      window.localStorage.removeItem("user");
      window.localStorage.removeItem("id");
      this.$router.push({ name: "login" });
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
    width: 30%;
    min-width: 422px;
    font-size: 14px;
    font-weight: bold;
  }
  .drop-out {
    width: 30px;
    cursor: pointer;
  }
  div {
    margin-right: 40px;
  }
}
.nav-content {
  margin-top: 60px;
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
