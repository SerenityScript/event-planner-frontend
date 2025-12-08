export const mockEvents = [
  {
    id: "1",
    title: "Geburtstag von Mama",
    date: "2025-12-10",
    time: "18:00",
    location: "Hamburg",
    guests: [
      { id: "g1", name: "Anna", status: "invited" },
      { id: "g2", name: "Ben", status: "confirmed" },
      { id: "g3", name: "Cara", status: "declined" },
    ],
    tasks: [],
    dishes: [],
    shopping: [
      {
        id: "s1",
        name: "Orangensaft",
        qty: "3 L",
        category: "drinks",
        bought: false,
      },
      {
        id: "s2",
        name: "Kerzen für den Kuchen",
        qty: "1 Packung",
        category: "decor",
        bought: true,
      },
    ],
  },
  {
    id: "2",
    title: "Silvester Party",
    date: "2025-12-31",
    time: "22:00",
    location: "Berlin",
    guests: [],
    tasks: [],
    dishes: [],
    shopping: [],
  },
]