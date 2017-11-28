<template>
	<div class="m-main">
		<div class="m-reply">
			<div class="m-breadcrumb">
				<a>首页</a>
				<a class="active">主动回复内容列表</a>
			</div>
			<div class="m-reply-list">
				<table border="10">
					<thead>
						<tr>
							<th>主动回复内容</th>
							<th>主动回复好友</th>
							<th>主动回复时间</th>
							<th>状态</th>
							<th>操作</th>
						</tr>
						<tr class="th-l">
							<th colspan="30"></th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="item in form_res.row">
							<td>
								<div class="list-td-body">
									{{item.title}}
								</div>
							</td>
							<td>
								<span v-for="item2 in item.matey">{{item2.name}}</span>
							</td>
							<td>
								<div class="list-td-time">
									<span v-for="item2 in item.res_time">{{item2}}</span>
								</div>
							</td>
							<td>
								<span>{{item.status ? '已启动' : '已禁用'}}</span>
							</td>
							<td>
								<router-link :to="{path:'edit/index',query: {id:item.id}}">编辑</router-link>
								<a v-on:click="item_change_status(item)">{{item.status ? '禁用' : '启用'}}</a>
							</td> 
						</tr>
						<tr v-if="form_res.row.length < 1">
							<td colspan="30">无数据</td>
						</tr>
					</tbody>
				</table>

				<div class="block m-page">
					<span class="demonstration"></span>
					<el-pagination @size-change="pageSizeChange" @current-change="pageChange" :current-page.sync="currentPage2" :page-sizes="[5, 10, 50, 100]" :page-size="form.pageSize" layout="sizes, prev, pager, next" :total="form_res.total">
					</el-pagination>
				</div>
			</div>

		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				//  form
				form: {
					key: '',
					pageIndex: 1,
					pageSize: 10
				},
				form_res: {
					row: [{
							id: 1,
							title: '内容',
							matey: [{
								id: 1,
								name: '刘武胜'
							}],
							res_time: ['01:00:00', '02:00:00'],
							status: 1
						},
						{
							id: 2,
							title: '内容',
							matey: [{
								id: 1,
								name: '刘武胜'
							}],
							res_time: ['01:00:00', '02:00:00'],
							status: 0
						},
					],
					total: 1000
				}
			}
		},
		methods: {
			//  翻页
			pageChange(index) {
				console.log(index)
			},
			//  列表条数
			pageSizeChange(nb) {
				console.log(nb)
			},
			//  禁用启用
			item_change_status(item) {
				let status = item.status;
				let temp_str = '禁用';
				if(!status){
					temp_str = '启用';
				}
				this.$confirm('确定' + temp_str + '本条记录吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$message({
						type: 'success',
						message: temp_str + '成功!'
					});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			}

		}
	}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	body {}
</style>