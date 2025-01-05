


export const COLORS = [
    {
        label: "Black",
        value: "black",
        tw: "zinc-900"  // bg-
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
] as const // as const => this will tell type script that this it a const and that's why it will show the exact values that are in it. check by removing the "as const" and hover over CONST then rewrite and check again.  

export const MODELS = {
    name: "models",
    options: [
        {
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