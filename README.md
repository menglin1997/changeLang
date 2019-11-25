# changeLang
uniapp与vue-i18n实现国际化多语言
最近uniapp的一个项目 需要用到国际化切换 做一个总结

## 1. 首先看一下目录结构
![目录结构.png](https://upload-images.jianshu.io/upload_images/16360239-c35bd0b6818d22c9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
## 2. 准备好vue-i18n的js文件
## 3. lang 文件夹下面写国际化语言的逻辑

1.将所需要的文件引入（en.js   zh.js   vue-i18n 等）
2. 获取设备信息 ，并保存本地
目的:   `是为了知道用户手机用的是什么语言，方便用户一进来看到的就是他设备设置的语言，我这里是将获取到的信息全部保存了（项目中需要），也可以只保存system_info.language`
代码如下（写在lang/index.js文件中）：
````
import LangEn from './en.js'
import LangChs from './zh.js'
import Vue from 'vue'
import VueI18n from './vue-i18n'
Vue.use(VueI18n)
const system_info = uni.getStorageSync('system_info')
if (!system_info) {
	// 获取设备信息
	uni.getSystemInfo({
		success: function (res) {
			uni.setStorageSync('system_info', res);
		}
	})
}
	const cur_lang = system_info.language == 'en' ? 'en' : 'zh_CN'
	const i18n = new VueI18n({
		locale: cur_lang || 'zh_CN',  // 默认选择的语言
		messages: {  
				'en': LangEn,
				'zh_CN': LangChs
			}
	})
	export default i18n
````

## 4. `main.js`中引入
````
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

import i18n from './lang/index' 
Vue.prototype._i18n = i18n
const app = new Vue({
    i18n,
		...App
})
app.$mount()
````
## 5.项目中引入
uniapp 不支持在取值表达式中直接调方法，因此，$t方法不可用，所以通过计算属性的方式：
````
<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text>{{ i18n.game }}</text>  
		</view>
		<button type="primary" @tap="change">切换语言</button>
	</view>
</template>
````
 ````
computed: {  
  i18n () {  
     return this.$t('index')  
  }  
},
````

