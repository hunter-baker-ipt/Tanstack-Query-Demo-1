import type { FileRouteTypes } from "@/routeTree.gen"
import type { FC } from "react"
import { useDeviceFormFactor } from "./dump"

const PostsDesktop = ({ posts }: { posts: number[] }) => null
const PostsMobile = ({ posts }: { posts: number[] }) => null

const WellsDesktop = ({ wellID }: { wellID: number }) => null
const WellsMobile = ({ wellID }: { wellID: number }) => null

const RigsDesktop = () => null
const RigsMobile = () => null

type DesktopAndMobile<TSameProps> = {
    Desktop: FC<TSameProps>,
    Mobile: FC<TSameProps>
}

type RoutePaths = '/posts' | '/well' | '/rigs' // FileRouteTypes['fullPaths'] stuff in the real code

const CentralizedRouteComponents = {
    "/posts": {
        Desktop: PostsDesktop,
        Mobile: PostsMobile,
    },
    "/well": {
        Desktop: WellsDesktop,
        Mobile: WellsMobile,
    },
    "/rigs": {
        Desktop: RigsDesktop,
        Mobile: RigsMobile,
    }
// eslint-disable-next-line @
} as const satisfies Record<RoutePaths, DesktopAndMobile<any>>

type TRouteComponents = typeof CentralizedRouteComponents

// const a: number = 'a'

// For now, I am assuming that the Desktop and Mobile components will have the exact same Props type
type GetPropsForPath<TPath extends RoutePaths> = TRouteComponents[TPath]['Desktop'] extends FC<infer TProps extends {}> ? TProps : never

type Example1 = GetPropsForPath<'/posts'>  // = {posts: number[]}

export const RouteComponentWrapper = <TPath extends RoutePaths, TProps extends GetPropsForPath<TPath>>({ path, props }: { path: TPath, props: TProps }) => {
    const formFactor = useDeviceFormFactor()

    // "as DesktopAndMobile<TProps>" is not ideal, but we know it will be right
    const { Desktop, Mobile } = CentralizedRouteComponents[path] as DesktopAndMobile<TProps>
    return formFactor.isDesktopOrLaptop ? <Desktop {...props} /> : <Mobile {...props} />
}

const Tester = () => {
    return <>
        <RouteComponentWrapper path="/posts" props={{ posts: [] }} />

        {/* These show type errors as expected */}
        {/* <RouteComponentWrapper path="/posts" props={{ posts: 'someString' }} />
        <RouteComponentWrapper path="/posts" props={{}} /> */}


        <RouteComponentWrapper path="/well" props={{ wellID: 5 }} />
        
        {/* props={{}} is not ideal, could be changed to where it's not needed at all */}
        <RouteComponentWrapper path="/rigs" props={{}} /> 
    </>
}