import { preview } from 'astro';
const server = await preview({ server: { host: '127.0.0.1', port: 4322 } });
const stop = async () => {
  await server.stop();
  process.exit(0);
};
process.on('SIGTERM', stop);
process.on('SIGINT', stop);
