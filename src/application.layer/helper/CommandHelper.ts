import { v4 as uuidv4, validate, NIL } from 'uuid';
import { ICommand } from '../interfaces/base';

export default abstract class CommandHelper implements ICommand {
    #processID: string;

    public constructor(processID: string) {
      this.#processID = validate(processID) && processID !== NIL ? processID : uuidv4();
    }

    public get processID() : string {
      return this.#processID;
    }
}
