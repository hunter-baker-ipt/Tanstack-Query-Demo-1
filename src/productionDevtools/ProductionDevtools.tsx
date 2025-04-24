import React from 'react'

const ReactQueryDevtoolsProduction = React.lazy(() =>
  // import('@tanstack/react-query-devtools/build/modern/production.js').then(
  // import('@tanstack/react-query-devtools/build/modern/production.js').then(
  import('@tanstack/react-query-devtools/build/modern/production.js').then(
    (d) => ({
      default: d.ReactQueryDevtools,
    }),
  ),
)

const TanstackRouterDevtoolsProduction = React.lazy(() =>
  import('@tanstack/react-router-devtools').then(
    (d) => ({
      default: d.TanStackRouterDevtoolsInProd,
    }),
  ),
)

const ProductionDevtools = () => {
  const [showProductionDevtools, setShowProductionDevtools] = React.useState(false)

  React.useEffect(() => {
    // @ts-expect-error
    window.toggleDevtools = () => setShowProductionDevtools((old) => !old)
  }, [])

  return showProductionDevtools
    ?
    <React.Suspense fallback={null}>
      <ReactQueryDevtoolsProduction />
      <TanstackRouterDevtoolsProduction />
    </React.Suspense>
    : null
}

export default ProductionDevtools