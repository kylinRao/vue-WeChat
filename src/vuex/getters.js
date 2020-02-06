import contact from './contacts' //存放所有联系人的数据
const getters = {

    //  从联系人中提取出首字母 再排序 

    contactsInitialList: state => {
        var initialList = [],
            allContacts = state.allContacts,
            max = allContacts.length
        for (var i = 0; i < max; i++) {
            if (initialList.indexOf(allContacts[i].initial.toUpperCase()) == -1) {
                initialList.push(allContacts[i].initial.toUpperCase())
            }
        }
        return initialList.sort()
    },

    // 将联系人根据首字母进行分类
    contactsList:  (state,getters)  => {

        
        var contactsList = {},
            allContacts = state.allContacts,
            max = allContacts.length;
        for (var i = 0; i < getters.contactsInitialList.length; i++) {
            var protoTypeName = getters.contactsInitialList[i]
            contactsList[protoTypeName] = []
            for (var j = 0; j < max; j++) {
                if (allContacts[j].initial.toUpperCase() === protoTypeName) {
                    contactsList[protoTypeName].push(allContacts[j])
                }
            }
        }
        return contactsList
    },
    //  根据入口用户名，查询对应的用户信息

    get_user_list: function(state){

        return function(user_list) {

        var user_info_list = []
            
        for (var i = 0; i < user_list.length; i++){
            user_info_list = user_info_list.concat([contact.getUserInfo(user_list[i])])
        }
        // console.log("打印获取到的个人信息")
        // console.log(user_info_list)

        return user_info_list
          }

        // var user_info_list = [],
            
        // for (var i = 0; i < user_list.length; i++){
        //     user_info_list = user_info_list + [contact.getUserInfo(user_list[i])]
        // }

        // return user_info_list.sort()
    },
    //  根据入口用户名，查询对应的用户信息

    get_user_info: function(state){

        return function(user_name) {

        var user_info = contact.getUserInfo(user_name)
        // console.log("打印获取到的个人信息")
        // console.log(user_info)

        return user_info
          }
    },


}

export default getters