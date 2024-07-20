export default () => ({
  database: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT) || 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DB,
    synchronize: process.env.DB_SYNC === 'true',
    logging: process.env.DB_LOG === 'true',
    runMigrations: process.env.RUN_MIGRATIONS === 'true',
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  mode: process.env.MODE,
});
