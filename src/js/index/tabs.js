{
    let view = {
        el:'#tabs',
        init(){
            this.$el = $(this.el)
        },
        render(){

        }
    }
    let model = {}
    let controller = {
        init(view,model){
            this.view = view
            this.model = model
            this.view.init()
            this.bindEvents()
            this.view.render(this.model.data)
        },
        bindEvents(){
            this.view.$el.on('click','.tabs-nav>li',(e)=>{
                let $li = $(e.currentTarget)
                let pageName = $li.attr('data-tab-name')
                $li.addClass('active')
                    .siblings().removeClass('active')
                window.eventHub.emit('selectTab',pageName)
            })
        }
    }
    controller.init(view,model)
}