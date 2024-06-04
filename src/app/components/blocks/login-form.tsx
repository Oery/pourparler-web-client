import { Button } from "~/app/components/ui/button";
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
                    Log in with Discord
                </Button>
            </CardContent>
        </Card>
    );
}
