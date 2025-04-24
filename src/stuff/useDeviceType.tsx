import { useRouteContext, type ErrorRouteComponent } from "@tanstack/react-router"
import { useMemo, type FC } from "react"

const useDeviceType = <TProps extends object>(DesktopComponent: FC<TProps>, MobileComponent: FC<TProps>, props: TProps) => {
    const { isMobile } = useRouteContext({ from: '__root__' })

    return isMobile
        ? <MobileComponent {...props} />
        : <DesktopComponent {...props} />
}




export const CreateErrorComponent = (DesktopErrorComponent: ErrorRouteComponent, MobileErrorComponent: ErrorRouteComponent) => {

    const ReturnedComponent: ErrorRouteComponent = (props) => {
        const { isMobile } = useRouteContext({ from: '__root__' })

        return isMobile
            ? <MobileErrorComponent {...props} />
            : <DesktopErrorComponent {...props} />
    }

    return ReturnedComponent
    // errorComponent: CreateErrorComponent(DesktopError, MobileError)
}

export default useDeviceType