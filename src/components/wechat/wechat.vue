<template>
    <!--微信组件-->
  <div id="wechat">
    <ul class="wechat-list">
        <!--props传递消息对象 baseMsgObj -->
        <msg-item  v-for="baseMsgObj in $store.state.msgList.baseMsg" :item="baseMsgObj" class="list-row line-bottom" :key="baseMsgObj.id"></msg-item>
    </ul>
  </div>
</template>
<script>
    import search from "../common/search"
    import msgItem from "../wechat/msg-item"
    export default {
        components: {
            search,
            msgItem
        },
        mixins: [window.mixin],
        data() {
            return {
                "pageName": "全部对话",
                "get_rooms_post_data":{
                "size":30,                
                },

                "rooms_list":[111],
                
            }
        },
        created () {            
            // eslint-disable-next-line            
            this.get_rooms();  
        
            },
        mounted(){
 
        },
    // computed(){
    //     msg_update(){
    //         return this.$store.state.msgList;
    //     }

    // },
        methods:{
            get_rooms: function() {
            this.$http.post("/api/get_rooms",this.get_rooms_post_data).then((response) => {
                console.log("获取到返回值")
                console.log(response.data)
                console.log(response.data.data)
                console.log(this.rooms_list)
                this.rooms_list=response.data.data
                console.log(this.rooms_list)
                this.$store.commit("update_rooms",response.data.data);
                

            },(response) => {
                console.log("出错了");
            }).catch(function(response) {
                console.log(response)
            })
        }
        }
    }
</script>
<style>
    @import "../../assets/css/wechat.css";
</style>