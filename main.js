// JavaScript source code
function greeting() {

    window.alert("Good morning!")
    document.getElementById("greeting").innerHTML = "And If I don't see ya"
    console.log("Good afternoon, good evening and good night")
}

function changeText() {
    let para = document.getElementById("new-para")

    if (para) {
        para.remove()
    } else {
        para = document.createElement("p")
        para.id = "new-para"
        let textNode = document.createTextNode(`With ${actor.getFullName()} as ${characters[0]}`)
        para.appendChild(textNode)
        document.getElementsById("title-container").appendChild(para)
    }
}
// array
const characters = []

characters[0] = "Truman Burbank"
// object
const actor = {}

actor.firstName = "Jim"
actor.lastName = "Carrey"
actor.getFullName = function () {
    return this.firstName + " " + this.lastName
}

const actress = {
    firstName: "Laura",
    lastName: "Linney",
    getFullName() {
        return this.firstName + " " + this.lastName
    }
}

console.log(actor.getFullName())
console.log(actress.getFullName())