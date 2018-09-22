{
    let view = {
        el:'#app',
        template:`       
        .page::after{
            background: transparent url({__cover__}) no-repeat center; background-size: cover;
        }`
        ,
        render(data){
            let {song} = data
            let {lyrics,name,singer}= song
            $('style').html(this.template.replace('{__cover__}',song.cover))
            $(this.el).find('img.cover').attr('src',song.cover)
            $(this.el).find('h1').append(name)
            $(this.el).find('h2').append(' - '+ singer)
            //split空格，遍历数组，每行创建p放歌词
            lyrics.split('\n').map((string)=>{
                let p = document.createElement('p')
                p.textContent = string
                $(this.el).find('.lyric >.lines').append(p)
            })
            //$(this.el).css('background-image',`url(${song.cover})`) 
            console.log(lyrics);
                                            
        },
        play(){
            
            $(this.el).find('.disc-container').addClass('playing')
            $(this.el).find('audio')[0].play()
        },
        pause(){
         
            $(this.el).find('.disc-container').removeClass('playing')
            $(this.el).find('audio')[0].pause()
        }

    }
    let model = {
        data: {
           song:{
            id: '', 
            name: '',
            singer: '',
            url: '',
            cover:'',
           },
        status:'',
        },
       
        get(id) {
            let query = new AV.Query('Song');
            return query.get(id).then((song) => {
                Object.assign(this.data.song, { id: song.id, ...song.attributes })
                return song
            })
        }

    }
    let controller = {
        init(view, model) {
            this.view = view
            this.model = model
            let id = this.getSongId()   
            this.model.get(id).then(() => {
           this.view.render(this.model.data)            
            })
            console.log(this.model.data)
            
            this.bindEvents()
            console.log(this.model.status);
            
            
        },
        bindEvents(){
            $(this.view.el).on('click',()=>{          
                if(this.model.status ==='playing'){
                    this.view.pause()
                    this.model.status = 'paused'                    
                }else{
                    this.view.play()
                    this.model.status = 'playing'
                }
                
            })
        },                       
        getSongId() {//通过解析查询参数获取id
            let search = window.location.search
            if (search.indexOf('?') === 0) {
                search = search.substring(1)
            }
            let array = search.split('&').filter((v => v))
            let id = ''
            for (let i = 0; i < array.length; i++) {
                let kv = array[i].split('=')
                let key = kv[0]
                let value = kv[1]
                if (key === 'id') {
                    id = value
                    break
                }
            }

            return id
        }
    }
    controller.init(view, model)


}
