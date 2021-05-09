import CommandHelper from '../helper';

class ObtainListOfRealEstateCommand extends CommandHelper {
  #pageNumber: number;

  #pageSize: number;

  public get pageNumber() : number {
    return this.#pageNumber;
  }

  public get pageSize() : number {
    return this.#pageSize;
  }
}

export default ObtainListOfRealEstateCommand;
