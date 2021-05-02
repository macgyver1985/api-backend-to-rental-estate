import INotificationDetail from './interfaces/INotificationDetail';

export default class ContractValidatorException extends Error {
  private attLayer: string;

  public constructor(layer: string, notifications: INotificationDetail[]) {
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
