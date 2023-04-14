const mysql = require('mysql');
const express = require("express");
const bodyParser =require ("body-parser");
const app= express();


let firstnamevalue , lastnamevalue , countryvalue , subjectvalue;

const con = mysql.createConnection({
  host: "localhost",
  user: "yuktha",
  password: "password-comes-here",
  database: "mydb"
});

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.post("/submit",function(req,res){
     firstnamevalue=req.body.firstname;
    // console.log("firstname: "+firstname);
   
     lastnamevalue=req.body.lastname;
    // console.log("lastname: "+lastname);
     countryvalue=req.body.country;
    // console.log("country: "+country);
     subjectvalue=req.body.subject;
    // console.log("subject: "+subject);
    if (!firstnamevalue || !lastnamevalue || !countryvalue || !subjectvalue) {
      res.send('Please fill all fields');
    } else {
      con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
      // SQL query only executes if all fields are filled
      con.query('INSERT INTO contactData (firstname,lastname,country,subject ) VALUES (?, ?, ? , ?)', [firstnamevalue, lastnamevalue,countryvalue,subjectvalue], function (err, result) {
        if (err) {
          console.error(err);
          res.send('Error submitting form');
        } else {
          console.log(result);
          res.send('Form submitted successfully');
        }
      });
      con.query("SELECT * FROM contactData", function (err, result) {
        if (err) throw err;
        console.log(result);
      });
    });
  }
});

app.listen(3000,function(){
    console.log("server is running");
  });
