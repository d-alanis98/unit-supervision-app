import Constants from 'expo-constants';

export default {
    apiPath: Constants?.manifest?.extra?.apiPath || '',
    serverPath: Constants?.manifest?.extra?.serverPath || '',
};