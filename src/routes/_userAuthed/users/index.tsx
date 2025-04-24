import { postCreateUser, postCreateUserWithProperError, postUpdateUserDetails } from '@/api2/well/apiRoutes'
import { fetchUserDetailsQueryOptions, fetchUserHeadersQueryOptions } from '@/clean/userQueries'
import type { AddOrUpdateUserAccountInput, UserAccountModel, UserHeader } from '@/stuff/UserApiTypes'
import { useMutation, usePrefetchQuery, useQuery, useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { Suspense, useState, type FC } from 'react'

export const Route = createFileRoute('/_userAuthed/users/')({
    component: RouteComponent,
    loader: ({ context: { queryClient } }) => {
        // optional, but improves UX
        // queryClient.prefetchQuery(fetchUserHeadersQueryOptions)
    }
})

const UserTableDetails: FC<{ userID: number }> = ({ userID }) => {
    // const { data: userDetails } = useQuery(fetchUserDetailsQueryOptions(userID))
    // if (!userDetails)
    //   return <div>Loading...</div>

    const queryClient = useQueryClient()
    const { data: userDetails, } = useSuspenseQuery(fetchUserDetailsQueryOptions(userID))

    const userDetailsMutation = useMutation({
        mutationFn: () => postUpdateUserDetails({ ...userDetails, Note: Math.random().toString() }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: fetchUserDetailsQueryOptions(userID).queryKey })
        },
    })

    return <div>
        <div>Email: {userDetails.Email}</div>
        <div>roles: {userDetails.Roles.toString()}</div>
        <div>Note: {userDetails.Note}</div>
        <button onClick={() => userDetailsMutation.mutate()}>Update note</button>
    </div>
}

const UserTableRow: FC<{ userHeader: UserHeader | AddOrUpdateUserAccountInput }> = ({ userHeader }) => {
    const [isExpanded, setIsExpanded] = useState(false)
    const queryClient = useQueryClient()

    return <div
        onMouseOver={() => queryClient.prefetchQuery(fetchUserDetailsQueryOptions(userHeader.ID))}
        style={{ border: '1px solid black' }}
    >
        <div
            onClick={() => setIsExpanded(old => !old)}
        >
            {userHeader.Name}
        </div>
        {isExpanded
            // ? <UserTableDetails userID={userHeader.ID} />
            ? <Suspense><UserTableDetails userID={userHeader.ID} /></Suspense>
            : null
        }
    </div>
}

const dummyNewUser = (): AddOrUpdateUserAccountInput => ({
    AffiliatedCustomer_ID: 1,
    CanParticipateInApprovalWorkflowForCustomers: [],
    DataGroups: [],
    Email: `${Math.random()}@dummy.dummy`,
    HasRoleWithAdminPrivileges: true,
    ID: Math.round(Math.random() * 10000),
    IsSharedAcc: false,
    Name: 'dummy new account' + Math.random(),
    Note: 'note',
    Roles: [],
})

function RouteComponent() {
    const queryClient = useQueryClient()
    const { data: userHeaders } = useSuspenseQuery(fetchUserHeadersQueryOptions)

    const createUserMutationRegular = useMutation({
        mutationKey: ['createUser'],
        mutationFn: postCreateUserWithProperError,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: fetchUserHeadersQueryOptions.queryKey }),
    })

    const createUserMutationOptimisticViaUI = useMutation({
        mutationFn: postCreateUserWithProperError,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: fetchUserHeadersQueryOptions.queryKey }),
    })

    const createUserMutationOptimisticViaCache = useMutation({
        mutationFn: postCreateUserWithProperError,
        onMutate: async (newHeader) => {
            // Cancel any outgoing refetches so they don't overwrite our optimistic update
            await queryClient.cancelQueries({ queryKey: fetchUserHeadersQueryOptions.queryKey })

            // Snapshot the previous value
            const previousHeaders = queryClient.getQueryData(fetchUserHeadersQueryOptions.queryKey)

            // Optimistically update to the new value
            queryClient.setQueryData(fetchUserHeadersQueryOptions.queryKey, old => [...(old) ?? [], newHeader])

            // Return a context object with the snapshotted value
            return { previousHeaders }
        },
        onError: (err, newTodo, context) => {
            queryClient.setQueryData(fetchUserHeadersQueryOptions.queryKey, context?.previousHeaders)
        },
        onSettled: () => queryClient.invalidateQueries({ queryKey: fetchUserHeadersQueryOptions.queryKey }),
    })

    return <div>
        {
            userHeaders.map(h => (
                <UserTableRow userHeader={h} key={h.ID} />
            ))
        }
        {createUserMutationOptimisticViaUI.isPending && <div style={{ border: '1px solid red' }}><UserTableRow userHeader={createUserMutationOptimisticViaUI.variables} /></div>}

        <button onClick={() => createUserMutationRegular.mutate(dummyNewUser())}>Add user</button>
        <button onClick={() => createUserMutationOptimisticViaUI.mutate(dummyNewUser())}>Add user - Optimistic update via UI</button>
        <button onClick={() => createUserMutationOptimisticViaCache.mutate(dummyNewUser())}>Add user - Optimistic update via Cache</button>
    </div>
}
