'use client'
import MenuLateral from "@/app/components/menus/MenuLateral";
import Menutop from "@/app/components/menus/Menutop";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { colectCookie } from '../components/Cookie';

const ConditionalRender = ({  children }) => {   
    const pullAdrees = useRouter();
    const verifica = colectCookie();  
    
    const isAuthenticated = () => {
        if (verifica) {
            return true;
        }

    };
    

    useEffect(() => {
        if (!isAuthenticated()) {
            pullAdrees.push('/');
        }
    }, []);

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
