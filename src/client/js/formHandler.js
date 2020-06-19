global.fetch = require("node-fetch");

function handleSubmit(event) {
    event.preventDefault();

    // check what text was put into the form field
    let formText = document.getElementById('name').value
    let valid = Client.isValidURL(formText)

    // clear the results
    clearResults()

    // check if user entered a url or not
    if (!valid) {
        alert("Please enter a valid URL")
        return
    }

    // spinning wheel
    document.getElementById('loader').style.display = 'block'

    // send post request
    const url = '/api'
    const data = postData(url, formText)
        .then((data) => {
            updateUI(data)
        })
}


// post request
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


// update UI
const updateUI = async(data) => {
    // if object is empty, alert user
    if (Object.keys(data).length === 0) {
        alert('Page not found')
            // remove spinning wheel
        document.getElementById('loader').style.display = 'none'
        return
    }
    // loop through key-value entries in returned object
    for (let [key, value] of Object.entries(data)) {
        // search for float figures
        if (key.includes('confidence')) {
            // change float to percentage
            value = (Math.round(value * 100)).toString() + '%'
                // search for text
        } else if (key === 'text') {
            // add line breaks
            value = value.replace(/\n/g, '<br>\n')
        }
        // update html page
        document.getElementById(key).innerHTML = value
    }

    // show the results container, remove spinning wheel, and reset form
    document.getElementById('container').classList.remove('hide')
    document.getElementById('container').classList.add('show')
    document.getElementById('loader').style.display = 'none'
    document.getElementById('form').reset()
}


// function to clear results
function clearResults() {
    document.getElementById('container').classList.add('hide')
    document.getElementById('container').classList.remove('show')
}

export { handleSubmit, postData }