import { createFileRoute, redirect, useRouter } from '@tanstack/react-router'
import { useCallback, useState } from 'react'
import { z } from 'zod'

const fallback = '/userDashboard' as const

export const Route = createFileRoute('/login')({
  component: RouteComponent,
  validateSearch: z.object({
    redirect: z.string().optional().catch(''),
  }),
  beforeLoad: ({ context, search }) => {
    // if (context.auth.isAuthenticated) {
    // if (isAuthenticated(context.user)) {
    if (context.userAuth.isAuthenticated) {
      throw redirect({ to: search.redirect || fallback })
    }
  },
})

function RouteComponent() {
  const router = useRouter()
  const { userAuth } = Route.useRouteContext()

  const [cat, setCat] = useState("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Imh1bnRlci5iYWtlckBpcHRnbG9iYWwuY29tIiwiaXNzdWVkT24iOjYzODgwODUxMjY5MDAwMDAwMCwiZXhwIjoxNzQ1NTEzNjcwLjB9.XPsUTqgZQmHAitc0AWlfA6qIZLDhnx2VZ_Mv0YG13wg")

  // const login = useCallback(() => {
  //   user.login('SomeToken', 'Hunter Baker')
  //   router.invalidate()
  // }, [])

  const realLogin = useCallback(() => {

    const promise = fetch('http://localhost:62629/api/auth/catWebLogin', {
      method: 'POST',
      body: JSON.stringify({
        Token: cat
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })

    promise.then(async (r) => {

      // console.log(r, r.json())

      const json = await r.json()

      const token = json.Data.JwtToken

      userAuth.login(token)
      router.invalidate()
    })



    // user.login('SomeToken', 'Hunter Baker')
  }, [cat])

  return <>
    <label>
      CAT
      <input value={cat} onChange={e => setCat(e.target.value)} />
    </label>
    {/* <button onClick={login}>Set AuthToken</button> */}

    <button onClick={realLogin}>Do real sureview login</button>
  </>
}
