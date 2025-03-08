const API_URL = process.env.API_URL
const form = document.getElementById("login")

form.addEventListener("submit", async (ev) => {
    ev.preventDefault()
    
    const params = new URLSearchParams();
    params.append("email", document.getElementById("email").value);
    params.append("password", document.getElementById("password").value)

    fetch("${API_URL}/login/", {
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
