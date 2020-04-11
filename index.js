var express = require('express');
var bodyparser = require('body-parser');
var app = express();
var multer = require("multer");
var path = require("path");
app.use(bodyparser());
//app.use(bodyParser.urlencoded({extended:true}));
//app.use(bodyParser.json());
var mc = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017";
var dbname = "project";

app.get('/',(req,res)=>{
    res.render("CreateNewAccount");
});
app.get('/CreateNewAccount',function(req,res){

    res.render("CreateNewAccount");
    
});


app.post("/FileUpload",(req,res)=>{
	var paths = null;
		var storage = multer.diskStorage({
			destination: function (req, file, cb) {
			  cb(null, __dirname+"/UploadFiles");
			},
			filename: function (req, file, cb) {
					paths = "UploadFiles/" + path.basename(file.originalname);
					console.log(paths);
				//paths = file.fieldname + '-' + Date.now() + path.extname(file.originalname); 
				cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
			  //console.log(path.basename(file.originalname));
			  console.log(file);
			}
		  });
		  
		  var upload = multer({ storage: storage }).single('FileToUpload');
		  
		  //For Multiple File Upload.
		  //var upload = multer({ storage: storage }).array('FileToUpload',4);
	
		  upload(req, res, function (err) {
			if (err instanceof multer.MulterError) {
				console.log(err);
				// A Multer error occurred when uploading.
			} else if (err) {
				console.log(err);
			  // An unknown error occurred when uploading.
			}else{
				res.set(200).json(paths);
				console.log("File Uploaded Successfully...");
			}
		
			// Everything went fine.
		  });
});

app.post('/CreateNewAccount',(req,res)=>{

    mc.connect(url,(err,db)=>{
		if(err) throw err;
		console.log("Connected Successfully For Create New Account...");
        var dbo = db.db(dbname);
		var collections = dbo.collection("student");

        var data=
        {
			Image:req.param("Image",null),
            FName:req.param("FName",null),
            LName:req.param("LName",null),
            ContactNo:req.param("ContactNo",null),
            EmailId:req.param("EmailId",null),
			Password:req.param("Password",null),
			Status:"Y"
		}

        collections.insertOne(data,function(err,docs){

        if(err) throw err;            
        res.set(200).send("your account created......");

		});
		db.close();
    });
});
app.use(express.static(__dirname + '/js'));
app.use(express.static(__dirname + '/images'));
app.listen(2000,()=>{console.log("listion on port no 2000 ......")});
app.set('view engine','ejs');
