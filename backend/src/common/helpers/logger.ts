import config from "../configs";

function logger(data: any, mandatory: boolean = true) {
    if (config?.logger || mandatory) {
        console.log(`\n[time]: ${new Date()} \n${data}`);
    }
}

export default logger;