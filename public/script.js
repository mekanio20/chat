const socket = io.connect('http://localhost:5000/')

const main = document.querySelector('main')
const sender = document.getElementById('name')
const message = document.getElementById('message')
const btn = document.getElementById('btn')

btn.addEventListener('click', () => {
    socket.emit('chat', {
        message: message.value,
        sender: sender.value
    })
}, false)

socket.on('chat', data => {
    const output = document.createElement('div')
    const b = document.createElement('b')
    const p = document.createElement('p')
    output.classList = 'main__output'
    b.classList = 'sender__name'

    b.innerHTML = data.sender + ':'
    p.innerHTML = data.message
    
    output.appendChild(b)
    output.appendChild(p)

    main.appendChild(output)
    message.value = ''
})