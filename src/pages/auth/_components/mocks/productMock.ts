type Product = {
    id: string;
    name: string;
    description?: string;
    tags: string[];
    imageUrl?: string;
    stripeProductId: string;
    stripePriceId: string;
    price: number;
    currency: string;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
};

const products: Product[] = [
    {
        id: "p1",
        name: "Minoxidil",
        description: "1g - 40 caps",
        tags: ["minoxidil"],
        imageUrl: "",
        stripeProductId: "",
        stripePriceId: "",
        price: 10.90,
        currency: "BRL",
        active: true,
        createdAt: new Date("2024-06-16T00:00:00Z"),
        updatedAt: new Date("2024-06-16T00:00:00Z")
    },
    {
        id: "p2",
        name: "Finasterida",
        description: "5mg - 30 caps",
        tags: ["finasterida"],
        imageUrl: "",
        stripeProductId: "",
        stripePriceId: "",
        price: 15.50,
        currency: "BRL",
        active: true,
        createdAt: new Date("2024-06-16T00:00:00Z"),
        updatedAt: new Date("2024-06-16T00:00:00Z")
    },
    {
        id: "p3",
        name: "Biotina",
        description: "10mg - 60 caps",
        tags: ["biotina"],
        imageUrl: "",
        stripeProductId: "",
        stripePriceId: "",
        price: 8.75,
        currency: "BRL",
        active: true,
        createdAt: new Date("2024-06-16T00:00:00Z"),
        updatedAt: new Date("2024-06-16T00:00:00Z")
    }
];