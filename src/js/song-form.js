{
    let view = {
        el: '#mainWrapper',
        template: `
        <div class="uploadHint">上传成功，请编辑歌曲信息！</div>
        <div class="formWrapper">
            <form class="form">               
                <div class="row">
                    <b for="">歌名：</b>
                    <input name="name" type="text" value="__name__">
                </div>
                <div class="row">
                    <b for="">歌手：</b>
                    <input name="singer" type="text" value="__singer__">
                </div>
                <div class="row">
                    <b for="">外链：</b>
                    <input name="url" type="text" value="__url__">
                </div>
                <div class="row actions">
                        <button type="submit">确定</button>
                    </div>
                
            </form>
        <div>
            `,
        render(data = {}) {
            let placeholders = ['name', 'url','singer','id']
            let html = this.template
            placeholders.map((string) => {
                html = html.replace(`__${string}__`, data[string] || '')
            })
            $(this.el).html(html)
        },
        //
        init() {
            this.$el = $(this.el)
        },
        reset(){//重置
            this.render={}
        }
    }

    let model = {
        data: {
            name: '', singer: '', url: '', id: ''
        },
        create(data) {
            var Song = AV.Object.extend('Song');
            var song = new Song();
            song.set('name', data.name)
            song.set('singer', data.singer)
            song.set('url', data.url)
            return song.save().then((newSong) => {
                let {id,attributes} = newSong
                Object.assign(this.data,{
                    id,
                    ...attributes,//属性内容
                    //singer:attributes.singer,
                    //url:attributes.url
                })
                //console.log(newSong);
            }, (error) => { console.error('error') })
        }
    }

    let controller = {
        init(view, model) {
            this.view = view
            this.model = model
            this.view.init()
            this.view.render(this.model.data)
            this.bindEvents()
            $('.uploadHint').hide()            
            window.eventHub.on('upload', (data) => {
                $(this.view.el).show()
                $('.uploadHint').show()
                this.model.data = data
                this.view.render(this.model.data)
            })
            window.eventHub.on('select',(data)=>{
                //console.log(data);
                this.model.data = data
                this.view.render(this.model.data)                
                $('#uploadComplete').hide()
                $(this.view.el).show()                                
            })
            
        },
        bindEvents() {
            this.view.$el.on('submit', 'form', (e) => {
                e.preventDefault()
                let needs = 'name singer url'.split(' ')
                let data = {}
                needs.map((string) => {
                    data[string] = this.view.$el.find(`[name="${string}"]`).val()
                })
                this.model.create(data)
                    .then(()=>{
                        this.view.reset() //JSON深拷贝                       
                        let string = JSON.stringify(this.model.data)
                        let object = JSON.parse(string)
                        window.eventHub.emit('create',object)                        
                    })
                window.location.reload()
                //$(this.view.el).hide()
                //$('#uploadComplete').show()
                
            })
        }
    }
    controller.init(view, model)
}