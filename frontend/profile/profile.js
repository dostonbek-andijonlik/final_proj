const PORT = 8080

const userData = window.localStorage.getItem("user_data") ? JSON.parse(window.localStorage.getItem("user_data")) : window.location.assign("../index.html")
const id = userData.id

const tableBody = document.getElementById("tBody")
const contactForm = document.getElementById("contactForm")
const nameInput = document.getElementById("nameInput")
const phoneInput = document.getElementById("phoneInput")
const logOutButton = document.querySelector(".log_out_button")
const userNameElem = document.getElementById("userName")
userNameElem.textContent = userData.login

function renderData(data, elem){
    elem.innerHTML = null
    for(let i = 0; i < data.length; i++){
        const newRow = document.createElement("tr")
        const idElem = document.createElement("td")
        idElem.textContent = i + 1
        newRow.appendChild(idElem)
        for(let keys in data[i]){
            const keyElem = document.createElement("td")
            keyElem.textContent = data[i][keys]
            newRow.appendChild(keyElem)
        }
        elem.appendChild(newRow)
    }
}

fetch(`http://localhost:${PORT}/contacts/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then((response) => response.json())
    .then((data) => {
        data.length > 0 ? renderData(data, tableBody) : ""
    })
    .catch((error) => {
        console.error('Error:', error);
    });

contactForm.addEventListener("submit", (evt) => {
    evt.preventDefault()
    const name = nameInput.value
    const phone = phoneInput.value
    fetch(`http://localhost:${PORT}/contacts/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: id,
            name: name,
            phone: phone
        }),
    })
    .then((response) => response.json())
    .then((data) => {
        renderData(data, tableBody)
    })
    .catch((error) => {
        console.error('Error:', error);
    });
})
logOutButton.addEventListener("click", (evt) => {
    evt.preventDefault()
    window.localStorage.clear()
    window.location.reload()
})