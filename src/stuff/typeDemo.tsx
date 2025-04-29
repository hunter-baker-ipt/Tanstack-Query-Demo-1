import { fetchUserHeadersQueryOptions } from "@/clean/userQueries"
import { queryClientGlobal } from "@/queryClient"


const fn = () => {
    const userHeadersData = queryClientGlobal.getQueryData(fetchUserHeadersQueryOptions.queryKey)
    //    ^?
}