import { component } from '@prismatic-io/spectral';
import { lynkOauth2Connection, lynkApiKeyConnection } from '../connections';
import { getOrderByIdAction } from '../../../useCases/getOrderById/getOrderByIdAction';

export default component({
  key: 'lynk-v2',
  public: false,
  display: {
    label: 'Lynk v2',
    description: 'Manage orders, fulfillments, shipments, inventory and SKUs in the Lynk platform',
    iconPath: 'icon.png'
  },
  connections: [lynkOauth2Connection, lynkApiKeyConnection],
  actions: {
    getOrderById: getOrderByIdAction
  }
});
