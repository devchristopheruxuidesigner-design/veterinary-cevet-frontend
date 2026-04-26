import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function TermsOfServicePage() {
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
            Términos de Servicios
          </h1>
          <div className="mt-6 space-y-4 leading-relaxed text-slate-600">
            <p>
              Al usar los servicios de Cevet, aceptas proporcionar información
              veraz al momento de agendar citas y seguir las indicaciones
              médicas brindadas por nuestro equipo profesional.
            </p>
            <p>
              Los horarios de atención y disponibilidad pueden variar según la
              demanda de emergencias. Cevet se reserva el derecho de
              reprogramar citas cuando sea necesario para priorizar casos
              urgentes.
            </p>
            <p>
              El uso de este sitio web es únicamente informativo y de apoyo
              para la reserva de servicios veterinarios. Cualquier procedimiento
              clínico estará sujeto a evaluación médica previa.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
