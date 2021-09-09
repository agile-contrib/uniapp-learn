<template>
  <view :class="[isValid ? 'ui-valid' : 'ui-invalid']">
    <slot></slot>
  </view>
</template>

<script>
import validateServer from "../tools/validate.js";

/**
 * uiFormItem 表单校验条目
 * @description 用于表单的校验
 * @property {String} name 输入条目名称
 */
export default {
  name: "uiFormItem",
  props: {
    prop: String,
    required: Boolean,
  },
  data() {
    return {
      isValid: true,
    };
  },
  methods: {
    // 对当前的输入项进行表单校验更新
    doValidateheck(value, rule) {
      if (this.required) {
        let requiredFlag = true;
        rule.forEach((item) => {
          if (item.required) {
            requiredFlag = false;
          }
        });
        if (requiredFlag)
          rule.push({
            required: true,
            message: "必输",
          });
      }
      let result = validateServer(value, rule);
      this.isValid = result.flag;

      // 方便校验的结果
      return result;
    },

    // 获取包含的ui-form
    getForm(name = "uiForm") {
      let parent = this.$parent;
      let parentName = parent.$options.name;
      while (parentName != name) {
        parent = parent.$parent;
        if (!parent) return false;
        parentName = parent.$options.name;
      }
      return parent;
    },
  },
  created() {
    // 先获取表单
    let form = this.getForm();

    if (!form.__childrens) form.__childrens = [];

    // 然后在表单的孩子数组中登记留用
    form.__childrens.push(this);
  },
};
</script>
