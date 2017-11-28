<template>
	<div class="m-main">
		<div class="m-reply">
			<div class="m-breadcrumb">
				<a>首页</a>
				<a class="active">主动回复内容列表</a>
			</div>
			<div class="m-box">
				<div class="reply-one1">
					<ul>
						<li class="one1">
							<div class="one1-table">
								<div class="table-left">
									<span>关键词：</span>
								</div>
								<div class="table-body">
									<div class="m-reply-key">
										<span v-for="(item, index) in form.key">{{item.name}}<img v-on:click="form_key_del(item, index)" src="static/img/icon-c.png" /></span>
										<div class="input">
											<input type="text" v-on:keyup.enter="form_key_enter($event)" placeholder="输入关键词按回车键添加，最多添加5个关键词" />
										</div>
									</div>
								</div>
								<div class="table-right">
									<span></span>
								</div>
							</div>
						</li>
						<li class="one1">
							<div class="one1-table">
								<div class="table-left">
									<span>匹配模式：</span>
								</div>
								<div class="table-body">
									<div class="one1-ppms">
										<el-radio-group v-model="form.mode">
											<el-radio :label="1">模糊匹配</el-radio>
											<el-radio :label="2">精准匹配</el-radio>
										</el-radio-group>
									</div>
								</div>
								<div class="table-right">
									<span></span>
								</div>
							</div>
						</li>
						<li class="one1" v-for="(item, index) in form.res">
							<div class="one1-table">
								<div class="table-left">
									<span>回复内容{{index + 1}}：</span>
								</div>
								<div class="table-body">
									<div class="one1-rs">
										<span v-on:click="form_res_click(item, 'text')" :class="{'active':item.type == 'text'}">文本</span>
										<span v-on:click="form_res_click(item, 'pic')" :class="{'active':item.type == 'pic'}">图片</span>
										<span v-on:click="form_res_click(item, 'xcx')" :class="{'active':item.type == 'xcx'}">报价小程序</span>
									</div>
								</div>
								<div class="table-right">
									<span></span>
								</div>
							</div>
							<div class="one1-body">
								<div class="one1-body-main">
									<div class="main-txt">
										<!--  文本     -->
										<el-input v-if="item.type == 'text'" type="textarea" autosize placeholder="" v-model="item.conter">
										</el-input>
										<!--  上传图片   -->
										<el-upload v-if="item.type == 'pic'" 
										  class="upload-demo"
										  action="https://jsonplaceholder.typicode.com/posts/"
										  :on-preview="form_res_preview"
										  :on-remove="form_res_delimg"
										  :on-success="form_res_success"
										  :file-list="item.imgs"
										  list-type="picture">
										  <el-button size="small" type="primary">点击上传</el-button>
										  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
										</el-upload>
									</div>
									<div class="main-p" v-if="item.conter.length <= 0 && item.type == 'text'">
										<img src="static/img/icon-edit.png" />
										<span>其他事宜，可语音或文字交流。</span>
									</div>
								</div>
								<div class="one1-body-right">
									<img src="static/img/icon-j.png" v-on:click="form_res_del(item, index)" />
									<img src="static/img/icon-a.png" v-on:click="form_res_add(item, index)" v-if="form.res.length - 1 == index" />
								</div>
							</div>
						</li>
					</ul>
				</div>

			</div>
			
			<!--   回复 好友   -->
			<div class="m-box">
				<div class="m-reply-title">
					<span>回复的好友</span>
				</div>
				<div class="m-reply-matey">
					<div class="matey-zd">
						<span>全部</span>
						<span>指定好友</span>
					</div>
					<div class="matey-list">
						<div class="list-abc">
							<a>A</a>
							<a>B</a>
							<a>C</a>
							<a>D</a>
							<a>E</a>
							<a>F</a>
							<a>G</a>
							<a>H</a>
							<a>I</a>
							<a>J</a>
							<a>K</a>
							<a>L</a>
							<a>M</a>
							<a>N</a>
							<a>O</a>
							<a>P</a>
							<a>Q</a>
							<a>R</a>
							<a>S</a>
							<a>T</a>
							<a>U</a>
							<a>V</a>
							<a>W</a>
							<a>X</a>
							<a>Y</a>
							<a>Z</a>
						</div>
						<div class="list-main">
							<div class="list-se">
								<i class="el-icon-search"></i>
								<input type="text" placeholder="搜索好友" />
							</div>
							<div class="main-list">
								<div class="one">
									<div class="one-zm"><span>A</span></div>
									<el-checkbox v-model="checked">好友1</el-checkbox>
									<el-checkbox v-model="checked">好友2</el-checkbox>
									<el-checkbox v-model="checked">好友3</el-checkbox>
								</div>
								<div class="one">
									<div class="one-zm"><span>A</span></div>
									<el-checkbox v-model="checked">好友1</el-checkbox>
									<el-checkbox v-model="checked">好友2</el-checkbox>
									<el-checkbox v-model="checked">好友3</el-checkbox>
								</div>
								<div class="one">
									<div class="one-zm"><span>A</span></div>
									<el-checkbox v-model="checked">好友1</el-checkbox>
									<el-checkbox v-model="checked">好友2</el-checkbox>
									<el-checkbox v-model="checked">好友3</el-checkbox>
								</div>
								<div class="one">
									<div class="one-zm"><span>A</span></div>
									<el-checkbox v-model="checked">好友1</el-checkbox>
									<el-checkbox v-model="checked">好友2</el-checkbox>
									<el-checkbox v-model="checked">好友3</el-checkbox>
								</div>
								<div class="one">
									<div class="one-zm"><span>A</span></div>
									<el-checkbox v-model="checked">好友1</el-checkbox>
									<el-checkbox v-model="checked">好友2</el-checkbox>
									<el-checkbox v-model="checked">好友3</el-checkbox>
								</div>
								<div class="one">
									<div class="one-zm"><span>A</span></div>
									<el-checkbox v-model="checked">好友1</el-checkbox>
									<el-checkbox v-model="checked">好友2</el-checkbox>
									<el-checkbox v-model="checked">好友3</el-checkbox>
								</div>
								<div class="one">
									<div class="one-zm"><span>A</span></div>
									<el-checkbox v-model="checked">好友1</el-checkbox>
									<el-checkbox v-model="checked">好友2</el-checkbox>
									<el-checkbox v-model="checked">好友3</el-checkbox>
								</div>
								<div class="one">
									<div class="one-zm"><span>A</span></div>
									<el-checkbox v-model="checked">好友1</el-checkbox>
									<el-checkbox v-model="checked">好友2</el-checkbox>
									<el-checkbox v-model="checked">好友3</el-checkbox>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

		</div>
	</div>
</template>




<script>
	// import { cnToAbc } from '@/utils/abc';
	export default {
		data() {
			return {
				//  图片上传地址 
				upfile_url: 'https://jsonplaceholder.typicode.com/posts/',
				radio2: 3, 
				textarea2: '这里是内容',
				//  form
				form: {
					// key
					key: [
						{ name: '模糊匹配1' },
						{ name: '模糊匹配2' },
						{ name: '模糊匹配3' }
					],
					//  匹配模式 1 模糊匹配 2 精准匹配
					mode: 1,
					//  回复  type text 文本 pic 图片 xcx 小程序
					res: [
						{ id: 1, type: 'text', conter: '', 
							imgs: []
						},
						{ id: 1, type: 'pic', conter: '',
							imgs: []
						},
					],
					//  回复好友 matey
					matey: {
						//  全选
						checked_all:false,
						//  好友列表
						checked_items: [
							{id:1,name:'刘武胜1',abc:'L'},
							{id:2,name:'刘武胜2',abc:'L'},
							{id:3,name:'刘武胜3',abc:'L'},
							{id:4,name:'刘武胜4',abc:'L'},
							{id:5,name:'刘武胜5',abc:'L'},
						],
						//  好友首字母数组
						matey_abc: [{name:'A'}]
					}
					
				}
			}
		},
		methods: {
			//  关键词事件
			//  回车插入 
			form_key_enter(e) {
				var dom = e.target;
				this.form.key.push({name:dom.value});
				dom.value = '';
				
			},
			//  删除关键词
			form_key_del(item, index) {
				this.form.key.splice(index,1);
			},
			//  点击回复类型
			form_res_click(item, str) {
				item.type = str;
			},
			//  删除回复
			form_res_del(item, index) {
				if(this.form.res.length > 1){
					this.form.res.splice(index,1);
				}
			},
			//  添加回复
			form_res_add(item, index) {
				this.form.res.push({id: 1, type: 'text', conter: '', imgs: []});
			},
			//  删除图片
			form_res_delimg(file, fileList) {
				console.log(file);
			},
			//  点击查看图片
			form_res_preview(file) {
				console.log(file.response);
			},
			//  图片上传完成
			form_res_success(response, file, fileList) {
				console.log(response);
			}
		},
		created() {
			// console.log( cnToAbc([{id:5,name:'刘武胜5',abc:'L'}]));
		},
	}
	
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	body {}
</style>