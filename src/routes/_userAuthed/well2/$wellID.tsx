import { wellDetailsQueryOptionsAlternative } from '@/clean/wellQueries'
import { useQueries, useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_userAuthed/well2/$wellID')({
  component: RouteComponent,
})

function RouteComponent() {
  const { wellID } = Route.useParams()
  const { data: wellDetails } = useQuery(wellDetailsQueryOptionsAlternative(wellID))

  return <div>
    {
      wellDetails?.Label
    }
  </div>
}
