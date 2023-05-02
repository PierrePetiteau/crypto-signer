import { Noto_Color_Emoji } from "next/font/google";

// If loading a variable font, you don't need to specify the font weight
export const noto = Noto_Color_Emoji({ weight: "400", subsets: ["emoji"] });
