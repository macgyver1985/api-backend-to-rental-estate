import { ApolloServer } from 'apollo-server-express';
import cookieParser from 'cookie-parser';
import express, {
  json, NextFunction, Request, Response,
} from 'express';
import { buildSchema } from 'type-graphql';
import { authorizeMiddleware, errorMiddleware } from './middlewares';
import { RealEstateResolver, TokenResolver } from './resolvers';

export default class Server {
  #apolloServer: ApolloServer;

  #server: express.Application;

  constructor() {
    this.#server = express();

    this.middlewares();
  }

  private middlewares(): void {
    this.#server.use(json());
    this.#server.use((req: Request, res: Response, next: NextFunction): void => {
      res.type('json');
      next();
    });
    this.#server.use((req: Request, res: Response, next: NextFunction): void => {
      res.set('access-control-allow-origin', '*');
      res.set('access-control-allow-headers', '*');
      res.set('access-control-allow-methods', '*');
      next();
    });
    this.#server.use(cookieParser());
  }

  public async start(port = 3333): Promise<void> {
    const schema = await buildSchema({
      resolvers: [TokenResolver, RealEstateResolver],
      emitSchemaFile: true,
      validate: false,
      authChecker: authorizeMiddleware,
      authMode: 'error',
      globalMiddlewares: [errorMiddleware],
    });

    this.#apolloServer = new ApolloServer({
      schema,
      context: ({ req, res }) => {
        const context = {
          req,
          res,
        };

        return context;
      },
    });
    this.#apolloServer.applyMiddleware({
      app: this.#server,
    });

    this.#server.listen(port, () => console.log(`Server running at: http://localhost:${port}`));
  }
}
