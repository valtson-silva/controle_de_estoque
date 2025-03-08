const form = document.getElementById("login")

form.addEventListener("submit", async (ev) => {
    ev.preventDefault()
    
    const params = new URLSearchParams();
    params.append("email", document.getElementById("email").value);
    params.append("password", document.getElementById("password").value)

    fetch("http://127.0.0.1:8000/login/", {
    method: "POST",
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    credentials: 'include',
    body: params.toString(), 
    })
    .then(response => {
        if (response.status === 400) {
            return window.location.href = "./login.html"
        } else {
            return window.location.href = "./list_exhaust.html"
        }
    })
    
})
