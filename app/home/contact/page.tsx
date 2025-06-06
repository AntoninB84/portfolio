import { Card } from "@/components/ui/card";
import ContactForm from "./contact-form";

export default function Contact() {
    return (
        <div className="flex flex-col justify-center items-center">
            <Card className="p-8 max-w-1/2">
                <ContactForm></ContactForm>
            </Card>
        </div>
    );
}