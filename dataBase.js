const mysql = require('mysql'); // Importa el módulo MySQL para la conexión a la base de datos
const bunyan = require('bunyan'); // Importa el módulo Bunyan para la creación de registros de actividad

// Crea un registro de actividad (logger) con el nombre 'Base de Datos'
const logger = bunyan.createLogger({ name: 'Base de Datos' });

// Configuración de la conexión a la base de datos usando variables de entorno
const conexion = mysql.createConnection({
    host: process.env.DB_HOST,       // Host de la base de datos obtenido del archivo .env
    user: process.env.DB_USER,       // Usuario de la base de datos obtenido del archivo .env
    password: process.env.DB_PASSWORD, // Contraseña de la base de datos obtenida del archivo .env
    database: process.env.DB_DATABASE // Nombre de la base de datos obtenido del archivo .env
});

try {
    // Intenta establecer la conexión a la base de datos
    conexion.connect((err) => {
        if (err) {
            throw err; // Lanza un error si no se puede conectar a la base de datos
        }
        logger.info('Conectado a la BD satisfactoriamente'); // Registra en el logger que la conexión fue exitosa
    });
} catch (error) {
    logger.error('Error en la conexión: ' + error); // Registra en el logger un error si la conexión falla
}

module.exports = conexion; // Exporta el objeto de conexión para ser utilizado en otros módulos
