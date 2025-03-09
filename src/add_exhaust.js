const select = document.getElementById("option-list")
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

const csrftoken = getCookie("csrftoken")

function createOptions(list) {
    for (let i = 0; i < list.length; i++) {
        const option = document.createElement("option")
        option.textContent = `${list[i].name} ${list[i].year}`
        option.value = `${list[i].name}`
        select.append(option)
    }
}

async function OptionsModels() {
    const response = await fetch(`${API_URL}/modelo_de_carro/`, {
        method: "GET",
        headers: {
            "X-CSRFToken": csrftoken
        },
        credentials: "include" 
    }).then((res) => res.json())

    createOptions(response)
}

OptionsModels()


document.getElementById("add-exhaust").addEventListener("submit", async (ev) => {
    ev.preventDefault()

    const responseModels = await fetch(`${API_URL}/modelo_de_carro/`, {
        method: "GET",
        headers: {
            "X-CSRFToken": csrftoken
        },
        credentials: "include" 
    }).then((res) => res.json())

    
    let modelID
    for (let i = 0; i < responseModels.length; i++) {
        if (responseModels[i].name === select.value) {
            modelID = responseModels[i].id
        }
    }

    const responseCar = await fetch(`${API_URL}/escapamento/modelo/${modelID}`, {
        method: "GET",
        headers: {
            "X-CSRFToken": csrftoken,
            "Content-type": "application/json"
        },
        credentials: "include"
    }).then((res) => res.json())
    
    if (responseCar.length > 1) {
        document.getElementById("alert").style.display = "inline"
        document.getElementById("alert").textContent = "Não é permitido adicionar mais escapamentos a esse modelo"
        document.getElementById("alert").classList.add("alert-danger")

    } else {
        data = {
            part: document.getElementById("part").value,
            quantity: parseFloat(document.getElementById("quantity").value),
        }
        
        try {
            const responseExhaust = await fetch(`${API_URL}/escapamento/create/`, {
                method: "POST",
                headers: {
                    "X-CSRFToken": csrftoken,
                    "Content-type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify(data)
            }).then((res) => res.json())
            
    
            const response = await fetch(`${API_URL}/escapamento/modelo/create/`, {
                method: "POST",
                headers: {
                    "X-CSRFToken": csrftoken,
                    "Content-type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    exhaust: responseExhaust.id,
                    car_model: modelID
                })
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
