const socket=io()
let user_name;
do{
    user_name=prompt('Enter your name:')
}while(!user_name)
let textarea=document.querySelector("#textarea")
let messagearea=document.querySelector(".message_area")
textarea.addEventListener('keyup',(input)=>
{
    if(input.key==='Enter')
    {
        sendMessage(input.target.value)
    }
});

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
<h4>${msg.user}</h4>
<p>${msg.message}</p>
`
mainDiv.innerHTML=markup
messagearea.appendChild(mainDiv)
}

//Receive message on clients end(runs on browser)
socket.on("message",(msg)=>{
    appendMessage(msg,"incoming");
    scroll()
});

function scroll()
{
    messagearea.scrollTop=messagearea.scrollHeight
}