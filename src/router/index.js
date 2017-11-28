import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development env not use Lazy Loading,because Lazy Loading too many pages will cause webpack hot update too slow.so only in production use Lazy Loading

Vue.use(Router)

/* layout */
import Layout from '../views/layout/Layout'

/**
* icon : the icon show in the sidebar
* hidden : if `hidden:true` will not show in the sidebar
* redirect : if `redirect:noredirect` will no redirct in the levelbar
* noDropdown : if `noDropdown:true` will has no submenu
* meta : { role: ['admin'] }  will control the page role
**/
export const constantRouterMap = [
    { path: '/login', component: _import('login/index'), hidden: true },
    { path: '/authredirect', component: _import('login/authredirect'), hidden: true },
    { path: '/404', component: _import('errorPage/404'), hidden: true },
    { path: '/401', component: _import('errorPage/401'), hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: '/reply/index',
    name: '主动回复内容列表',
    hidden: true,
    children: [{ path: 'reply', component: _import('reply/index') }]
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/reply',
    component: Layout,
    icon: 'icon',
    noDropdown: true,
    meta: { role: ['admin'] },
    children: [
    	{ path: 'index', meta: { role: ['admin'] }, component: _import('reply/index'), name: '主动回复内容列表' },
    	{ path: 'edit/index', meta: { role: ['admin'] }, icon: 'tab', component: _import('reply/edit/index'), name: 'Tab' }
	]
  },
  {
    path: '/key',
    component: Layout,
    icon: 'icon',
    noDropdown: true,
    meta: { role: ['admin'] },
    children: [
    	{ path: 'index', meta: { role: ['admin'] }, component: _import('key/index'), name: '关键词关联自动回复' },
    	{ path: 'edit/index', meta: { role: ['admin'] }, icon: 'tab', component: _import('key/edit/index'), name: 'Tab' }
    ]
  },
  {
    path: '/single',
    component: Layout,
    icon: 'icon',
    noDropdown: true,
    meta: { role: ['admin'] },
    children: [{ path: 'index', meta: { role: ['admin'] }, component: _import('single/index'), name: '支持出单的保险公司' }]
  },

  { path: '*', redirect: '/404', hidden: true }
]
