<template>
	<div class="m-header">
		<div class="header-left">
			<a href="/">
				<img src="static/img/logo.png" />
				<span>车保易管理平台</span>	
			</a>
		</div>
		<div class="header-right">
			<div class="right-user">
				<img src="static/img/user.jpg" />
				<span>13786102900</span>
				<a @click="logout()">退出</a>
			</div>
		</div>
		
	</div>

</template>

<script>
import { mapGetters } from 'vuex'
import errLogStore from 'store/errLog'

export default {
  components: {
  },
  data() {
    return {
      log: errLogStore.state.errLog
    }
  },
  computed: {
    
  },
  methods: {
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload()// 为了重新实例化vue-router对象 避免bug
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	
</style>