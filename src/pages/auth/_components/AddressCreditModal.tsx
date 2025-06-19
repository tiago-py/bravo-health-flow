import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; // Supondo que você tenha um componente Input reutilizável
import { CreditCard } from "lucide-react";
import CreditCardModal from "./CreditCardModal";

interface AddressModalProps {
  closeModal: () => void;
  totalValue: number;
  products: any[]; // Fazer tipagem real depois.
}


const AddressCreditModal = ({ closeModal, totalValue, products }: AddressModalProps) => {
  const [cep, setCep] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [uf, setUf] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [addressSaved, setAddressSaved] = useState(false);

  // Carregar o endereço do localStorage, se existir
  useEffect(() => {
    const storedAddress = localStorage.getItem("address");
    if (storedAddress) {
      const parsedAddress = JSON.parse(storedAddress);
      setCep(parsedAddress.cep);
      setLogradouro(parsedAddress.logradouro);
      setNumero(parsedAddress.numero);
      setComplemento(parsedAddress.complemento);
      setBairro(parsedAddress.bairro);
      setCidade(parsedAddress.cidade);
      setUf(parsedAddress.uf);
    }
  }, []);

  const handleSubmit = async () => {
    const addressData = {
      cep,
      logradouro,
      numero,
      complemento,
      bairro,
      cidade,
      uf,
    };

    // Salvar o endereço no localStorage
    localStorage.setItem("address", JSON.stringify(addressData));

    setLoading(true);
    setError(null);

    try {
      // const response = await fetch("/api/enderecos", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(addressData),
      // });

      // if (!response.ok) {
      //   throw new Error("Erro ao salvar o endereço");
      // }
      setAddressSaved(true);

      // Caso o endereço seja salvo com sucesso, feche o modal ou faça outra ação
      alert("Endereço salvo com sucesso!");
    } catch (err) {
      setError("Ocorreu um erro ao salvar o endereço. Tente novamente.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async () => {
    try {
      // Aqui você pode fazer a chamada para a API de pagamento
      const response = await fetch(`${import.meta.env.VITE_API_URL_BASE}/payment/stripe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          totalValue,
          products // A ideia é verificar se os produtos condiz com id no banco de dados pra depois processar o pagamento
          // E verificar se o valor totalValue é o mesmo que o valor total dos produtos com o desconto e cumpons aplicados.
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao processar o pagamento");
      }

      const data = await response.json();
      console.log("Pagamento realizado com sucesso:", data);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="fixed inset-0 flex items-center gap-3 flex-wrap p-5 justify-center bg-black bg-opacity-55 backdrop-blur-sm">
      {!addressSaved && (
        <div className="bg-white p-5 w-full sm:w-96 rounded-md shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Adicionar Endereço</h2>

          {error && <div className="text-red-600 mb-4">{error}</div>}

          <div className="space-y-4">
            <Input
              value={cep}
              onChange={(e) => setCep(e.target.value)}
              placeholder="Digite o CEP"
            />
            <Input
              value={logradouro}
              onChange={(e) => setLogradouro(e.target.value)}
              placeholder="Digite o Logradouro"
            />
            <Input
              value={numero}
              onChange={(e) => setNumero(e.target.value)}
              placeholder="Digite o Número"
            />
            <Input
              value={complemento}
              onChange={(e) => setComplemento(e.target.value)}
              placeholder="Digite o Complemento (opcional)"
            />
            <Input
              value={bairro}
              onChange={(e) => setBairro(e.target.value)}
              placeholder="Digite o Bairro"
            />
            <Input
              value={cidade}
              onChange={(e) => setCidade(e.target.value)}
              placeholder="Digite a Cidade"
            />
            <Input
              value={uf}
              onChange={(e) => setUf(e.target.value)}
              placeholder="Digite a UF"
            />
          </div>

          <div className="mt-6 flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={closeModal}
              className="bg-gray-300 hover:bg-gray-400"
            >
              Fechar
            </Button>
            <Button
              onClick={handleSubmit}
              className="bg-blue-600 hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? "Salvando..." : "Salvar Endereço"}
            </Button>
          </div>
        </div>
      )}

      {addressSaved && (
        <CreditCardModal closeModal={closeModal} payament={handlePayment} />
      )}
    </div>
  );
};

export default AddressCreditModal;
