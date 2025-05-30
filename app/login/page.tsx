import { Suspense } from "react";
import LoginForm from "./login-form";
import { redirect } from "next/navigation";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function Login() {
    return (
        <div className="flex flex-col min-h-screen justify-center items-center">
            <div className="py-8 px-10 cardAB ">
                <div className="justify-self-end">
                    <form action={
                        async () => {
                            'use server';
                            redirect('/home');
                        }
                        }>
                        <button className="cursor-pointer">
                            <XMarkIcon className="w-6" />
                        </button>
                    </form>
                </div>
                
                <Suspense>
                    <LoginForm></LoginForm>
                </Suspense>
            </div>
        </div>
    );
}