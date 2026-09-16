import type { Core } from '@strapi/strapi';

export default ({ env }: { env: Core.Strapi['config']['get'] | any }) => {
  const connectionString = env('DATABASE_URL');

  if (connectionString) {
    return {
      connection: {
        client: 'postgres',
        connection: {
          connectionString,
          ssl: {
            rejectUnauthorized: false,
          },
        },
      },
    };
  }

  return {
    connection: {
      client: env('DATABASE_CLIENT', 'postgres'),
      connection: {
        host: env('DATABASE_HOST', 'localhost'),
        port: env.int('DATABASE_PORT', 5432),
        database: env('DATABASE_NAME', 'strapi'),
        user: env('DATABASE_USERNAME', 'strapi'),
        password: env('DATABASE_PASSWORD', 'strapi'),
        ssl: env.bool('DATABASE_SSL', false) && {
          rejectUnauthorized: false,
        },
      },
    },
  };
};