import { Card } from "@/components/ui/card";
import ContactForm from "./contact-form";

export default function Contact() {
    return (
        <div className="flex flex-col md:justify-center md:items-center">
            <Card className="p-2 sm:p-4 md:p-8 md:max-w-1/2">
                <ContactForm></ContactForm>
            </Card>
        </div>
    );
}