<template>
	<view class="content">
		<img class="head-image" :src="img" referrerPolicy="no-referrer">
		<p class="title">{{title}}</p>
		<view class="grid-info">
			<n-grid :cols="4" :item-responsive="true" style="margin-top: 15px;">
				<n-gi>
					<n-statistic label="时长" :value="length" style="--n-value-font-size: 15px;" />
				</n-gi>
				<n-gi>
					<n-statistic label="发行日期" :value="date" style="--n-value-font-size: 15px;" />
				</n-gi>
				<n-gi>
					<n-statistic label="导演" :value="director.directorName == null ? '未知' : director.directorName"
						style="--n-value-font-size: 15px;" />
				</n-gi>
				<n-gi>
					<n-statistic label="类型" :value="isCensored" style="--n-value-font-size: 15px;" />
				</n-gi>
			</n-grid>
		</view>
		<view class="tags">
			<view v-for="(item,index) in tags" :key="index">
				<n-tag type="info" style="margin-left: 10px; margin-top: 10px;">
					{{item.tagName}}
				</n-tag>
			</view>
		</view>

		<view class="stars">
			<scroll-view class="scroll-view_H" scroll-x="true" scroll-left="120">
				<view class="stars-item" v-for="(item,index) in starsDetail" :key="index">
					<n-card hoverable embedded footer-style="padding: 0;" @click="handleToStarsDetail(item.id)">
						<template #cover>
							<img :src="item.avatar" referrerPolicy="no-referrer">
						</template>
						<span class="stars-name">{{item.name}}</span>
					</n-card>
				</view>
			</scroll-view>
		</view>

		<view class="samples">
			<scroll-view class="scroll-view_sam" scroll-x="true">
				<n-image-group>
					<n-space class="sam-space" v-for="(item,index) in samples" :key="index"
						style="display: inline-block;">
						<!-- <n-image class="sam-image" width="300" height="175" :src="item.src" object-fit="cover" lazy referrerPolicy="no-referrer"/> -->
						<img class="sam-image"  :src="item.src" style="width: 300px; height: 175px; object-fit: cover;" referrerPolicy="no-referrer" />
					</n-space>
				</n-image-group>
			</scroll-view>
		</view>

		<view class="magnet">
			<view class="magnet-item" v-for="(item,index) in magnets" :key="index">
				<n-card class="magnet-card" hoverable embedded content-style="padding: 0;"
					@click="handleToMagnet(item.link)">
					<view class="magnet-detail">
						<span class="magnet-title">{{item.title}}</span>
						<span>{{item.size}}</span>
						<span>{{item.shareDate}}</span>
						<n-tag v-if="item.hd" type="success" size="small" round>高清</n-tag>
						<n-tag v-if="item.hasSubtitle" type="error" size="small" round>有字幕</n-tag>
					</view>

					<template #action>
						<view class="magnet-action">
							<n-button circle quaternary >
								<n-icon size="25" color="#0e7a0d">
									<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
										viewBox="0 0 24 24">
										<path opacity=".3"
											d="M19.21 12.04l-1.53-.11l-.3-1.5A5.484 5.484 0 0 0 12 6C9.94 6 8.08 7.14 7.12 8.96l-.5.95l-1.07.11A3.99 3.99 0 0 0 2 14c0 2.21 1.79 4 4 4h13c1.65 0 3-1.35 3-3c0-1.55-1.22-2.86-2.79-2.96zM12 17l-4-4h2.55v-3h2.91v3H16l-4 4z"
											fill="currentColor"></path>
										<path
											d="M19.35 10.04A7.49 7.49 0 0 0 12 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 0 0 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5c0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4c0-2.05 1.53-3.76 3.56-3.97l1.07-.11l.5-.95A5.469 5.469 0 0 1 12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5l1.53.11A2.98 2.98 0 0 1 22 15c0 1.65-1.35 3-3 3zm-5.55-8h-2.9v3H8l4 4l4-4h-2.55z"
											fill="currentColor"></path>
									</svg>
								</n-icon>
							</n-button>
							<n-button circle quaternary >
								<n-icon size="25" color="#0e7a0d">
									<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
										viewBox="0 0 24 24">
										<path opacity=".3" d="M3 17h18V5H3v12zM9 7l7 4l-7 4V7z" fill="currentColor"></path>
										<path
											d="M9 7v8l7-4zm12-4H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5v2h8v-2h5c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 14H3V5h18v12z"
											fill="currentColor"></path>
									</svg>
								</n-icon>
							</n-button>
						</view>
					</template>
				</n-card>
			</view>
		</view>
		
		
	</view>
</template>

<script>
	import {
		defineComponent
	} from 'vue'
	import {
		NGrid,
		NGi,
		NStatistic,
		NTag,
		NCard,
		NImageGroup,
		NImage,
		NSpace,
		NButton,
		NIcon,
	} from 'naive-ui'
	import {
		detail,
		getStarsDetail
	} from '../../common/api.js'
	export default defineComponent({
		components: {
			NGrid,
			NGi,
			NStatistic,
			NTag,
			NCard,
			NImageGroup,
			NImage,
			NSpace,
			NButton,
			NIcon,
		},
		data() {
			return {
				id: '',
				title: '',
				img: '',
				date: '',
				length: '',
				director: '',
				isCensored: '',
				series: '',
				tags: [],
				stars: [],
				magnets: [],
				samples: [],
				starsDetail: []
			}
		},

		onLoad(options) {
			this.getDeatil(options.id)
		},

		methods: {
			getDeatil(id) {
				detail(id).then(res => {
					this.id = res.data.data.id
					this.title = res.data.data.title
					this.img = res.data.data.img
					this.date = res.data.data.date
					this.length = res.data.data.videoLength
					this.director = res.data.data.director == null ? '未知' : res.data.data.director
					if (res.data.data.isCensored == null) {
						this.isCensored = '未知'
					} else {
						this.isCensored = res.data.data.isCensored == 1 ? '有码' : '无码'
					}

					this.series = res.data.data.series
					this.tags = res.data.data.tags
					this.stars = res.data.data.stars
					this.magnets = res.data.data.magnets
					this.samples = res.data.data.samples
					this.getStarsDetail()
				})
			},

			getStarsDetail() {
				const ids = this.stars.map(star => star.starId)
				getStarsDetail(ids).then(res => {
					this.starsDetail = res.data.data
				})
			},
			
			handleToStarsDetail(starId) {
				uni.navigateTo({
					url: '/pages/star/star?starId=' + starId
				})
			}
		}
	})
</script>

<style>
	.head-image {
		width: 100%;
		height: 80%;
	}
	
	.title{
		margin-left: 15px;
	}
	.grid-info{
		margin-left: 20px;
	}
	.tags {
		margin-top: 25px;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}

	.scroll-view_H {
		white-space: nowrap;
		width: 100%;
		height: 100px;
	}

	.stars img {
		width: 75px;
		height: 75px;
	}

	.stars {
		margin-top: 25px;
		display: flex;
		flex-direction: row;
	}

	.stars-item {
		display: inline-block;
		width: 75px;
		height: 80px;
		margin: 5px;

	}

	.stars-name {
		font-size: 8px;
		width: 75px;
		display: flex;
		flex-direction: row;
		margin-left: -20px;
		/* 溢出部分隐藏 */
		overflow: hidden;
		/* 溢出部分用省略号代替 */
		text-overflow: ellipsis;
	}

	.samples {
		margin-top: 25px;
	}

	.scroll-view_sam {
		white-space: nowrap;
		width: 100%;
		height: 175px;
	}

	.sam-space {
		margin-right: 15px;
	}
	
	.magnet{
		margin-top: 25px;
	}

	.magnet-item {
		/* border: 1px red solid; */
		width: 100%;
		/* height: 100px; */
	}

	.magnet-card {
		max-height: 120px;
		margin-top: 10px;
	}

	.magnet-detail {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
	}

	.magnet-title {
		width: 150px;
		overflow: hidden;
		white-space: nowrap;
		/* 溢出部分用省略号代替 */
		text-overflow: ellipsis;
	}
	
	.magnet-action{
		width: 100px;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
	}
</style>
