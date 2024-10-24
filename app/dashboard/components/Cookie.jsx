import { setCookie, getCookie, deleteCookie } from "cookies-next";

export const insertCookie = () => {
    const betInco = process.env.NEXT_PUBLIC_TOKEN
    setCookie('bg-gray-800', betInco, { maxAge: 60 * 60 * 24 });

}

export const colectCookie = () => {
    const pullC = getCookie('bg-gray-800');
    const betInco = process.env.NEXT_PUBLIC_TOKEN

    if (pullC == betInco) {
        return true
    }
    return false
}

export const deleteCookies = () => {
    deleteCookie('bg-gray-800');

}