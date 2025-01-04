


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