import { Button } from "@/components/ui/button";

export const FlowNotImplemented = ({ onContinue }: { onContinue: () => void }) => {
    return (
        <div className="w-full flex items-center justify-center h-screen bg-gradient-to-br from-[#5d7c8a] to-[#89a8b0]">
            <div className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-lg flex flex-col items-center">
                <h1 className="text-3xl font-bold text-center text-bravo-dark mb-4">
                    Fluxo em construção 🚧
                </h1>
                <p className="text-gray-600 text-center text-lg mb-8">
                    Ainda estamos finalizando este fluxo de atendimento. <br />
                    Mas você já pode continuar o seu cadastro normalmente.
                </p>
                <Button onClick={onContinue} className="w-full max-w-sm text-lg py-6">
                    Continuar Cadastro
                </Button>
            </div>
        </div>
    )
}
