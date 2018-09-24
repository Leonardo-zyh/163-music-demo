{
    let view = {
        el:'.page-3',
        template:`
        <div class="inputcover">
        <i class="u-svg u-svg-srch"></i>
        <input type="search" name="search" class="input" placeholder=""value="" autocomplete="off">
        <label class="holder">搜索歌曲、歌手、专辑</label>
        <figure class="close"><i class="u-svg u-svg-empty"></i></figure>
        </div>
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
        render(data){
            $(this.el).html(this.template)
        }

    }
    let model = {

    }
    let controller = {
        init() {
            this.view=view
            this.model=model
            this.view.init()
            this.view.render(this.model.data)
            this.bindEventHub()
        },
        bindEventHub(){
            window.eventHub.on('selectTab',(tabName)=>{
                if(tabName==='page-3'){
                    this.view.show()
                }else{
                    this.view.hide()
                }
            })
        }
    }
    controller.init(view,model)
}