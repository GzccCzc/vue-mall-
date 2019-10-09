<template>
    <van-swipe :autoplay="3000" style="height: 150px">
        <van-swipe-item v-for="item in banners">
            <a :href="item.link">
            <img :src="item.image" alt="" height="150px" width="100%" @load="imageload">
            </a>
        </van-swipe-item>
    </van-swipe>
</template>

<script>
    export default {
        name: "Swipe",
        props: {
            banners: {
                type: Array,
                default() {
                    return []
                }
            }
        },
        methods:{
            imageload(){
                this.$emit('swipeimageload')
            }
        },
    }
</script>

<style scoped>

</style>