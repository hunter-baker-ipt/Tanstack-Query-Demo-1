import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
      {/* <Link to='/pnidEditor' search={{documentID: 5, rigID: 6}}>Pnid editor</Link> */}
    </div>
  )
}