// import { handleSubmit } from '../client/js/formHandler'
const formHandler = require('../client/js/formHandler')

test('handleSubmit test', async() => {
    const data = 'https://www.bbc.co.uk/news/uk-53091856'
    const url = 'http://localhost:8080/api'
    const res = await formHandler.postData(url, data)


    expect(res).toBe(true);
});