import Vue from 'vue'
import Vuex from 'vuex'
import OfficialAccounts from "./official-account" //存放所有关注的公众号
import contact from './contacts' //存放所有联系人的数据
import mutations from "./mutations"
import actions from "./actions"
import getters from "./getters"
Vue.use(Vuex)
    // 统一管理接口域名 
let apiPublicDomain = '//vrapi.snail.com/'

const state = {
    currentLang: "zh", //当前使用的语言 zh：简体中文 en:英文 后期需要
    newMsgCount: 0, //新消息数量
    allContacts: contact.contacts, //所有联系人
    OfficialAccounts: OfficialAccounts, //所有关注的公众号
    currentPageName: "全部对话", //用于在wx-header组件中显示当前页标题
    //backPageName: "", //用于在返回按钮出 显示前一页名字 已遗弃
    headerStatus: true, //显示（true）/隐藏（false）wx-header组件
    tipsStatus: false, //控制首页右上角菜单的显示(true)/隐藏(false)
    is_opened_array : [],
    // 所有接口地址 后期需要
    apiUrl: {
        demo: apiPublicDomain + ""
    },
    msgList: {

        stickMsg: [], //置顶消息列表 后期需要
        baseMsg :[]
    //     baseMsg: [{ //普通消息列表
    //             "mid": 1, //消息的id 唯一标识，重要
    //             "type": "friend",
    //             "group_name": "",
    //             "group_qrCode": "",
    //             "read": true, //true；已读 false：未读
    //             "newMsgCount": 1,
    //             "quiet": false, // true：消息免打扰 false：提示此好友/群的新消息
    //             "msg": [{ //对话框的聊天记录 新消息 push 进
    //                 "content": "长按这些白色框消息，唤醒消息操作菜单，长按这些白色框消息，唤醒消息操作菜单",
    //                 "date": 1488117964495,
    //                 "name": "阿荡",
    //                 "headerUrl": "https://sinacloud.net/vue-wechat/images/headers/header01.png"
    //             }, {
    //                 "content": '点击空白处，操作菜单消失',
    //                 "date": 1488117964495,
    //                 "name": "阿荡",
    //                 "headerUrl": "https://sinacloud.net/vue-wechat/images/headers/header01.png"
    //             }, {
    //                 "content": '来呀 快活啊',
    //                 "date": 1488117964495,
    //                 "name": "阿荡",
    //                 "headerUrl": "https://sinacloud.net/vue-wechat/images/headers/header01.png"
    //             }],
    //             "user": ["康康"] // 此消息的用户数组 长度为1则为私聊 长度大于1则为群聊
    //         },
    //         {
    //             "mid": 2,
    //             "type": "group",
    //             "group_name": "收购万达讨论群",
    //             "group_qrCode": "",
    //             "read": false,
    //             "newMsgCount": 1,
    //             "quiet": true,
    //             "msg": [{
    //                     "content": "长按消息，唤醒消息操作菜单",
    //                     "report_time": 1488117964495,
    //                     "name": "夜华",
    //                     "headerUrl": "https://sinacloud.net/vue-wechat/images/headers/yehua.jpg"
    //                 }, {
    //                     "content": '点击空白处，操作菜单消失',
    //                     "report_time": 1488117964495,
    //                     "name": "阿荡",
    //                     "headerUrl": "https://sinacloud.net/vue-wechat/images/headers/header01.png"
    //                 },
    //                 {
    //                     "content": '我试一试',
    //                     "report_time": 1488117964495,
    //                     "name": "夜华",
    //                     "headerUrl": "https://sinacloud.net/vue-wechat/images/headers/yehua.jpg"
    //                 }
    //             ],
    //             "user": ["韩梅梅","李雷"]
    //         },
    //         {
    //             "mid": 3,
    //             "type": "group",
    //             "group_name": "收购淘宝讨论群",
    //             "group_qrCode": "",
    //             "read": true,
    //             "newMsgCount": 1,
    //             "quiet": true,
    //             "msg": [{
    //                 "content": '冒个泡',
    //                 "date": 1488117964495,
    //                 "name": "诸葛亮",
    //                 "headerUrl": "https://sinacloud.net/vue-wechat/images/headers/zhugeliang.jpg"
    //             }],
    //             "user": [contact.getUserInfo('wxid_zhenji'), contact.getUserInfo('wxid_zhugeliang'), contact.getUserInfo('wxid_zhaohd')]
    //         },
    //         {
    //             "mid": 4,
    //             "type": "friend",
    //             "group_name": "",
    //             "group_qrCode": "",
    //             "read": false,
    //             "newMsgCount": 4,
    //             "quiet": false,
    //             "msg": [{
    //                 "content": "长按消息，唤醒消息操作菜单",
    //                 "date": 1488117964495,
    //                 "name": "孙权",
    //                 "headerUrl": "https://sinacloud.net/vue-wechat/images/headers/sunquan.jpg"
    //             }, {
    //                 "content": '点击空白处，操作菜单消失',
    //                 "date": 1488117964495,
    //                 "name": "孙权",
    //                 "headerUrl": "https://sinacloud.net/vue-wechat/images/headers/sunquan.jpg"
    //             }, {
    //                 "content": '容我三思',
    //                 "date": 1488117964495,
    //                 "name": "孙权",
    //                 "headerUrl": "https://sinacloud.net/vue-wechat/images/headers/sunquan.jpg"
    //             }],
    //             "user": [contact.getUserInfo('wxid_sunquan')]
    //         },
           
    //     ]
    // }

    }
}


export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})