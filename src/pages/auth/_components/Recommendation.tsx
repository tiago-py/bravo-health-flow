import { useEffect, useState } from "react";
import { Product, productsMock } from "./mocks/productMock";
import { Button } from "@/components/ui/button";

export const Recommendation = ({ mode, logged }: { mode: string, logged: boolean }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [card, setCard] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [discount, setDiscount] = useState<number>(10.90);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                await new Promise((res) => setTimeout(res, 1000));
                const inforQuiz = localStorage.getItem(`informationQuiz_${mode}`);
                const parseInforQuiz = JSON.parse(inforQuiz);
                const filterProducts = productsMock.filter(v => v.tags.includes(parseInforQuiz[0].tag));
                console.log(parseInforQuiz[0].tag);
                console.log(filterProducts);
                
                setProducts(filterProducts);
                setCard(filterProducts);
            } catch (e) {
                console.log(e);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleAddRemoveProduct = (product: Product) => {
        const isInCard = card.find((p) => p.id === product.id);
        if (isInCard) {
            // Verificar se é o único item no card antes de remover
            if (card.length === 1) {
                alert("Você deve manter pelo menos um produto no carrinho.");
            } else {
                // Remover produto do card
                setCard(card.filter((p) => p.id !== product.id));
            }
        } else {
            // Adicionar produto ao card
            setCard([...card, product]);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <h1 className="text-xl font-semibold">Carregando Produtos...</h1>
            </div>
        );
    }

    return (
        <div className="w-full bg-white p-5 rounded-md shadow-md">
            <h1 className="text-xl">Tratamento Recomendado.</h1>
            <p className="text-sm mt-2 text-bravo-blue">Sua sugestão de plano contém tratamento prescrições, caso prescrito, e suporte clínico. <br /> Sujeito a avaliação médica.</p>

            <div>
                {products.map((v) => (
                    <div key={v.id} className="shadow-[1px_1px_5px_1px] my-5 shadow-black/10 rounded-md p-3 flex items-center justify-between">
                        <div className="flex flex-col gap-3">
                            <div>
                                <h1 className="text-lg">{v.name} {v.enhance ? <b className="text-sm font-bold text-green-600 bg-green-100/50 rounded-md p-2">Potencializar</b> : ""}</h1>
                                <p className="text-sm">{v.description}</p>
                            </div>

                            <h3 className="text-sm">R$ {v.price.toFixed(2).toString().replace(".", ",")} / Mês <s className="text-[12px] font-light">R$ {(v.price + discount).toFixed(2).toString().replace(".", ",")}</s></h3>
                        </div>
                        <div className="flex items-center justify-center flex-col gap-2">
                            <img className="w-20 rounded-md" src={v.imageUrl} alt={v.name} />

                            <Button className={`${card.find((p) => p.id === v.id) ? "bg-red-500 hover:bg-red-600" : "bg-bravo-blue"}`} onClick={() => handleAddRemoveProduct(v)}>
                                {card.find((p) => p.id === v.id) ? "Remover" : "Adicionar"}
                            </Button>
                        </div>
                    </div>
                ))}

                <div>
                    <hr className="mt-5" />

                    <div className="flex items-center my-3 justify-between">
                        <h1>SubTotal</h1>
                        <h2 className="text-sm">
                            R$ {card.reduce((acc, v) => acc + v.price + discount, 0).toFixed(2).toString().replace(".", ",")} / Mês
                        </h2>
                    </div>

                    <div className="my-3">
                        {card.map((v) => (
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
                            const discountCupom = card.reduce((acc, v) => acc + (v.price * 0.3), 0);
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
                                    const subtotal = card.reduce((acc, v) => acc + v.price + discount, 0);
                                    const discountCupom = card.reduce((acc, v) => acc + (v.price * 0.3), 0);
                                    const total = subtotal - discountCupom;
                                    return `R$ ${total.toFixed(2).toString().replace(".", ",")}`;
                                })()}
                            </h2>
                        </div>
                    </div>
                </div>
            </div>

            {logged && <Button className="bg-green-600 hover:bg-green-600">Efetuar Pagamento</Button>}
        </div>
    );
};
