import { Result, UseCaseError } from '@invenco/ddd-core';

export default class FailedToFetchOrderError extends Result<UseCaseError> {
  constructor(id: string) {
    super(false, { message: `Failed to fetch order with id "${id}"` });
  }
}
