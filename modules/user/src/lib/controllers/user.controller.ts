import { UserService } from '../services/user.service';
import { Request, Response } from 'express';
import { BaseController } from '@backend-wallet/shared';

export class UserController extends BaseController {
  constructor(private readonly userService: UserService) {
    super();
  }

  public userDetail = (req: Request, res: Response) => {
    const authHeader = req.get('Authorization');

    this.userService
      .detailByToken(authHeader)
      .then((payload) => {
        res.status(200).json(payload);
      })
      .catch((error) => {
        this.handlerErrors(error, res);
      });
  };
}
