import ISettings from '@layer/settings/interfaces';
import { IAppSettings, types as settingsTypes } from '@layer/crossCutting/appSettings/interfaces';
import { interfaces } from 'inversify';
import AppSettings from '@layer/crossCutting/appSettings';

const registerAppSettings = (container: interfaces.Container): void => {
  const settings = AppSettings.create<ISettings>(`${__dirname}/../../settings.layer/`);

  container.bind<IAppSettings<ISettings>>(settingsTypes.IAppSettings).toConstantValue(settings);
};

export default registerAppSettings;
