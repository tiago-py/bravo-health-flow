import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; // Supondo que você tenha um componente Input reutilizável

interface CreditCardModalProps {
  closeModal: () => void;
  payament: () => Promise<void>
}

const CreditCardModal = ({ closeModal, payament }: CreditCardModalProps) => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [planType, setPlanType] = useState<"semestral" | "trimestral">("semestral"); // Estado para o tipo de plano

  // Carregar os dados do cartão do localStorage, se existir
  useEffect(() => {
    const storedCard = localStorage.getItem("creditCard");
    if (storedCard) {
      const parsedCard = JSON.parse(storedCard);
      setCardNumber(parsedCard.cardNumber);
      setCardHolder(parsedCard.cardHolder);
      setExpiryDate(parsedCard.expiryDate);
      setCvv(parsedCard.cvv);
    }
  }, []);

//   const handleSubmit = async () => {
//     const cardData = {
//       cardNumber,
//       cardHolder,
//       expiryDate,
//       cvv,
//       planType, // Incluir o tipo de plano
//     };

//     // Salvar os dados do cartão no localStorage
//     localStorage.setItem("creditCard", JSON.stringify(cardData));

//     setLoading(true);
//     setError(null);

//     try {
//       const response = await fetch("/api/cartao-de-credito", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(cardData),
//       });

//       if (!response.ok) {
//         throw new Error("Erro ao salvar os dados do cartão");
//       }

//       // Caso os dados do cartão sejam salvos com sucesso, feche o modal ou faça outra ação
//       alert("Cartão salvo com sucesso!");
//     } catch (err) {
//       setError("Ocorreu um erro ao salvar os dados do cartão. Tente novamente.");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

  return (
    <div>
      <div className="bg-white p-5 w-full sm:w-96 rounded-md shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Adicionar Cartão de Crédito</h2>

        {error && <div className="text-red-600 mb-4">{error}</div>}

        <div className="space-y-4">
          <Input
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            placeholder="Número do Cartão"
            type="text"
          />
          <Input
            value={cardHolder}
            onChange={(e) => setCardHolder(e.target.value)}
            placeholder="Nome do Titular"
            type="text"
          />
          <Input
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            placeholder="Data de Validade (MM/AA)"
            type="text"
          />
          <Input
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            placeholder="CVV"
            type="password"
          />
        </div>

        {/* Seção para escolher o tipo de plano */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Escolha o Tipo de Plano</h3>
          <div className="flex gap-4">
            <label>
              <input
                type="radio"
                name="planType"
                value="trimestral"
                checked={planType === "trimestral"}
                onChange={() => setPlanType("trimestral")}
                className="mr-2"
              />
              Trimestral
            </label>
            <label>
              <input
                type="radio"
                name="planType"
                value="semestral"
                checked={planType === "semestral"}
                onChange={() => setPlanType("semestral")}
                className="mr-2"
              />
              Semestral
            </label>
          </div>
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
            onClick={payament}
            className="bg-blue-600 hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Efetuando..." : "Efetuar Pagamento"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreditCardModal;
