import { validURL } from '../client/js/urlChecker'

test('URL checker: true', () => {
    expect(validURL('https://www.bbc.co.uk/news/uk-53091856')).toBe(true);
});

test('URL checker: false', () => {
    expect(validURL('ThisIsNotAValidUrl')).toBe(false);
});