module.exports = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRESS_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRESS_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: ['dist/**/*.entity.js'],
  synchronize: false,
};
