import got, { Got } from 'got';
import { GotClientProvider, GotHttpClientOptions } from '@invenco/common-gateways/gotClientProvider/GotClientProvider';
import { Connection, util } from '@prismatic-io/spectral';

export class PrismaticConnectionGotClientProvider implements GotClientProvider {
  constructor(private readonly connection: Connection) {}

  async getClient(clientOptions?: GotHttpClientOptions): Promise<Got> {
    const { fields, token } = this.connection;

    const baseUrl = util.types.toString(fields?.baseUrl);
    if (!baseUrl) {
      throw new Error(`Cannot prepare a client without a baseUrl`);
    }

    // Bearer token could be API key or OAuth access token
    const bearerToken = util.types.toString(fields?.apiKey ?? token?.access_token);
    const authorizationHeader = clientOptions?.authorizationHeader ?? `Bearer ${bearerToken}`;

    return got.extend({
      prefixUrl: baseUrl,
      timeout: clientOptions?.timeout,
      hooks: {
        beforeRequest: [
          (options): void => {
            /* eslint-disable no-param-reassign */
            options.headers.Authorization = authorizationHeader || '';
            options.headers['Content-Type'] = `application/json`;
            /* eslint-enable no-param-reassign */
          }
        ]
      }
    });
  }
}
