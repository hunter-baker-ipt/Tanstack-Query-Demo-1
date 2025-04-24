
interface DateRange{
    startDate?: string
    endDate?: string
    startTime?: string
    endTime?: string
}

interface EntityNameModel {
    Name: string
}

interface EntityIdModel {
    ID: number
}

interface AuthorizedEntityIdModel extends EntityIdModel {
    PreAuthToken: string
}

type EntityModel = EntityIdModel & EntityNameModel

type EntityWithTestCountModel = EntityModel & { TestCount: number }

interface EntityEmailModel extends EntityModel {
    Email: string
}

interface DataGroupHeader extends EntityModel{
    Note: string
}

interface DataGroupModel extends DataGroupHeader {
    CanAccessEverything: boolean
    CanAccessCompanies: number[]
    CanAccessRigs: number[]
    CanAccessWells: number[]
    CanAccessWellRegions: number[]
    IsAssignedToUsers: number[]
}

interface LoginAccessToken {
    email: string,
    issuedOn: number,
    exp: number,
}
export type UserHeaderRole = EntityModel

export interface UserHeader extends EntityEmailModel {
    CustomerName: string,
    IsActive: boolean,
    Roles: UserHeaderRole[],
}

export interface UserDisplayHeader extends UserHeader {
    RolesDisplay: string[],
    IsActiveDisplay: string,
}

export interface AddOrUpdateUserAccountInput extends EntityModel {
    Email: string,
    AffiliatedCustomer_ID: number,
    Note: string,
    DataGroups: Number[],
    Roles: Number[],
    CanParticipateInApprovalWorkflowForCustomers: Number[],
    IsSharedAcc: boolean,
    HasRoleWithAdminPrivileges: boolean,
}

export interface UpdateUserAccountInput extends AddOrUpdateUserAccountInput {
    IsActive: boolean,
    IsNewlyDeactivated: boolean,
}

export interface UpdateUserAccountInputEx extends UpdateUserAccountInput {
    IsActiveDisplay: string,
    IsActiveOriginal: boolean,
}

export interface UserAccountModel extends UpdateUserAccountInputEx {
    AccessTokenIssueTimeUtc? : number
}

export interface UserRoleModel extends EntityModel {
    Note: string,
    AccessAreaMap: number | number[],
    PrivilegeMap: number | number[],
    AllowExtendedUserSession: boolean,
    IsAssignedToUsers: number[],
    HasAnyAdministrativePrivilege: boolean,
}

export interface ApprovalParticipantUserInfo extends EntityEmailModel {
    Customer: string,
    IsActive: boolean,
    IsSelected: boolean,
}

export interface ApprovalParticipantUserInfoEx extends ApprovalParticipantUserInfo {
    CO_Name: string,
}

export interface CreateUserAccessTokenInput {
    Email: string,
    TokenLifespanInHours: number,
    UserID: number,
}
