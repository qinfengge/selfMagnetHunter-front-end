<template>
	<view class="search">
		<view class="container">
			<scroll-view scroll-y="true">
				<view class="search-search">
					<text>
						<n-icon size="20">
							<svg version="1.1" xmlns="http://www.w3.org/2000/svg"
								xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512"
								enable-background="new 0 0 512 512" xml:space="preserve">
								<g>
									<g>
										<g>
											<g>
												<path d="M337.509,305.372h-17.501l-6.571-5.486c20.791-25.232,33.922-57.054,33.922-93.257
								C347.358,127.632,283.896,64,205.135,64C127.452,64,64,127.632,64,206.629s63.452,142.628,142.225,142.628
								c35.011,0,67.831-13.167,92.991-34.008l6.561,5.487v17.551L415.18,448L448,415.086L337.509,305.372z M206.225,305.372
								c-54.702,0-98.463-43.887-98.463-98.743c0-54.858,43.761-98.742,98.463-98.742c54.7,0,98.462,43.884,98.462,98.742
								C304.687,261.485,260.925,305.372,206.225,305.372z"></path>
											</g>
										</g>
									</g>
								</g>
							</svg>
						</n-icon>
					</text>
					<input placeholder="搜索番号" v-model="searchKey" @confirm="handleToSearch(searchKey)"
						@input="handleToSuggest" />
				</view>
				<block v-if="searchType == 1">
					<view class="search-history">
						<view class="search-history-head">
							<text style="font-size: 30rpx;">历史记录</text>
							<text class="iconfont iconlajitong" @tap="handleToClear">
								<n-icon size="20">
								    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16"></path><path d="M10 11v6"></path><path d="M14 11v6"></path><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12"></path><path d="M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3"></path></g></svg>
								  </n-icon>
							</text>
						</view>
						<view class="search-history-list">
							<view v-for="(item,index) in searchHistory" :key="index" @tap="handleToHot(item)">{{item}}
							</view>
						</view>
					</view>
				</block>
				<block v-else-if="searchType  == 2">
					<view class="search-result">
						<view class="content">
							<view class="card" v-for="(item, index) in indexList" :key="index">
								<n-card hoverable embedded footer-style="padding: 0;" @click="handleToDetail(item.id)">
									<template #cover>
										<img :src="item.img" referrerPolicy="no-referrer">
									</template>
									<template #footer>
										<view class="details">
											<p class="detail-title">{{item.title}}</p>
											<p>标题：{{item.id}}</p>
											<p>日期：{{item.date}}</p>
										</view>
										<view class="tags">
											<n-tag v-if="item.hasMagnet == 1" type="success" size="small" round>有磁力
											</n-tag>
											<n-tag v-if="item.hasSub == 1" type="error" size="small" round>有字幕</n-tag>
										</view>
									</template>
								</n-card>
							</view>
						</view>
					</view>
					<n-space vertical>
						<n-spin :show="show">
							<n-alert title="服务器正在努力啦😍" type="success">
								等待也是一种幸福
							</n-alert>
							<template #description>
								你不知道你有多幸运
							</template>
						</n-spin>
					</n-space>
				</block>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import {
		defineComponent
	} from 'vue'
	import {
		NButton,
		NCard,
		NTag,
		NSkeleton,
		NSpin,
		NSpace,
		NAlert,
		NTabs,
		NTabPane,
		NIcon
	} from 'naive-ui'
	import {
		search
	} from '../../common/api.js'

	export default defineComponent({
		components: {
			NButton,
			NCard,
			NTag,
			NSkeleton,
			NSpin,
			NSpace,
			NAlert,
			NTabs,
			NTabPane,
			NIcon
		},
		data() {
			return {
				searchKey: '',
				searchHistory: [],
				searchType: 1,
				indexList: [],
				show: false,
				page: 1,
				magnetType: 2
			}
		},
		onLoad(){
			uni.getStorage({
				key: 'searchHistory',
				success: (res) => {
					this.searchHistory = res.data
				}
			})
		},

		mounted() {
			window.addEventListener('scroll', this.handleScroll, true);
		},

		beforeDestroy() {
			window.removeEventListener('scroll', this.handleScroll, true);
		},

		methods: {
			handleToHot(key) {
				this.searchKey = key
				this.handleToSearch(key)
			},
			handleToSearch(key) {
				this.searchHistory.unshift(key)
				this.searchHistory = [...new Set(this.searchHistory)]
				if (this.searchHistory.length > 10) {
					this.searchHistory.length = 10
				}
				uni.setStorage({
					key: 'searchHistory',
					data: this.searchHistory
				})
				this.getSearchList(key)
			},
			handleToClear() {
				uni.removeStorage({
					key: 'searchHistory',
					success: () => {
						this.searchHistory = []
					}
				})
			},

			handleScroll() {
				//这里使用个延时加载，不然滑动屏幕的时候会不断触发方法，去计算高度，浪费性能
				let that = this
				clearTimeout(this.timer)
				that.timer = setTimeout(function() {
					let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
					let windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
					let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
					//获取到关键属性的值后，判断即可
					if (scrollTop + windowHeight >= scrollHeight) {
						console.log("触底");
						that.show = true
						that.page++
						that.getSearchList(that.searchKey)
					}
				}, 500);
			},

			getSearchList(key) {
				search(this.page, key).then(res => {
					if (res.data.code == 200) {
						let newsList = [];
						this.searchType = 2
						//如果是第一次就直接赋值，否则需要在原数组上拼接新数据
						if (this.page == 1) {
							newsList = res.data.data;
						} else {
							newsList = this.indexList.concat(res.data.data);
						}
						this.indexList = newsList;
						this.show = false
					}
				});
			},

			handleToClose() {
				this.searchKey = ''
				this.searchType = 1
			},
			
			handleToDetail(id) {
				uni.navigateTo({
					url: '/pages/detail/detail?id=' + id
				})
			},
		},
	})
</script>

<style scoped>
	.search-search {
		display: flex;
		align-items: center;
		height: 70rpx;
		margin: 70rpx 30rpx 50rpx 30rpx;
		background: #f7f7f7;
		border-radius: 50rpx;
	}

	.search-search text {
		margin-top: 10px;
		margin-left: 25rpx;
		margin-right: 25rpx;
	}

	.search-search input {
		font-size: 25rpx;
		flex: 1;
	}

	.search-history {
		margin: 0 30rpx 50rpx 30rpx;
		font-size: 26rpx;
	}

	.search-history-head {
		display: flex;
		justify-content: space-between;
	}

	.search-history-list {
		display: flex;
		flex-wrap: wrap;
		margin-top: 40rpx;
	}

	.search-history-list view {
		padding: 16rpx 28rpx;
		border-radius: 40rpx;
		margin-right: 30rpx;
		margin-bottom: 30rpx;
		background: #f7f7f7;
	}

	.search-hot {
		font-size: 26rpx;
		margin: 0 30rpx;
	}

	.search-hot-head {
		margin-bottom: 36rpx;
	}

	.search-hot-item {
		display: flex;
		align-items: center;
		margin-bottom: 60rpx;
	}

	.search-hot-top {
		color: #Fb2222;
		width: 60rpx;
		margin-left: 10rpx;
		font-size: 30rpx;
	}

	.search-hot-word {
		flex: 1;
	}

	.search-hot-word view:nth-child(1) {
		font-size: 30rpx;
		color: black;
	}

	.search-hot-word view:nth-child(2) {
		font-size: 24rpx;
		color: #878787;
	}

	.search-hot-word image {
		width: 48rpx;
		height: 22rpx;
	}

	.search-hot-count {
		color: #878787;
	}

	.search-result {
		border-top: 2rpx #e4e4e4 solid;
		padding: 30rpx;
	}

	.search-result-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-bottom: 30rpx;
		margin-bottom: 30rpx;
		border-bottom: 2rpx #e4e4e4 solid;
	}

	.search-result-item text {
		font-size: 50rpx;
	}

	.search-result-word {}

	.search-result-word view:nth-child(1) {
		font-size: 28rpx;
		color: #235790;
		margin-bottom: 12rpx;
	}

	.search-result-word view:nth-child(2) {
		font-size: 22rpx;
		color: #898989;
	}

	.search-suggest {
		border-bottom: 2rpx #e4e4e4 solid;
		padding: 30rpx;
		font-size: 25rpx;
	}

	.search-suggest-head {
		color: #4574a5;
		margin-bottom: 75rpx;
	}

	.search-suggest-item {
		color: #5d5d5d;
		margin-bottom: 75rpx;
	}

	.search-suggest-item text {
		color: #bdbdbd;
		margin-right: 30rpx;
	}
</style>
