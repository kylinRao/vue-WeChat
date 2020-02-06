<template>
    <div class="dialogue">
        <header id="wx-header">
            <div class="other">
                <router-link :to="{path:'/wechat/dialogue/dialogue-info',query: { msgInfo: msgInfo}}" tag="span" class="iconfont icon-chat-group" v-show="$route.query.group_num&&$route.query.group_num!=1"></router-link>
                <router-link :to="{path:'/wechat/dialogue/dialogue-detail',query: { msgInfo: msgInfo}}" tag="span" class="iconfont icon-chat-friends" v-show="$route.query.group_num==1"></router-link>
            </div>
            <div class="center">
                <router-link to="/" tag="div" class="iconfont icon-return-arrow">
                    <span>返回</span>
                </router-link>
                <span>{{pageName}}</span>
                <span class="parentheses" v-show='$route.query.group_num&&$route.query.group_num!=1'>{{$route.query.group_num}}</span>
            </div>
        </header>
        <section id='msgbox' class="dialogue-section clearfix" v-on:click="MenuOutsideClick">
            <div   class="row clearfix" v-for="item in msgInfo.msg">
                <img :src="$store.getters.get_user_info(item.name).headerUrl" class="header">
                <p class="text" v-more>{{item.content}}</p>
            </div>
            <span class="msg-more" id="msg-more"><ul>
                    <li>复制</li>
                    <li>转发</li>
                    <li>收藏</li>
                    <li>删除</li>
                </ul>
                </span>
        </section>
        <footer class="dialogue-footer">
            <div class="component-dialogue-bar-person">
                <span class="iconfont icon-dialogue-jianpan" v-show="!currentChatWay" v-on:click="currentChatWay=true"></span>
                <span class="iconfont icon-dialogue-voice" v-show="currentChatWay" v-on:click="currentChatWay=false"></span>
                <div class="chat-way" v-show="!currentChatWay">
                    <div class="chat-say" v-press>
                        <span class="one">按住 说话</span>
                        <span class="two">松开 结束</span>
                    </div>
                </div>
                <div class="chat-way" v-show="currentChatWay">
                    <input class="chat-txt" type="text" v-on:focus="focusIpt" v-on:blur="blurIpt"/>
                </div>
                <span class="expression iconfont icon-dialogue-smile"></span>
                <span class="more iconfont icon-dialogue-jia"></span>
                <div class="recording" style="display: none;" id="recording">
                    <div class="recording-voice" style="display: none;" id="recording-voice">
                        <div class="voice-inner">
                            <div class="voice-icon"></div>
                            <div class="voice-volume">
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                        <p>手指上划,取消发送</p>
                    </div>
                    <div class="recording-cancel" style="display: none;">
                        <div class="cancel-inner"></div>
                        <p>松开手指,取消发送</p>
                    </div>
                </div>
            </div>
        </footer>
    </div>
</template>
<script>
    import contact from '../../vuex/contacts' //存放所有联系人的数据
    export default {
        data() {
        
            return {
                pageName: this.$route.query.name,
                currentChatWay: true, //ture为键盘打字 false为语音输入
                timer: null
                    // sayActive: false // false 键盘打字 true 语音输入
            }
        },
        created(){

        },
        mounted(){
            if (this.$store.state.is_opened_array.includes(this.$route.query.mid.toString()) ){
                console.log("当前会话已与服务器建立长连接")
            }else{
                console.log("新建当前会话的长连接")
                var host_port = '101.206.211.127:8000'  //当前后端使用不同的服务器时，需要手动修改对接地址
            var ws_scheme = window.location.protocol == "https:" ? "wss" : "ws";
            var chatsock = new this.ReconnectingWebSocket(ws_scheme + '://' + host_port + "/chat/stream" +'/'+ this.$route.query.mid+'/' );
            this.$store.commit('add_opened_ws',this.$route.query.mid.toString())
            var _this = this
            console.log(_this.$store.state.msgList.baseMsg)
            console.log("连接新建成功")
            chatsock.onmessage = this.getMessageInfo;
        // chatsock.onmessage = function(message) {
        //     var data = JSON.parse(message.data);
        //     console.log("收到ws消息")
        //     console.log(data)
        //     console.log(_this)
        //     var chat = $("#chat")
        //     var ele = $('<tr></tr>')
        //     var msg_type = data.msg_type
            
        //         if (msg_type===0){
        //             console.log("更新聊天内容")
        //             console.log(_this.$store.state.msgList)
        //             var tmp_baseMsg = _this.$store.state.msgList.baseMsg
        //             for(var i = 0; i < tmp_baseMsg.length; i++){
        //                 if (tmp_baseMsg[i] === _this.$route.query.mid ){
        //                     tmp_baseMsg[i].msgList.concat([data])
        //                     _this.$store.commit("update_rooms",tmp_baseMsg)
        //                     console.log(_this.$store.state.msgList.baseMsg)
        //                     break;
        //                 }
        //             }


        //             ele.append(
        //             $("<td></td>").text(data.username)
        //         )
        //         ele.append(
        //             $("<td></td>").text(data.handle)
        //         )
        //         ele.append(
        //             $("<td></td>").text(data.message)
        //         )

        //         chat.append(ele)
        //         }

        // };
            }
            
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                vm.$store.commit("setPageName", vm.$route.query.name)
            })
        },
        computed: {
            msgInfo() {
                for (var i in this.$store.state.msgList.baseMsg) {
                    if (this.$store.state.msgList.baseMsg[i].mid == this.$route.query.mid) {
                        return this.$store.state.msgList.baseMsg[i]
                    }
                }
            }
        },
        directives: {
            press: {
                inserted(element, binding) {
                    var recording = document.querySelector('.recording'),
                        recordingVoice = document.querySelector('.recording-voice'),
                        recordingCancel = document.querySelector('.recording-cancel'),
                        startTx, startTy;
                    
                    element.addEventListener('touchstart', function(e) {
                        // 用bind时，vue还没插入到dom,故dom获取为 undefine，用 inserted 代替 bind,也可以开个0秒的定时器
                        element.className = "chat-say say-active"
                        recording.style.display = recordingVoice.style.display = "block"
                            // console.log('start')
                        var touches = e.touches[0]
                        startTx = touches.clientX
                        startTy = touches.clientY
                        e.preventDefault()
                    }, false)
                    element.addEventListener('touchend', function(e) {
                        /*var touches = e.changedTouches[0];
                        var distanceY = startTy - touches.clientY;
                        if (distanceY > 50) {
                            console.log("取消发送信息");
                        }else{
                            console.log("发送信息");
                        }*/

                        element.className = "chat-say"
                        recordingCancel.style.display = recording.style.display = recordingVoice.style.display = "none"
                            // console.log('end')
                        e.preventDefault()
                    }, false)
                    element.addEventListener('touchmove', function(e) {
                        var touches = e.changedTouches[0],
                            endTx = touches.clientX,
                            endTy = touches.clientY,
                            distanceX = startTx - endTx,
                            distanceY = startTy - endTy;

                        if (distanceY > 50) {
                            element.className = "chat-say"
                            recordingVoice.style.display = "none"
                            recordingCancel.style.display = "block"
                        }else{
                            element.className = "chat-say say-active"
                            recordingVoice.style.display = "block"
                            recordingCancel.style.display = "none"
                        }
                        // 阻断事件冒泡 防止页面被一同向上滑动
                        e.preventDefault()
                    }, false);
                }
            },
            more: {
                bind(element, binding) {
                    var startTx, startTy
                    element.addEventListener('touchstart', function(e) {
                        var msgMore = document.getElementById('msg-more'),
                            touches = e.touches[0];
                        startTx = touches.clientX
                        startTy = touches.clientY
                        
                        clearTimeout(this.timer)
                        this.timer = setTimeout(()=>{
                            // 控制菜单的位置
                            msgMore.style.left = ((startTx - 18) > 180 ? 180 : (startTx - 18)) + 'px'
                            msgMore.style.top = (element.offsetTop - 33) + 'px'
                            msgMore.style.display = "block"
                            element.style.backgroundColor = '#e5e5e5'
                        },500)

                    }, false)
                    element.addEventListener('touchmove', function(e) {
                        var touches = e.changedTouches[0],
                            disY = touches.clientY;
                        if (Math.abs(disY-startTy)>10) {
                            clearTimeout(this.timer)
                        }
                    }, false)
                    element.addEventListener('touchend', function(e) {
                        clearTimeout(this.timer)
                    }, false)
                }
            }
        },
        methods: {
            // 解决输入法被激活时 底部输入框被遮住问题
            focusIpt() {
                this.timer = setInterval(function() {
                    document.body.scrollTop = document.body.scrollHeight
                }, 100)
            },
            blurIpt() {
                clearInterval(this.timer)
            },
            // 点击空白区域，菜单被隐藏
            MenuOutsideClick(e) {
                var container = document.querySelectorAll('.text'),
                    msgMore = document.getElementById('msg-more')
                if (e.target.className === 'text') {

                } else {
                    msgMore.style.display = 'none'
                    container.forEach(item=>item.style.backgroundColor='#fff')
                }
            },
            getMessageInfo({ data }){
            let msg = JSON.parse(data)  //后端返回的是json数据,需要转换
        switch (msg.msg_type) {
          case 0:
            console.log(this.$store)
            console.log("更新聊天内容")
                    console.log(this.$store.state.msgList)
                    var tmp_baseMsg = this.$store.state.msgList.baseMsg
                    for(var i = 0; i < tmp_baseMsg.length; i++){
                        console.log(tmp_baseMsg[i].mid)
                        console.log(this.$route.query.mid)
                        if (tmp_baseMsg[i].mid == this.$route.query.mid ){
                          
                            tmp_baseMsg[i].msg = tmp_baseMsg[i].msg.concat([msg])
                        
                            this.$store.commit("update_rooms",tmp_baseMsg)
                            var div = document.getElementById('msgbox');
                             div.scrollTop = div.scrollHeight;
                             console.log("新增一个对话内容")
                      
                            break;
                        }}
            
            break
          case '222':
            this.$store.commit('socket/UPDATE_COUNTUNREAD', msg.data)
            break
    
        }
        },
            
        }
    }
</script>
<style>
    @import "../../assets/css/dialogue.css";
    .say-active {
        background: #c6c7ca;
    }
</style>