import { Button } from "~/app/components/ui/button";
import { DiscordLogoIcon } from "@radix-ui/react-icons";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "~/app/components/ui/card";

export function LoginForm() {
    return (
        <Card className="mx-auto max-w-sm">
            <CardHeader>
                <CardTitle className="text-2xl">Login</CardTitle>
                <CardDescription>Please log in to continue</CardDescription>
            </CardHeader>
            <CardContent>
                <Button variant="outline" className="w-full">
                    <a href={"/login/discord"} className="flex gap-3">
                        <DiscordLogoIcon className="h-5 w-5" />
                        Login with Discord
                    </a>
                </Button>
            </CardContent>
        </Card>
    );
}
