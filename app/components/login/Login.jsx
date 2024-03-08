import Image from "next/image"
import InputLogin from "../inputs/InputLogin"
import brasaoLagoa from '@/app/components/imagens/brasao-lagoa-dos-patos-mg.webp'


export default function Login() {
    const pass = process.env.PASS
    const access = process.env.ADRESS
    return (
        <div className="container mx-auto h-full flex flex-1 justify-center items-center">
            <div className="w-full max-w-lg">
                <div className="leading-loose">
                    <div className="max-w-sm m-4 p-5 backMac rounded shadow-xl h-82 ">
                        <div className="brasao">
                            <Image src={brasaoLagoa} quality={10} width={150} height={200} priority  className="hover:scale-105  " alt="brasao Lagoa dos Patos MG" />
                        </div>
                        <p className="text-white font-medium text-center text-lg font-bold">TRIBUTOS LAGOA DOS PATOS-MG</p>
                       
                        <InputLogin pass={pass} access={access} /> 
                       
                        <div className="text-center">
                        </div>
                    </div>
                    <div className="shado"></div>
        
                </div>
            </div>
        </div>
    )
}