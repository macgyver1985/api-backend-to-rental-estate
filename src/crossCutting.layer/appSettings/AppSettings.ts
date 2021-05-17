import { readFileSync } from 'fs';
import { injectable } from 'inversify';
import 'reflect-metadata';
import { IAppSettings } from './interfaces';
import EEnvironment from './resources';

@injectable()
export default class AppSettings<TSettings> implements IAppSettings<TSettings> {
    #environment: EEnvironment;

    #settings: TSettings;

    private constructor(
      environment: EEnvironment,
      settings: TSettings,
    ) {
      this.#environment = environment;
      this.#settings = settings;
    }

    public static create<TypeSettings>(
      pathFileSettings: string,
    ): AppSettings<TypeSettings> {
      const environment = process.env.NODE_ENV
        ? process.env.NODE_ENV as EEnvironment
        : EEnvironment.local;
      const file = readFileSync(`${pathFileSettings}/appSettings.${environment}.json`, 'utf-8');
      const settings = <TypeSettings>JSON.parse(file.toString());

      return new AppSettings<TypeSettings>(
        environment,
        settings,
      );
    }

    public configs(): TSettings {
      return this.#settings;
    }

    public environment(): EEnvironment {
      return this.#environment;
    }
}
