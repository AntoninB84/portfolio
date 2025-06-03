import { Suspense } from "react";
import LoginForm from "./login-form";
import { redirect } from "next/navigation";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getTranslations } from "next-intl/server";

export default async function Login() {
    const t = await getTranslations();
    return (
        <div className="flex flex-col min-h-screen justify-center items-center">
            <Card className="p-8 w-1/4">
                <Suspense>
                    <LoginForm></LoginForm>
                </Suspense>
                <div className="justify-self-end">
                    <form action={
                        async () => {
                            'use server';
                            redirect('/home');
                        }
                        }>
                        <Button className="w-full">
                            {t('back')}
                        </Button>
                    </form>
                </div>
            </Card>
        </div>
    );
}