module.exports = {
  encode: function(data,key){
    if(data === null || key === null) return null;
    var message = new Buffer(data).toString('base64');
    var newmsg = '';
    for(i=0; i<message.length; i++){
      newmsg += String.fromCharCode(message.charCodeAt(i) ^ key.charCodeAt(i%key.length));
    }
    return newmsg;
  },

  decode: function(data,key){
    if(data === null || key === null) return null;
    var message = new Buffer(data,'base64').toString('utf8');
    var newmsg = '';
    for(i=0; i<message.length; i++){
      newmsg += String.fromCharCode(message.charCodeAt(i) ^ key.charCodeAt(i%key.length));
    }
    return newmsg;
  },

  key: function(key){
    return (((parseInt(key)) * 4) + 4).toString();
  },

  keyVirtual: function(){
    var min = 1000, max = 5000;
    return Math.floor(Math.random() * max) + min;
  }
};
