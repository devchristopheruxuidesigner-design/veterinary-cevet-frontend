import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto max-w-4xl px-4 md:px-8">
        <Link
          href="/"
          className="mb-8 inline-flex items-center text-sm font-medium text-teal-700 hover:text-teal-800"
        >
          <ChevronLeft size={16} className="mr-1" />
          Volver al inicio
        </Link>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-10">
          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Privacidad
          </h1>
          <div className="mt-6 space-y-4 leading-relaxed text-slate-600">
            <p>
              En Cevet protegemos los datos personales que compartes en
              formularios, incluyendo nombre, teléfono e información de tu
              mascota, y los usamos solo para la gestión de citas y atención
              veterinaria.
            </p>
            <p>
              No comercializamos tu información con terceros. Solo compartimos
              datos cuando sea estrictamente necesario para cumplir obligaciones
              legales o administrativas relacionadas con nuestros servicios.
            </p>
            <p>
              Puedes solicitar la actualización o eliminación de tus datos de
              contacto escribiéndonos por nuestros canales oficiales y
              atenderemos tu solicitud en el menor tiempo posible.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
