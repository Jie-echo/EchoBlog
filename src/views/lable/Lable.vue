<template>
  <div class="lable">
    <div class="lable-content">
      <div class="content">
        <div v-for="item in defaultLableList" :key="item.id">
          <a-tag>
            {{ item.category }}
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
          @blur="handleInputConfirm"
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
      defaultLableList: [
        {
          id: 1,
          category: "JavaScript",
          color: "pink"
        },
        {
          id: 2,
          category: "React",
          color: "blue"
        },
        {
          id: 3,
          category: "Vue",
          color: "cyan"
        },
        {
          id: 4,
          category: "CSS",
          color: "purple"
        }
      ]
    };
  },
  methods: {
    //查询标签列表
    getLableList() {
      this.$axios({
        method: "get",
        url: "/api/getLableList",
        params: {}
      }).then(res => {
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
      let tags = this.tags;
      if (inputValue && tags.indexOf(inputValue) === -1) {
        tags = [...tags, inputValue];
      }
      console.log(tags);
      Object.assign(this, {
        tags,
        inputVisible: false,
        inputValue: ""
      });
    }
  }
};
</script>

<style lang="less" scoped>
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
        }
      }
    }
  }
}
</style>
