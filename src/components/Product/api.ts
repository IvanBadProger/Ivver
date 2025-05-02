import { Product } from "./types"

export async function getProducts(): Promise<Product[]> {
  return [
    {
      id: "1",
      name: "Молоко",
      category: "Продукты питания",
      price: 1,
      unit: "литр",
      images: [
        "https://images.unsplash.com/photo-1726065235158-d9c3f817f331?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      ],
      description: "lorem mores",
    },
    {
      id: "2",
      name: "Хлеб",
      category: "Выпечка",
      price: 25,
      unit: "шт.",
      images: [
        "https://images.unsplash.com/photo-1726065235158-d9c3f817f331?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      ],
      description: "lorem mores",
    },
    {
      id: "3",
      name: "Сыр",
      category: "Продукты питания",
      price: 25,
      unit: "кг",
      images: [
        "https://images.unsplash.com/photo-1726065235158-d9c3f817f331?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      ],
      description: "lorem mores",
    },
    {
      id: "4",
      name: "Шоколад",
      category: "Сладости",
      price: 50,
      unit: "грамм",
      images: [
        "https://images.unsplash.com/photo-1726065235158-d9c3f817f331?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      ],
      description: "lorem mores",
    },
    {
      id: "5",
      name: "Апельсиновый сок",
      category: "Напитки",
      price: 63,
      unit: "бутылка",
      images: [
        "https://images.unsplash.com/photo-1726065235158-d9c3f817f331?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      ],
      description: "lorem mores",
    },
  ]
}
