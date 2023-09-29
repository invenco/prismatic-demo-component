import { Result, UseCaseError } from '@invenco/ddd-core';

export default class OrderNotFoundError extends Result<UseCaseError> {
  constructor(id: string) {
    super(false, { message: `Order with id "${id}" not found` });
  }
}
