{
    let view = {
        el: '#songList-container',
        template: `
            <ul class="songList">
                              
            </ul>
            `,
        render(data) {//<li v-for>
            let $el = $(this.el)
            $el.html(this.template)
            let { songs } = data
            let liList = songs.map((song) => $('<li></li>').text(song.name).attr('data-song-id',song.id))
            $el.find('ul').empty()
            liList.map((domLi) => {
                $el.find('ul').append(domLi)
            })
        },
        clearActive() { //去active
            $(this.el).find('.active').removeClass('active')
        },
        activeItem(li){ 
            let $li = $(li)
            $li.addClass('active')
                .siblings('.active').removeClass('active')
        }
    }
    let model = {
        data: {
            songs: []
        },
        find() {    //获取数据库歌曲信息
            let query = new AV.Query('Song')
            return query.find().then((songs)=> {
             this.data.songs = songs.map((song)=>{
                 return{id:song.id,...song.attributes}
             })
             return songs
            })
        }
    }
    let controller = {
        init(view, model) {
            this.view = view
            this.model = model
            this.view.render(this.model.data)
            this.bindEvents()
            this.bindEventHub()
            this.getAllSongs()
        },
        getAllSongs(){
            return this.model.find().then(()=>{
                this.view.render(this.model.data)
            })
        },
        bindEvents(){   //选取歌曲，获取信息
            $(this.view.el).on('click','li',(e)=>{
                this.view.activeItem(e.currentTarget)//获取点击选中的id值
                let songId = e.currentTarget.getAttribute('data-song-id')
                let data
                let songs = this.model.data.songs
                for(let i=0;i<songs.length;i++){ //遍历data的数据获取内容
                    if(songs[i].id===songId){
                        data = songs[i]         //data就是点击歌曲信息
                        break
                    }
                }   
                
                window.eventHub.emit('select',JSON.parse(JSON.stringify(data)))
            })

        },
        bindEventHub(){
            window.eventHub.on('upload', () => {
                this.view.clearActive()
            })
            window.eventHub.on('create', (songData) => {
                this.model.data.songs.push(songData)
                this.view.render(this.model.data)
                console.log(this.model.data);
            })
            window.eventHub.on('clickUpload', (data) => {
                this.view.clearActive()
            })
        }
    }
    controller.init(view, model)
}