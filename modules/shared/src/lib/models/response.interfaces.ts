export interface IApiResponse<T = undefined> {
  status: 'ERROR' | 'SUCCESS';
  message: string;
  data?: T;
  statusCode: number;
}
