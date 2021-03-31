<template>
  <div class="out">
    <div class="head"></div>
    <a-row :gutter="16">
      <a-col :span="6"></a-col>
      <a-col :span="12">
        <div class="content">
          <div class="title">创作文章</div>
          <div class="content-div">
            <div class="flex-col">
              <div>
                文章标题
              </div>
              <div>
                <a-input
                  placeholder="请输入标题(1-12字)"
                  :maxLength="12"
                  allowClear
                  v-model="title"
                />
              </div>
            </div>
            <div class="flex-col" style="margin-top:10px">
              <div>
                文章摘要
              </div>
              <div>
                <a-textarea
                  placeholder="请输入摘要(1-64)"
                  :rows="2"
                  :maxLength="64"
                  allowClear
                  v-model="remark"
                />
              </div>
            </div>
            <div id="wangeditor" style="margin: 14px 0">
              <div ref="editorElem" style="text-align:left;"></div>
            </div>
            <div class="flex-row">
              <div>
                展示封面
              </div>
              <div>
                <a-upload
                  name="avatar"
                  list-type="picture-card"
                  class="avatar-uploader"
                  :show-upload-list="false"
                  :action="uploadImg"
                  :before-upload="beforeUpload"
                  @change="handleChange"
                >
                  <img
                    v-if="imageUrl"
                    :src="imageUrl"
                    alt="avatar"
                    class="img"
                  />
                  <div v-else>
                    <a-icon :type="imgLoading ? 'loading' : 'plus'" />
                    <div class="ant-upload-text">
                      Upload
                    </div>
                  </div>
                </a-upload>
              </div>
            </div>
            <div class="flex-row classfiy">
              <div>文章分类</div>
              <div>
                <a-select
                  :value="clssfiy"
                  style="width: 120px"
                  @change="handleChangeSelect"
                >
                  <a-select-option :value="1">
                    JavaScript
                  </a-select-option>
                  <a-select-option :value="2">
                    React
                  </a-select-option>
                  <a-select-option :value="3">
                    Vue
                  </a-select-option>
                  <a-select-option :value="4">
                    CSS
                  </a-select-option>
                </a-select>
              </div>
            </div>
            <div>
              <a-button type="primary" class="submit-btn" @click="submitForm">
                发布
              </a-button>
              <a-button @click="goBack">
                取消
              </a-button>
            </div>
          </div>
        </div>
      </a-col>
      <a-col :span="6"></a-col>
    </a-row>
  </div>
</template>
<script>
import Editer from "wangeditor";
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
export default {
  name: "wirteArticle",
  mounted() {
    // wangeditor
    this.editorContent = new Editer("#wangeditor");
    // 创建一个富文本编辑器
    this.editorContent.create();
    // 富文本内容
    this.editorContent.txt.html();
    if (this.$route.query.id) {
      this.getarticleDetail(this.$route.query.id);
    }
  },
  data() {
    return {
      title: "", //文章标题
      remark: "", //文章简介
      editorContent: "", //富文本框
      clssfiy: 1, //分类
      imageUrl: "", //上传图片地址
      imgLoading: false, //图片上传加载
      uploadImg: "/api/upload"
    };
  },
  methods: {
    //分类选择
    handleChangeSelect(e) {
      this.clssfiy = e;
    },
    //编辑回显
    getarticleDetail(id) {
      this.$axios({
        method: "get",
        url: "/api/getArticleDetail",
        params: {
          id
        }
      }).then(res => {
        if (res.data.code == 200) {
          let obj = res.data.data[0];
          this.title = obj.title; //文章标题
          this.remark = obj.remark; //文章简介
          this.editorContent = obj.content; //富文本框
          this.clssfiy = obj.category; //分类
          this.imageUrl = obj.cover; //上传图片地址
        } else {
          this.$message.error("查询失败");
        }
      });
    },
    //表单提交
    submitForm() {
      let author = localStorage.getItem("user");
      let user_id = localStorage.getItem("id");
      let date = new Date();
      if (!this.title) {
        this.$message.destroy();
        this.$message.error("请输入文章标题");
        return;
      }
      if (!this.remark) {
        this.$message.destroy();
        this.$message.error("请输入文章摘要");
        return;
      }
      if (!this.editorContent.txt.html()) {
        this.$message.destroy();
        this.$message.error("请输入内容");
        return;
      }
      this.$axios({
        method: "post",
        url: "/api/createArticle",
        data: {
          author: author,
          title: this.title,
          cover: this.imageUrl,
          remark: this.remark,
          category: this.clssfiy,
          user_id: user_id,
          add_time: date.toLocaleDateString(),
          content: this.editorContent.txt.html()
        }
      }).then(res => {
        this.$router.push({ path: "/index" });
      });
    },
    //返回
    goBack() {
      this.$router.go(-1);
    },
    handleChange(info) {
      getBase64(info.file.originFileObj).then(res => {
        this.imageUrl = res;
      });
    },
    beforeUpload(file) {
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
        this.$message.error("你只能上传文件后缀名为jpeg、png的图片!");
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("图片大小不能超过2MB!");
      }
      return isJpgOrPng && isLt2M;
    }
  },
  components: {}
};
</script>
<style scoped lang="less">
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
    // position: fixed;
    // top: 30px;
    color: #339999;
    font-size: 32px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  .content-div {
    background: #fff;
    width: 50vw;
    min-height: 500px;
    padding: 30px;
    border-radius: 16px;
  }
}
.flex-col {
  display: flex;
  flex-direction: column;
  div:last-child {
    margin-top: 10px;
  }
}
.flex-row {
  display: flex;
  margin-top: 10px;
  align-content: center;
}
.ant-input {
  background: #f6f6f6;
}
.classfiy {
  line-height: 32px;
  div:last-child {
    margin-left: 10px;
  }
}
.avatar-uploader {
  margin-left: 20px;
}
.avatar-uploader > .ant-upload {
  width: 128px;
  height: 128px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}

.ant-btn {
  border-color: #339999;
}
.ant-btn-primary {
  background-color: #339999;
  border-color: #339999;
}
.submit-btn {
  margin-top: 30px;
  margin-left: 84px;
  margin-right: 20px;
}
.img {
  height: 130px;
  width: 130px;
}
</style>
