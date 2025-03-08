export class UserLoggerEvent {
  constructor(
    public readonly userID: string,
    public readonly lastLogin: Date
  ) {}
}
