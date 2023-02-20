module.exports = {
    localhost: {
        client: 'mysql2',
        connection: {
            host: 'localhost',
            port: 3306,
            user: 'root',
            password: 'root',
            database: 'gym-crud'
        },
        acquireConecctionTimeout: 300000,
        wrapIdentifier: (value, _origImpl, _queryContext) => value
    }
}