const socket = io()
let name;
let textarea = document.querySelector('#textarea')
let enviar = document.querySelector('#enviar')
let ti_cont = document.querySelector('#a')
let messageArea = document.querySelector('.message__area')
do {
    name = prompt('Insira o seu nome: ')
} while (!name)

textarea.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        sendMessage(e.target.value)
    }
})

enviar.addEventListener('click', (e) => {
    sendMessage1(textarea.value)

})

function sendMessage(message) {
    let msg = {
            user: name,
            message: message.trim()
        }
        // Append 
    appendMessage(msg, 'outgoing')
    textarea.value = ''
    scrollToBottom()

    // Send to server 
    socket.emit('message', msg)

}

function sendMessage1(message) {
    let msg = {
            user: name,
            message: message
        }
        // Append 
    appendMessage(msg, 'outgoing')
    textarea.value = ''
    scrollToBottom()

    // Send to server 
    socket.emit('message', msg)

}


function appendMessage(msg, type) {
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'message')

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
}

// Recieve messages 
socket.on('message', (msg) => {
    appendMessage(msg, 'incoming')
    scrollToBottom()
})

function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}


socket.on('login', (cont, sms) => {
    ti_cont.innerHTML = `Chat (${cont})`
    sms.forEach(mgs => {
        appendMessage(mgs, 'incoming')
        scrollToBottom()
    });
})
socket.on('logout', (cont) => {
    ti_cont.innerHTML = `STP.Chat <h3 style="color:'green'>${cont} pessoas conectadas</h3>`
})


