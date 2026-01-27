import Link from "next/link";
import { Zap, Shield, BarChart3, Globe, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white selection:bg-primary-500 selection:text-white">
      {/* Navbar */}
      <nav className="fixed w-full z-50 glass border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center font-bold">
              E
            </div>
            <span className="text-xl font-bold tracking-tight">EcoTrack</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/login" className="text-sm font-medium hover:text-primary-400 transition-colors">
              Login
            </Link>
            <Link
              href="/dashboard"
              className="px-4 py-2 rounded-full bg-primary-600 hover:bg-primary-500 text-sm font-medium transition-all shadow-lg shadow-primary-500/25"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-6 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary-600/20 blur-[120px] rounded-full pointer-events-none" />

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm mb-8 animate-fade-in-up">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              AI-Powered Energy Monitoring
            </div>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
              Master Your Energy. <br />
              <span className="text-primary-400">Reduce the Waste.</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              Real-time monitoring, predictive analytics, and regional insights to help you slash costs and save the planet.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/dashboard"
                className="px-8 py-4 rounded-full bg-white text-slate-900 font-bold text-lg hover:bg-gray-100 transition-all flex items-center gap-2"
              >
                Launch Dashboard <ArrowRight className="w-5 h-5" />
              </Link>
              <button className="px-8 py-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-lg font-medium backdrop-blur-sm">
                View Demo
              </button>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 px-6 bg-black/20">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard
                icon={Zap}
                title="Real-Time Monitoring"
                description="Watch your energy consumption as it happens with live websocket updates."
              />
              <FeatureCard
                icon={Globe}
                title="Regional Mapping"
                description="Interactive heatmaps showing energy usage patterns across different regions."
              />
              <FeatureCard
                icon={BarChart3}
                title="Smart Analytics"
                description="AI-driven insights to identify waste and suggest optimization strategies."
              />
            </div>
          </div>
        </section>

        {/* Dashboard Preview */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-purple-600 rounded-2xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity" />
            <div className="relative glass-card border border-white/10 rounded-2xl overflow-hidden aspect-video flex items-center justify-center bg-slate-900">
              <div className="text-center">
                <p className="text-gray-500 mb-4">Interactive Dashboard Preview</p>
                <Link href="/dashboard" className="px-6 py-3 bg-primary-600 rounded-lg hover:bg-primary-500 transition-colors">
                  Enter Dashboard
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 border-t border-white/5 text-center text-gray-500 text-sm">
        <p>© 2024 EcoTrack. Built for a sustainable future.</p>
      </footer>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description }: { icon: any, title: string, description: string }) {
  return (
    <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all hover:-translate-y-1">
      <div className="w-12 h-12 rounded-lg bg-primary-500/10 flex items-center justify-center text-primary-400 mb-6">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-400 leading-relaxed">
        {description}
      </p>
    </div>
  );
}
