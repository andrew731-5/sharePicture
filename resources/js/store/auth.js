import Axios from "axios"
import { OK } from '../util'

// ステート
const state = {
        user: null,
        apiStatus: null
    }
    // ゲッターズ
const getters = {
    check: state => !!state.user,
    username: state => state.user ? state.user.name : ''
}

const mutations = {
    setUser(state, user) {
        state.user = user
    },
    setApiStatus(state, status) {
        state.apiStatus = status
    },
}


const actions = {
    // 会員登録のアクション
    async register(context, data) {
        const response = await axios.post('/api/register', data)
        context.commit('setUser', response.data)
    },
    // ログインのアクション
    async login(context, data) {
        context.commit('setApiStatus', null)
            // 通信エラーの取得
        const response = await axios.post('/api/login', data).catch(err => err.response || err)

        if (response.status === OK) {
            // 通信ステータスの更新
            context.commit('setApiStatus', true)
            context.commit('setUser', response.data)
            return false
        }

        context.commit('setApiStatus', false)
        context.commit('error/setCode', response.status, { root: true })


    },
    // ログアウトのアクション
    async logout(context) {
        const response = await axios.post('/api/logout')
        context.commit('setUser', null)
    },
    //　ログインチェックアクション
    async currentUser(context) {
        const response = await axios.get('/api/user')
        const user = response.data || null
        context.commit('setUser', user)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}