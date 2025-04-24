import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter, parseSearchWith, stringifySearchWith } from '@tanstack/react-router'
import _ from 'lodash'

// Import the generated route tree
import { routeTree } from './routeTree.gen'

import './styles.css'
import reportWebVitals from './reportWebVitals.ts'
import { UserAuth } from './stuff/user.ts'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Provider } from 'react-redux'
import { queryClientGlobal } from './queryClient.ts'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'
import { postCreateUserWithProperError } from './api2/well/apiRoutes.ts'


function decodeFromBinary(str: string): string {
  return decodeURIComponent(
    Array.prototype.map
      .call(atob(str), function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      })
      .join(''),
  )
}

function encodeToBinary(str: string): string {
  return btoa(
    encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
      return String.fromCharCode(parseInt(p1, 16))
    }),
  )
}
// Create a new router instance
const router = createRouter({
  routeTree,
  context: {
    userAuth: new UserAuth(),
    queryClient: queryClientGlobal,
  },
  defaultPreload: 'intent',
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 50000,

  defaultNotFoundComponent: () => <div>40404040404 not found</div>,

  stringifySearch: ((value) => {
    // console.log('stringifySearch', value)
    const stringified = JSON.stringify(value)
    if (_.isEmpty(value)) {
      return ''
    }
    return '?unifiedSearchParam=' + encodeToBinary(JSON.stringify(value))
  }),
  parseSearch: (value) => {
    console.log('parseSearch')
    const stripped = value.replace('?unifiedSearchParam=', '')
    if (stripped.length == 0) {
      return {}
    }
    return JSON.parse(decodeFromBinary(stripped))
  },
})


// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

type MyQueryKey = (
  | ['users', 'headers']
  | ['users', 'details', number]
)

declare module '@tanstack/react-query' {
  interface Register {
    // queryKey: MyQueryKey
    // queryKey: CentralQueryKeysDef
    // queryKey: Test2
    // mutationKey: QueryKey
  }
}

// const persister = createSyncStoragePersister({
//   storage: window.localStorage,
// })

// queryClientGlobal.setMutationDefaults(['createUser'], {
//   mutationFn: postCreateUserWithProperError
// })

// const ReactQueryDevtoolsProduction = React.lazy(() =>
//   // import('@tanstack/react-query-devtools/build/modern/production.js').then(
//   // import('@tanstack/react-query-devtools/build/modern/production.js').then(
//   import('@tanstack/react-query-devtools/build/modern/production.js').then(
//     (d) => ({
//       default: d.ReactQueryDevtools,
//     }),
//   ),
// )



const App = () => {
  // const [showProductionDevtools, setShowProductionDevtools] = React.useState(false)

  // React.useEffect(() => {
  //   // @ts-expect-error
  //   window.toggleDevtools = () => setShowProductionDevtools((old) => !old)
  // }, [])

  return <StrictMode>
      {/* <PersistQueryClientProvider
          client={queryClientGlobal}
          persistOptions={{ persister }}
          onSuccess={() => {
            queryClientGlobal.resumePausedMutations().then(() => {
              queryClientGlobal.invalidateQueries()
              })
              }}
              > */}
      <QueryClientProvider client={queryClientGlobal}>
        <RouterProvider router={router} />
        <ReactQueryDevtools />
        {/* {showProductionDevtools && (
          <React.Suspense fallback={null}>
            <ReactQueryDevtoolsProduction />
            <TanstackRouterDevtoolsProduction />
          </React.Suspense>
        )} */}
      </QueryClientProvider>
      {/* </PersistQueryClientProvider> */}
  </StrictMode>
}

// Render the app
const rootElement = document.getElementById('app')
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(<App />)
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
