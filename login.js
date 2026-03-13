function login()
{
fetch("/login",
{
method:"POST",
headers:
{
"Content-Type":"application/json"
},
body:JSON.stringify({
username:u.value,
password:p.value
})
})
.then(r=>r.json())
.then(d=>{

if(d.status=="ok")
{
    if(d.role=="admin")
        location="admin.html";
    else
        location="controller.html";
}
else
alert("Login fail");

});
}
