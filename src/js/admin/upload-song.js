{
    let view = {
        el: '#uploadComplete',
        template: `
        <div id="uploadWrapper" class="uploadWrapper">
        <div class="clicktext">
        <div class="textWeapper">
        <b>请选择文件或将文件拖拽至此上传</b>
        <p>文件大小不能超过 20MB </p>
        </div>
        <div id="uploadStatus" class="uploadStatus"></div>
        </div>
        <div id="uploadButton" class="clickable">选择文件<div>
        </div>
       

        `,
        render(data){
            $(this.el).html(this.template)
        }
    }
    let model = {
        data:{
            status:'open'
        }
    }
    let controller = {
        init(view,model){
            this.view=view
            this.model=model
            this.view.render(this.model.data)
            this.initQiniu()
            $(this.view.el).hide()
            window.eventHub.on('clickUpload', (data) => {
                $('#mainWrapper').hide()
                $(this.view.el).show()                
            })
            window.eventHub.on('upload', (data) => {
                $(this.view.el).hide()
            })
        },
        initQiniu(){
            var uploader = Qiniu.uploader({
                runtimes: 'html5',    //上传模式,依次退化
                browse_button: 'uploadButton',       //上传选择的点选按钮，**必需**
                uptoken_url: 'http://localhost:8888/uptoken',
                domain: 'http://pf6u6xf2m.bkt.clouddn.com/',   //bucket 域名，下载资源时用到，**必需**
                get_new_uptoken: false,  //设置上传文件的时候是否每次都重新获取新的token
                max_file_size: '20mb',           //最大文件体积限制
                dragdrop: true,                   //开启可拖曳上传
                drop_element: 'uploadWrapper',        //拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
                auto_start: true,                 //选择文件后自动上传，若关闭需要自己绑定事件触发上传
                init: {
                    'FilesAdded':  (up, files)=> {
                        plupload.each(files, function (file) {
                            // 文件添加进队列后,处理相关的事情
                        });
                    },
                    'BeforeUpload':  (up, file)=> {
                        // 每个文件上传前,处理相关的事情
                       /* window.eventHub.emit('beforeUpload')
                        if(this.model.data.status==='closed'){
                            return false
                        }else{
                            this.model.data.status = 'closed'
                        }*/
                    },
                    'UploadProgress':  (up, file)=> {
                        // 每个文件上传时,处理相关的事情
                        $('.textWeapper').hide()
                        uploadStatus.textContent = '上传中,请稍等...'
                    },
                    'FileUploaded':  (up, file, info)=> {
                        //uploadStatus.textContent = '上传完毕'
                        // 每个文件上传成功后,处理相关的事情
                        window.eventHub.emit('afterUpload')
                        this.model.data.status = 'open'
                        var domain = up.getOption('domain');
                        var response = JSON.parse(info.response);
                        var sourceLink = domain + encodeURIComponent(response.key); //获取上传成功后的文件的Url
                        //console.log(sourceLink);
                        //uploadStatus.textContent = sourceLink
                        //uploadDetail.textContent = response.key
                        uploadStatus.textContent = ''

                        window.eventHub.emit('upload', {//eventHub事件中心发布
                            url: sourceLink,
                            name: response.key
                          })
                        
                    },
                    
                    'Error': function (up, err, errTip) {
                        //上传出错时,处理相关的事情
                    },
                    'UploadComplete': function () {
                        //队列文件处理完毕后,处理相关的事情
                    },
                }
            });
        }
    }
    controller.init(view,model)
}