import { app } from "./src/app";
import config from "./src/common/configs";
import { AppDataSource } from "./src/common/database";
import logger from "./src/common/helpers/logger";
// import { AppDataSource } from "./src/database";

const PORT = config.port || 3200;

function startServer() {

    AppDataSource.initialize().then(() => {
        logger("DB connected");
    }).catch((err) => {
        logger("DB connection failed!!!", err);
    })


    app.listen(PORT, () => {
        logger(`Server is listening on port ${PORT}`);
        logger(`Access it from http://localhost:${PORT}`);
    });
}

startServer();