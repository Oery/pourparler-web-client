import { LoginForm } from "@ui/login/login-form";

export default function LoginPage() {
    return (
        <div className="flex h-screen flex-col items-center justify-center bg-stone-300">
            {/* <div className="w-full max-w-md rounded-lg bg-stone-200 p-4">
                <h1 className="text-center text-3xl font-semibold text-stone-900">
                    Sign In
                </h1>
                <form
                    action="/api/auth/login"
                    method="post"
                    className="flex flex-col gap-4 p-4"
                >
                    <div>
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            placeholder="Username"
                            name="username"
                            className="w-full rounded-md border-2 p-2"
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            className="w-full rounded-md border-2 p-2"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full rounded-md border-2 bg-stone-500 p-2"
                    >
                        Login
                    </button>
                </form>
            </div> */}
            <LoginForm />
        </div>
    );
}
