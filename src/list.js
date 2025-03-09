const select = document.getElementById("option-list")
const formModelCar = document.getElementById("model-car")
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

const csrftoken = getCookie("csrftoken");
console.log(csrftoken)

function createOptions(list) {
    for (let i = 0; i < list.length; i++) {
        const option = document.createElement("option")
        option.textContent = `${list[i].name} ${list[i].year}`
        option.value = `${list[i].name}`
        select.append(option)
    }
}

function update(id, a) {
    a.addEventListener("click", async () => {
        localStorage.setItem("exhaust_id", id);
    })
}

function deleteExhaust(id, a) {
    a.addEventListener("click", async () => {
        const responseExhaust = await fetch(`${API_URL}/escapamento/${id}/delete/`, {
            method: "DELETE",
            headers: {
                "X-CSRFToken": csrftoken,
                "Content-type": "application/json"
            },
            credentials: "include"
        })
        window.location.reload()
    })
}

function createTd(esc) {
    tbody = document.querySelector("tbody")

    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild)
    }

    if (Array.isArray(esc) === true) {
        esc.forEach((value) => {
            const tr = document.createElement("tr")
            const td1 = document.createElement("td")
            const td2 = document.createElement("td")
            const td3 = document.createElement("td")
            const td4 = document.createElement("td")
            const a1 = document.createElement("a")
            const a2 = document.createElement("a")

            td1.textContent = value.part
            td2.textContent = value.quantity
            a1.textContent = "Atualizar"
            a2.textContent = "Deletar"
            a1.href = "./put_exhaust.html"
            a2.href = "#"
            td3.appendChild(a1)
            td4.appendChild(a2)
            update(value.id, a1)
            deleteExhaust(value.id, a2)

            tr.append(td1, td2, td3, td4)
            return tbody.append(tr)
        })
    } else {
        const tr = document.createElement("tr")
        const td1 = document.createElement("td")
        const td2 = document.createElement("td")
        const td3 = document.createElement("td")
        const td4 = document.createElement("td")
        const a1 = document.createElement("a")
        const a2 = document.createElement("a")

        td1.textContent = esc.part
        td2.textContent = esc.quantity
        a1.textContent = "Atualizar"
        a2.textContent = "Deletar"
        a1.href = "./put_exhaust.html"
        a2.href = "#"
        td3.appendChild(a1)
        td4.appendChild(a2)
        update(esc.id, a1)
        deleteExhaust(esc.id, a2)

        tr.append(td1, td2, td3, td4)
        return tbody.append(tr)
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

formModelCar.addEventListener("submit", async (ev) => {
    ev.preventDefault()

    const response = await fetch(`${API_URL}/modelo_de_carro/`, {
        method: "GET",
        headers: {
            "X-CSRFToken": csrftoken
        },
        credentials: "include" 
    }).then((res) => res.json())

    let modelID

    for (let i = 0; i < response.length; i++) {
        if (response[i].name === select.value) {
            modelID = response[i].id
        }
    }

    try{
        const responseEsc = await fetch(`${API_URL}/escapamento/modelo/${modelID}`, {
            method: "GET",
            headers: {
                "X-CSRFToken": csrftoken
            },
            credentials: "include" 
        }).then((res) => res.json())
        
        createTd(responseEsc)
        
    } catch {
        console.log("Valor informado inválido")
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
