const CloudFrontParser = require('cloudfront-log-parser');
const fs = require('fs');
const zlib = require('zlib');

var gzippedFilePt = "/Users/rhysc/Downloads/Test8_index4_E1G10UPNA6D8ZJ.2018-05-08-07.88d9ed97.gz";

var processAccessEntry = function(access){
  var queryString = access['cs-uri-query'];
  var decodedQueryString = decodeURI(decodeURI(queryString));
  var arr = decodedQueryString.split("&")
  let dict = {}
  arr.forEach(element => {
    let kvp = element.split("=");
    dict[kvp[0]] = decodeURI(kvp[1])
  });
  
  if(dict['cx']){
    var buf = Buffer.from(dict['cx'], 'base64');
    dict['cx_decoded'] = buf.toString('utf8');    
  }   
  if(dict['ue_px']){
    //dict['e'] should equal ue_px
    var buf = Buffer.from(dict['ue_px'], 'base64');
    dict['ue_px_decoded'] = buf.toString('utf8');    
  }
  let merged_dic = Object.assign({}, access, {"decode_dict":dict});
  console.log(merged_dic);
  console.log("-----------------------------------------------------");
}


const parser = new CloudFrontParser({ format: 'web' });
parser.on('readable', function () {
  let access;
  while (access = parser.read()) {
    processAccessEntry(access)
  }
});
 
fs.createReadStream(gzippedFilePt).pipe(zlib.createGunzip()).pipe(parser);
