import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'
import { useCallback } from 'react'

export const Route = createLazyFileRoute('/contact')({
    component: RouteComponent,
})


function RouteComponent() {

    const navigate = useNavigate()

    const maybeNav = useCallback(() => {
        if (Math.random() < 0.5) {
            navigate({ to: '/about'})
        }
    }, [])

    return <>
        <div>Hello "/contact"!</div>
        <button></button>
    </>
}
