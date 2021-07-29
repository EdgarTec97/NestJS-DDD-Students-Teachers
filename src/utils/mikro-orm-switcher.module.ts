import { DynamicModule, Module, Global, Inject, OnModuleDestroy, Optional } from "@nestjs/common";
import { MikroORM } from "@mikro-orm/core";
import mikroOrmMongoConfig from "../mikro-orm.config";
import { MongoDriver } from "@mikro-orm/mongodb";

export const MIKRO_ORM_MONGODB_TOKEN = 'MikroOrmMongoDBToken';

@Global()
@Module({
    imports: [],
    providers: [],
  })
export class MikroOrmSwitcherModule implements OnModuleDestroy{
    static init ({ disable }: { disable: boolean }): DynamicModule {
        if(disable){
            return {
                module: MikroOrmSwitcherModule
            };
        }

        return {
            module: MikroOrmSwitcherModule,
            providers: [{
                provide: MIKRO_ORM_MONGODB_TOKEN,
                useFactory: () => MikroORM.init(mikroOrmMongoConfig)
            }],
            exports: [MIKRO_ORM_MONGODB_TOKEN]
        };
    }
    constructor(
        @Optional() @Inject(MIKRO_ORM_MONGODB_TOKEN) private orMongo?: MikroORM<MongoDriver>
    ){}

    async onModuleDestroy() {
        await this.orMongo?.close(true);
    }

}