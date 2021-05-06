import { INotification } from './interfaces';

export default class ContractValidatorException extends Error {
  private attLayer: string;

  public constructor(layer: string, notifications: INotification[]) {
    super(JSON.stringify({
      layer,
      notifications,
    }));

    this.attLayer = layer;
  }

  public get layer(): string {
    return this.attLayer;
  }
}
