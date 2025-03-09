const API_URL = document.querySelector('meta[name="api-url"]').getAttribute('content')
const form = document.getElementById("login")

form.addEventListener("submit", async (ev) => {
    ev.preventDefault()
    
    const params = new URLSearchParams();
    params.append("email", document.getElementById("email").value);
    params.append("password", document.getElementById("password").value)

    fetch(`${API_URL}/login/`, {
    method: "POST",
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    credentials: 'include',
    body: params.toString(), 
    })
    .then(response => {
        if (response.status !== 200) {
            // return window.location.href = "./index.html"
        } else if (response.status === 200) {
            return window.location.href = "./list_exhaust.html"
        }
    })
    
})
