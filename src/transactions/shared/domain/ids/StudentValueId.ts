import { DomainId } from "./DomainId";

export class StudentValueId extends DomainId{
    static fromString(uuid: string) {
        return new StudentValueId(uuid);
    }
}