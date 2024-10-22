// 'use client'

import { setCookie, getCookie, deleteCookie } from "cookies-next"



export const insertCookie = () => {
    setCookie('dn', '19081989', { maxAge: 60 * 60 * 24 });

}
export const colectCookie = () => {
    const pullC = getCookie('dn');
    const myTok = process.env.NEXT_PUBLIC_TOKEN
    console.log(myTok)
    if(pullC == myTok) {
        console.log(123)
        return true
    }
    return false
   

}
export const deleteCookies = () => {
    deleteCookie('dn');

}