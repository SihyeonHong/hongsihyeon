import { StatusCard } from "@/components/status/status-card";
import { ContactForm } from "@/components/contact/contact-form";

export default function Home() {
  return (
    <div className="flex w-full flex-col gap-10 p-6 md:p-10">
      <StatusCard />
      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold">Contact</h2>
        <ContactForm />
      </section>
    </div>
  );
}
