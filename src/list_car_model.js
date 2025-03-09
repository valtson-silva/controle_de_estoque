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

function update(id, a) {
    a.addEventListener("click", async () => {
        localStorage.setItem("car_model_id", id);
    })
}

function deleteCarModel(id, a) {
    a.addEventListener("click", async () => {
        const responseExhaust = await fetch(`${API_URL}/modelo_de_carro/${id}/delete/`, {
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

function createTd(car) {
    tbody = document.querySelector("tbody")

    if (Array.isArray(car) === true) {
        car.forEach((value) => {
            const tr = document.createElement("tr")
            const td1 = document.createElement("td")
            const td2 = document.createElement("td")
            const td3 = document.createElement("td")
            const td4 = document.createElement("td")
            const a1 = document.createElement("a")
            const a2 = document.createElement("a")

            td1.textContent = value.name
            td2.textContent = value.year
            a1.textContent = "Atualizar"
            a2.textContent = "Deletar"
            a1.href = "./put_car_model.html"
            a2.href = "#"
            td3.appendChild(a1)
            td4.appendChild(a2)
            update(value.id, a1)
            deleteCarModel(value.id, a2)

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

        td1.textContent = car.name
        td2.textContent = car.year
        a1.textContent = "Atualizar"
        a2.textContent = "Deletar"
        a1.href = "./put_car_model.html"
        a2.href = "#"
        td3.appendChild(a1)
        td4.appendChild(a2)
        update(car.id, a1)
        deleteCarModel(car.id, a2)

        tr.append(td1, td2, td3, td4)
        return tbody.append(tr)
    }
}

async function listCarModel() {
    try{
        const responseCar = await fetch(`${API_URL}/modelo_de_carro/`, {
            method: "GET",
            headers: {
                "X-CSRFToken": csrftoken
            },
            credentials: "include" 
        }).then((res) => res.json())
        console.log(responseCar)
        
        createTd(responseCar)
        
    } catch {
        console.log("Valor informado inválido")
    }

}

listCarModel()

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
