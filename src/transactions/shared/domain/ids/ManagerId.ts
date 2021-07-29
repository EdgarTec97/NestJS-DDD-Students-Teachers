import { DomainId } from "./DomainId";

export class ManagerId extends DomainId{
    static fromString(uuid: string) {
        return new ManagerId(uuid);
    }
}