//1.引入express
var express = require('express');
//引入data
var poke=require('./data');
// console.log(poke[32-1]);
//2.创建web服务器,实例化
var app = express();
//3.设置监听端口
app.listen(9527, () => {
    console.log(new Date().toLocaleString());
    console.log('冲呀!');
});
//4.静态资源托管express.static()将静态资源的目录放入到参数中,不是必须静态资源就叫public，也不是必须只有这一个文件目录可以托管
app.use(express.static('./public'));
//5.在终端启动服务器nodeapp.js
//6.在地址栏中找到响应的html页面，打出地地2o查看是否运行成功http://127.0.0.1:8080/01_obj.html

//7.给前台一个接口地址，因为前台发请求用的get，后台交互数据，也用get方法
//地址的路径（字符串格式）
app.get('/ajaxget', (req, res) => {
    console.log('前台有请求了');
    //8.返回给前台数据
    res.send('给你数据绿线接通了');
});
// 这个接口是接收
//接收前台?方式传递参数
app.get('/getpar1',(req,res)=>{
    console.log(req.query);
});
//接收前台 / 的方式传递的参数,接收参数的方式是在接口地址后加 /:字段名字
app.get('/getpar2/:names',(req,res)=>{
    console.log(req.params);
});
// 接收post方法的接口地址
// 接收之前，需要单独解析通过urlencode传递的格式
app.use(express.urlencoded({extended:false}));

app.post('/ajaxpost',(req,res)=>{
    console.log(req.body);
    res.send('post方式的返回值');
});
// 接收put方法的接口地址
app.put('/ajaxput',(req,res)=>{
    console.log(req.body);
    res.send('put方式返回值');
});
// 接收delete方法的接口地址
app.delete('/ajaxdelete/:names',(req,res)=>{
    console.log(req.params)
    res.send('delete方式返回值');
});
// 测试用户传递的数据能否传递到后台
app.post('/jh',(req,res)=>{
    var mains = 'tao';
    
    if (req.body.names===mains) {
        res.send('成功');
    } else {
        res.send('失败');
    }
});
// poker接口，查询小精灵数据
app.get('/poker',(req,res)=>{
    // 收到的数据是字符串格式，做一个隐式转换
    var x = req.query.id*1;
    // console.log(x);
    //拿到的数据是id
    // console.log(poke[x-1])
    var datajson = poke[x-1];
    res.send(datajson);
})
//该接口返回一个小精灵的数据
app.get('/pokeshow',(req,res)=>{
    // 将前台传来的id转为数字类型
    let  x = req.query.id;
    // console.log(x);
    //将转好的数字的id放到poke数字中当索引使用，但要-1
    //此时的datajson是一组小精灵的数据，

    let  datajson = (poke[x-1]);
    //把找好数据传回给前台
    res.send(datajson);
})

app.get('/pockelist',(req,res)=>{
    res.send(poke);
});