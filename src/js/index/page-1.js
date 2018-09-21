    
{   
    let view = {
        el:'.page-1',
        init(){
            this.$el=$(this.el)
        },
        show(){
            this.$el.addClass('active')
        },
        hide(){
            this.$el.removeClass('active')
        },
        
        

    }
    let model = {

    }
    let controller = {
        init() {
            this.view=view
            this.model=model
            this.view.init()
            this.bindEventHub()
            this.loadModule( './js/index/page-1-1.js')
            this.loadModule( './js/index/page-1-2.js')
        },
        bindEventHub(){           
            window.eventHub.on('selectTab',(tabName)=>{
                
                if(tabName==='page-1'){
                    this.view.show()
                }else{
                    this.view.hide()
                }
            })
        },
        loadModule(url,){   //页面script引入js
            let script = document.createElement('script')
            script.src =url
            //script.onload=function(){console.log(url)}
            document.body.appendChild(script)
        }
    }
    controller.init(view,model)
}