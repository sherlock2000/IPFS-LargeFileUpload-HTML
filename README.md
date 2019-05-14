# IPFS-LargeFileUpload-HTML

A Web page for upload large files to IPFS nodes.Using HTML5 and Javascript,With progress bar and cross-domain support.

Web Page Demo : http://45.77.27.130/

## Usage

IPFS API   :    Fill in your local node Or leave it empty

Click Upload Button.

With browser support, you can upload files of unlimited size.one at a time.

### Environment 

install   IPFS node   https://github.com/ipfs/go-ipfs

```
$ ipfs init
$ ipfs daemon
$ ipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods '["PUT", "GET", "POST"]'
$ ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '["*"]'



```



