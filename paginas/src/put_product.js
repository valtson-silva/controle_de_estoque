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

document.getElementById("add-exhaust").addEventListener("submit", async (ev) => {
    ev.preventDefault()

    data = {
        name: document.getElementById("name").value,
        quantity: parseFloat(document.getElementById("quantity").value)
    }
    const product_id = localStorage.getItem("product_id")
    try {
        const responseExhaust = await fetch(`http://127.0.0.1:8000/produtos/${product_id}/update/`, {
            method: "PUT",
            headers: {
                "X-CSRFToken": csrftoken,
                "Content-type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(data)
        })
        

        if (responseExhaust.status === 200) {
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
    const response = await fetch(`http://127.0.0.1:8000/logout/`, {
        method: "GET",
        headers: {
            "X-CSRFToken": csrftoken
        },
        credentials: "include" 
    })

    document.cookie = "sessionid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

})