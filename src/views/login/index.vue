<template>
  <div class="login-container" style="background: url(static/img/bg-login.png) no-repeat;">
    <el-form class="card-box login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
    	<div class="text-center">
	      <div class="login-title">
	      	<img src="static/img/logo1.png" />
	      	<div>
	      		<h3>车保易管理平台</h3>
	      		<p>MANAGEMENT PLATFORM</p>
	      	</div>
	      </div>
    	</div>

      <el-form-item prop="username">
        <span class="svg-container svg-container_login">
          <img src="static/img/icon-user.png" />
        </span>
        <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="请输入您的手机号码进行绑定" />
      </el-form-item>
			
			<div class="one">
				<div class="one-left">
					<el-form-item prop="password">
		        <span class="svg-container">
		          <img src="static/img/icon-pwd.png" />
		        </span>
		        <el-input name="password" type="text" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on"
		          placeholder="请输入短信验证码" />
		      </el-form-item>
				</div>
				<div class="one-right">
					<el-button type="primary" style="width:100%;margin-bottom:30px;" :disabled="true">获取短信验证码</el-button>
				</div>
			</div>
			
      

      <el-button type="primary" style="width:100%;margin-bottom:30px;" :loading="loading" @click.native.prevent="handleLogin">绑&nbsp;定</el-button>

    </el-form>

  </div>
</template>

<script>
import { isvalidUsername } from '@/utils/validate'
import socialSign from './socialsignin'

export default {
  components: { socialSign },
  name: 'login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error('请输入正确的手机号码'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('验证码不能小于6位'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: 'admin',
        password: '1111111'
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      pwdType: 'password',
      loading: false,
      showDialog: false
    }
  },
  methods: {
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('LoginByUsername', this.loginForm).then(() => {
            this.loading = false
            this.$router.push({ path: '/' })
                // this.showDialog = true
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    afterQRScan() {
          // const hash = window.location.hash.slice(1)
          // const hashObj = getQueryObject(hash)
          // const originUrl = window.location.origin
          // history.replaceState({}, '', originUrl)
          // const codeMap = {
          //   wechat: 'code',
          //   tencent: 'code'
          // }
          // const codeName = hashObj[codeMap[this.auth_type]]
          // if (!codeName) {
          //   alert('第三方登录失败')
          // } else {
          //   this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
          //     this.$router.push({ path: '/' })
          //   })
          // }
    }
  },
  created() {
        // window.addEventListener('hashchange', this.afterQRScan)
  },
  destroyed() {
        // window.removeEventListener('hashchange', this.afterQRScan)
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "src/styles/mixin.scss";
  $bg:#2d3a4b;
  $dark_gray:#889aa4;
  $light_gray:#eee;

  .login-container {
    @include relative;
    height: 100vh;
    background-color: $bg;
    input:-webkit-autofill {
      -webkit-box-shadow: 0 0 0px 1000px #293444 inset !important;
      -webkit-text-fill-color: #fff !important;
    }
    input {
      /*background: transparent;*/
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
    }
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;
    }
    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;
    }
    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
      &_login {
        font-size: 20px;
      }
    }
    .title {
      font-size: 26px;
      font-weight: 400;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .login-form {
      position: absolute;
      left: 0;
      right: 0;
      /*width: 400px;*/
      /*padding: 35px 35px 15px 35px;*/
      /*margin: 120px auto;*/
    }
    .el-form-item {
      /*border: 1px solid rgba(255, 255, 255, 0.1);*/
      /*background: rgba(0, 0, 0, 0.1);*/
      /*border-radius: 5px;*/
      color: #454545;
    }
    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
    }
    .thirdparty-button{
      position: absolute;
      right: 35px;
      bottom: 28px;
    }
  }
</style>
