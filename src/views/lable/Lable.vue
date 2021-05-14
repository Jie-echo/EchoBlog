<template>
  <div class="lable">
    <div class="lable-content">
      <a-spin size="large" :spinning="loadingData">
        <div class="content">
          <div
            v-for="(item, index) in defaultLableList"
            :key="item.id"
            class="lable-button"
            @click="goArticeLable(item.id)"
          >
            <a-tag
              @close="() => handleClose(item.id)"
              :closable="
                index !== 0 && index !== 1 && index !== 2 && index !== 3
              "
            >
              {{ item.category_name }}
            </a-tag>
          </div>
          <a-input
            v-if="inputVisible"
            ref="input"
            type="text"
            size="small"
            :style="{ width: '160px', height: '50px' }"
            :value="inputLableValue"
            @change="handleInputChange"
            @blur="handleSelectBlur"
            @keyup.enter="handleInputConfirm"
          />
          <a-tag
            v-else
            style="background: #fff; borderStyle: dashed;"
            @click="showInput"
          >
            <a-icon type="plus" /> New Tag
          </a-tag>
        </div>
      </a-spin>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.getLableList();
  },
  data() {
    return {
      inputVisible: false,
      inputLableValue: "",
      loadingData: false, //loading
      defaultLableList: [
        {
          id: 1,
          category_name: "JavaScript",
          color: "pink"
        },
        {
          id: 2,
          category_name: "React",
          color: "blue"
        },
        {
          id: 3,
          category_name: "Vue",
          color: "cyan"
        },
        {
          id: 4,
          category_name: "CSS",
          color: "purple"
        }
      ]
    };
  },
  methods: {
    //查询标签列表
    getLableList() {
      this.loadingData = true;
      this.$axios({
        method: "get",
        url: "/api/getLableList",
        params: {}
      }).then(res => {
        this.loadingData = false;
        if (res.data.code == 200) {
          this.defaultLableList = res.data.data;
        } else {
          this.$message.error("查询失败");
        }
      });
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(function() {
        this.$refs.input.focus();
      });
    },

    handleInputChange(e) {
      this.inputValue = e.target.value;
    },

    handleInputConfirm() {
      const inputValue = this.inputValue;
      let defaultLableList = this.defaultLableList;
      let haveLable = false;
      defaultLableList.forEach(element => {
        if (inputValue == element.category_name) {
          this.$message.destroy();
          this.$message.error(`已存在${inputValue}标签名！`);
          haveLable = true;
        }
      });
      haveLable || this.handleAddLable();
    },
    handleSelectBlur() {
      this.inputVisible = false;
    },
    //创建标签
    handleAddLable() {
      this.$axios({
        method: "post",
        url: "/api/postCreateLable",
        data: {
          category: this.inputValue
        }
      }).then(res => {
        if (res.data.code == 200) {
          this.$message.success("创建成功");
          this.getLableList();
          this.handleSelectBlur();
        } else {
          this.$message.error("创建失败");
          this.handleSelectBlur();
        }
      });
    },
    handleClose(id) {
      this.handleDelLable(id);
    },
    //删除标签
    handleDelLable(id) {
      this.$axios({
        method: "post",
        url: "/api/postDelLable",
        data: {
          id
        }
      }).then(res => {
        if (res.data.code == 200) {
          this.$message.success("删除成功");
          this.getLableList();
        } else {
          this.$message.error("删除失败");
        }
      });
    },
    //搜索索引标签
    goArticeLable(id) {
      let lableId = id;
      this.$router.push({ path: "/article/category", query: { lableId } });
    }
  }
};
</script>

<style lang="less" scoped>
/deep/.anticon-close {
  position: absolute;
  right: 38px;
}
.lable {
  padding-bottom: 50px;
  .lable-content {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 300px;
    .content {
      display: flex;
      flex-wrap: wrap;
      width: 820px;
      .lable-button {
        position: relative;
      }
      span {
        height: 60px;
        width: 160px;
        padding: 10px;
        font-size: 32px;
        line-height: 26px;
        text-align: center;
        margin-right: 30px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-bottom: 10px;
        cursor: pointer;
        &:hover {
          border-color: darkcyan;
          color: darkcyan;
        }
      }
    }
  }
}
</style>
