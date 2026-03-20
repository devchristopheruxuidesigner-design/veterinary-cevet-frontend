"use client";

import React, { useState, useEffect } from 'react';
import { 
  Stethoscope, 
  Scissors, 
  Syringe, 
  Activity, 
  Heart, 
  CalendarClock, 
  MapPin, 
  Phone, 
  Menu, 
  X, 
  ChevronRight, 
  Clock,
  ShieldCheck,
  Award
} from 'lucide-react';

// --- UTILIDADES Y COMPONENTES SIMULANDO SHADCN/UI ---

const Button = ({ children, variant = 'default', size = 'default', className = '', ...props }) => {
  const baseStyles = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
  
  const variants = {
    default: "bg-teal-600 text-white hover:bg-teal-700",
    outline: "border border-slate-200 hover:bg-slate-100 text-slate-900",
    ghost: "hover:bg-slate-100 text-slate-900",
    link: "underline-offset-4 hover:underline text-teal-600",
  };
  
  const sizes = {
    default: "h-10 py-2 px-4",
    sm: "h-9 px-3 rounded-md",
    lg: "h-11 px-8 rounded-md",
    icon: "h-10 w-10",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const Card = ({ className, children }) => (
  <div className={`rounded-xl border border-slate-200 bg-white text-slate-950 shadow-sm ${className}`}>
    {children}
  </div>
);

const Input = ({ className, ...props }) => (
  <input
    className={`flex h-10 w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    {...props}
  />
);

const Label = ({ className, children, ...props }) => (
  <label className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`} {...props}>
    {children}
  </label>
);

// --- COMPONENTES PRINCIPALES DE LA PÁGINA ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-600 text-white">
              <Heart size={20} />
            </div>
            <span className="text-xl font-bold tracking-tight text-teal-900">Ce<span className="text-teal-600">Vet</span></span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <a href="#inicio" className="text-sm font-medium text-slate-600 hover:text-teal-600">Inicio</a>
            <a href="#servicios" className="text-sm font-medium text-slate-600 hover:text-teal-600">Servicios</a>
            <a href="#nosotros" className="text-sm font-medium text-slate-600 hover:text-teal-600">Nosotros</a>
            <a href="#contacto" className="text-sm font-medium text-slate-600 hover:text-teal-600">Contacto</a>
            <Button onClick={() => document.getElementById('agendar').scrollIntoView({ behavior: 'smooth' })}>
              Agendar Cita
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 text-slate-600" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden border-b bg-white px-4 py-4 space-y-4 shadow-lg">
          <a href="#inicio" className="block text-sm font-medium text-slate-600" onClick={() => setIsOpen(false)}>Inicio</a>
          <a href="#servicios" className="block text-sm font-medium text-slate-600" onClick={() => setIsOpen(false)}>Servicios</a>
          <a href="#nosotros" className="block text-sm font-medium text-slate-600" onClick={() => setIsOpen(false)}>Nosotros</a>
          <a href="#contacto" className="block text-sm font-medium text-slate-600" onClick={() => setIsOpen(false)}>Contacto</a>
          <Button className="w-full" onClick={() => { setIsOpen(false); document.getElementById('agendar').scrollIntoView({ behavior: 'smooth' }); }}>
            Agendar Cita
          </Button>
        </div>
      )}
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="inicio" className="relative bg-slate-50 pt-16 pb-20 lg:pt-24 lg:pb-28 overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-2xl">
            <span className="inline-flex items-center rounded-full bg-teal-100 px-3 py-1 text-sm font-semibold text-teal-800 mb-6">
              <Activity size={16} className="mr-2" />
              Atención Veterinaria 24/7
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
              El mejor cuidado para tu <span className="text-teal-600">mejor amigo</span>
            </h1>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              En Cevet, combinamos tecnología médica avanzada con amor incondicional por los animales para ofrecer la mejor atención en Lima.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" onClick={() => document.getElementById('agendar').scrollIntoView({ behavior: 'smooth' })}>
                Agendar Consulta <ChevronRight size={18} className="ml-2" />
              </Button>
              <Button size="lg" variant="outline">
                <Phone size={18} className="mr-2" /> Llamar por Emergencia
              </Button>
            </div>
          </div>
          <div className="relative">
            {/* Contenedor simulando la imagen principal */}
            <div className="aspect-[4/3] rounded-2xl bg-teal-200 overflow-hidden shadow-xl relative border-8 border-white flex items-center justify-center">
               <div className="text-teal-800 font-medium text-lg text-center px-4">
                 [Imagen de Perro feliz siendo examinado por un veterinario]
               </div>
            </div>
            {/* Tarjeta flotante de estadística */}
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg border border-slate-100 flex items-center gap-4 animate-bounce hover:animate-none">
              <div className="bg-orange-100 p-3 rounded-full text-orange-600">
                <Award size={24} />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">+10 Años</p>
                <p className="text-xs text-slate-500">De experiencia clínica</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const servicesList = [
    {
      title: "Consultas Médicas",
      description: "Evaluación integral para prevenir y tratar enfermedades de tu mascota con equipos de última generación.",
      icon: <Stethoscope size={28} className="text-teal-600" />
    },
    {
      title: "Peluquería (Grooming)",
      description: "Baños medicados, cortes de raza, corte de uñas y limpieza de oídos. ¡Saldrán luciendo increíbles!",
      icon: <Scissors size={28} className="text-teal-600" />
    },
    {
      title: "Vacunación y Desparasitación",
      description: "Protocolos preventivos personalizados según la edad y estilo de vida de tu perro o gato.",
      icon: <Syringe size={28} className="text-teal-600" />
    },
    {
      title: "Cirugías Especializadas",
      description: "Quirófano equipado con anestesia inhalatoria y monitoreo continuo para máxima seguridad.",
      icon: <Activity size={28} className="text-teal-600" />
    }
  ];

  return (
    <section id="servicios" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl mb-4">Nuestros Servicios</h2>
          <p className="text-lg text-slate-600">
            Ofrecemos un portafolio completo de servicios veterinarios para garantizar la salud y felicidad de tus mascotas en todas las etapas de su vida.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicesList.map((service, index) => (
            <Card key={index} className="p-6 hover:shadow-md transition-shadow group border-slate-100 bg-slate-50 hover:bg-white hover:border-teal-200">
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-teal-100 group-hover:bg-teal-600 transition-colors">
                <div className="group-hover:text-white transition-colors">
                  {service.icon}
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{service.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                {service.description}
              </p>
              <a href="#" className="inline-flex items-center text-sm font-medium text-teal-600 hover:text-teal-700">
                Saber más <ChevronRight size={16} className="ml-1" />
              </a>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="nosotros" className="py-20 bg-slate-50">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 relative">
            {/* Contenedor simulando la imagen de nosotros */}
            <div className="aspect-square md:aspect-[4/3] rounded-2xl bg-teal-100 overflow-hidden shadow-xl border-8 border-white flex items-center justify-center relative">
               <div className="absolute inset-0 bg-teal-600/10 mix-blend-multiply"></div>
               <div className="text-teal-800 font-medium text-lg text-center px-4 relative z-10">
                 [Imagen del equipo de veterinarios de Cevet trabajando juntos]
               </div>
            </div>
            {/* Elemento decorativo */}
            <div className="absolute -top-6 -left-6 bg-teal-600 text-white p-4 rounded-xl shadow-lg border border-teal-500 hidden md:block">
               <Heart size={32} />
            </div>
          </div>
          
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl mb-6">Sobre Nosotros</h2>
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
              Somos un centro de emergencia veterinaria comprometido con brindar la más alta calidad de atención médica para tus mascotas. En <span className="font-bold text-teal-600">Cevet</span>, entendemos que ellos son parte fundamental de tu familia.
            </p>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Nuestro equipo de profesionales altamente calificados está disponible 24/7 para cualquier situación que requiera atención inmediata, combinando años de experiencia con un trato humano y empático.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-teal-100 p-2 rounded-full text-teal-600">
                  <Heart size={20} />
                </div>
                <span className="text-slate-700 font-medium">Amor y empatía por cada paciente</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-teal-100 p-2 rounded-full text-teal-600">
                  <Award size={20} />
                </div>
                <span className="text-slate-700 font-medium">Especialistas altamente capacitados</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-teal-100 p-2 rounded-full text-teal-600">
                  <ShieldCheck size={20} />
                </div>
                <span className="text-slate-700 font-medium">Equipamiento médico de última generación</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Appointment = () => {
  const [formData, setFormData] = useState({
    ownerName: '',
    petName: '',
    phone: '',
    service: '',
    date: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Simulación de interacción con Backend (Node.js + Prisma)
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Aquí iría el fetch POST a Next.js API Routes o Servidor Node.js
    // Ejemplo: await fetch('/api/appointments', { method: 'POST', body: JSON.stringify(formData) })
    
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
      setFormData({ ownerName: '', petName: '', phone: '', service: '', date: '' });
      setTimeout(() => setSuccess(false), 5000);
    }, 1500);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="agendar" className="py-20 bg-teal-900 text-white relative overflow-hidden">
      {/* Círculos decorativos de fondo */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 h-[400px] w-[400px] rounded-full bg-teal-800 opacity-50 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 h-[300px] w-[300px] rounded-full bg-teal-700 opacity-50 blur-3xl"></div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold sm:text-4xl mb-6">Agenda una Cita Hoy</h2>
            <p className="text-teal-100 text-lg mb-8 leading-relaxed">
              No dejes la salud de tu mascota para mañana. Completa el formulario y nuestro sistema registrará tu solicitud de inmediato. Nos pondremos en contacto para confirmar.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <ShieldCheck size={24} className="text-teal-300" />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium">Atención Segura</h4>
                  <p className="text-teal-200/80 text-sm">Protocolos estrictos de higiene y seguridad en todas nuestras instalaciones.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <CalendarClock size={24} className="text-teal-300" />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium">Flexibilidad de Horarios</h4>
                  <p className="text-teal-200/80 text-sm">Escoge la fecha y servicio. Confirmación rápida vía WhatsApp o llamada.</p>
                </div>
              </div>
            </div>
          </div>

          <Card className="p-6 md:p-8 bg-white text-slate-900 shadow-2xl relative">
            <h3 className="text-2xl font-bold mb-6 text-center">Formulario de Reserva</h3>
            {success ? (
              <div className="text-center py-10">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mb-4">
                  <Heart size={32} className="text-green-600" />
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">¡Cita Solicitada!</h4>
                <p className="text-slate-600 text-sm">
                  Hemos registrado tu solicitud en nuestra base de datos (Simulando PostgreSQL). Te contactaremos pronto.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="ownerName">Tu Nombre</Label>
                    <Input id="ownerName" name="ownerName" placeholder="Ej. Juan Pérez" value={formData.ownerName} onChange={handleChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="petName">Nombre de Mascota</Label>
                    <Input id="petName" name="petName" placeholder="Ej. Firulais" value={formData.petName} onChange={handleChange} required />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono / Celular</Label>
                  <Input id="phone" name="phone" type="tel" placeholder="+51 999 999 999" value={formData.phone} onChange={handleChange} required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="service">Servicio Requerido</Label>
                  <select 
                    id="service" 
                    name="service" 
                    className="flex h-10 w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                    value={formData.service} 
                    onChange={handleChange} 
                    required
                  >
                    <option value="" disabled>Selecciona un servicio</option>
                    <option value="consulta">Consulta General</option>
                    <option value="vacuna">Vacunación</option>
                    <option value="grooming">Peluquería / Grooming</option>
                    <option value="especialidad">Consulta Especializada</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date">Fecha Preferida</Label>
                  <Input id="date" name="date" type="date" value={formData.date} onChange={handleChange} required />
                </div>

                <Button type="submit" className="w-full mt-2" disabled={isSubmitting}>
                  {isSubmitting ? 'Registrando en Base de Datos...' : 'Confirmar Solicitud'}
                </Button>
              </form>
            )}
          </Card>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer id="contacto" className="bg-slate-950 text-slate-300 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
          
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-600 text-white">
                <Heart size={20} />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">Ce<span className="text-teal-500">Vet</span></span>
            </div>
            <p className="text-sm text-slate-400">
              Pasión por la medicina veterinaria y el bienestar animal. Tu clínica de confianza en Lima Sur.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#inicio" className="hover:text-teal-400 transition-colors">Inicio</a></li>
              <li><a href="#servicios" className="hover:text-teal-400 transition-colors">Nuestros Servicios</a></li>
              <li><a href="#agendar" className="hover:text-teal-400 transition-colors">Agendar Cita</a></li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contacto</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 text-teal-500 shrink-0" />
                <span>Av. Pachacútec 1234, Villa María del Triunfo, Lima</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 text-teal-500 shrink-0" />
                <span>+51 913 696 049</span>
              </li>
              <li className="flex items-start">
                <Clock size={18} className="mr-2 text-teal-500 shrink-0" />
                <span>
                  Lun - Sáb: 8:00 AM - 8:00 PM <br/>
                  Emergencias 24/7
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Centro de emergencia veterinaria Cevet. Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-slate-300">Términos de Servicio</a>
            <a href="#" className="hover:text-slate-300">Privacidad</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function Home() {
  return (
    <div className="min-h-screen font-sans bg-slate-50 text-slate-900 scroll-smooth">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <About />
        <Appointment />
      </main>
      <Footer />
    </div>
  );
}