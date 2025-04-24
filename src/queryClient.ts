import { QueryClient } from "@tanstack/react-query"

/*
notable configs

refetch on... mount, windowFocus, reconnect, interval

*/

export const queryClientGlobal = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5000,
            // refetchOnWindowFocus: true,
        },
        mutations: {

        }

    },
    // queryCache: {

    // }
})