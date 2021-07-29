import { Uuid } from "../Uuid";

export class DomainId extends Uuid{
    toPrimitives() {
        return this.getValue();
    }
}