<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text>{{ i18n.game }}</text>  
		</view>
		<button type="primary" @tap="change">切换语言</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		computed: {  
		    i18n () {  
		      return this.$t('index')  
		    }  
		  },
		onLoad() {

		},
		methods: {
			change() {
				console.log('语言切换')
				const system_info = uni.getStorageSync('system_info')
				system_info.language === 'en' ? system_info.language = this._i18n.locale = 'zh_CN' : system_info.language = this._i18n.locale = 'en'
				uni.setStorageSync('system_info',system_info)
				uni.reLaunch({
					url: 'index'
				})
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
