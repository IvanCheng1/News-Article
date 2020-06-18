global.fetch = require("node-fetch");

function handleSubmit(event) {
    event.preventDefault();

    // check what text was put into the form field
    let formText = document.getElementById('name').value
    let valid = Client.validURL(formText)

    clearResults()
    if (!valid) {
        alert("Please enter a valid URL")
        return
    }
    // spinning wheel
    document.getElementById('loader').style.display = 'block'
    const url = '/api'
    const data = postData(url, formText)
        .then((data) => {
            updateUI(data)
        })
}


const postData = async(url, data) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            data: data
        })
    })

    return response.json();
}

const updateUI = async(data) => {
    if (Object.keys(data).length === 0) {
        alert('Page not found')
        document.getElementById('loader').style.display = 'none'
        return
    }
    for (let [key, value] of Object.entries(data)) {
        if (key.includes('confidence')) {
            // change float to percentage
            value = (Math.round(value * 100)).toString() + '%'
        } else if (key === 'text') {
            // add line breaks
            value = value.replace(/\n/g, '<br>\n')
        }
        document.getElementById(key).innerHTML = value
    }
    document.getElementById('container').classList.remove('hide')
    document.getElementById('container').classList.add('show')
    document.getElementById('loader').style.display = 'none'
    document.getElementById('form').reset()
}

function clearResults() {
    document.getElementById('container').classList.add('hide')
    document.getElementById('container').classList.remove('show')
}

export { handleSubmit, postData }