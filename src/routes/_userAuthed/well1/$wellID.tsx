import { vcdHeadersQueryOptions } from '@/clean/documentQueries'
import { wellNavNodesQueryOptions } from '@/clean/wellQueries'
import { getWellAuthTokenFromID } from '@/stuff/dump'
import { useQuery, useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { useMemo } from 'react'

export const Route = createFileRoute('/_userAuthed/well1/$wellID')({
    component: RouteComponent,
})

function RouteComponent() {

    const {wellID} = Route.useParams()
    const {data: wellNavNodes} = useSuspenseQuery(wellNavNodesQueryOptions)

    const wellAccessToken = useMemo(() => getWellAuthTokenFromID(wellNavNodes, wellID), [wellNavNodes, wellID])

    const {data: vcdHeaders} = useSuspenseQuery(vcdHeadersQueryOptions(wellAccessToken!))

    return <div>
        {vcdHeaders.map(h => <div>{h.Name}</div>)}
    </div>
}
