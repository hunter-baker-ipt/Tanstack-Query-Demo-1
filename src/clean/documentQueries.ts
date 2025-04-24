import { queryOptions } from "@tanstack/react-query"
import { getWellIDFromAuthToken } from "./utils/utils"
import { fetchVcdHeaders } from "@/api2/well/apiRoutes"

export const vcdHeadersQueryOptions = (wellAuthToken: string) => {
    const wellID = getWellIDFromAuthToken(wellAuthToken)

    return queryOptions({
        queryKey: ['vcdHeaders', { wellID }],
        queryFn: () => fetchVcdHeaders(wellAuthToken),
    })
}