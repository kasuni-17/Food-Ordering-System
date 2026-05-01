export const restaurants = [
  {
    id: "rest_truffle_table",
    name: "The Truffle Table",
    cuisine: "Italian • Fine Dining",
    priceTier: "$$$",
    etaMinutes: [25, 35],
    rating: 4.8,
    deliveryFeeCents: 0
  },
  {
    id: "rest_sakura_zen",
    name: "Sakura Zen",
    cuisine: "Japanese • Sushi",
    priceTier: "$$$",
    etaMinutes: [30, 45],
    rating: 4.9,
    deliveryFeeCents: 299
  },
  {
    id: "rest_burger_craft",
    name: "The Burger Craft",
    cuisine: "American • Burgers",
    priceTier: "$$",
    etaMinutes: [15, 25],
    rating: 4.6,
    deliveryFeeCents: 0
  }
];

export const menuItems = [
  {
    id: "item_truffle_pasta",
    restaurantId: "rest_truffle_table",
    name: "Truffle Tagliatelle",
    description: "House-made pasta, black truffle cream, aged parmesan.",
    priceCents: 1899,
    imageUrl:
      "https://images.unsplash.com/photo-1523986371872-9d3ba2e2f5f6?auto=format&fit=crop&w=1200&q=80",
    tags: ["pasta", "vegetarian"]
  },
  {
    id: "item_burrata",
    restaurantId: "rest_truffle_table",
    name: "Burrata & Heirloom Tomato",
    description: "Basil oil, sea salt, pepper, sourdough.",
    priceCents: 1299,
    imageUrl:
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=1200&q=80",
    tags: ["starter", "vegetarian", "gluten-free-option"]
  },
  {
    id: "item_sushi_box",
    restaurantId: "rest_sakura_zen",
    name: "Chef’s Nigiri Box",
    description: "12 pcs seasonal nigiri + wasabi + pickled ginger.",
    priceCents: 2499,
    imageUrl:
      "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=1200&q=80",
    tags: ["sushi", "seafood"]
  },
  {
    id: "item_miso_ramen",
    restaurantId: "rest_sakura_zen",
    name: "Miso Ramen",
    description: "Rich miso broth, noodles, ajitama, scallions.",
    priceCents: 1599,
    imageUrl:
      "https://images.unsplash.com/photo-1604908554162-45f68d06c4b7?auto=format&fit=crop&w=1200&q=80",
    tags: ["ramen"]
  },
  {
    id: "item_craft_burger",
    restaurantId: "rest_burger_craft",
    name: "Craft Cheeseburger",
    description: "Smash patty, cheddar, pickles, house sauce, brioche.",
    priceCents: 1399,
    imageUrl:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1200&q=80",
    tags: ["burger"]
  },
  {
    id: "item_loaded_fries",
    restaurantId: "rest_burger_craft",
    name: "Loaded Fries",
    description: "Crispy fries, cheese, scallions, chipotle mayo.",
    priceCents: 699,
    imageUrl:
      "https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=1200&q=80",
    tags: ["sides", "vegetarian"]
  }
];

