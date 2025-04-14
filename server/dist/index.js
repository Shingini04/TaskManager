"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const TaskResolver_1 = require("./resolvers/TaskResolver");
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const data_source_1 = require("./data-source");
dotenv_1.default.config();
const main = async () => {
    await data_source_1.AppDataSource.initialize();
    console.log('Connected to database');
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)());
    const schema = await (0, type_graphql_1.buildSchema)({
        resolvers: [TaskResolver_1.TaskResolver],
        validate: false,
    });
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema,
        context: ({ req, res }) => ({ req, res }),
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app, cors: false });
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
        console.log(`🚀 Server running at http://localhost:${PORT}${apolloServer.graphqlPath}`);
    });
};
main().catch((error) => {
    console.error('Error starting server:', error);
});
//# sourceMappingURL=index.js.map