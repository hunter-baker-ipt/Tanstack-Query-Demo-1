import { fetchUserDetails, fetchUserHeaders } from "@/api2/well/apiRoutes"
import { queryOptions } from "@tanstack/react-query"
import _ from "lodash"

export const fetchUserHeadersQueryOptions = queryOptions({
    queryKey: ['users', 'headers'],
    queryFn: fetchUserHeaders,
    select: (users) => _.orderBy(users, u => u.ID),
})

export const fetchUserDetailsQueryOptions = (userID: number) => {
    return queryOptions({
        queryKey: ['users', 'detail', userID],
        queryFn: ({ signal }) => fetchUserDetails(userID, signal),
    })
}