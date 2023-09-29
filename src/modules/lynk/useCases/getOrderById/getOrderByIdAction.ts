import { action, input } from '@prismatic-io/spectral';
import { OrderDTO } from '@invenco/common-interface/sales';
import { HttpSalesGateway } from '@invenco/common-gateways';
import { GotClientProvider } from '@invenco/common-gateways/gotClientProvider/GotClientProvider';
import { GetOrderById } from './GetOrderById';
import { PrismaticConnectionGotClientProvider } from '../../../../shared/gateways/PrismaticConnectionGotClientProvider';

export const getOrderByIdAction = action({
  display: {
    label: 'Get Order by id',
    description: 'Get an Order from Lynk by its id'
  },
  inputs: {
    connection: input({
      label: 'Lynk connection',
      type: 'connection',
      required: true
    }),
    orderId: input({
      label: 'Order id',
      type: 'string',
      required: true,
      comments: 'The id of the Lynk Order to get'
    })
  },
  perform: async ({ logger }, { connection, orderId }) => {
    logger.info('Construct the GotClientProvider');
    const gotClientProvider: GotClientProvider = new PrismaticConnectionGotClientProvider(connection);
    logger.info('Construct the HttpSalesGateway');
    const salesGateway = new HttpSalesGateway(gotClientProvider);
    logger.info('Construct the GetOrderById use-case');
    const getOrderById = new GetOrderById(salesGateway);
    logger.info('Execute the GetOrderById use-case');
    const result = await getOrderById.execute({ orderId: `${orderId}` });
    logger.info('Check the result of the GetOrderById use-case');
    if (result.isSad()) {
      logger.error(`The result of the GetOrderById use-case was sad: ${result.value.errorValue().message}`);
      throw new Error(`Failed to get Order by id: ${result.value.errorValue().message}`);
    }
    logger.info('Get the OrderDTO from the result');
    const order: OrderDTO = result.value.getValue();
    logger.info('Return the OrderDTO');
    return { data: { order } };
  }
});
