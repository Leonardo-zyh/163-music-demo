{
    let view = {
        el:'#newSong',
        template:`
        新建歌曲
        `,
        render(data){
            $(this.el).html(this.template)
        }
    }
    let model = {}
    let container = {
        init(view,model){
            this.view=view
            this.model=model
            this.view.render(this.model.render)
        }
    }
    container.init(view,model)
}