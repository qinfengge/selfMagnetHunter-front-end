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
					<n-form-item>
						<n-button attr-type="button" @click="handleToAddAria2">
							提交
						</n-button>
					</n-form-item>
				</n-form>
			</n-modal>
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
		NInput
	} from 'naive-ui'
	import {
		listAria2,
		addAria2
	} from '../../common/api.js'

	export default defineComponent({
		components: {
			NButton,
			NCard,
			NIcon,
			NModal,
			NForm,
			NFormItem,
			NInput
		},

		data() {
			return {
				aria2s: [],
				showModal: true,
				formRef: {
					name: '',
					host: '',
					port: '6800',
					path: 'jsonrpc',
					auth: ''
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
				})
			},

			handleToAddAria2() {
				addAria2(this.formRef).then(res =>{
					alert(res.data.data)
				})
			}

		}
	})
</script>

<style>

</style>
