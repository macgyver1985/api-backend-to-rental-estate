import { ContractSupport } from '@layer/crossCutting/fluentValidation';
import { v4 as uuidv4 } from 'uuid';
import { ICommand } from '../interfaces/base';

export default abstract class CommandHelper implements ICommand {
    #processID: string;

    public constructor(processID: string) {
      this.#processID = ContractSupport.isUUID(processID) ? processID : uuidv4();
    }

    public get processID() : string {
      return this.#processID;
    }
}
