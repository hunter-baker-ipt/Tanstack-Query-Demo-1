export const getWellIDFromAuthToken = (jwt: string | null): number | undefined => {
    const b64Payload = jwt ? jwt.split(".")[1] : ""
    const json = atob(b64Payload)
    const { Well2ID } = jwt ? JSON.parse(json) as { Well2ID: number } : { Well2ID: undefined }
    return Well2ID
}