import { wellNavNodesQueryOptions } from '@/clean/wellQueries'
import { queryClientGlobal } from '@/queryClient'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_userAuthed/well1')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Outlet />
}
