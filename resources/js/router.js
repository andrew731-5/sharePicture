import Vue from "vue"
import VueRouter from "vue-router"
// ページコンポーネントとインポートする
import PhotoList from "./pages/PhotoList"
import Login from './pages/Login.vue'
// ストア
import store from './store'
// システムエラー
import SystemError from './pages/errors/System.vue'

// VueRouterプラグインを使用する
// これによって<RouterView />コンポーネントなどを使うことができる
Vue.use(VueRouter)


// パスとコンポーネントのマッピング
const routes = [{
        path: '/',
        component: PhotoList
    },
    {
        path: '/login',
        component: Login,
        beforeEnter(to, from, next) {
            if (store.getters['auth/check']) {
                next('/')
            } else {
                next()
            }
        }
    }, {
        path: '/500',
        component: SystemError
    }
]

// VueRouterインスタンスを作成する
const router = new VueRouter({
    mode: "history", // history モード
    routes
})

// VueRouterインスタンスをエクスポートする
// app.jsでインポートするため
export default router