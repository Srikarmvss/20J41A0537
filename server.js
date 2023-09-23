const express=require("express")
const axios=require("axios");

const app=express();
let trains=[];
let train;
let token;
let bearerToken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTU0NTczMjksImNvbXBhbnlOYW1lIjoiVHJhaW4gQ2VudHJhbCIsImNsaWVudElEIjoiMmE2MDY3Y2YtNzMwNy00MThkLWJmMGEtZjk0NzJkMjE3ZDJjIiwib3duZXJOYW1lIjoiIiwib3duZXJFbWFpbCI6IiIsInJvbGxObyI6IjUzNyJ9.CD_aLHI4JI0PcQRkEFAJbfDnZGsHlrGXDABCN6sJ0aE";
app.get("/",(req,res)=>{
    fetchToken();
    res.send("hello welcome");
});



   



app.post("/register",function(req,res){
    var company={
        "companyName":"Train Central",
        "ownerName":"srikar",
        "rollNo":"20J41A0537",
        "ownerEmail":"srikarmvss15@gmail.com",
        "accessCode":"IrVNez"
    };

    fetch('http://20.244.56.144/train/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(company),
        })
        .then((response) => {
            if (response.ok) {
            console.log('Data sent successfully');
            } else {
            console.error('Failed to send data');
            }
        })
    
    .catch((error) => {
        console.error('Error:', error);
    });

});
app.get("/auth",function(req,res){
    const authBody={
            "companyName":"Train Central",
            "clientID":"2a6067cf-7307-418d-bf0a-f9472d217d2c",
            "clientSecret":"rGxjrzODAJzVIvjP",
            "ownerName":"srikar",
            "ownerEmail":"srikarmvss15@gmail.com",
            "rollNo":"20J41A0537"
        
    };
    fetch('http://20.244.56.144/train/auth', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(authBody),
        })

        .then(response => response.json())
        .then(data => token=data.access_token)
        .then(res.send(token))
        
});


app.get("/trains",(req,res)=>{
    // fetchToken();
    const headers = new Headers({
        'Authorization': `Bearer ${bearerToken}`,
        'Content-Type': 'application/json'
       });
       
       // Make the request to the API
       fetch('http://20.244.56.144/train/trains', {
        method: 'GET',
        headers: headers
       })
       .then(response => response.json())
       .then(data => trains=data)
       .then(console.log(trains))
       .then(res.send(trains))
       .catch(error => console.error('Error:', error));

})
app.get("/trains/:trainNo",(req,res)=>{
    // fetchToken();
    var trainNo=req.params.trainNo;
    const headers=new Headers({
        'Authorization': `Bearer ${bearerToken}`,
        'Content-Type': 'application/json'
    });
    fetch(`http://20.244.56.144/train/trains/${trainNo}`, {
 method: 'GET',
 headers: headers
})
.then(response => response.json())
.then(data => trains=data)
.then(console.log(trains))
.then(console.log(train))
.catch(error => console.error('Error:', error));
})


app.listen(3000,function(req,res){
    console.log("server started");
});