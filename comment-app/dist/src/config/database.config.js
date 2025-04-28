"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseConfig = void 0;
const comment_entity_1 = require("../comments/entities/comment.entity");
const user_entity_1 = require("../users/models/user.entity"); // Corrected path to 'models' folder
exports.databaseConfig = {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USERNAME || 'user',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'comment_app',
    entities: [comment_entity_1.Comment, user_entity_1.User],
    synchronize: true,
    logging: process.env.DB_LOGGING === 'true',
};
