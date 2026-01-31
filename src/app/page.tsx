'use client';

import Link from "next/link";
import { Zap, Globe, BarChart3, ArrowRight, Leaf, Shield, CheckCircle2, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-emerald-500 selection:text-white overflow-x-hidden">
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-500/10 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-500/5 blur-[120px]" />
      </div>

      {/* Navbar */}
      <nav className="fixed w-full z-50 bg-slate-950/40 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-green-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
              <Leaf size={22} />
            </div>
            <span className="text-2xl font-black tracking-tighter text-white">Ecotaqa</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-sm font-bold text-slate-400 hover:text-white transition-colors">Fonctionnalités</Link>
            <Link href="#impact" className="text-sm font-bold text-slate-400 hover:text-white transition-colors">Notre Impact</Link>
            <Link href="#demo" className="text-sm font-bold text-slate-400 hover:text-white transition-colors">Démo</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-bold text-slate-400 hover:text-white transition-colors pr-2">Connexion</Link>
            <Button asChild className="rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-6 h-11 transition-all shadow-lg shadow-emerald-500/20">
              <Link href="/dashboard">
                Démarrer <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </nav>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="pt-48 pb-32 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-black uppercase tracking-widest mb-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              Révolution Énergétique IA
            </div>

            <h1 className="text-6xl md:text-8xl font-black leading-[1.1] mb-10 tracking-tighter text-white animate-in fade-in slide-in-from-bottom-8 duration-700">
              Optimisez votre <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-green-500 to-emerald-600">Impact Énergétique.</span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-12 duration-1000">
              Ecotaqa transforme les données brutes en intelligence actionnable pour réduire vos coûts et accélérer votre transition écologique.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-in fade-in slide-in-from-bottom-16 duration-1000">
              <Button asChild size="lg" className="h-16 px-10 rounded-[2rem] bg-white text-slate-950 hover:bg-slate-100 font-black text-xl shadow-2xl transition-all hover:scale-105 active:scale-95">
                <Link href="/dashboard">Lancer le Dashboard</Link>
              </Button>
              <Button variant="outline" size="lg" className="h-16 px-10 rounded-[2rem] bg-slate-900/50 border-white/10 hover:bg-slate-800 text-white font-bold text-xl backdrop-blur-md transition-all">
                Voir l&apos;Étude de Cas
              </Button>
            </div>
          </div>
        </section>

        {/* Dynamic Stats Row */}
        <section className="py-20 border-y border-white/5 bg-slate-900/20 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            <div>
              <div className="text-4xl font-black text-white mb-2 tracking-tighter">-30%</div>
              <div className="text-sm font-bold text-slate-500 uppercase tracking-widest">Coûts Énergétiques</div>
            </div>
            <div>
              <div className="text-4xl font-black text-white mb-2 tracking-tighter">99.9%</div>
              <div className="text-sm font-bold text-slate-500 uppercase tracking-widest">Temps de Réponse</div>
            </div>
            <div>
              <div className="text-4xl font-black text-white mb-2 tracking-tighter">15k+</div>
              <div className="text-sm font-bold text-slate-500 uppercase tracking-widest">Bâtiments Monitorés</div>
            </div>
            <div>
              <div className="text-4xl font-black text-white mb-2 tracking-tighter">-2k</div>
              <div className="text-sm font-bold text-slate-500 uppercase tracking-widest">Tonnes de CO₂ / An</div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="py-40 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col items-center text-center mb-24">
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-6">Conçu pour l'Excellence Opérationnelle</h2>
              <div className="w-24 h-1.5 bg-emerald-500 rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <FeatureCard
                icon={Zap}
                title="Intelligence Temps-Réel"
                description="Visualisez votre flux énergétique à la milliseconde grâce à nos capteurs intelligents et notre moteur de streaming."
              />
              <FeatureCard
                icon={Globe}
                title="Cartographie IA"
                description="Identifiez les anomalies régionales et les opportunités d'optimisation grâce à notre moteur géospatial avancé."
              />
              <FeatureCard
                icon={BarChart3}
                title="Prédiction & Dashboard"
                description="Des rapports prédictifs automatisés pour anticiper vos besoins et structurer votre stratégie RSE."
              />
            </div>
          </div>
        </section>

        {/* Impact Section */}
        <section id="impact" className="py-24 px-6 relative overflow-hidden">
          <div className="max-w-5xl mx-auto bg-gradient-to-br from-emerald-500 to-green-700 rounded-[3rem] p-12 md:p-20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-10 opacity-20 group-hover:scale-110 transition-transform duration-700">
              <Shield size={200} />
            </div>
            <div className="relative z-10 flex flex-col items-center text-center">
              <Star className="text-emerald-200 mb-8 w-12 h-12" />
              <h2 className="text-3xl md:text-5xl font-black text-white leading-tight mb-8">L&apos;énergie la plus propre est celle que vous ne consommez pas.</h2>
              <p className="text-emerald-50 font-medium text-lg max-w-2xl mb-12 italic opacity-90">
                &quot;Ecotaqa nous a permis d&apos;optimiser nos entrepôts en seulement 3 mois, avec un ROI immédiat.&quot;
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/20 border border-white/20" />
                <div className="text-left">
                  <div className="font-bold text-white leading-none">Marc Dupont</div>
                  <div className="text-xs text-emerald-200 font-bold uppercase tracking-widest mt-1">Directeur Logistique, LogiTrans</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-20 border-t border-white/5 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-20">
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white">
                <Leaf size={22} />
              </div>
              <span className="text-2xl font-black tracking-tighter text-white">Ecotaqa</span>
            </div>
            <p className="text-slate-500 font-medium leading-relaxed max-w-sm">
              Donner du pouvoir aux entreprises pour construire un futur durable, un kilowatt à la fois.
            </p>
          </div>
          <div>
            <h4 className="text-white font-black uppercase text-xs tracking-widest mb-8">Solution</h4>
            <ul className="space-y-4 text-sm font-bold text-slate-500">
              <li className="hover:text-emerald-400 cursor-pointer transition-colors">Monitoring</li>
              <li className="hover:text-emerald-400 cursor-pointer transition-colors">Analytique</li>
              <li className="hover:text-emerald-400 cursor-pointer transition-colors">Gamification</li>
              <li className="hover:text-emerald-400 cursor-pointer transition-colors">Cartographie</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-black uppercase text-xs tracking-widest mb-8">Société</h4>
            <ul className="space-y-4 text-sm font-bold text-slate-500">
              <li className="hover:text-emerald-400 cursor-pointer transition-colors">À Propos</li>
              <li className="hover:text-emerald-400 cursor-pointer transition-colors">Confidentialité</li>
              <li className="hover:text-emerald-400 cursor-pointer transition-colors">Support</li>
              <li className="hover:text-emerald-400 cursor-pointer transition-colors">Contact</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-white/5 flex justify-between items-center text-xs font-bold text-slate-600">
          <p>© 2024 Ecotaqa Intelligence. Tous droits réservés.</p>
          <div className="flex gap-4">
            <span>FR</span>
            <span>EN</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description }: { icon: React.ElementType, title: string, description: string }) {
  return (
    <div className="p-10 rounded-[2.5rem] bg-slate-900/40 border border-white/5 hover:border-emerald-500/20 hover:bg-slate-900/60 transition-all duration-500 group relative overflow-hidden">
      <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition-colors" />
      <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-8 group-hover:scale-110 transition-transform duration-500 shadow-xl shadow-emerald-500/5">
        <Icon size={32} />
      </div>
      <h3 className="text-2xl font-black text-white mb-4 tracking-tight">{title}</h3>
      <p className="text-slate-400 font-medium leading-relaxed">
        {description}
      </p>
    </div>
  );
}
