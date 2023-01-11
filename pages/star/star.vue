<template>
	<view>
		<view class="star">
			<n-card hoverable embedded >
				<view class="star-detail">
					<view>
						<img :src="star.avatar" referrerPolicy="no-referrer" />
						<p>{{star.name}}</p>
					</view>
					
					<view class="star-info">
						<p>生日：{{star.birthday}}</p>
						<p>年龄：{{star.age}}</p>
						<p>身高：{{star.height == null ? '未知' : star.height}}</p>
						<p>三维：{{star.bust == null ? '未知' : star.bust}}, {{star.waistline == null ? '未知' : star.waistline}}, {{star.hipline == null ? '未知' : star.hipline}}</p>
						<p>出生地：{{star.birthplace}}</p>
					</view>
				</view>
			</n-card>
		</view>
		
		<view>
			<view class="content">
				<view class="card" v-for="(item, index) in movies" :key="index">
					<n-card class="ncard" hoverable embedded footer-style="padding: 0;" @click="handleToDetail(item.id)">
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
	</view>
</template>

<script>
	import {
		defineComponent
	} from 'vue'
	import {
		NTag,
		NCard,
		NSpin,
		NAlert,
	} from 'naive-ui'
	import {
		starSearch
	} from '../../common/api.js'
	export default defineComponent({
		components: {
			NTag,
			NCard,
			NSpin,
			NAlert,
		},
		data() {
			return {
				page: 1,
				keyword: '',
				show: false,
				movies: [],
				star: ''
			}
		},
		
		onLoad(options) {
			this.keyword = options.starId
			this.getStarSearch(this.page,this.keyword)
		},
		
		mounted() {
			window.addEventListener('scroll', this.handleScroll, true);
		},
		
		beforeDestroy() {
			window.removeEventListener('scroll', this.handleScroll, true);
		},
		
		methods: {
			getStarSearch(page, keyword) {
				starSearch(page, keyword).then(res =>{
					this.movies = res.data.data.movies
					this.star = res.data.data.star
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
				starSearch(this.page, this.keyword).then(res => {
					if (res.data.code == 200) {
						let newsList = [];
						//如果是第一次就直接赋值，否则需要在原数组上拼接新数据
						if (this.page == 1) {
							newsList = res.data.data.movies;
						} else {
							newsList = this.movies.concat(res.data.data.movies);
						}
						this.movies = newsList;
						this.show = false
					}
				});
			},
			
			handleToDetail(id) {
				uni.navigateTo({
					url: '/pages/detail/detail?id=' + id
				})
			},
		}
	})
</script>

<style>

.star-detail{
	width: 100%;
	height: 150px;
	display: flex;
	flex-direction: row;
	justify-content: space-around;
}
.star-detail img{
	width: 100px;
	height: 100px;
	margin-top: 15px;
}
.star-info{
	font-size: 16px;
	margin-top: 15px;
}

.content {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}
	.ncard {
		width: 175px;
		height: 175px;
		margin: 10px 10px;
	}

	.ncard img {
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
	
	.detail-title{
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
