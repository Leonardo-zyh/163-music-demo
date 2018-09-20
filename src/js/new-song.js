{
    let view = {
        el:'#newSong',
        template:`
        <span id="uploadSong">新建歌曲<span>
        `,
        render(data){
            $(this.el).html(this.template)
        }
    }
    let model = {}
    let controller = {
        init(view,model){
            this.view=view
            this.model=model
            this.view.render(this.model.data)
            this.active()
            this.bindEvents()
            this.bindEventHub()
        },
        bindEventHub(){            
            window.eventHub.on('upload',(data)=>{                            
                this.active()
            })
            window.eventHub.on('select',(data)=>{
                this.deactive()
            })        
        },
        bindEvents(){
            $('#newSong').on('click',(e)=>{
                window.eventHub.emit('clickUpload')
                this.active()
            })
        },
        active(){
            $(this.view.el).addClass('active')
        },
        deactive(){
            $(this.view.el).removeClass('active')
        }
    }
    controller.init(view,model)
}