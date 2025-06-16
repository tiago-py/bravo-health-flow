export const BlockedRegister = ({ close }: { close: () => void }) => {
    return (
        <div className="absolute top-0 left-0 bg-black/40 backdrop-blur-sm flex items-center justify-center w-full h-screen z-50">
            <div className="relative w-full max-w-lg bg-white rounded-xl p-8 shadow-xl border border-gray-200">
                {/* Botão de fechar no canto superior direito */}
                <button 
                    onClick={close} 
                    className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition"
                    aria-label="Fechar"
                >
                    ✕
                </button>

                <h1 className="text-2xl font-bold text-red-600 mb-4 text-center">
                    Atenção!
                </h1>
                <p className="text-gray-700 text-lg mb-2 text-center">
                    Você precisa procurar um médico.
                </p>
                <p className="text-gray-600 text-base text-center">
                    Não podemos ajudar neste caso. Agradecemos o seu interesse, mas <b className="text-red-500">não envie informações falsas.</b>
                </p>
            </div>
        </div>
    )
}
