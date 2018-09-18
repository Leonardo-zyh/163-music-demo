{
     let view = {
        el:'#songList-container',
        template:`
        <ul class="songList">
        <li class="active">歌曲1</li>
                <div></div>
                <li>歌曲2</li>
                <div></div>
                <li>歌曲3</li>
                <div></div>
                <li>歌曲4</li>
                <div></div>
                <li>歌曲5</li>
                <div></div>
                <li>歌曲6</li>
                <div></div>
                <li>歌曲7</li>
                <div></div>
                <li>歌曲8</li>
                <div></div>
                <li>歌曲9</li>
                <div></div>
                <li>歌曲10</li>
                <div></div>                
            </ul>
            `,
        render(data){
            $(this.el).html(this.template)
        }
    }
    let model={}
    let container={
        init(view,model){
            this.view = view
            this.model = model
            this.view.render(this.model.data)
        }
    }
    container.init(view,model)
}