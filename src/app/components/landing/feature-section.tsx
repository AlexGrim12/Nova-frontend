import { Rocket, Shield, Zap } from 'lucide-react';

export function FeatureSection() {
  return (
    <section className="py-20 bg-black/80">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
          Características Principales
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Rocket className="w-12 h-12 text-purple-500" />}
            title="Datos en Tiempo Real"
            description="Accede a información actualizada de asteroides cercanos a la Tierra directamente desde la API de la NASA."
          />
          <FeatureCard
            icon={<Shield className="w-12 h-12 text-purple-500" />}
            title="Análisis de Riesgo"
            description="Identifica asteroides potencialmente peligrosos y monitorea su trayectoria."
          />
          <FeatureCard
            icon={<Zap className="w-12 h-12 text-purple-500" />}
            title="Visualización en Vivo"
            description="Proyecta la información seleccionada en tiempo real mediante WebSockets."
          />
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ icon, title, description }: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-gray-800/50 rounded-xl p-6 transform hover:scale-105 transition-transform">
      <div className="flex flex-col items-center text-center">
        {icon}
        <h3 className="text-xl font-semibold text-white mt-4 mb-2">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </div>
    </div>
  );
}