import { Either, happy, Result, sad, UseCase } from '@invenco/ddd-core';
import { OrderDTO } from '@invenco/common-interface/sales';
import { SalesGateway } from '@invenco/common-interface/gateways';
import OrderNotFoundError from './errors/OrderNotFoundError';
import FailedToFetchOrderError from './errors/FailedToFetchOrderError';

export type GetOrderByIdInput = { orderId: string };
export type GetOrderByIdOutput = Either<OrderNotFoundError, Result<OrderDTO>>;

export class GetOrderById implements UseCase<GetOrderByIdInput, GetOrderByIdOutput> {
  constructor(private readonly salesGateway: SalesGateway) {}

  async execute({ orderId }: GetOrderByIdInput): Promise<GetOrderByIdOutput> {
    let order: OrderDTO;
    try {
      order = await this.salesGateway.getOrderById(orderId);
    } catch (error) {
      return sad(new FailedToFetchOrderError(orderId));
    }
    if (!order) {
      return sad(new OrderNotFoundError(orderId));
    }
    return happy(Result.ok(order));
  }
}
