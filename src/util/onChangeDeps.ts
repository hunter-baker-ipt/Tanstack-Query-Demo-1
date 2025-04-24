import { useQueries, useQueryClient, type QueriesOptions, type QueriesResults, type QueryClient } from "@tanstack/react-query"
import type { Middleware, QueryHook } from "react-query-kit"


// const subscribe: Middleware<QueryHook<any, any>> = () =>
//     useQueryNext => {
//         return (options) => {
//             const client = useQueryClient()



//         }
//     }


// type Precursor<TP, TR> = (p: TP) => TR



const withPrecursor = <TInjected>(usePrecursor: () => TInjected): Middleware<QueryHook<any, any>> => {

    
    return (useQueryNext) => {
        return (options) => {
            
            const result = usePrecursor()
            const client = useQueryClient()

            return useQueryNext(options)

        }
    }
}


// type Qs<T1 extends any[],T2 = any> = Parameters<typeof useQueries<T1,T2>>

type Fn<T extends any[] = any[]> = ({ queries }: {
    queries: readonly [...QueriesOptions<T>]
}) => QueriesResults<T>

const withUseQueriesResults = <T extends any[], TFnData, TVariables>(queries: readonly [...QueriesOptions<T>]): Middleware<QueryHook<TFnData, TVariables>> => {
    
    return (useQueryNext) => {
        return (options) => {
            
            // const result = usePrecursor()

            const results = useQueries({queries})
            const client = useQueryClient()

            return useQueryNext(options)

        }
    }
}