enum StatusQuiz {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE"
}

export enum ModeQuiz {
    HAIRLOSS = "HAIRLOSS",
    ERECTILEDYSFUNCTION = "ERECTILEDYSFUNCTION"
}

export interface QuizOption {
    id: string;
    option: string;
    isBlock: boolean;
    tag: string;
    isAttention: boolean;
}

export interface QuizQuestion {
    id: string;
    question: string;
    options: QuizOption[];
}

export interface Quiz {
    id: string;
    status: StatusQuiz;
    mode: ModeQuiz;
    questions: QuizQuestion[];
    createdAt: Date;
    updatedAt: Date;
}

export const quizMock: Quiz = {
    id: "a1",
    status: StatusQuiz.ACTIVE,
    mode: ModeQuiz.HAIRLOSS,
    questions: [
        {
            id: "q1",
            question: "Qual seu principal objetivo capilar?",
            options: [
                {
                    id: "o1",
                    option: "Prevenir queda de cabelo",
                    isBlock: false,
                    tag: "prevenir",
                    isAttention: false,
                },
                {
                    id: "o2",
                    option: "Estimular crescimento capilar",
                    isBlock: false,
                    tag: "minoxidil",
                    isAttention: false,
                },
                {
                    id: "o3",
                    option: "Melhorar a saúde do couro cabeludo",
                    isBlock: false,
                    tag: "shampoo",
                    isAttention: false,
                },
                {
                    id: "o4",
                    option: "Não tenho certeza.",
                    isBlock: false,
                    tag: "nao_tenho_certeza",
                    isAttention: true,
                }
            ]
        },
        {
            id: "q2",
            question: "Você possui algum histórico familiar de calvície?",
            options: [
                {
                    id: "o4",
                    option: "Sim",
                    isBlock: false,
                    tag: "historical_family",
                    isAttention: false,
                },
                {
                    id: "o5",
                    option: "Não",
                    isBlock: false,
                    tag: "no_hf",
                    isAttention: false,
                }
            ]
        },
        {
            id: "q3",
            question: "Você possui alguma condição de saúde?",
            options: [
                {
                    id: "o6",
                    option: "Hipertensão",
                    isBlock: true,
                    tag: "hipertensao",
                    isAttention: true,
                },
                {
                    id: "o7",
                    option: "Depressão",
                    isBlock: false,
                    tag: "depressao",
                    isAttention: true,
                },
                {
                    id: "o8",
                    option: "Nenhuma das anteriores",
                    isBlock: false,
                    tag: "sem_condicao",
                    isAttention: false,
                }
            ]
        }
    ],
    createdAt: new Date(),
    updatedAt: new Date()
};

export const quizErectileDysfunctionMock: Quiz = {
    id: "b1",
    status: StatusQuiz.ACTIVE,
    mode: ModeQuiz.ERECTILEDYSFUNCTION,
    questions: [
        {
            id: "q1",
            question: "Com que frequência você tem dificuldade para obter ou manter uma ereção?",
            options: [
                {
                    id: "o1",
                    option: "Raramente",
                    isBlock: false,
                    tag: "raramente",
                    isAttention: false,
                },
                {
                    id: "o2",
                    option: "Às vezes",
                    isBlock: false,
                    tag: "as_vezes",
                    isAttention: false,
                },
                {
                    id: "o3",
                    option: "Frequentemente",
                    isBlock: false,
                    tag: "frequentemente",
                    isAttention: true,
                },
                {
                    id: "o4",
                    option: "Sempre",
                    isBlock: false,
                    tag: "sempre",
                    isAttention: true,
                }
            ]
        },
        {
            id: "q2",
            question: "Você possui alguma condição de saúde diagnosticada?",
            options: [
                {
                    id: "o5",
                    option: "Diabetes",
                    isBlock: true,
                    tag: "diabetes",
                    isAttention: true,
                },
                {
                    id: "o6",
                    option: "Hipertensão",
                    isBlock: true,
                    tag: "hipertensao",
                    isAttention: true,
                },
                {
                    id: "o7",
                    option: "Nenhuma das anteriores",
                    isBlock: false,
                    tag: "sem_condicao",
                    isAttention: false,
                }
            ]
        },
        {
            id: "q3",
            question: "Você faz uso de algum medicamento controlado?",
            options: [
                {
                    id: "o8",
                    option: "Sim",
                    isBlock: false,
                    tag: "medicamento_controlado_sim",
                    isAttention: true,
                },
                {
                    id: "o9",
                    option: "Não",
                    isBlock: false,
                    tag: "medicamento_controlado_nao",
                    isAttention: false,
                }
            ]
        }
    ],
    createdAt: new Date(),
    updatedAt: new Date()
};