import React from 'react';
import HeroSlider from '../components/HeroSlider';
import Service3DCard from '../components/Service3DCard';
import FAQ from '../components/FAQ';
import TaxCalculator from '../components/TaxCalculator';
import TrustBadges from '../components/TrustBadges';
import ClientLogos from '../components/ClientLogos';
import { CheckCircle } from 'lucide-react';
import { Link, useOutletContext } from 'react-router-dom';
import { homeContent } from '../data/content';

interface HomeContext {
  onOpenModal: () => void;
}

const Home: React.FC = () => {
  const { onOpenModal } = useOutletContext<HomeContext>();

  return (
    <div className="flex min-h-screen flex-col">
      <HeroSlider onOpenModal={onOpenModal} />

      {/* Trust Badges */}
      <TrustBadges />

      {/* Main Services Introduction with 3D Cards */}
      <section className="bg-ultra-dark relative z-10 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="font-display mb-4 text-3xl font-bold text-white md:text-4xl">
              {homeContent.integratedSolutions.title}
            </h2>
            <div className="from-ultra-accent to-ultra-security mx-auto mb-6 h-1 w-20 bg-gradient-to-r"></div>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-300">
              {homeContent.integratedSolutions.description}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Ultra Tax Highlights */}
            {homeContent.services.tax.map((service, index) => (
              <Service3DCard
                key={index}
                title={service.title}
                description={service.description}
                icon={service.icon}
                link={service.link}
                variant="tax"
              />
            ))}

            {/* Ultra Security Highlights */}
            {homeContent.services.security.map((service, index) => (
              <Service3DCard
                key={index}
                title={service.title}
                description={service.description}
                icon={service.icon}
                link={service.link}
                variant="security"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="border-y border-slate-800 bg-slate-900/50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            <div>
              <h2 className="font-display mb-6 text-3xl font-bold text-white">{homeContent.whyUltraSystems.title}</h2>
              <div className="space-y-8">
                {homeContent.whyUltraSystems.reasons.map((reason, index) => (
                  <div className="flex gap-4" key={index}>
                    <div className="bg-ultra-accent/10 border-ultra-accent/20 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg border">
                      {typeof reason.icon === 'string' ? (
                        <span className="text-ultra-accent font-bold">{reason.icon}</span>
                      ) : (
                        <reason.icon className="text-ultra-accent h-6 w-6" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{reason.title}</h3>
                      <p className="mt-1 text-sm text-gray-400">{reason.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Box instead of inline form for cleaner look */}
            <div className="rounded-2xl border border-slate-700 bg-gradient-to-br from-slate-800 to-slate-900 p-8 text-center shadow-2xl">
              <h3 className="mb-4 text-2xl font-bold text-white">{homeContent.whyUltraSystems.cta.title}</h3>
              <p className="mb-8 text-gray-400">{homeContent.whyUltraSystems.cta.description}</p>
              <button
                onClick={onOpenModal}
                className="bg-ultra-primary w-full transform rounded-lg py-4 font-bold text-white shadow-lg transition-all hover:-translate-y-1 hover:bg-blue-600 hover:shadow-blue-500/30"
              >
                {homeContent.whyUltraSystems.cta.buttonText}
              </button>
              <div className="mt-4 flex items-center justify-center text-xs text-gray-500">
                <CheckCircle size={14} className="mr-1 text-green-500" /> Sem custo inicial • Diagnóstico em 72h
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* General Process Section */}
      <section className="bg-ultra-dark relative overflow-hidden py-24">
        <div className="absolute top-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="font-display mb-4 text-3xl font-bold text-white">{homeContent.howWeWork.title}</h2>
            <p className="text-gray-400">{homeContent.howWeWork.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            {homeContent.howWeWork.steps.map((item, idx) => (
              <div key={idx} className="group relative">
                <div className="font-display group-hover:text-ultra-primary/20 mb-4 text-6xl font-bold text-slate-800 transition-colors">
                  {item.step}
                </div>
                <h3 className="mb-2 text-xl font-bold text-white">{item.title}</h3>
                <p className="text-sm text-gray-400">{item.desc}</p>
                {idx < 3 && <div className="absolute top-8 right-0 hidden h-px w-1/2 bg-slate-800 md:block"></div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials / Cases Placeholder */}
      <section className="bg-slate-900/30 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display mb-12 text-center text-3xl font-bold text-white">
            {homeContent.realResults.title}
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {homeContent.realResults.testimonials.map((testimonial, index) => (
              <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-6" key={index}>
                <div className="text-ultra-accent mb-2 text-4xl font-bold">{testimonial.value}</div>
                <p className="mb-4 font-semibold text-white">{testimonial.title}</p>
                <p className="text-sm text-gray-400">{testimonial.quote}</p>
                <div className="mt-4 text-xs tracking-wide text-gray-500 uppercase">{testimonial.client}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Logos */}
      <ClientLogos />

      {/* Tax Calculator */}
      <TaxCalculator />

      {/* FAQ Section */}
      <FAQ />

      {/* Final CTA */}
      <section className="relative overflow-hidden py-20">
        <div className="bg-ultra-primary/5 absolute inset-0"></div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-display mb-6 text-3xl font-bold text-white">{homeContent.finalCta.title}</h2>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link to="/servicos">
              <button className="bg-ultra-accent w-full rounded-lg px-8 py-3 font-bold text-white shadow-lg shadow-cyan-500/30 transition-colors hover:bg-cyan-600 sm:w-auto">
                {homeContent.finalCta.buttons.tax}
              </button>
            </Link>
            <Link to="/security">
              <button className="border-ultra-security text-ultra-security hover:bg-ultra-security/10 w-full rounded-lg border px-8 py-3 font-bold transition-colors sm:w-auto">
                {homeContent.finalCta.buttons.security}
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
