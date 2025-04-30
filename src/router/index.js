import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter)

const router = new VueRouter({
    mode: "history",
    routes: [
        {
            path: "/",
            redirect: "/find"
        },
        {
            path: "/find",
            component: () => import("@/views/HomePage")
        },
        {
            path: "/detail",
            component: () => import("@/views/DetailPage")
        },
    ]
})

//全局路由守卫
router.beforeEach((to, from, next) => {
    next()
})

export default router