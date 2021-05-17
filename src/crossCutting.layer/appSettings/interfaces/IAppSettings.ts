import EEnvironment from '../resources';

export default interface IAppSettings<TSettings> {
  configs(): TSettings;

  environment(): EEnvironment;
}
