import { flattenWellNodeTree, type NavTreeNode, type Well2Model } from "@/stuff/dump"
import { createQuery, type Middleware, type QueryHook,   } from "react-query-kit"


const StubWellIDToWAT = new Map<number, string>([
    [5, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJXZWxsMklEIjo1LCJJc1JlYWRPbmx5IjpmYWxzZSwiaXNzIjoiMCIsImV4cCI6MTc0Mzg3NTY0OC4wLCJTZXNzaW9uTGluayI6MTc0MzE4OTE0My4wfQ.WFF6T7HMJ6c8EuRcn5Rtu21otBzSUGn_1J7CipsY_q8']
])

type IDO = { id: number }
type WATO = { wellAccessToken: string }

// type BothO = IDO & WATO

// // const watMiddlware: Middleware<QueryHook<any, any>> = useQueryNext => {
// // const watMiddlware: Middleware<QueryHook<{id: number}, {wellAccessToken: string}>> = useQueryNext => {
// // const watMiddlware: Middleware<QueryHook<any, { id: number }>> = useQueryNext => {
// const watMiddlware: Middleware<QueryHook<any, any>> = (useQueryNext) => {
//     // const watMiddlware: Middleware<QueryHook<any, {wellAccessToken: string}>> = useQueryNext => {
//     // const watMiddlware: Middleware<QueryHook<any, {id: number, wellAccessToken?: string}>> = useQueryNext => {
//     return (options, queryClient) => {
//         // const fetcher = (variables: {id: number}, context: any) => {
//         //     const wat = StubWellIDToWAT.get(variables.id) ?? '???_MISSING_WAT_???'
//         //     // return options.fetcher({...variables, wellAccessToken: wat}, context)
//         //     // return options.fetcher({wellAccessToken: wat}, context)
//         //     return options.fetcher({wellAccessToken: wat}, context)
//         // }

//         // queryClient?.getQueryData
// debugger
//         const {data: deepWNN} = useWellNavNodesQuery()
//         // const dee
//         // queryClient?.

//         // queryClient?.ensureQueryData({queryKey: ['wellNavNodes'], queryFn: fetchWNN})
//         // queryClient?.ensureQueryData({queryKey: ['wellNavNodes']})
        
//         const wid = options.variables?.id
//         // if (!wid || !deepWNN) {
//             console.log('wid', wid, queryClient, 'unused deepWNN', deepWNN)
//         if (!wid) {
//             // console.log('wid', wid, 'deepWNN', deepWNN)
//             throw new Error()
//             // return useQueryNext(options)
//         }
//         // const wnn = flattenWellNodeTree(deepWNN)
//         // const wat = wnn.find(n => n.WellID === wid)?.AccessToken

//         // if (!wat)
//         //     throw new Error()

//         // const wat = StubWellIDToWAT.get(wid) ?? '???_MISSING_WAT_???'

//         // const meta = {
//         //     ...options.meta,
//         //     wellAccessToken: wat
//         // }

//         return useQueryNext({
//             ...options,
//             // meta,
//             fetcher: async (variables, context) => {
//                 // context.meta
//                 console.log('MW fetcher run. current cache?', queryClient?.getQueryData(['wellNavNodes']), queryClient)
//                 const deepWNN = await queryClient?.ensureQueryData({queryKey: ['wellNavNodes'], queryFn: fetchWNN})
//                 // queryClient?.
//                 if (!deepWNN)
//                     throw new Error()

//         const wnn = flattenWellNodeTree(deepWNN)
//         const wat = wnn.find(n => n.WellID === wid)?.AccessToken

//                 // const wat = StubWellIDToWAT.get(variables.id) ?? '???_MISSING_WAT_???'

//                 const newContext: typeof context = {
//                     ...context,
//                     meta: {...context.meta, wellAccessToken: wat}
//                 }

//                 return await options.fetcher({id: variables.id, wellAccessToken: wat}, newContext)
//             }
//             // fetcher,
//         })
//     }
// }

// // todo: or should use skiptoken? https://github.com/HuolalaTech/react-query-kit?tab=readme-ov-file#disabling-queries
// const watMiddlwareTestingEnabled: Middleware<QueryHook<any, any>> = (useQueryNext) => {
//     // const watMiddlware: Middleware<QueryHook<any, {wellAccessToken: string}>> = useQueryNext => {
//     // const watMiddlware: Middleware<QueryHook<any, {id: number, wellAccessToken?: string}>> = useQueryNext => {
//     return (options, queryClient) => {
//         // queryClient.
//         const {data: deepWNN} = useWellNavNodesQuery()
//         // const dee
//         // queryClient?.

//         // queryClient?.ensureQueryData({queryKey: ['wellNavNodes'], queryFn: fetchWNN})
//         // queryClient?.ensureQueryData({queryKey: ['wellNavNodes']})
        
//         const wid = options.variables?.id
//         console.log('wid', wid, queryClient, 'deepWNN', deepWNN)
//         // if (!wid || !deepWNN) {
//         if (!wid) {
//             // console.log('wid', wid, 'deepWNN', deepWNN)
//             throw new Error()
//             // return useQueryNext(options)
//         }

//         if (!deepWNN) {
//             return useQueryNext({
//                 ...options,
//                 enabled: false
//             }, queryClient)
//         }
//         const wnn = flattenWellNodeTree(deepWNN)
//         const wat = wnn.find(n => n.WellID === wid)?.AccessToken

//         // if (!wat)
//         //     throw new Error()

//         // const wat = StubWellIDToWAT.get(wid) ?? '???_MISSING_WAT_???'

//         const meta = {
//             ...options.meta,
//             wellAccessToken: wat
//         }

//         return useQueryNext({
//             ...options,
//             meta,
//         //     fetcher: async (variables, context) => {
//         //         // context.meta
//         //         console.log('MW fetcher run. current cache?', queryClient?.getQueryData(['wellNavNodes']), queryClient)
//         //         const deepWNN = await queryClient?.ensureQueryData({queryKey: ['wellNavNodes'], queryFn: fetchWNN})
//         //         // queryClient?.
//         //         if (!deepWNN)
//         //             throw new Error()

//         // const wnn = flattenWellNodeTree(deepWNN)
//         // const wat = wnn.find(n => n.WellID === wid)?.AccessToken

//         //         // const wat = StubWellIDToWAT.get(variables.id) ?? '???_MISSING_WAT_???'

//         //         const newContext: typeof context = {
//         //             ...context,
//         //             meta: {...context.meta, wellAccessToken: wat}
//         //         }

//         //         return await options.fetcher({id: variables.id, wellAccessToken: wat}, newContext)
//         //     }
//             // fetcher,
//         })
//     }
// }





// export const useWellDetails = createQuery<Well2Model, IDO>({
//     queryKey: ['wellDetails'],

//     // fetcher: (variables: { id: number }, context): Promise<Well2Model> => {
//     fetcher: (variables, context): Promise<Well2Model> => {

//         const wat = context.meta?.wellAccessToken

//         console.log('uWD fetcher wat: ', wat)
//         if (!wat)
//             throw new Error()

//         return fetch(`http://localhost:62629/api/well2/fetchWellDetails?a=${wat}`, {
//             credentials: 'include'
//         }).then(resp => resp.json() as Promise<Well2Model>)
//     },
//     // use: [watMiddlware]
//     use: [watMiddlwareTestingEnabled]
// })

// export const fetchWNN = async () => {
//         console.log('fetchWnnStart')
//         const response = await fetch('http://localhost:62629/api/well2/fetchWellNavNodes', {
//             credentials: 'include'
//         })
//         .then(r => r.json())
//         .then(json => json.Data as NavTreeNode[])

//         return response
// }

// const useWellNavNodesQueryInner = createQuery({
//     queryKey: ['wellNavNodes'],
//     fetcher: fetchWNN,
//     // use
//     // fetcher: async () => {
//     //     const response = await fetch('http://localhost:62629/api/well2/fetchWellNavNodes', {
//     //         credentials: 'include'
//     //     })
//     //     .then(r => r.json())
//     //     .then(json => json.Data as NavTreeNode)

//     //     return response
//     // }
// })

// const useWellNavNodesQuery = (...params: any[]) => {
//     console.log('wrapper ran')
//     return useWellNavNodesQueryInner(...params)
// }