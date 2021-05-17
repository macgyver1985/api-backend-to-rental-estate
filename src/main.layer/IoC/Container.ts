import { Container } from 'inversify';
import registerAdapters from './RegisterAdapters';
import registerApplication from './RegisterApplication';
import registerAppSettings from './RegisterAppSettings';
import registerCrossCutting from './RegisterCrossCutting';
import registerPresentations from './RegisterPresentations';

const container = new Container();

registerCrossCutting(container);
registerAppSettings(container);
registerApplication(container);
registerAdapters(container);
registerPresentations(container);

export default container;
