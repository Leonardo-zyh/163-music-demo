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
            $('.cover').attr('src',song.cover)

            $(this.el).find('.song-description h1').text(name)
            $(this.el).find('.song-description h2').text(' - '+ singer)
            if($(this.el).find('audio').attr('src') !== song.url){
                let audio = $(this.el).find('audio').attr('src', song.url).get(0)
                audio.onended = ()=>{ window.eventHub.emit('songEnd') }
                audio.ontimeupdate = ()=> { this.showLyric(audio.currentTime) }
            }
            //split空格，遍历数组，每行创建p放歌词
            lyrics.split('\n').map((string)=>{
                let p = document.createElement('p')
                let regex = /\[([\d:.]+)\](.+)/
                let matches = string.match(regex)
                if(matches){
                    p.textContent = matches[2]
                    let time =matches[1]
                    let parts = time.split(':')
                    let minutes = parts[0]
                    let seconds = parts[1]
                    let newTime = parseInt(minutes,10)*60 + parseFloat(seconds,10) - 1
                    p.setAttribute('data-time',newTime)
                }else{
                    p.textContent = string
                }                                
                $(this.el).find('.lyric >.lines').append(p)
            })
            //$(this.el).css('background-image',`url(${song.cover})`) 
           // console.log(lyrics);
                                            
        },
        showLyric(time){
            let allP = $(this.el).find('.lyric>.lines>p')
            let p 
            for(let i =0;i<allP.length;i++){
              if(i===allP.length-1){
                p = allP[i]
                break
              }else{
                let currentTime = allP.eq(i).attr('data-time')
                let nextTime = allP.eq(i+1).attr('data-time')
                if(currentTime <= time && time < nextTime){
                  p = allP[i]
                  break
                }
              }
            }
            let pHeight = p.getBoundingClientRect().top
            let linesHeight = $(this.el).find('.lyric>.lines')[0].getBoundingClientRect().top
            let height = pHeight - linesHeight
            $(p).addClass('active').siblings().removeClass('active')
            $(this.el).find('.lyric>.lines').css({
              transform: `translateY(${- (height - 25)}px)`
            })
            
          },          
        play(){                        
            $(this.el).find('.disc-container').addClass('playing')           
            $(this.el).find('audio')[0].play()
            $('.cover').addClass('animation')            
        },
        pause(){
            var container = document.querySelector('.cover-wrapper');
            var image = container.querySelector('.cover');                  
            $(this.el).find('.disc-container').removeClass('playing')
            $(this.el).find('audio')[0].pause()
            let iTransform = getComputedStyle(image).transform;
            let cTransform = getComputedStyle(container).transform;
            container.style.transform = cTransform === 'none'
                ? iTransform
                : iTransform.concat(' ', cTransform);
            $('.cover').removeClass('animation')
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
        },
        bindEvents(){
            $(this.view.el).on('click',()=>{
                //this.model.status==='palying'? this.view.pause():this.view.play()       
                if(this.model.status ==='playing'){
                    this.model.status = 'paused'
                    this.view.pause()                                       
                }else{
                    this.model.status = 'playing'
                    this.view.play()
                }                
            })
            window.eventHub.on('songEnd', ()=>{
                this.model.data.status = 'paused'
                this.view.render(this.model.data)
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
