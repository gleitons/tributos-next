

import InputLogin from "../inputs/InputLogin"

export default function Login() {
    const pass = process.env.PASS
    const access = process.env.ADRESS


   
    return (
        <div className="container mx-auto h-full flex flex-1 justify-center items-center">
            <div className="w-full max-w-lg">
                <div className="leading-loose">
                    <div className="max-w-sm m-4 p-5 backMac rounded shadow-xl h-82 ">
                        <div className="brasao log">
                          
                        </div>
                        <p className="text-white text-center text-lg font-bold">TRIBUTOS LAGOA DOS PATOS-MG</p>

                        <InputLogin />

                        <div className="text-center">
                        </div>
                    </div>
                    <div className="shado"></div>
                </div>
            </div>
        </div>
    )
}