function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value
    let valid = Client.validURL(formText)

    if (valid) {
        fetch(`http://localhost:8080/api?input=${formText}`)
            .then(res => res.json())
            .then(function(res) {
                document.getElementById('polarity').innerHTML = res.polarity
                document.getElementById('subjectivity').innerHTML = res.subjectivity
                document.getElementById('text').innerHTML = res.text
                document.getElementById('polarity_confidence').innerHTML = res.polarity_confidence
                document.getElementById('subjectivity_confidence').innerHTML = res.subjectivity_confidence
            })
    } else {
        alert("Please enter a valid URL")
    }
}

export { handleSubmit }