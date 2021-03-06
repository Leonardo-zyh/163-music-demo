{
    let view = {
        el: '.page-3',
        template: `
        <div class="inputcover">
        <div class="serarch">
        <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-search"></use>
        </svg>
        <input type="search" name="search" class="input" placeholder="搜索歌曲、歌手、专辑" value="" autocomplete="off">
        </div>
        <div class="hotlist">热门搜索</div>
        <figure class="close"><i class="u-svg u-svg-empty"></i></figure>
        </div>
        <div class="serarch-song">
              <a href="./song.html?id=5ba32d390b6160006f928cca" class="red-song" >Let Her Go</a>          
              <a href="./song.html?id=5ba359529f54540036140bd2" class="red-song" >Look What You Made Me Do</a>                              
            </div>
            <a href="./playlist" class="red-song ts" >Taylor Swift</a>
        `,
        init() {
            this.$el = $(this.el)
        },
        show() {
            this.$el.addClass('active')
        },
        hide() {
            this.$el.removeClass('active')
        },
        render(data) {
            $(this.el).html(this.template)
        }

    }
    let model = {

    }
    let controller = {
        init() {
            this.view = view
            this.model = model
            this.view.init()
            this.view.render(this.model.data)
            this.bindEventHub()
        },
        bindEventHub() {
            window.eventHub.on('selectTab', (tabName) => {
                if (tabName === 'page-3') {
                    this.view.show()
                } else {
                    this.view.hide()
                }
            })
        }
    }
    controller.init(view, model)
}