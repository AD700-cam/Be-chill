export type DietType = 'milk' | 'nuts' | 'gluten' | 'vegan';

export interface MenuItem {
    name: string;
    price?: number | string;
    priceNote?: string; // For items with multiple sizes like Junior | Regular | Large
    kcal: string;
    weight: string;
    diet: DietType[];
}

export interface MenuCategory {
    title: string;
    theme: 'light' | 'dark'; // light = yellow bg, pink text; dark = pink bg, white text
    items: MenuItem[];
    badge?: string; // e.g., "@ JUST ₹209"
    icons?: string[]; // strings to represent icon badges like "Fresh Fruits & Nuts"
    hasVeganSection?: boolean;
}

export const menuData: MenuCategory[] = [
    {
        title: "BE CHILLIN' SUNDAES!",
        theme: 'light',
        items: [
            { name: "Fruit Loot", price: 209, kcal: "612", weight: "290", diet: ['milk', 'nuts', 'gluten'] },
            { name: "Velvety Crush", price: 219, kcal: "756", weight: "265", diet: ['milk', 'gluten'] },
            { name: "Dry Fruit Special", price: 209, kcal: "716", weight: "245", diet: ['milk', 'nuts'] },
            { name: "Tres Leches", price: 229, kcal: "665", weight: "225", diet: ['milk', 'nuts', 'gluten'] },
            { name: "Choco Loco", price: 219, kcal: "780", weight: "238", diet: ['milk', 'nuts', 'gluten'] },
            { name: "Lemon Float", price: 120, kcal: "160", weight: "150", diet: ['milk'] },
            { name: "Banoffee Sundae", price: 219, kcal: "648", weight: "325", diet: ['milk', 'nuts', 'gluten'] },
            { name: "Gulab Jamun Delight", price: 195, kcal: "170", weight: "160", diet: ['milk', 'gluten'] },
        ]
    },
    {
        title: "CHOCOLATE SUNDAES",
        theme: 'dark',
        items: [
            { name: "Cookie Monster", price: 209, kcal: "819", weight: "260", diet: ['milk', 'nuts', 'gluten'] },
            { name: "Choco Brownie Fudge", price: 209, kcal: "682", weight: "232", diet: ['milk', 'nuts', 'gluten'] },
            { name: "Choco Lava Fudge", price: 209, kcal: "809", weight: "280", diet: ['milk', 'nuts', 'gluten'] },
            { name: "Brownie Fudge", price: 199, kcal: "673", weight: "232", diet: ['milk', 'nuts', 'gluten'] },
            { name: "Rocky Road", price: 199, kcal: "456", weight: "170", diet: ['milk', 'nuts', 'gluten'] },
            {
                name: "Hot Chocolate Fudge",
                priceNote: "99 | 165 | 209",
                kcal: "316/495/716",
                weight: "90/200/280",
                diet: ['milk', 'nuts', 'gluten']
            },
        ]
    },
    {
        title: "FALOODAS",
        theme: 'dark',
        items: [
            { name: "OG Vanilla", price: 199, kcal: "535", weight: "331", diet: ['milk', 'nuts', 'gluten'] },
            { name: "Malai Kulfi", price: 249, kcal: "557", weight: "341", diet: ['milk', 'nuts', 'gluten'] },
            { name: "Nuts & Dates", price: 249, kcal: "557", weight: "341", diet: ['milk', 'nuts', 'gluten'] },
            { name: "Mango Majnu", price: 249, kcal: "469", weight: "361", diet: ['milk', 'nuts', 'gluten'] },
        ]
    },
    {
        title: "ICE CREAM SHAKES",
        theme: 'light',
        badge: "@ JUST ₹209",
        items: [
            { name: "Cookie Shake", kcal: "637", weight: "244", diet: ['milk', 'gluten'] },
            { name: "Caramel Vanilla", kcal: "491", weight: "234", diet: ['milk', 'gluten'] },
            { name: "Wild Strawberry", kcal: "509", weight: "244", diet: ['milk'] },
            { name: "Red Velvet Cookie", kcal: "825", weight: "279", diet: ['milk', 'gluten'] },
            { name: "Choco Chug", kcal: "528", weight: "234", diet: ['milk'] },
            { name: "DBC Shake", kcal: "668", weight: "266", diet: ['milk', 'gluten'] },
            { name: "Mango Shake", kcal: "825", weight: "279", diet: ['milk'] },
            { name: "Cold Coffee", kcal: "825", weight: "279", diet: ['milk'] },
            { name: "Passion Fruit", kcal: "509", weight: "279", diet: ['milk'] },
            { name: "Blueberry Shake", kcal: "668", weight: "266", diet: ['milk'] },
        ]
    },
    {
        title: "DEATH BY CHOCOLATE",
        theme: 'light',
        items: [
            { name: "Lil' DBC", price: 199, kcal: "595", weight: "211", diet: ['milk', 'nuts', 'gluten'] },
            { name: "Death By Chocolate", price: 240, kcal: "1096", weight: "377", diet: ['milk', 'nuts'] },
            { name: "Big Boy DBC", price: 635, kcal: "1454", weight: "500", diet: ['milk', 'nuts', 'gluten'] },
        ]
    },
    {
        title: "FRUITY POP",
        theme: 'light',
        items: [
            { name: "Gudbud", price: 185, kcal: "251", weight: "160", diet: ['milk', 'nuts'] },
            { name: "Classic Banana Split", price: 199, kcal: "699", weight: "330", diet: ['milk', 'nuts'] },
            { name: "Mango Berry", price: 185, kcal: "316", weight: "185", diet: ['milk', 'nuts', 'gluten'] },
            { name: "Lychee Sundae", price: 219, kcal: "497", weight: "245", diet: ['milk', 'nuts'] },
        ]
    },
    {
        title: "BIG CHILL BIG MOODS",
        theme: 'dark',
        items: [
            { name: "Super Bowl", price: 635, kcal: "732", weight: "730", diet: ['milk', 'nuts', 'gluten'] },
            { name: "Seven Wonders", price: 329, kcal: "612", weight: "290", diet: ['milk', 'nuts', 'gluten'] },
        ]
    },
    {
        title: "LIL' GIGGLES",
        theme: 'dark',
        items: [
            { name: "Double Trouble", price: 109, kcal: "472", weight: "134", diet: ['milk', 'gluten'] },
            { name: "Pookie Cookie", price: 109, kcal: "589", weight: "136", diet: ['milk', 'gluten'] },
        ]
    },
    {
        title: "SCOOP STEAL SUNDAES",
        theme: 'light',
        items: [
            { name: "Tango Mango", price: 119, kcal: "191", weight: "170", diet: ['milk'] },
            { name: "Butterscotch Bananza", price: 119, kcal: "251", weight: "150", diet: ['milk', 'nuts', 'gluten'] },
            { name: "Nuts About Caramel", price: 129, kcal: "592", weight: "185", diet: ['milk', 'nuts'] },
            { name: "Cookie Crasher", price: 119, kcal: "571", weight: "207", diet: ['milk', 'nuts', 'gluten'] },
            { name: "Berry Flirt", price: 119, kcal: "435", weight: "165", diet: ['milk', 'nuts', 'gluten'] },
            { name: "Choco Crave Crush", price: 119, kcal: "417", weight: "132", diet: ['milk', 'nuts', 'gluten'] },
            { name: "Fudge Me Not", price: 119, kcal: "531", weight: "205", diet: ['milk', 'nuts', 'gluten'] },
            { name: "Fruit Whirl", price: 119, kcal: "479", weight: "215", diet: ['milk', 'nuts', 'gluten'] },
        ]
    },
    {
        title: "SOR-BAE",
        theme: 'light',
        hasVeganSection: true,
        items: [
            { name: "Alphonso Mango", price: 89, kcal: "57", weight: "60", diet: ['vegan'] },
            { name: "Guava", price: 89, kcal: "60", weight: "61", diet: ['vegan'] },
            { name: "Alphonso Mango Chilli", price: 99, kcal: "57", weight: "61", diet: ['vegan'] },
            { name: "Guava Chilli", price: 99, kcal: "60", weight: "61", diet: ['vegan'] },
        ]
    },
    {
        title: "SUNDAE STATE OF MIND",
        theme: 'light',
        items: [
            { name: "Scotch Pop", price: 209, kcal: "849", weight: "235", diet: ['milk', 'nuts', 'gluten'] },
            { name: "Golden Mellow", price: 209, kcal: "494", weight: "210", diet: ['milk', 'nuts'] },
            { name: "Blueberry Bliss", price: 219, kcal: "529", weight: "165", diet: ['milk', 'nuts', 'gluten'] },
            { name: "Electric Blackcurrant", price: 219, kcal: "307", weight: "170", diet: ['milk', 'nuts', 'gluten'] },
        ]
    },
    {
        title: "THE GOOD SCOOP",
        theme: 'light',
        icons: ["Fresh Fruits & Nuts", "100% Pure Date Syrup", "No Added Colour", "No Added Flavour"],
        items: [
            { name: "Date me Chikoo", price: 249, kcal: "459", weight: "225", diet: ['milk', 'nuts'] },
            { name: "Kulfi Almond Fusion", price: 249, kcal: "636", weight: "215", diet: ['milk', 'nuts'] },
            { name: "Sun & Scoop", price: 249, kcal: "459", weight: "225", diet: ['milk', 'nuts'] },
        ]
    },
    {
        title: "COFFEE SUNDAES",
        theme: 'light',
        items: [
            { name: "Tiramisu", price: 179, kcal: "251", weight: "160", diet: ['milk', 'nuts', 'gluten'] },
            { name: "Mocha Melt", price: 179, kcal: "316", weight: "185", diet: ['milk', 'nuts', 'gluten'] },
        ]
    }
];
