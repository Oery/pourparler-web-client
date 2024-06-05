import "@styles/globals.css";
import { Lexend } from "next/font/google";

const lexend = Lexend({
    subsets: ["latin"],
    variable: "--font-sans",
    display: "swap",
});

export const metadata = {
    title: "Pourparler",
    description: "High quality audio and video chat",
    icons: [{ rel: "icon", url: "/favicon.ico" }],
};

interface Props {
    children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
    return (
        <html lang="en">
            <body className={`font-sans ${lexend.variable}`}>{children}</body>
        </html>
    );
}
