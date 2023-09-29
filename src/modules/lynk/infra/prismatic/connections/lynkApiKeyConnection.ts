import { connection } from '@prismatic-io/spectral';

export const lynkApiKeyConnection = connection({
  key: 'apiKey',
  label: 'Lynk API Key',
  comments: 'Lynk Private App Connection',
  inputs: {
    baseUrl: {
      label: 'Lynk Environment to use',
      placeholder: 'Lynk Environment',
      type: 'string',
      required: true,
      model: [
        {
          label: 'Production',
          value: 'https://api.lynksupplychain.com'
        },
        {
          label: 'Staging',
          value: 'https://api.stage-lynksupplychain.com'
        }
      ]
    },
    apiKey: {
      label: 'Lynk API Key',
      placeholder: 'lynk_XXXXXXXXXXXXXX',
      type: 'password',
      required: true,
      comments: 'Lynk API Key'
    }
  }
});
