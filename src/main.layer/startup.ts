import Server from '@layer/main/apollo/Server';

const server = new Server();

server.start()
  .catch((e) => { throw new Error(e); });
