import { Response } from 'express';
import { HandlerError } from '@backend-wallet/shared';

export class BaseController {
  public handlerErrors(error: unknown, res: Response) {
    if (error instanceof HandlerError) {
      return res.status(error.code).json(error);
    }

    const errorServer = HandlerError.internalServer();
    return res.status(errorServer.code).json(errorServer);
  }
}
