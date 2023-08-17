import { defineStore } from 'pinia'
import { login, loginout, userinfo } from '../api/user'
import { RouteRecordRaw } from 'vue-router'

export const useUserStore = defineStore('user', {
    state: () => {
        return {
            userInfo: {
                account: '',
                clientIp: '',
                name: '',
                permission: [],
                sessionId: '',
                userId: 0
            },
            permissionRoutes: [] as RouteRecordRaw[],
            menuRouteList: [] as RouteRecordRaw[]
        }
    },

    actions: {
        async login(username: string, password: string) {
            const ret = await login(username, password)

            if (ret.code !== 0) {
                return Promise.resolve(ret)
            }

            this.userInfo = ret.data

            return Promise.resolve()
        },

        async logout() {
            const ret = await loginout()

            if (ret.code !== 0) {
                return Promise.reject(ret)
            }

            this.$reset()

            return Promise.resolve()
        },

        async getUserInfo() {
            if (this.userInfo.account) {
                return Promise.resolve()
            }

            const ret = await userinfo()

            if (ret.code !== 0) {
                return Promise.resolve(ret)
            }

            this.userInfo = ret.data

            return Promise.resolve()
        }
    }
})
