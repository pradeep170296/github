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
location="controller.html";
else
alert("Login fail");
});
}
