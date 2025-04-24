import type { QueryClient } from "@tanstack/react-query"
import type { UserAuth } from "./user"

export type RouterContext = {
    userAuth: UserAuth,
    queryClient: QueryClient
}