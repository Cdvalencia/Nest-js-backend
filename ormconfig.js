module.exports = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'libreria',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true, // Solo para desarrollo, desactivar en producción
};