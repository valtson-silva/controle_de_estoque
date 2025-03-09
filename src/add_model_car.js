const API_URL = document.querySelector('meta[name="api-url"]').getAttribute('content')
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

async function OptionsModels() {
    const response = await fetch(`${API_URL}/modelo_de_carro/`, {
        method: "GET",
        headers: {
            "X-CSRFToken": getCookie("csrftoken")
        },
        credentials: "include" 
    }).then((res) => res.json())
}

OptionsModels()

document.getElementById("add-model-car").addEventListener("submit", async (ev) => {
    ev.preventDefault()

    data = {
        name: document.getElementById("name").value,
        year: parseFloat(document.getElementById("year").value),
    }
    console.log(getCookie("csrftoken"))
    try {
        const response = await fetch(`${API_URL}/modelo_de_carro/create/`, {
            method: "POST",
            headers: {
                "X-CSRFToken": getCookie("csrftoken"),
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
            "X-CSRFToken": getCookie("csrftoken")
        },
        credentials: "include" 
    })

    document.cookie = "sessionid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

})
