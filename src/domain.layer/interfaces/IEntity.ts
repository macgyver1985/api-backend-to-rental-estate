import INotificationDetail from '@layer/crossCutting/fluentValidation/interfaces/INotificationDetail';

export default interface IEntity {
  identity: string

  notifications(): Array<INotificationDetail>
}
