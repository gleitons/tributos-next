'use client'
import MenuLateral from "@/app/components/menus/MenuLateral";
import Menutop from "@/app/components/menus/Menutop";
import { useRouter } from 'next/navigation';
import { useEffect, useCallback } from 'react';
import { colectCookie } from '../components/Cookie';

const ConditionalRender = ({ children }) => {
    const pullAdrees = useRouter();
    const verifica = colectCookie();

    const isAuthenticated = useCallback(() => {
        if (verifica) {
            return true;
        }
        return false;
    }, [verifica]);

    useEffect(() => {
        if (!isAuthenticated()) {
            pullAdrees.push('/');
        }
    }, [isAuthenticated, pullAdrees]);

    if (isAuthenticated() || null) {
        return ( // Garantindo que a estrutura HTML corresponda
            <div>
                <Menutop />
                <div className="flex">
                    <div>
                        <MenuLateral />
                    </div>
                    <div className="p-2 w-full h-full">
                        {children}
                    </div>
                </div>
            </div>
        ); // Certificando-se de que a estrutura não cause conflito
    }
    return null;
};

export default ConditionalRender;
