import ICommand from './ICommand';

export default interface IHandler<T extends ICommand, Out>{
  execute(command: T): Promise<Out>
}
