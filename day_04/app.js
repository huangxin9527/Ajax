//1.引入express
var express = require('express');
//2.创建web服务器,实例化
var app = express();
//3.设置监听端口
app.listen(9527, () => {
    //console.log(new Date().toLocaleString());
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