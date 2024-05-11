import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

interface Props {
    children: React.ReactNode;
}

export default function ServerLayout({ children }: Props) {
    console.log("server layout");

    return (
        <>
            <SignedOut>
                <h1>You are not logged in</h1>
                <p>Please log in to continue</p>
                <SignInButton />
            </SignedOut>
            <SignedIn>{children}</SignedIn>
        </>
    );
}
