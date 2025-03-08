const form = document.getElementById("register")

form.addEventListener("submit", async (ev) => {
    ev.preventDefault()
    
    const params = new URLSearchParams();
    params.append("username", document.getElementById("username").value);
    params.append("email", document.getElementById("email").value);
    params.append("password", document.getElementById("password").value)

    fetch("http://127.0.0.1:8000/register/", {
    method: "POST",
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(), 
    }).then(response => {
        if (response.status === 201) {
            return window.location.href = "./login.html"
        } else {
            document.getElementById("alert").style.display = "inline"
            document.getElementById("alert").textContent = "Dados inválidos"
            document.getElementById("alert").classList.add("alert-danger")
        }
    })
    
})
