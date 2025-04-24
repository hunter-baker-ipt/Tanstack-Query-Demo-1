import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_userAuthed')({
  component: RouteComponent,
  beforeLoad: ({ context, location }) => {
    if (!context.userAuth.isAuthenticated) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href
        }
      })
    }

    

  },
  loader: () => {
    // return { aaa: 'aaa' }
  }
})

function RouteComponent() {
  return <Outlet />
}
