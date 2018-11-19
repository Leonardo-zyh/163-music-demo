# 仿网易云音乐

包含管理端（admin 页面）

## 启动应用

1. npm i -g http-server
2. http-server -c-1
3. node server 8888
4. open http://127.0.0.1:8080/src/admin.html


#深拷贝 JSON.parse(JSON.stringify(object))
<li v-for>

`手不要抖（不要打错代码）`
`眼不要瞎（不要看不见代码错误）`
`记性不要差（不要忘了代码逻辑）`

#MVC
view是页面控制，el是选择器，template是末班内容，render是渲染到页面的过程
model是数据库，接受输出data对象
controller是控制器，init初始化，所有模块都会在这里执行

#订阅发布模式
#eventHub(事件中心)
emit是发布事件
on是监听事件

#获取数据库歌曲信息
 find()
 this.view.render(this.model.data)

 #选取歌曲，获取信息
 获取点击选中的id值，遍历modle.data的数据获取内容，通过id选中内容，data就是点击歌曲信息。
 然后深拷贝，发布select事件
 window.eventHub.emit('select',JSON.parse(JSON.stringify(data)))

 #通过事件的分布和订阅来切换页面
 bindEventHub(){}   发布订阅
 bindEvents(){}     绑定监听

 #create(data)新建，update(data)修改更新
AV.Object.extend('Song')
AV.Object.createWithoutData('Song', this.data.id)

#局部更新
 $(".songList").load(location.href+".songList")


  

#tab切换
通过事件中心加active，用display来show和hide。

# 页面script引入js 
loadModule(url,){  
            let script = document.createElement('script')
            script.src =url
            //script.onload=function(){console.log(url)}
            document.body.appendChild(script)
        }

#查询参数来获取id值
window.location.search
let search = window.location.search
if(search.indexOf(?)===0){
    search = search.substring(1)
}

#获取真值
filter((v=>v))
#通过id取数据

#播放页面
autoplay    css-audio自动播放
controls    添加播放控件
$().play()  播放
$().pause() 暂停

#高斯模糊
filter: blur(5px)		高斯模糊（放伪元素中）

#audio
audio.onended 
audio.ontimeupdate


#手机log页面alert化
window.onerror = function(message,row){
    alert(message)
    alert(file)
}


