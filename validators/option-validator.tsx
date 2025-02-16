//this is validator file, this validated at runtime.

import { PRODUCTS_PRICES } from "@/config/products"

export const COLORS = [
    {
        label: "Black",
        value: "black",
        tw: "zinc-900"
    },
    {
        label: "Blue",
        value: "blue",
        tw: "blue-950"
    },
    {
        label: "Rose",
        value: "rose",
        tw: "rose-950"
    },
    {
        label: "Sky",
        value: "sky",
        tw: "sky-600"
    },
    {
        label: "Green",
        value: "green",
        tw: "green-700"
    },
    {
        label: "Orange",
        value: "orange",
        tw: "orange-800"
    },
] as const // as const => this will tell type script that this it a const and that's why it will show the exact values that are in it. check by removing the "as const" and hover over CONST then rewrite and check again.  

export const MODELS = {
    name: "models", // name is to recognize the state.
    options: [
        { //phone's models
            label: "iPhone X",
            value: "iphonex"
        },
        {
            label: "iPhone 11",
            value: "iphone11"
        },
        {
            label: "iPhone 12",
            value: "iphone12"
        },
        {
            label: "iPhone 13",
            value: "iphone13"
        },
        {
            label: "iPhone 14",
            value: "iphone14"
        },
        {
            label: "iPhone 15",
            value: "iphone15"
        },
        {
            label: "iPhone 16",
            value: "iphone16"
        },
    ]
} as const

export const MATERIALS = { // 4:55:0
    name: 'material',
    options: [
        {
            label: 'Silicone',
            value: 'silicone',
            description: undefined,
            price: PRODUCTS_PRICES.material.silicone

        },
        {
            label: 'Soft Polycarbonate',
            value: 'polycarbonate',
            description: "Scratch-resistance coating.",
            price: PRODUCTS_PRICES.material.polycarbonate
        }, // for phones 
        {
            label: 'Plastic PVC',
            value: 'plasticpvc',
            description: undefined,
            price: PRODUCTS_PRICES.material.plasticpvc

        },
        {
            label: 'Stainless Steel',
            value: 'stainlesssteel',
            description: "Premium and Light-reflective",
            price: PRODUCTS_PRICES.material.stainlesssteel
        }, //for cards
    ],
} as const

export const FINISHES = {
    name: 'finish',
    options: [
        {
            label: 'Smooth Finish',
            value: 'smooth',
            description: undefined,
            price: PRODUCTS_PRICES.finish.smooth,
        },
        {
            label: 'Textured Finish',
            value: 'textured',
            description: 'Soft grippy texture',
            price: PRODUCTS_PRICES.finish.textured,
        },//for phones
        {
            label: 'Glossy Finish',
            value: 'glossy',
            description: undefined,
            price: PRODUCTS_PRICES.finish.glossy,
        },
        {
            label: 'Antique Still',
            value: 'antique',
            description: "Antique semi-smooth texture",
            price: PRODUCTS_PRICES.finish.antique,
        },// for cards
    ],
} as const



export const RATIOS = {
    case: {
        w: 896,
        h: 1831,
        src: "/phone-template.png"
    },
    card: {
        w: 1000,
        h: 630,
        src: "/Large-chip-atm.png"
    }
} as const


