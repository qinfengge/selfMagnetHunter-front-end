<template>
	<view>
		<view class="model">
			<n-modal v-model:show="showModal" preset="card" style="height: 450px;">
				<n-form ref="formRef" label-placement="left" label-width="auto">
					<n-form-item label="名称">
						<n-input v-model:value="formRef.name" placeholder="输入名称" />
					</n-form-item>
					<n-form-item label="地址">
						<n-input v-model:value="formRef.host" placeholder="输入地址:形如 http://1.2.3.4" />
					</n-form-item>
					<n-form-item label="端口">
						<n-input v-model:value="formRef.port" placeholder="默认端口:6800" />
					</n-form-item>
					<n-form-item label="路径">
						<n-input v-model:value="formRef.path" placeholder="默认路径:jsonrpc" />
					</n-form-item>
					<n-form-item label="密钥">
						<n-input v-model:value="formRef.auth" placeholder="Aria2密钥" />
					</n-form-item>
					<n-form-item label="最大任务量">
						<n-input v-model:value="formRef.maxTask" placeholder="Aria2最大同时下载" />
					</n-form-item>
					<n-form-item>
						<n-button attr-type="button" @click="handleToAddAria2">
							提交
						</n-button>
					</n-form-item>
				</n-form>
			</n-modal>
		</view>

		<view class="a-list">
			<n-list hoverable clickable border v-for="(item, index) in aria2s" key="index">
				<n-list-item>
					<template #suffix>
						<view class="list-suffix">
							<n-button @click="handleUpdate(index)">修改</n-button>
							<n-switch v-model:value="item.defaultStatus" size="medium" @update:value="handleToDefault(index)">
								<template #icon>
									🤔
								</template>
								<template #checked>
									默认
								</template>
								<template #unchecked>
									设为默认
								</template>
							</n-switch>
						</view>
					</template>
					<n-thing :title="item.name">
						地址：{{item.host}}<br>
						创建日期：{{item.createTime}}<br>
						最大任务量：{{item.maxTask}}<br>
					</n-thing>
				</n-list-item>
			</n-list>
		</view>
		
		<view class="add-button">
			<n-button size="large" circle @click="handleAdd">
			      <template #icon>
			        <n-icon color="#0e7a0d">
						<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 16 16"><g fill="none"><path d="M8.5 2.75a.75.75 0 0 0-1.5 0V7H2.75a.75.75 0 0 0 0 1.5H7v4.25a.75.75 0 0 0 1.5 0V8.5h4.25a.75.75 0 0 0 0-1.5H8.5V2.75z" fill="currentColor"></path></g></svg>
					</n-icon>
			      </template>
			    </n-button>
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
		NIcon,
		NModal,
		NForm,
		NFormItem,
		NInput,
		NList,
		NListItem,
		NThing,
		NSwitch,
	} from 'naive-ui'
	import {
		listAria2,
		addAria2,
		setDefaultAria2
	} from '../../common/api.js'

	export default defineComponent({
		components: {
			NButton,
			NCard,
			NIcon,
			NModal,
			NForm,
			NFormItem,
			NInput,
			NList,
			NListItem,
			NThing,
			NSwitch,
		},

		data() {
			return {
				aria2s: [],
				showModal: true,
				active: false,
				formRef: {
					name: '',
					host: '',
					port: '6800',
					path: 'jsonrpc',
					auth: '',
					maxTask: 10,
				}
			}
		},
		onLoad() {
			this.list();
		},

		methods: {
			list() {
				listAria2().then(res => {
					this.aria2s = res.data.data
					console.log(res.data.data)
					if (this.aria2s.length > 0) {
						this.showModal = false
					}
				})
			},

			handleToAddAria2() {
				addAria2(this.formRef).then(res => {
					this.showModal = false
					uni.showToast({
						title: res.data.data,
						icon: 'error',
						duration: 2000,
						complete(e) {
							console.log(e)
						}
					});
					this.list()

				})
			},
			
			handleAdd(){
				this.formRef = {}
				this.showModal = true
			},
			
			handleUpdate(index){
				this.formRef = this.aria2s[index]
				this.showModal = true
				this.list()
			},
			
			handleToDefault(index){
				setDefaultAria2(this.aria2s[index].id).then(res =>{
					uni.showToast({
						title: res.data.data,
						duration: 2000,
					});
					this.list()
				})
			}

		}
	})
</script>

<style>
	.list-suffix {
		width: 120px;
		height: 100px;
		/* border: 1px red solid; */
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
	}
	
	.add-button{
		position: absolute;
		top: 700px;
		left: 300px;
	}
</style>
