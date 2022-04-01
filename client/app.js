const socket = io('ws://localhost:8080');

socket.on('playerId', text => {
    console.log(text);
    const el = document.createElement('li');
    el.innerHTML = text;
    document.querySelector('ul').appendChild(el)

});


//receive message from server


// socket.on('message', function (data) {
//     const el = document.createElement('li');
//     el.innerHTML = text;
//     document.querySelector('ul').appendChild(el)
// });



document.querySelector('button').onclick = () => {

    const text = document.querySelector('input').value;
    socket.emit('message', text)
    
}