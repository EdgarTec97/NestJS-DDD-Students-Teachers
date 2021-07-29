export class DomainError extends Error {
    public readonly code: string;

    constructor({ code, message }: {code: string, message: string}){
        super(message);
        this.code = code;
    }
}