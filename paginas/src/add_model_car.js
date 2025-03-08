const API_URL = process.env.API_URL
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

const csrftoken = getCookie("csrftoken")

document.getElementById("add-model-car").addEventListener("submit", async (ev) => {
    ev.preventDefault()

    data = {
        name: document.getElementById("name").value,
        year: parseFloat(document.getElementById("year").value),
    }
    
    try {
        const response = await fetch(`${API_URL}/modelo_de_carro/create/`, {
            method: "POST",
            headers: {
                "X-CSRFToken": csrftoken,
                "Content-type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(data)
        })

        if (response.status === 201) {
            window.location.reload()
        } else {
            document.getElementById("alert").style.display = "inline"
            document.getElementById("alert").textContent = "Dados inválidos"
            document.getElementById("alert").classList.add("alert-danger")
        }
        
    } catch {
        console.log("Deu ruim")
    }

})

document.getElementById("logout").addEventListener("click", async () => {
    const response = await fetch(`${API_URL}/logout/`, {
        method: "GET",
        headers: {
            "X-CSRFToken": csrftoken
        },
        credentials: "include" 
    })

    document.cookie = "sessionid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

})
