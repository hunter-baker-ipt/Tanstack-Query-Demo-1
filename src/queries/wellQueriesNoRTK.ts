import type { Well2Model } from "@/stuff/dump"
import { queryOptions, useQuery } from "@tanstack/react-query"

type TVariables = {
    id: number,
}

// type TData

// export const fetchWellDetailsConfig = queryOptions<Well2Model, TVariables>({
// export const fetchWellDetailsConfig = queryOptions({
//     queryKey: ['wellDetails'],
//     queryFn: async (context: any) => {
//         return {} as Well2Model;
//     }

// })



// const response = await fetch('http://localhost:62629/api/well2/fetchWellNavNodes', {
//     credentials: 'include'
// })

export const wellDetailsQueryOptions = (wellID: number) => {
    return queryOptions({
        queryKey: ['wellDetails'],
        queryFn: async ({client}) => {
            const wat = client.getQueryData(['wellNavNodes'])
            return {} as Well2Model;
        }
    })
}

// export const useFetchWellDetails = () => {

//     return useQuery({
//         queryKey: ['wellDetails'],
//         queryFn: (variables, context): Promise<Well2Model> => {
    
//             const wat = context.meta?.wellAccessToken
    
//             console.log('uWD fetcher wat: ', wat)
//             if (!wat)
//                 throw new Error()
    
//             return fetch(`http://localhost:62629/api/well2/fetchWellDetails?a=${wat}`, {
//                 credentials: 'include'
//             }).then(resp => resp.json() as Promise<Well2Model>)
//         },

//     })

//     // fetcher: (variables: { id: number }, context): Promise<Well2Model> => {
//     // use: [watMiddlware]
//     // use: [watMiddlwareTestingEnabled]
// }
