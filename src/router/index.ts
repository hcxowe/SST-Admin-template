import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { useUserStore } from '../store/user'
import MainLayout from '../views/layout/MainLayout.vue'

const routes: RouteRecordRaw[] = [
    { path: '/login', component: () => import('../views/login/Login.vue') }
]

const asyncRoutes: RouteRecordRaw[] = [
    {
        path: '/home',
        component: MainLayout,
        children: [
            {
                path: '',
                name: 'Home',
                component: () => import('../views/home/Home.vue'),
                meta: {
                    permission: 'home',
                    title: '首页',
                    hidden: false,
                    path: '/home',
                    noCache: false,
                    affix: true
                }
            }
        ]
    },
    {
        path: '/about',
        component: MainLayout,
        children: [
            {
                path: '',
                name: 'About',
                component: () => import('../views/about/About.vue'),
                meta: {
                    permission: 'about',
                    title: '关于',
                    hidden: false,
                    path: '/about',
                    noCache: false,
                    affix: false
                }
            }
        ]
    },
    {
        path: '/system',
        name: 'System',
        component: MainLayout,
        meta: {
            permission: 'system',
            title: '系统管理',
            hidden: false,
            path: '/system'
        },
        children: [
            {
                path: 'user',
                name: 'User',
                component: () => import('../views/system/userManage/User.vue'),
                meta: {
                    permission: 'user',
                    title: '用户管理',
                    hidden: false,
                    path: '/system/user',
                    noCache: false,
                    affix: false
                }
            },
            {
                path: 'permission',
                name: 'Permission',
                component: () => import('../views/system/Permission.vue'),
                meta: {
                    permission: 'permission',
                    title: '权限管理',
                    hidden: false,
                    path: '/system/permission',
                    noCache: true,
                    affix: false
                }
            }
        ]
    },
    {
        path: '/:pathMatch(.*)',
        name: 'notFound',
        component: () => import('../views/notFound/404.vue'),
        meta: {
            hidden: true
        }
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

function hasPermission(roles: string[], route: RouteRecordRaw) {
    if (route.meta && route.meta.permission) {
        return roles.some(role => role === route.meta.permission)
    }

    return true
}

function filterAsyncRoutes(routes: RouteRecordRaw[], permission: string[]): RouteRecordRaw[] {
    const res: RouteRecordRaw[] = []

    routes.forEach(route => {
        const tmp = { ...route }

        if (hasPermission(permission, tmp)) {
            if (tmp.children) {
                tmp.children = filterAsyncRoutes(tmp.children, permission)
            }

            res.push(tmp)
        }
    })

    return res
}

function isHiddenRoute(route: RouteRecordRaw): boolean {
    if (route.meta && route.meta.hidden) {
        return true
    }

    if (route.children) {
        return route.children.every(childRoute => isHiddenRoute(childRoute))
    }

    return false
}

function getMenuDataList(routes: RouteRecordRaw[]): RouteRecordRaw[] {
    const res: RouteRecordRaw[] = []

    routes.forEach(route => {
        const tmp = { ...route }

        if (!isHiddenRoute(tmp)) {
            res.push(tmp)
        }
    })

    return res
}

let logined = false

router.beforeEach(async (to, from) => {
    const userStore = useUserStore()

    // 未获取到用户信息，跳转到登录
    if (userStore.userInfo.account === '') {
        const err = await userStore.getUserInfo()

        if (typeof err !== 'undefined') {
            if (to.path === '/login') {
                return true
            }

            return { path: '/login' }
        }

        // 根据用户权限算出最终展示路由
        const retRoute = filterAsyncRoutes(asyncRoutes, userStore.userInfo.permission)
        retRoute.forEach((r) => {
            router.addRoute(r)
        })

        userStore.permissionRoutes = retRoute
        userStore.menuRouteList = getMenuDataList(retRoute)

        if (to.path === '/login' || to.path === '/') {
            return { path: '/home' }
        }

        return { path: to.path }
    }

    // 已登录，不能跳转登录
    if (to.path === '/login') {
        return false
    }

    // 用户登录组装路由
    if (from.path === '/login' && to.path === '/home') {
        if (logined) {
            return true
        }

        logined = true

        if (userStore.userInfo.account !== '') {
            // 根据用户权限算出最终展示路由
            const retRoute = filterAsyncRoutes(asyncRoutes, userStore.userInfo.permission)
            retRoute.forEach((r) => {
                router.addRoute(r)
            })

            userStore.permissionRoutes = retRoute
            userStore.menuRouteList = getMenuDataList(retRoute)

            return { path: to.path }
        }

        return false
    }

    return true
})

export default router
