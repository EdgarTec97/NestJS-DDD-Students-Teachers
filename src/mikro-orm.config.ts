import { Options } from "@mikro-orm/core";
import { MongoHighlighter } from "@mikro-orm/mongo-highlighter";
import { MongoDriver } from "@mikro-orm/mongodb";
import { TsMorphMetadataProvider } from "@mikro-orm/reflection";

const mikroOrmMongoConfig: Options<MongoDriver> = {
    type: 'mongo',
    clientUrl: 'mongodb://root:root@localhost:27017',
    dbName: 'challenge',
    entities: [],
    discovery: {warnWhenNoEntities: false},
    debug: false,
    highlighter: new MongoHighlighter(),
    metadataProvider: TsMorphMetadataProvider
};

export default mikroOrmMongoConfig;