import { Options } from '@mikro-orm/core';
import { MongoHighlighter } from '@mikro-orm/mongo-highlighter';
import { MongoDriver } from '@mikro-orm/mongodb';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { config } from './config';

const mikroOrmMongoConfig: Options<MongoDriver> = {
  type: 'mongo',
  clientUrl: `mongodb://${config.database.username}:${config.database.password}@${config.database.host}:${config.database.port}`,
  dbName: 'challenge',
  entities: [],
  discovery: { warnWhenNoEntities: false },
  debug: false,
  highlighter: new MongoHighlighter(),
  metadataProvider: TsMorphMetadataProvider,
};

export default mikroOrmMongoConfig;
