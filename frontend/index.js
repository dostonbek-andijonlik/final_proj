const PORT = 8080
const loginForm = document.getElementById("LoginForm")
const loginInput = document.getElementById("LoginInput")
const passwordInput = document.getElementById("PasswordInput")
loginForm.addEventListener("submit", (evt) => {
    evt.preventDefault()
    const login = loginInput.value
    const password = passwordInput.value
    fetch(`http://localhost:${PORT}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            login: login,
            password: password
        }),
    })
    .then((response) => response.json())
    .then((data) => {
        if(data.id !== undefined){
            window.localStorage.setItem("user_data", JSON.stringify(data))
            window.location.assign("./profile/profile.html")
        }else{
            alert("Login yoki parol notog'ri")
        }
        // console.log(data);
    })
    .catch((error) => {
        console.error('Error:', error);
        alert("Login yoki parol notog'ri")
    });
})