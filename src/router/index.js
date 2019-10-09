import VueRouter from 'vue-router'
import Vue from 'vue'

const Home = () => import('../views/home/Home')
const Detail = () => import('../views/detail/Detail')
const Category = () => import('../views/category/Category')
const Cart = () => import('../views/cart/Cart')
const Profile = () => import('../views/profile/Profile')


Vue.use(VueRouter)
const routes = [
    {
        path: '',
        redirect: '/home'
    },
    {
        path: '/home',
        component: Home
    },
    {
        path: '/category',
        component: Category
    },
    {
        path: '/cart',
        component: Cart
    },
    {
        path: '/profile',
        component: Profile
    },
    {
        path: '/deatil/:iid',
        component: Detail
    }
]
const router = new VueRouter({
    routes,
    mode: 'history'
})

export default router