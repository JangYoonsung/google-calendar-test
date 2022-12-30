export default () => ({
  database: {
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    timezone: 'Asia/Tokyo',
    database: process.env.DATABASE_SCHEMA,
    synchronize: false,
    logging: true,
  },
  cognito: {
    userPoolId: process.env.USER_POOL,
    clientId: process.env.CLIENT_ID,
    region: process.env.REGION,
    authority: `https://cognito-idp.${process.env.REGION}.amazonaws.com/${process.env.USER_POOL}`,
  },
});
