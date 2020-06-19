import "babel-polyfill";
const fetch = require("node-fetch")
import { postData } from '../client/js/formHandler'

test('handleSubmit test', async() => {
    const data = 'https://www.bbc.co.uk/news/uk-53091856'
    const url = 'http://localhost:8000/api'
    const res = await postData(url, data);

    expect(res['polarity']).toBe('neutral');
    expect(res['subjectivity_confidence']).toBe(1);
    expect(res['subjectivity']).toBe('subjective');
});