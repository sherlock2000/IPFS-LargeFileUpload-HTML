var FileUpload = (function(){
    var xhr;
    var _init = function(){
        var file = $("#uploadFile")[0].files[0];
        var url = $("#ipfs_api").val()==""?"http://"+window.location.host+"/api/v0/add":$("#ipfs_api").val();
        if(!file)return;
        var fd = new FormData();
        fd.append("file",file);
        $("#uploadFile").val("");
        xhr = new XMLHttpRequest();
        xhr.upload.addEventListener("progress", _uploadProgress, false);
        xhr.addEventListener("load", _uploadComplete, false);
        xhr.addEventListener("error", _uploadFailed, false);
        xhr.open("POST", url);
        xhr.send(fd);
    };
    var _uploadProgress = function(evt){
        if (evt.lengthComputable) {
            var percentComplete = Math.round(evt.loaded * 100 / evt.total).toString()+"%";
            $("#upload_progress").width(percentComplete);
            $("#upload_progress div").html(percentComplete);
        }
        else {
            $("#upload_progress div").html('unable to compute');
        }
    };
    var _uploadComplete = function(evt){
        try {
            var res = JSON.parse(evt.target.response);
            if(res.Hash!=='' && res.Name!==''){
                $("#response_hash").html(res.Hash);
                $("#response_name").html(res.Name);
                $("#response_size").html(_bytesToSize(res.Size));
            }
        }catch (e) {

        }

    };
    var _uploadFailed = function(evt){

    };
    var cancel = function(){
        xhr.abort();
    };
    var _bytesToSize = function(bytes){
        if (bytes <= 0) return '0 B';
        var k = 1024;
        sizes = ['B','KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        i = Math.floor(Math.log(bytes) / Math.log(k));
        var num = bytes / Math.pow(k, i);
        return num.toPrecision(3) + sizes[i];
    };
    return{
        start:_init,
        cancel:cancel
    };
})();
