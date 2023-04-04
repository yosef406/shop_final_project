// imports
const { default: mongoose } = require("mongoose");

// main class
module.exports = class DataBase {
    static #DATA_BASE = process.env.DATA_BASE;
    static async connect() {
        await mongoose.connect(`${this.#DATA_BASE}`)
            .then(() => console.log('DataBase: ', 'connected to DataBase.'))
            .catch((err) => console.log("DataBase, Error: ", err));
    }
    static async disconnect() {
        await mongoose.disconnect();
    }
    static getConnection() {
        return mongoose.connection;
    }
    static getCollections() {
        console.log("Collections: ", mongoose.Collection);
    }
}