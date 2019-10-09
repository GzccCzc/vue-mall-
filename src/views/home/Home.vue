<template>
    <div id="home" class="wrapper">
        <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
        <TabControl @tabClick="tabClick"
                    :titles="['流行', '新款' ,'精选']"
                    ref="tabControl1"
                    class="tab-control" v-show="isTabFixed"/>
        <Scroll class="content" ref="scroll"
                v-bind:probe-type="3"
                @scroll="contentScroll"
                :pull-up-load="true"
                @pullingUp="loadMore">
            <Swipe :banners="banners" @swipeimageload="swipeimageload"/>
            <recommend-views :recommends="recommends"/>
            <FeatureView/>
            <TabControl @tabClick="tabClick"
                        :titles="['流行', '新款' ,'精选']"
            ref="tabControl2"/>
            <goods-list :goods="goods[currentType].list"/>
        </Scroll>
        <back-top @click.native="backClick" v-show="isShowBackTop"/>
    </div>
</template>

<script>
    import {getHomeMultidata,getHomeGoods} from "../../network/home";
    import NavBar from "../../components/common/navbar/NavBar";
    import RecommendViews from "./childCpns/RecommendView";
    import Swipe from "./childCpns/Swipe";
    import FeatureView from "./childCpns/FeatureView";
    import TabControl from "../../components/content/tabControl/TabControl";
    import GoodsList from "../../components/content/goods/GoodsList";
    import Scroll from "../../components/common/scroll/Scroll";
    import BackTop from "../../components/content/backTop/BackTop";

    export default {
        name: "Home",
        components: {
            RecommendViews,
            Swipe,
            NavBar,
            FeatureView,
            TabControl,
            GoodsList,
            Scroll,
            BackTop,
        },
        data() {
            return {
                banners: [],
                recommends: [],
                goods:{
                    'pop': {page:0, list:[]},
                    'new': {page:0, list:[]},
                    'sell': {page:0, list:[]},
                },
                currentType:'pop',
                isShowBackTop: false,
                isTabFixed:false,
                tabOffsetTop:528,
                saveY:0,
            }
        },
        created() {
           this.getHomeMultidata()
           this.getHomeGoods('pop')
           this.getHomeGoods('new')
           this.getHomeGoods('sell')
        },
        activated(){
            // this.$refs.scrollTo(0,this.saveY,0)
        },
        deactivated(){
            // this.saveY=this.$refs.scroll.getScrollY
        },
        // mounted(){
        //     console.log(this.$refs.tabControl.$el.offsetTop)
        // },
        methods:{
            swipeimageload(){
                // console.log(this.$refs.tabControl2.$el.offsetTop)
            },
            tabClick(index){
                switch (index) {
                    case 0:
                        this.currentType='pop'
                        break
                    case 1:
                        this.currentType='new'
                        break
                    case 2:
                        this.currentType='sell'
                }
                this.$refs.tabControl1.currentIndex=index;
                this.$refs.tabControl2.currentIndex=index;
            },
            backClick() {
                this.$refs.scroll.scrollTo(0, 0)
            },
            contentScroll(position) {
                this.isShowBackTop = (-position.y) > 1000
                this.isTabFixed=(-position.y)>this.tabOffsetTop
            },
            getHomeMultidata(){
            getHomeMultidata().then(res => {
                this.banners = res.data.banner.list;
                this.recommends = res.data.recommend.list;
            })},
            getHomeGoods(type){
                const page=this.goods[type].page+1
            getHomeGoods(type,page).then(res=>{
                this.goods[type].list.push(...res.data.list)
                this.goods[type].page +=1
                this.$refs.scroll.finishPullUp()
    })},
            loadMore() {
                this.getHomeGoods(this.currentType)
                this.$refs.scroll.scroll.refresh()
            }
        }
    }
</script>

<style scoped>

.home-nav{
    background-color:hotpink;
    color: #fff;
    /*position: fixed;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top: 0;*/
    /*z-index: 9;*/
}



#home{

    height: 100vh;
    position: relative;
}

.content {
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
}
.tab-control{
    position: relative;
    z-index: 9;
}
</style>