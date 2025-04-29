import { fetchWellDetails, fetchWellNavNodes } from "@/api2/well/apiRoutes"
import { queryOptions } from "@tanstack/react-query"
import { getWellIDFromAuthToken } from "./utils/utils"
import { queryClientGlobal } from "@/queryClient"
import { getWellAuthTokenFromID } from "@/stuff/dump"

export const wellNavNodesQueryOptions = queryOptions({
    queryKey: ['well', 'wellNavNodes'],
    queryFn: () => fetchWellNavNodes(),
    staleTime: 50000,
})

export const wellDetailsQueryOptions = (wellAccessToken: string) => {
    const wellID = getWellIDFromAuthToken(wellAccessToken)

    return queryOptions({
        queryKey: ['well', 'wellDetails', wellID],
        queryFn: () => fetchWellDetails(wellAccessToken),
    })
}

export const wellDetailsQueryOptionsAlternative = (wellID: number | string) => {
    // const wellID = getWellIDFromAuthToken(wellAccessToken)
    
    const wellAccessTokenPromise = queryClientGlobal.ensureQueryData(wellNavNodesQueryOptions)
        .then(wellNavNodes => getWellAuthTokenFromID(wellNavNodes, wellID))

    return queryOptions({
        queryKey: ['well', 'wellDetails', wellID],
        queryFn: () => wellAccessTokenPromise.then(wat => fetchWellDetails(wat!))
    })
}