import { SingleValueObject } from "../../../transactions/utils/hex/SingleValueObject";

export class Uuid extends SingleValueObject<string>{
    constructor(uuid: string){
        super(uuid);
    }

    equals(uuid: Uuid){
        return this.getValue() === uuid.getValue();
    }
}