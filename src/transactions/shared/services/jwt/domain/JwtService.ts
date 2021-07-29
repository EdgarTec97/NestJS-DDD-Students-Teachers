import { ManagerId } from "../../../../../transactions/shared/domain/ids/ManagerId";
import { PhoneNumber } from "../../../../../transactions/shared/domain/ids/PhoneNumber";
import { TokenPair } from "../../../../../transactions/shared/domain/TokenPair";
import { Uuid } from "../../../../../transactions/shared/domain/Uuid";
import { StudentValueId } from "../../../../../transactions/shared/domain/ids/StudentValueId"; 
import { JwtPayload } from "./JwtPayload";
import { Role } from "./Role";
import { AccessToken } from "./tokens/AccessToken";

export const JWT_SERVICE_TOKEN = 'JwtServiceToken';

export interface JwtService{
    sign(uuid: Uuid, role: Role): Promise<AccessToken>;
    /*createTokenPairForShopOwner(shopOwner: ShopOwner, company: Company): Promise<TokenPair>;
    createTokenPairForFinancesManager(financesManagerId: FinancesManagerId): Promise<TokenPair>;*/
    createTokenPairForStudent(studentId: StudentValueId): Promise<TokenPair>;
    createTokenPairForManager(managerId: ManagerId): Promise<TokenPair>;
    createForSettingPassword(accountId: StudentValueId): Promise<AccessToken>;
    createForRegistering(phoneNumber: PhoneNumber): Promise<AccessToken>;
    createForLogin(studentId: StudentValueId): Promise<AccessToken>;
    verify(jwt: AccessToken): Promise<boolean>;
    decode(jwt: AccessToken): Promise<JwtPayload>;
}