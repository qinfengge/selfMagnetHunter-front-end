<template>
	<view>
		<view class="index-search" @tap="handleToSearch">
			<text>
				<n-icon size="20">
					<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
						x="0px" y="0px" viewBox="0 0 512 512" enable-background="new 0 0 512 512" xml:space="preserve">
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
			<input placeholder="搜索番号" />
		</view>
		<n-tabs animated @update:value="handleToChange" style="margin-left: 15px;">
			<n-tab-pane name="hasManget" tab="有磁力">
				<view class="content">
					<view class="card" v-for="(item, index) in indexList" :key="index">
						<n-card hoverable embedded footer-style="padding: 0;" @click="handleToDetail(item.id)">
							<template #cover>
								<img :src="item.img" referrerPolicy="no-referrer">
								<!-- <img src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"> -->
							</template>
							<!-- <p class="ellipsis">{{item.title}}</p> -->
							<template #footer>
								<view class="details">
									<p class="detail-title">{{item.title}}</p>
									<p>标题：{{item.id}}</p>
									<p>日期：{{item.date}}</p>
								</view>
								<view class="tags">
									<n-tag v-if="item.hasMagnet == 1" type="success" size="small" round>有磁力</n-tag>
									<n-tag v-if="item.hasSub == 1" type="error" size="small" round>有字幕</n-tag>
								</view>
							</template>
						</n-card>
					</view>
				</view>
			</n-tab-pane>

			<n-tab-pane name="notManget" tab="全部">
				<view class="content">
					<view class="card" v-for="(item, index) in indexList" :key="index">
						<n-card hoverable embedded footer-style="padding: 0;" @click="handleToDetail(item.id)">
							<template #cover>
								<img :src="item.img" referrerPolicy="no-referrer">
								<!-- <img src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"> -->
							</template>
							<!-- <p class="ellipsis">{{item.title}}</p> -->
							<template #footer>
								<view class="details">
									<p class="detail-title">{{item.title}}</p>
									<p>标题：{{item.id}}</p>
									<p>日期：{{item.date}}</p>
								</view>
								<view class="tags">
									<n-tag v-if="item.hasMagnet == 1" type="success" size="small" round>有磁力</n-tag>
									<n-tag v-if="item.hasSub == 1" type="error" size="small" round>有字幕</n-tag>
								</view>
							</template>
						</n-card>
					</view>
				</view>
			</n-tab-pane>
		</n-tabs>

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
		indexList
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
				indexList: [],
				show: false,
				page: 1,
				magnetType: 2
			}
		},
		onLoad() {
			this.initData(this.page, this.magnetType);
		},

		mounted() {
			window.addEventListener('scroll', this.handleScroll, true);
		},

		beforeDestroy() {
			window.removeEventListener('scroll', this.handleScroll, true);
		},

		methods: {
			initData(page, magnetType) {
				indexList(page, magnetType).then(res => {
					this.indexList = res.data.data
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
						that.getNewList()
					}
				}, 500);
			},

			getNewList() {
				indexList(this.page, this.magnetType).then(res => {
					if (res.data.code == 200) {
						let newsList = [];
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

			handleToDetail(id) {
				uni.navigateTo({
					url: '/pages/detail/detail?id=' + id
				})
			},

			handleToChange(value) {
				if (value === 'notManget') {
					this.indexList = []
					this.magnetType = 1
					this.initData(this.page, this.magnetType)
				}

				if (value === 'hasManget') {
					this.indexList = []
					this.magnetType = 2
					this.initData(this.page, this.magnetType)
				}
			},
			
			handleToSearch() {
				uni.navigateTo({
					url: '/pages/search/search',
				});
			},
		}
	})
</script>

<style>
	.content {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}

	.ellipsis {
		width: 200px;
		height: 70px;
		margin: 0 auto;
		/* 溢出部分隐藏 */
		overflow: hidden;
		/* 溢出部分用省略号代替 */
		text-overflow: ellipsis;
		/* 弹性伸缩盒子模型显示 */
		display: -webkit-box;
		/* 限制一个块元素显示的文本行数 */
		-webkit-line-clamp: 3;
		/* 设置伸缩盒对象子元素的排列方式 */
		-webkit-box-orient: vertical;
	}



	.n-card {
		width: 175px;
		height: 175px;
		margin: 10px 10px;
	}

	.n-card img {
		width: 175px;
		height: 100px;
		object-fit: cover;
	}

	.tags .n-tag {
		margin: 0 5px 0 0;
	}

	.details {
		width: 145px;
		font-size: 10px;
	}

	.detail-title {
		font-size: 8px;
		width: 170px;
		height: 20px;
		display: flex;
		flex-direction: row;
		white-space: nowrap;
		/* 溢出部分隐藏 */
		overflow: hidden;
		/* 溢出部分用省略号代替 */
		text-overflow: ellipsis;
	}

	.index-search {
		display: flex;
		align-items: center;
		height: 70rpx;
		margin: 70rpx 30rpx 30rpx 30rpx;
		background: #f7f7f7;
		border-radius: 50rpx;
	}

	.index-search text {
		margin-top: 10px;
		margin-left: 25rpx;
		margin-right: 25rpx;
	}

	.index-search input {
		font-size: 26rpx;
		flex: 1;
	}
</style>
