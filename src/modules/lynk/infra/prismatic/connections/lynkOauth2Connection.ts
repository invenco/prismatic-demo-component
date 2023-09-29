import { oauth2Connection, OAuth2Type } from '@prismatic-io/spectral';

export const lynkOauth2Connection = oauth2Connection({
  key: 'oAuth',
  label: 'Lynk OAuth 2.0',
  oauth2Type: OAuth2Type.AuthorizationCode,
  comments: 'Lynk Connection',
  inputs: {
    authorizeUrl: {
      label: 'Authorize URL',
      placeholder: 'Authorize URL',
      type: 'string',
      required: true,
      shown: true,
      comments: 'The OAuth 2.0 Authorization URL for Lynk',
      default: `https://auth.lynksupplychain.com/authorize?audience=https://api.lynksupplychain.com`
    },
    tokenUrl: {
      label: 'Token URL',
      placeholder: 'Token URL',
      type: 'string',
      required: true,
      shown: true,
      comments: 'The OAuth 2.0 Token URL for Lynk',
      default: `https://auth.lynksupplychain.com/oauth/token`
    },
    scopes: {
      label: 'Scopes',
      placeholder: 'Scopes',
      type: 'string',
      required: true,
      shown: true,
      comments: 'Lynk permission scopes',
      default: 'openid profile email offline_access'
    },
    clientId: {
      label: 'Client ID',
      placeholder: 'Client ID',
      type: 'string',
      required: true,
      shown: true,
      comments: 'Client ID'
    },
    clientSecret: {
      label: 'Client Secret',
      placeholder: 'Client Secret',
      type: 'password',
      required: true,
      shown: true,
      comments: 'Client Secret'
    },
    baseUrl: {
      label: 'Base URL',
      placeholder: 'Base API URL',
      type: 'string',
      required: true,
      shown: true,
      comments: 'Base API URL',
      default: `https://api.lynksupplychain.com`
    }
  }
});
