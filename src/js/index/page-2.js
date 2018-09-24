{   
    let view = {
        el:'.page-2',
        template:`
        <a class="song-row" href="./song.html?id={song.id}">
            <div class='song-number'>{number}</div>
            <span class="play-sgchfi" >
            <h3>{song.name}</h3>
            <p>
                <svg class="icon icon-sq">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-sq"></use>
                </svg>
                {song.singer}
            </p>
            </span >
            <div class="playButton" href="./song.html?id={song.id}">
                <svg class="icon icon-play">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-play"></use>
                </svg>
            </div>
            </a>
        `,
        init(){
            this.$el=$(this.el)
        },
        show(){
            this.$el.addClass('active')
        },
        hide(){
            this.$el.removeClass('active')
        },
        render(data) {
            let { songs } = data
            let i=1
            let n='0'
            songs.map((song) => {
                let $a = $(this.template
                    .replace('{song.name}', song.name)
                    .replace('{song.singer}', song.singer)
                    .replace('{song.id}', song.id)
                    .replace('{number}',n+i)
                    .replace('{idd}','label')   
                )                
                if(i<=4){this.$el.find('.song-number').addClass('three')}
                if(i>=9){n = ''}
                this.$el.find('ol.list').append($a)
                i+=1
            })

        }

    }

    let model = {
        data: {
            songs: []
        },
        find() {    //获取数据库歌曲信息
            let query = new AV.Query('Song')
            return query.find().then((songs) => {
                this.data.songs = songs.map((song) => {                    
                    return Object.assign( {id: song.id}, song.attributes)
                })
                return songs
            })
        }
    }
    let controller = {
        init() {
            this.view=view
            this.model=model
            this.view.init()
            this.model.find().then(() => {
                //console.log(this.model.data);
                this.view.render(this.model.data)
            })
            this.bindEventHub()
        },
        bindEventHub(){
            window.eventHub.on('selectTab',(tabName)=>{
                
                if(tabName==='page-2'){
                    this.view.show()
                }else{
                    this.view.hide()
                }
            })
        }
    }
    controller.init(view,model)
}