const dev: any = {
    "port": 3200,
    "logger": false,
    "saltKey": process.env.SALTKEY,
    "secretKey": process.env.SECRETKEY,
    "refreshSecretKey": process.env.REFRESHKEY,
    "database": {
        "type": "postgres",
        "host": process.env.DBHOST,
        "port": 5432,
        "username": process.env.DBUSER,
        "password": process.env.DBPASSWORD,
        "db": "modular",
        "schema": "modSchema"
    }
}

export default dev;