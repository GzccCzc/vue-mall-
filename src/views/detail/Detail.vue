<template>
    <div id="detail">
        {{iid}}
        <nav-bar><div slot="cetnter">详情页</div></nav-bar>

    </div>
</template>

<script>
    import NavBar from "../../components/common/navbar/NavBar";
    export default {
        name: "Detail",
        components:{
            NavBar
        },
        data(){
            return{
                iid:null
            }
        },
        created() {
            this.iid =this.$route.params.iid
        }
    }
</script>

<style scoped>

</style>