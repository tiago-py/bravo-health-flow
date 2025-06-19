import { useEffect, useState } from "react";
import { Product, productsMock } from "./mocks/productMock";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import AddressCreditModal from "./AddressCreditModal";

// interface RecommendationProps {
//     mode: string;
//     finishRecommendation: () => void;
// }

export const ListProducts = () => {
    const { validate } = useAuth();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [discount, setDiscount] = useState<number>(10.90);
    const [addressModal, setAddressModal] = useState<boolean>(false);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                await new Promise((res) => setTimeout(res, 1000));
                const lsProducts = localStorage.getItem("productsCard");
                const parseProducts = JSON.parse(lsProducts);
                
                setProducts(parseProducts);
            } catch (e) {
                console.log(e);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const payment = async () => {
        console.log();
        // Pode ajustar essa lógica em AuthContext.tsx
        if(await validate(localStorage.getItem('token'))) {
            try {
                // Troca a Rota Api de acordo.
                const response = await fetch(`${import.meta.env.VITE_API_URL_BASE}/payment/stripe`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        products
                    })
                });
                const data = await response.json();
                return data;
            } catch (e) {
                console.log(e);
            }
        } else {
            console.log("Não está logado ou não criou um conta.");
        }
    }

    const closeModalAddress = () => {
        setAddressModal(v => !v);
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <h1 className="text-xl font-semibold">Carregando Produtos...</h1>
            </div>
        );
    }

    return (
        <div className="max-w-[590px] w-full bg-white p-5 rounded-md shadow-md">
            <h1 className="text-xl">Tratamento Recomendado.</h1>
            <p className="text-sm mt-2 text-bravo-blue">Sua sugestão de plano contém tratamento prescrições, caso prescrito, e suporte clínico. <br /> Sujeito a avaliação médica.</p>

            <div>
                {products.map((v) => (
                    <div key={v.id} className="shadow-[1px_1px_5px_1px] my-5 shadow-black/10 rounded-md p-3 flex items-center justify-between">
                        <div className="flex flex-col gap-3">
                            <div>
                                <div className="flex items-center gap-3 flex-wrap">
                                    <h1 className="text-lg flex items-center flex-wrap">{v.name}</h1>
                                    {v.enhance ? <h5 className="text-sm font-bold text-green-600 bg-green-100/50 rounded-md p-2">Potencializar</h5> : ""}
                                </div>
                                <p className="text-sm">{v.description}</p>
                            </div>

                            <h3 className="text-sm">R$ {v.price.toFixed(2).toString().replace(".", ",")} / Mês <s className="text-[12px] font-light">R$ {(v.price + discount).toFixed(2).toString().replace(".", ",")}</s></h3>
                        </div>
                        <div className="flex items-center justify-center flex-col gap-2">
                            <img className="w-20 rounded-md" src={v.imageUrl} alt={v.name} />
                        </div>
                    </div>
                ))}

                <div>
                    <hr className="mt-5" />

                    <div className="flex items-center my-3 justify-between">
                        <h1>SubTotal</h1>
                        <h2 className="text-sm">
                            R$ {products.reduce((acc, v) => acc + v.price + discount, 0).toFixed(2).toString().replace(".", ",")} / Mês
                        </h2>
                        {/* <h2 className="text-sm">
                            R$ {card.reduce((acc, v) => acc + v.price + discount, 0).toFixed(2).toString().replace(".", ",")} / Mês
                        </h2> */}
                    </div>

                    <div className="my-3">
                        {products.map((v) => (
                            <div key={v.id} className="flex items-center justify-between my-4">
                                <div className="flex items-center gap-2">
                                    <img className="w-10 h-10 rounded-full" src={v.imageUrl} alt={v.name} />
                                    <div>
                                        <h5 className="text-sm">{v.name}</h5>
                                        <h6 className="text-[12px] font-light">{v.description}</h6>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-sm">R$ {v.price.toFixed(2).toString().replace(".", ",")} / Mês</h3>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex items-center my-3 justify-between">
                        <h3 className="text-sm">Entrega Mensal</h3>
                        <h3 className="text-bravo-blue text-sm">
                            Gratís
                        </h3>
                    </div>

                    <div className="flex items-center my-3 justify-between">
                        <h3 className="text-sm">30% OFF Bravo Desconto</h3>
                        {(() => {
                            const discountCupom = products.reduce((acc, v) => acc + (v.price * 0.3), 0);
                            return (
                                <h3 className="text-bravo-blue text-sm">
                                    - R$ {discountCupom.toFixed(2).toString().replace(".", ",")}
                                </h3>
                            );
                        })()}
                    </div>

                    <hr />

                    <div>
                        <div className="flex items-center my-3 justify-between">
                            <h2 className="text-lg font-semibold">Total a pagar</h2>
                            <h2 className="text-lg font-semibold text-bravo-blue">
                                {(() => {
                                    const subtotal = products.reduce((acc, v) => acc + v.price + discount, 0);
                                    const discountCupom = products.reduce((acc, v) => acc + (v.price * 0.3), 0);
                                    const total = subtotal - discountCupom;
                                    return `R$ ${total.toFixed(2).toString().replace(".", ",")}`;
                                })()}
                            </h2>
                        </div>
                    </div>
                </div>
            </div>

            <Button onClick={closeModalAddress} className="w-full bg-green-600 hover:bg-green-600">Efetuar Pagamento</Button>

            <div className="flex items-center gap-2 mt-6">
                <AlertCircle />
                <p className="text-sm font-light"><b>Se o médico entender que este não é o melhor tratamento para você</b>, seu pedido será cancelado e você será reembolsado.</p>
            </div>
                        
            {addressModal && (
                <AddressCreditModal products={products} totalValue={(() => {
                                    const subtotal = products.reduce((acc, v) => acc + v.price + discount, 0);
                                    const discountCupom = products.reduce((acc, v) => acc + (v.price * 0.3), 0);
                                    const total = subtotal - discountCupom;
                                    return Number(total.toFixed(2));
                                })()} closeModal={closeModalAddress} />
            )}
        </div>
    );
};
