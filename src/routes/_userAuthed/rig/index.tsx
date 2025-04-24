import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_userAuthed/rig/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_userAuthed/rig/"!</div>
}
