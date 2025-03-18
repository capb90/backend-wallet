import { UserService } from '../services/user.service';
import { Request, Response } from 'express';

export class UserController {
  constructor(private readonly userService: UserService) {}

  public userDetail = (req: Request, res: Response)=>{

  }
}
