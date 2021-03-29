<template>
  <div class="self">
    <div class="header">
      <div class="title">blog</div>
      <div class="header_login" ref="login">
        <div style="font-weight: bold"><i>blog</i></div>
        <div>
          <a-form-model
            :model="formInline"
            @submit.native.prevent
            :rules="rules"
          >
            <a-form-model-item class="user_input" prop="user">
              <a-input
                v-model="formInline.user"
                placeholder="Username"
                style="width:280px"
                size="large"
              >
                <a-icon
                  slot="prefix"
                  type="user"
                  style="color:rgba(0,0,0,.25)"
                />
              </a-input>
            </a-form-model-item>
            <a-form-model-item style="margin-bottom: 0" prop="password">
              <a-input
                v-model="formInline.password"
                type="password"
                placeholder="Password"
                style="width:280px"
                size="large"
              >
                <a-icon
                  slot="prefix"
                  type="lock"
                  style="color:rgba(0,0,0,.25)"
                />
              </a-input>
            </a-form-model-item>
            <a-form-model-item
              style="margin-bottom: 0;margin-top: 20px"
              v-if="showPassword"
              prop="surePassword"
            >
              <a-input
                v-model="formInline.surePassword"
                type="password"
                placeholder="PasswordAgain"
                style="width:280px"
                size="large"
              >
                <a-icon
                  slot="prefix"
                  type="lock"
                  style="color:rgba(0,0,0,.25)"
                />
              </a-input>
            </a-form-model-item>
          </a-form-model>
        </div>
        <div v-if="showLogin">
          <a-button @click="login" class="btnlog" size="large" type="primary"
            >登录
          </a-button>
        </div>
        <div v-if="showPassword">
          <a-button @click="register" class="btnlog" size="large" type="primary"
            >注册
          </a-button>
        </div>
        <div class="footer">
          <div></div>
          <div v-show="showPassword" @click="toLogin" class="regist">登录</div>
          <div class="regist" @click="toRegister" v-show="showLogin">
            注册
          </div>
        </div>
      </div>
    </div>
    <div class="content_div"></div>
  </div>
</template>

<script>
export default {
  mounted() {},
  data() {
    return {
      formInline: {
        user: "",
        password: "",
        surePassword: ""
      },
      rules: {
        user: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        surePassword: [
          { required: true, message: "请输入再次确认密码", trigger: "blur" }
        ]
      },
      showPassword: false, //注册
      showLogin: true //登录
    };
  },
  methods: {
    //登录
    login() {
      if (!this.formInline.user) {
        this.$message.destroy();
        this.$message.error("请输入用户名");
        return;
      }
      if (!this.formInline.password) {
        this.$message.destroy();
        this.$message.error("请输入密码");
        return;
      }
      this.$axios({
        method: "get",
        url: "/api/login",
        params: {
          userName: this.formInline.user,
          pwd: this.formInline.password
        }
      }).then(res => {
        if (res.data.code == 200) {
          this.$router.push({ path: "/index" });
          this.setStorage("id", res.data.data[0].id);
          this.setStorage("user", res.data.data[0].userName);
          this.setStorage("pwd", res.data.data[0].pwd);
          //console.log(window.localStorage)
        } else {
          this.$message.error("账号密码错误");
        }
      });
    },
    //注册
    register() {
      if (!this.formInline.user) {
        this.$message.destroy();
        this.$message.error("请输入用户名");
        return;
      }
      if (!this.formInline.password) {
        this.$message.destroy();
        this.$message.error("请输入密码");
        return;
      }
      if (!this.formInline.surePassword) {
        this.$message.destroy();
        this.$message.error("请输入再次确认密码");
        return;
      }
      if (this.formInline.password !== this.formInline.surePassword) {
        this.$message.destroy();
        this.$message.error("两次密码不同，请重新输入");
        this.formInline.password = "";
        this.formInline.surePassword = "";
        return;
      }
      this.$axios({
        method: "post",
        url: "/api/register",
        data: {
          userName: this.formInline.user,
          pwd: this.formInline.password,
          surePwd: this.formInline.surePassword
        }
      }).then(res => {
        console.log(res);
        if (res.data.code == 200) {
          this.$message.success("注册成功！");
          this.showLogin = true;
          this.showPassword = false;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    //注册页面
    toRegister() {
      this.showPassword = true;
      this.showLogin = false;
      this.$refs.login.style = "height:370px";
    },
    //登录页面
    toLogin() {
      this.showLogin = true;
      this.showPassword = false;
      this.$refs.login.style = "height:310px";
    },
    //设置storage
    setStorage(name, value) {
      window.localStorage.setItem(name, value);
    }
  }
};
</script>

<style lang="less" scoped>
.self {
  width: 100%;
  height: 100%;
}
.header {
  position: absolute;
  width: 100%;
  height: 400px;
  background-color: darkcyan;
  .title {
    margin: 120px;
    font-size: 24px;
    font-weight: bold;
    position: absolute;
  }
  .header_login {
    position: relative;
    width: 340px;
    height: 300px;
    left: 50%;
    top: 400px;
    transform: translate(-50%, -50%);
    background-color: #f6f6f6;
    opacity: 1;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    padding: 30px;
    align-items: center;
  }
}
.user_input {
  margin: 20px 0;
}
.btnlog {
  margin-top: 20px;
  width: 280px;
}
.footer {
  display: flex;
  margin-top: 20px;
  justify-content: space-between;
  font-size: 12px;
  width: 100%;
}
.regist {
  cursor: pointer;
}
.regist:hover {
  color: cadetblue;
}
</style>
