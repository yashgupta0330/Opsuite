export default ({ env }) => {
  const client = env('DATABASE_CLIENT', 'postgres');
  const connectionString =
    env('DATABASE_URL') ||
    env('DATABASE_PRIVATE_URL') ||
    env('POSTGRES_URL') ||
    env('POSTGRES_PRIVATE_URL');
  const host = env('DATABASE_HOST', env('PGHOST', '127.0.0.1'));
  const port = env.int('DATABASE_PORT', env.int('PGPORT', 5432));
  const database = env('DATABASE_NAME', env('PGDATABASE', 'staging_servitiumcrm_cms'));
  const user = env('DATABASE_USERNAME', env('PGUSER', 'staging'));
  const password = env('DATABASE_PASSWORD', env('PGPASSWORD', 'QxfMJYvi92OPyFnK'));
  const schema = env('DATABASE_SCHEMA', 'public');
  const useSsl = env.bool('DATABASE_SSL', env.bool('PGSSLMODE', false));

  return {
    connection: {
      client,
      connection: {
        ...(connectionString
          ? { connectionString }
          : {
              host,
              port,
              database,
              user,
              password,
            }),
        ssl: useSsl
          ? {
              rejectUnauthorized: env.bool('DATABASE_SSL_REJECT_UNAUTHORIZED', false),
            }
          : false,
        schema,
      },
      pool: {
        min: env.int('DATABASE_POOL_MIN', 2),
        max: env.int('DATABASE_POOL_MAX', 10),
      },
    },
  };
};
