const API_URL = document.querySelector('meta[name="api-url"]').getAttribute('content')
const form = document.getElementById("register")

console.log(API_URL)
form.addEventListener("submit", async (ev) => {
    ev.preventDefault()
    
    const params = new URLSearchParams();
    params.append("username", document.getElementById("username").value);
    params.append("email", document.getElementById("email").value);
    params.append("password", document.getElementById("password").value)

    fetch(`${API_URL}/register/`, {
    method: "POST",
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(), 
    }).then(response => {
        if (response.status === 201) {
            return window.location.href = "./index.html"
        } else {
            document.getElementById("alert").style.display = "inline"
            document.getElementById("alert").textContent = "Dados inválidos"
            document.getElementById("alert").classList.add("alert-danger")
        }
    })
    
})
