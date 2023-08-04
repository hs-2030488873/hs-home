import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import NotFoundComponent from '@/pages/NotFound/index.vue'

declare module 'vue-router' {
    interface RouteMeta {
        isAlive?: boolean
        componentName?: string
        title?: string
        transition?: string
    }
}

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'home',
        component: () => import('../pages/Home/index.vue'),
        meta: {
            isAlive: true,
            componentName: 'home'
        },
        children: [
            {
                path: '/drag',
                name: 'drag',
                component: () => import('../pages/Drag/index.vue')
            },
            {
                path: '/test',
                name: 'test',
                component: () => import('../pages/Test/index.vue')
            },
            {
                path: '/todolist',
                name: 'todolist',
                component: () => import('../pages/TodoList/index.vue')
            },
            {
                path: '/lifecycle',
                name: 'lifecycle',
                meta: {
                    isAlive: true,
                    componentName: 'lifecycle'
                },
                component: () => import('../pages/LifeCycle/index.vue')
            },
            {
                path: '/webrtc',
                name: 'webrtc',
                meta: {
                    isAlive: false
                },
                component: () => import('../pages/WebRTC/index.vue')
            },
            {
                path: '/instant-messaging',
                name: 'instant-messaging',
                meta: {
                    isAlive: false
                },
                component: () => import('../pages/InstantMessaging/index.vue')
            }
        ]
    }
]

const notFoundRoute: RouteRecordRaw = {
    path: '/:pathMatch(.*)',
    component: NotFoundComponent
}

routes.push(notFoundRoute)

const router = createRouter({
    history: createWebHashHistory(),
    routes,
    scrollBehavior: (_1, _2, savedPosition) => {
        if (savedPosition) {
            return savedPosition
        } else {
            return {
                top: 0,
                left: 0
            }
        }
    }
})

// ! 全局前置钩子
// @ts-ignore
router.beforeEach((to, from, next) => {
    // console.log("beforeEach:", to, from);
    next()
})

// ! 全局后置钩子
// @ts-ignore
router.afterEach((to, from, failure) => {
    // console.log("afterEach:", to, from, _);
})

export default router
