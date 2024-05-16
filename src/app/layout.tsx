import {
    ClerkProvider,
    SignedIn,
    SignedOut,
    SignInButton,
} from "@clerk/nextjs";
import "~/styles/globals.css";

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
        <ClerkProvider>
            <html lang="en">
                <body className={`font-sans ${lexend.variable}`}>
                    <SignedIn>{children}</SignedIn>
                    <SignedOut>
                        Please connect your account to continue
                        <SignInButton />
                    </SignedOut>
                </body>
            </html>
        </ClerkProvider>
    );
}
