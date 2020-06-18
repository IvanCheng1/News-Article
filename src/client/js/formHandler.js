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
    const url = 'http://localhost:8080/api'
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
        return
    }
    for (let [key, value] of Object.entries(data)) {
        document.getElementById(key).innerHTML = value
    }
}

function clearResults() {
    document.getElementById('polarity').innerHTML = ''
    document.getElementById('subjectivity').innerHTML = ''
    document.getElementById('text').innerHTML = ''
    document.getElementById('polarity_confidence').innerHTML = ''
    document.getElementById('subjectivity_confidence').innerHTML = ''
}

export { handleSubmit }