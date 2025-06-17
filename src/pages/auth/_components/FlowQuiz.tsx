import { useEffect, useState } from "react";
import { Quiz, quizMock, QuizOption, quizErectileDysfunctionMock, ModeQuiz } from "./mocks/flowQuizMock";
import { Button } from "@/components/ui/button";
import { BlockedRegister } from "./BlockedRegister";
import { FlowNotImplemented } from "./FlowNotImplemented";

interface FlowQuizProps {
  finishQuiz: () => void;
  mode: "hairLoss" | "erectileDysfunction";
}

export const FlowQuiz = ({ finishQuiz, mode }: FlowQuizProps) => {
    const [quiz, setQuiz] = useState<Quiz | null>(null);
    const [step, setStep] = useState(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [blocked, setBlocked] = useState<boolean>(false);
    const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: QuizOption }>({});
    const [getInforQuiz, setGetInforQuiz] = useState<string[]>([]);

    useEffect(() => {
        if (step === 0) {
            localStorage.removeItem(`informationQuiz_${mode}`);
        }

        const fetchQuizCurrent = async () => {
            try {
                await new Promise((res) => setTimeout(res, 1000));
                if (mode === "hairLoss") {
                    setQuiz(quizMock);
                } else {
                    setQuiz(quizErectileDysfunctionMock);
                }
            } catch (e) {
                console.log(e);
            } finally {
                setLoading(false);
            }
        };

        fetchQuizCurrent();
    }, [mode, step]);
    
    const handleOptionSelect = (questionId: string, option: QuizOption) => {
        setSelectedOptions(prev => ({ ...prev, [questionId]: option }));
    };

    const handleNext = () => {
        const currentQuestion = quiz?.questions[step];
        const selectedOption = currentQuestion ? selectedOptions[currentQuestion.id] : null;

        if (!selectedOption) return;

        if (selectedOption.isBlock) {
            setBlocked(true);
            return;
        }

        if (selectedOption.isAttention) {
            localStorage.setItem('attention', 'ATTENTION');
        }

        const prevInfor = localStorage.getItem(`informationQuiz_${mode}`);
        const prevArray = prevInfor ? JSON.parse(prevInfor) : [];
        const currentInfor = [...prevArray, selectedOption];
        localStorage.setItem(`informationQuiz_${mode}`, JSON.stringify(currentInfor));

        if (quiz && step < quiz.questions.length - 1) {
            setStep(prev => prev + 1);
        } else {
            finishQuiz();
        }
    };

    const handlePrevious = () => {
        if (step > 0) {
            setStep(prev => prev - 1);
        }
    };

    const closeBlocked = () => {
        setBlocked(false);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <h1 className="text-xl font-semibold">Carregando Quiz...</h1>
            </div>
        );
    }

    if (!quiz) {
        return <FlowNotImplemented onContinue={finishQuiz}/>
    }

    const currentQuestion = quiz?.questions[step];
    const selectedOption = currentQuestion ? selectedOptions[currentQuestion.id] : null;

    return (
        <div className={`w-full flex items-center justify-center h-screen bg-gradient-to-br ${mode === "hairLoss" ? "from-[#5d7c8a] to-[#89a8b0]" : "bg-bravo-beige"}`}>
            {/* Progress Bar */}
            <div className="w-full h-[5px] fixed top-0 left-0 z-10">
                <div
                    className={`h-full ${mode === "hairLoss" ? "bg-blue-400" : "bg-yellow-500"} transition-all duration-300`}
                    style={{
                        width: quiz && quiz.questions.length > 0
                            ? `${((step + 1) / quiz.questions.length) * 100}%`
                            : "0%",
                    }}
                ></div>
            </div>

            {blocked && <BlockedRegister close={closeBlocked} />}

            <div className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-lg">
                <h1 className={`text-sm font-bold ${mode === "hairLoss" ? "text-bravo-blue" : "text-yellow-700"}`}>
                    {mode === "hairLoss" ? "Queda Capilar" : "Disfunção Erétil"}
                </h1>
                {currentQuestion && (
                    <div>
                        <h2 className="text-xl font-semibold mb-4">{currentQuestion.question}</h2>
                        <div className="flex flex-col gap-4">
                            {currentQuestion.options.map((v) => (
                                <div
                                    key={v.id}
                                    className="flex items-center gap-3 bg-gray-100 p-5 rounded-md cursor-pointer"
                                    onClick={() => handleOptionSelect(currentQuestion.id, v)}
                                    tabIndex={0}
                                    onKeyDown={e => {
                                        if (e.key === "Enter" || e.key === " ") {
                                            handleOptionSelect(currentQuestion.id, v);
                                        }
                                    }}
                                >
                                    <input
                                        type="radio"
                                        id={`option-${v.id}`}
                                        name={`question-${step}`}
                                        className={`w-5 h-5 ${mode === "hairLoss" ? "accent-bravo-blue" : "accent-yellow-700"}`}
                                        checked={selectedOption?.id === v.id}
                                        onChange={() => handleOptionSelect(currentQuestion.id, v)}
                                        tabIndex={-1}
                                    />
                                    <label htmlFor={`option-${v.id}`} className="text-gray-700">{v.option}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="flex justify-between mt-8">
                    <Button
                        variant="outline"
                        onClick={handlePrevious}
                        disabled={step === 0}
                    >
                        Voltar
                    </Button>

                    <Button
                        className={`${mode === "hairLoss" ? "bg-bravo-blue" : "bg-yellow-700 hover:bg-yellow-800"}`}
                        onClick={handleNext}
                        disabled={!selectedOption}
                    >
                        Próximo
                    </Button>
                </div>
            </div>
        </div>
    );
};
