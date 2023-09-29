import { GetOrderById } from '../GetOrderById';
import OrderNotFoundError from '../errors/OrderNotFoundError';
import FailedToFetchOrderError from '../errors/FailedToFetchOrderError';

describe('GetOrderById', () => {
  const salesGateway = { getOrderById: jest.fn() };
  const useCase = new GetOrderById(salesGateway as any);

  beforeEach(() => {
    salesGateway.getOrderById.mockResolvedValue({ id: '123', qtyOrdered: 9 });
  });

  it('returns the order', async () => {
    const result = await useCase.execute({ orderId: '123' });
    if (result.isSad()) throw new Error('Expected happy result');
    expect(result.value.getValue()).toEqual({ id: '123', qtyOrdered: 9 });
  });

  describe('errors', () => {
    describe('when the order does not exist', () => {
      beforeEach(() => {
        salesGateway.getOrderById.mockResolvedValue(null);
      });

      it('returns an order not found error', async () => {
        const result = await useCase.execute({ orderId: '123' });
        if (result.isHappy()) throw new Error('Expected sad result');
        expect(result.value).toBeInstanceOf(OrderNotFoundError);
      });
    });

    describe('when there is an error fetching the order', () => {
      beforeEach(() => {
        salesGateway.getOrderById.mockRejectedValue(new Error('oh no'));
      });

      it('returns a failed to fetch order error', async () => {
        const result = await useCase.execute({ orderId: '123' });
        if (result.isHappy()) throw new Error('Expected sad result');
        expect(result.value).toBeInstanceOf(FailedToFetchOrderError);
      });
    });
  });
});
