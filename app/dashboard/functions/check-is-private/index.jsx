import { APP_ROUTES } from "../../constants/app-routes"

export const checkIsPrivate = (pathName) => {
    const appPrivateRoutes = APP_ROUTES.private.dashboard;
    const appPublicRoutes = APP_ROUTES.public;

    // Check if the route is explicitly public
    if (appPublicRoutes.includes(pathName)) {
        return false;
    }

    // Check if it starts with any private route prefix
    const isPrivate = appPrivateRoutes.some(route => pathName.startsWith(route));

    if (isPrivate) {
        return true;
    }

    return null;
}