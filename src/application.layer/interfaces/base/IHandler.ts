import ICommand from './ICommand';

export default interface IHandler<T extends ICommand<Out>, Out>{
  execute(command: T): Promise<Out>
}
