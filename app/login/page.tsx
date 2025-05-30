import { Suspense } from "react";
import LoginForm from "./login-form";

export default function Login() {
    return (
        <div className="flex flex-col min-h-screen justify-center items-center">
            <div className="py-8 px-10 cardAB ">
                <Suspense>
                    <LoginForm></LoginForm>
                </Suspense>
            </div>
        </div>
    );
}