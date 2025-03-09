const API_URL = document.querySelector('meta[name="api-url"]').getAttribute('content')
const form = document.getElementById("login")
function getCookie(name) {
    const cookies = document.cookie.split("; ");
    for (let cookie of cookies) {
        let [key, value] = cookie.split("=");
        if (key === name) {
            return value;
        }
    }
    return null;
}

form.addEventListener("submit", async (ev) => {
    ev.preventDefault()
    
    const params = new URLSearchParams();
    params.append("email", document.getElementById("email").value);
    params.append("password", document.getElementById("password").value)

    fetch(`${API_URL}/login/`, {
    method: "POST",
    headers: {
        "X-CSRFToken": getCookie("csrftoken"),
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
