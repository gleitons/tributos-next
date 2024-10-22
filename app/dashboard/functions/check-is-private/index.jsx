import { APP_ROUTES } from "../../constants/app-routes"

export const checkIsPrivate = (pathName) => {
    const appPrivateRoutes = APP_ROUTES.private.dashboard;
    const appPublicRoutes = APP_ROUTES.public;
   
    if (appPrivateRoutes.includes(pathName)) {
        return true;  // Private route
    } else if (appPublicRoutes.includes(pathName)) {
        return false; // Public route
    } else {
        return null;  // Route not found
    }
}