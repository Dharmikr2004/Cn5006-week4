//including the express module in the code
var express=require("express")
var fs=require("fs")
var app=express()

var bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));

//Text that will be appear at the landing page
app.get('/',function(req,res){
    res.send("Hello, this is my first express application")
})

//Printing the prot number in the output
app.listen(5000,function(){
    console.log("server is running on port 5000")
})

//About page output
app.get('/about',function(req,res){
    res.send("This is basic express application")
})

app.get('/users/:userId/books/:bookId',function(req,res){
    res.send(req.params)
})

//reading student file
app.get('/GetStudents',function(req,res){
    StudentData={}
    fs.readFile(__dirname+"/"+"Student.json",'utf8',function(err,data){
        console.log(data);
        res.json({'status':true, 'Status_Code':200,'requested at':req.localtime,'requrl':req.url,'request Method': req.method, 'studentdata':JSON.parse(data)});
    })
})

//searching the json file
app.get('/GetStudentid/:id',(req,res)=>{
    studentdata={}
    fs.readFile(__dirname+"/"+"Student.json","utf8",function(err,data){
        var Students=JSON.parse(data)
        var Students=Students["Student"+req.params.id]
        console.log("student",Students)
        
        if(Students)
            res.json(Students)
        else
            res.json({'status':true, 'Status_Code':200, 'requested  at':req.localtime, 'requrl':req.url, 'request Method': req.method, 'Studentdata':JSON.parse(data)});
    });
})

app.get('/studentinfo',function(req,res)
{
res.sendFile('StudentInfo.html', { root: __dirname });
})
app.post('/submit-data', function (req, res) {
    var name = req.body.firstName + ' ' + req.body.lastName+
    ' ';
    var Age= req.body.myAge+ ' Gender: ' + req.body.gender
    Qual='Qualification'+ req.body.Qual
    console.log(req.body.Qual)
    res.send({
    status: true,
    message: 'form Details', data: {
    name: name, age:Age, Qualification:Qual,
    }
    });
    });