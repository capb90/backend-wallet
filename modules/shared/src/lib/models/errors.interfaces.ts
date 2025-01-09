import { z } from 'zod';

export interface IErrorResponse {
  code:number;
  message: string;
  errors?: z.ZodIssue[];
}
