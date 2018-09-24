
{
    let view = {
        el: 'section.songs',
        template:
            `
            <a class="songs-row" href="./song.html?id={song.id}">
            <h3>{song.name}</h3>
            <p>
                <svg class="icon icon-sq">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-sq"></use>
                </svg>
                {song.singer}
            </p>
            <div class="playButton" ">
                <svg class="icon icon-play">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-play"></use>
                </svg>
            </div>
            </a>
            `
        ,
        init() {
            this.$el = $(this.el)
        },
        render(data) {
            let { songs } = data
            songs.map((song) => {
                let $a = $(this.template
                    .replace('{song.name}', song.name)
                    .replace('{song.singer}', song.singer)
                    .replace('{song.id}', song.id)
                )
                this.$el.find('ol.list').append($a)
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
            this.view = view
            this.view.init()
            this.model = model
            this.model.find().then(() => {
                console.log(this.model.data);
                this.view.render(this.model.data)
            })

            //this.bindEvents()
        }
    }
    
    controller.init(view, model)
    
    
}