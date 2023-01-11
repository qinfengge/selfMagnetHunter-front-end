<template>
	<view>
		<n-tabs animated @update:value="handleToChange" style="margin-left: 15px;">
			<n-tab-pane name="dayRanking" tab="日榜">
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

			<n-tab-pane name="weekRanking" tab="周榜">
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
			
			<n-tab-pane name="monthRanking" tab="月榜">
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
		NAlert,
		NTabs,
		NTabPane,
		NIcon
	} from 'naive-ui'
	import {
		ranking
	} from '../../common/api.js'

	export default defineComponent({
		components: {
			NButton,
			NCard,
			NTag,
			NAlert,
			NTabs,
			NTabPane,
			NIcon
		},

		data() {
			return {
				indexList: [],
				show: false,
				type: 1,
			}
		},
		onLoad() {
			this.initData(this.type);
		},

		methods: {
			initData(type) {
				ranking(type).then(res => {
					this.indexList = res.data.data
				})
			},

			handleToDetail(id) {
				uni.navigateTo({
					url: '/pages/detail/detail?id=' + id
				})
			},

			handleToChange(value) {
				if (value === 'dayRanking') {
					this.indexList = []
					this.type = 1
					this.initData(this.type)
				}

				if (value === 'weekRanking') {
					this.indexList = []
					this.type = 2
					this.initData(this.type)
				}
				
				if (value === 'monthRanking') {
					this.indexList = []
					this.type = 3
					this.initData(this.type)
				}
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
		margin: 0 10px 10px 0;
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
</style>
