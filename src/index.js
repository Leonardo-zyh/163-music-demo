//import * as qiniu from 'qiniu-js'


//Leancloud 数据库
var APP_ID = 'yoouyd1GVbIu26emFakPEmjU-gzGzoHsz';
var APP_KEY = 'x7araepVAkVA3c2j3MQDcx21';

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});


/*
var Playlist = AV.Object.extend('Playlist');
var playlist = new Playlist();
playlist.save({
  name: 'test',
  cover:'test',
  creatorId:'test',
  description:'test',
  songs:['1','2']
}).then(function(object) {
  alert('LeanCloud Rocks!');
},()=>{alert('error')})

var Song = AV.Object.extend('Song');
var song = new Song();
song.save({
  name: 'test',
  singer:'test',
  url:'test',
}).then(function(object) {
  alert('LeanCloud Rocks!');
},()=>{alert('error')})
*/
console.log(qiniu);
console.log(window.AV);


