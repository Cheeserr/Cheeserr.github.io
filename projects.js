// JavaScript source code
let button = document.getElementById("movingButton")
function moveButton() {
    let x = Math.abs(Math.floor(Math.random() * window.innerWidth-100))
    let y = Math.abs(Math.floor(Math.random() * window.innerHeight-50))
    button.style.left = x + "px"
    button.style.top = y + "px"
}