// 判断内容是否不为空
let notNull = value => {
	if (value === null || value === undefined) {
		return false;
	}

	if (typeof value === 'string' && value.length < 1) {
		return false;
	}

	return true;
};

// 校验的具体实现,如果返回true表示合法,false表示非法

let callbacks = {

	// 1.必输
	required: (value, flag) => {

		if (flag) return notNull(value);

		// 如果不是必输,一定合法
		return true;
	},

	// 2.最大长度
	maxLength: (value, num) => {
		return !notNull(value) || value.length <= num;
	},

	// 3.最小长度
	minLength: (value, num) => {
		return !notNull(value) || value.length >= num;
	},

	// 4.正则表达式
	regexp: (value, reg) => {
		return !notNull(value) || new RegExp(reg).test(value);
	},

	// 5.自定义运算规则
	callback: (value, doback) => {
		return !notNull(value) || doback(value);
	}

};

// 获取最终的校验结果

export default function(value, ruleArray) {

	// 一个值可能有多个规则,一个个依次检查
	for (let index in ruleArray) {

		let item = ruleArray[index];

		for (let key in item) {
			if (key in callbacks) {

				// 如果非法,直接返回错误信息即可
				if (!(callbacks[key](value, item[key]))) {
					return {
						flag: false,
						msg: item.message
					};
				}

			}

			// 不然的话,就是一个无效的配置项，目前选择无视，后期可以考虑是否需要提示写错了
		}

	}

	return {
		// 校验结果合法
		flag: true,
		msg: "合法"
	};

};
