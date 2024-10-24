
const FullScreenLoading: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="flex flex-col items-center">
        {/* Spinner */}
        <div className="w-16 h-16 border-4 border-t-transparent border-black rounded-full animate-spin"></div>
        {/* Text */}
        <span className="mt-4 text-black text-lg font-semibold">Futuro Consultoria</span>
        <p className="mt-4 text-black text-sm font-semibold">Carregando...</p>
      </div>
    </div>
  );
};

export default FullScreenLoading;
