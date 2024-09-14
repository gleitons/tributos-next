export default function page(params) {
    const local = 'http://127.0.0.1:5500/'
    return (
        <div>

        

        <div className="w-full h-full flex justify-center items-center">
                <iframe 
                    src={local}
                    className="w-full h-[800px] border border-gray-300 rounded shadow-lg"
                    title="PDF Viewer">
                </iframe>
            </div>
        </div>
    )
};
