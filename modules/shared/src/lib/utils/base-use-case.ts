export abstract class BaseUseCase<TDto, TResponse> {
  public abstract execute(dataDto: TDto): Promise<TResponse>;
}
