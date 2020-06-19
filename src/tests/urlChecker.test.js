import { isValidURL } from '../client/js/urlChecker'

test('URL checker: true', () => {
    expect(isValidURL('https://www.bbc.co.uk/news/uk-53091856')).toBe(true);
});

test('URL checker: false', () => {
    expect(isValidURL('ThisIsNotAValidUrl')).toBe(false);
});