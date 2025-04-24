export interface NavTreeNode {
    Label: string,
    AccessToken?: string,
    Children?: NavTreeNode[]
    WellID?: number
}

export interface Well2Model {
    // RecordType: WellRecordType
    ID: number
    Source: number
    OperatorID?: number
    OperatorName?: string
    CreatedBy?: number
    CreatedByUserName?: string
    CreatedOnUtc: string
    ModifiedBy?: number
    ModifiedByUserName?: string
    ModifiedOnUtc?: string
    IsArchived: boolean
    ExtUniqueIdStr?: string
    Note?: string
    // ExtendedData?: WellExtendedData
    UseMetricUoM: boolean
    Label: string
    Name?: string
    ApiNumber: string
    RegionID: number
    CountryID?: number
    State?: string
    County?: string
    WaterDepth?: number
    ElevationMSL?: number
    Area?: string
    Block?: string
    Survey?: string
    Lat?: number
    Lng?: number
    XCoordinates?: string
    YCoordinates?: string
    CRS?: string
    EWLine?: string
    EWDepartures?: string
    NSLine?: string
    NSDepartures?: string
    Field?: string
    BusinessUnit?: string
    // PartnerShare?: Partnership[]
    Pool?: string
    Lease?: string
    Class?: number
    Concession?: string
    LicenseBound?: string
}

export enum Well2RecordTypeEnum {
    USOffshore = 0,
    USOnshore = 1,
    InternationalOffshore = 2,
}

export type Wellbore2Header = {
    /**flags of Well2RecordTypeEnum */
    RecordType: Well2RecordTypeEnum
    ID: number
    PreAuthToken: string
    Label: string
    Name?: string
    ApiSideTrack: number
    ApiBypass: number
    SpudDate?: number
    OpType?: number
    OpStatus?: number
    WellLabel: string
    CreatedOrModifiedDateUtc: number
    IsArchived: boolean
    ActiveSchematicPlanID?: number
}

export type Wellbore2Model = {
    RecordType: number
    ID: number
    Source: number
    Well2ID: number
    CreatedOnUtc: number
    IsArchived: boolean
    Label: string
    Name?: string
    SideTrack: number
    Bypass: number
    TotalDepthMD?: number
    TotalDepthTVD?: number
    KickOffPointMD?: number
    Area?: string
    Block?: string
    Lat?: number
    Lng?: number
    XCoordinates?: string
    YCoordinates?: string
    BottomLease?: string
    OpType?: number
    OpStatus?: number
    SpudDate?: number
    ActiveSchematicPlanID?: number
    CRS: string
    ExtendedData: WellboreExtendedData
}

export interface WellboreExtendedData {
    CustomFields: CustomField[]
}
 export interface CustomField {
    Label: string
    Category: number
    Value?: string
}


export const isDefined = <T,>(val: T | undefined | null): val is T => val !== undefined && val !== null
export const toNumberOrUndefined = (value: any): number | undefined => (
    toNumberOrUndefinedWithOffset(value, 0)
)


export const toNumberOrUndefinedWithOffset = (value: any, offset: number): number | undefined => {
    if (!isDefined(value))
        return undefined

    const parsedValue = parseFloat(value.toString().replaceAll(',', ''))
    return !isNaN(parsedValue) ? parsedValue + offset : undefined
}


// export const flattenWellNodeTree = (wellNodeTree: any[]): NavTreeNode[] => {
export const flattenWellNodeTree = (wellNodeTree: NavTreeNode[]): NavTreeNode[] => {
  let adjustedTree = wellNodeTree
  for (let i = 0; i < 3; i++) {
    adjustedTree = adjustedTree.flatMap((node) => node.Children ?? [])
  }
  return adjustedTree
}

export const fetchPosts = async () => {
  console.info('Fetching posts...')
  await new Promise((r) => setTimeout(r, 500))
  return []
}

export const useDeviceFormFactor = () => {
    return {
        isDesktopOrLaptop: true
    }
}

export type VersionControlledDocumentHeader = {
    ID: number,
    Name: string,
}

export const getWellAuthTokenFromID = (wellNavNodes: NavTreeNode[], wellID: number | string) => {
    const flat = flattenWellNodeTree(wellNavNodes)

    return flat.find(n => n.WellID?.toString() === wellID.toString())?.AccessToken
}