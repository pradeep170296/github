load();

function load()
{
fetch("/users")
.then(r=>r.json())
.then(data=>{

list.innerHTML="";

data.forEach(u=>{

let li=document.createElement("li");

li.innerHTML=
u.username +
" <button onclick='del(\""+
u.username+
"\")'>Delete</button>";

list.appendChild(li);

});

});
}


function addUser()
{
fetch("/addUser",
{
method:"POST",
headers:
{
"Content-Type":"application/json"
},
body:JSON.stringify({
username:newUser.value,
password:newPass.value,
role:"user"
})
})
.then(()=>load());
}


function del(name)
{
fetch("/deleteUser",
{
method:"POST",
headers:
{
"Content-Type":"application/json"
},
body:JSON.stringify({
username:name
})
})
.then(()=>load());
}
