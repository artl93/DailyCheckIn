import { AuthenticationContext, adalFetch, withAdalLogin } from 'react-adal';
 
export const adalConfig = {
  tenant: '8ca09082-aa44-41c9-bd4e-7a6b59c90ba0',
  clientId: '63461d47-88a7-4643-a4f5-c131d5e1e19f',
  endpoints: {
     api:'https://api.timeseries.azure.com/',
  },
  cacheLocation: 'localStorage',
};

export const authContext = new AuthenticationContext(adalConfig);

export const adalApiFetch = (fetch, url, options) =>
adalFetch(authContext, adalConfig.endpoints.api, fetch, url, options);

export const withAdalLoginApi = withAdalLogin(authContext, adalConfig.endpoints.api);

//export const getToken = () => authContext.getCachedToken(adalConfig.clientId);

//export const getApiToken = () => authContext.getCachedToken('120d688d-1518-4cf7-bd38-182f158850b6');

