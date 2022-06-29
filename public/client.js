const socket=io()
var user_name;
 do{
     user_name=prompt('Enter your name:')
 }while(!user_name)

let textarea=document.querySelector("#textarea")
let messagearea=document.querySelector(".message_area")
let cuser=document.querySelector(".connected-user-name")
let sendbutton = document.getElementById("send-button");

socket.emit('new-user', user_name)
socket.on('user_connected',user_name =>
{
    //cuser.innerHTML="You are chatting with "+user_name
    let msg= {
        user:user_name,
        message:" has joined"
    }
    appendAlerts(msg)
});
socket.on('user-disconnected', name => {
    let msg= {
        user:user_name,
        message:" has disconnected"
    }
    appendAlerts(msg)
  })
textarea.addEventListener('keyup',(input)=>
{
    if(input.key==='Enter')
    {
        sendMessage(input.target.value)
    }
});


sendbutton.addEventListener("click",sendfunction)  
function sendfunction()
{
    
}       



function sendMessage(message) 
{
    let msg= {
        user:user_name,
        message:message.trim()
    }
    appendMessage(msg,'outgoing')
    textarea.value=''
    socket.emit('message',msg)
    scroll()
}

function appendMessage(msg,type)
{
let mainDiv=document.createElement('div')
let className=type
mainDiv.classList.add(className,'message')

let markup=
`
<div class="mbox">
<h4>${msg.user}</h4>
<p>${msg.message}</p>
</div>
`
mainDiv.innerHTML=markup
messagearea.appendChild(mainDiv)
}

function appendAlerts(msg)
{
let mainDiv=document.createElement('div')
mainDiv.innerHTML=`<div class="alerts">${msg.user}${msg.message}</div>`
messagearea.appendChild(mainDiv)
}

//Receive message on clients end(runs on browser)
socket.on("message",(msg)=>{
    appendMessage(msg,"incoming");
    console.log(msg.user)
    scroll()
});
function scroll()
{
    messagearea.scrollTop=messagearea.scrollHeight
}
