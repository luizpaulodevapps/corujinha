'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { 
  ArrowRight, 
  Sparkles, 
  Heart, 
  Trophy, 
  Gamepad2, 
  Zap,
  Users,
  ChevronDown,
  Star,
  CheckCircle2,
  Leaf,
  Cloud,
  Moon,
  Sun
} from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'

export default function LandingPage() {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  const { scrollYProgress } = useScroll()
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -100])
  const leafOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])

  return (
    <div className="min-h-screen bg-bg-main selection:bg-brand-accent selection:text-brand-primary overflow-x-hidden">
      
      {/* ─── Nature Background Elements ────────────────────────────────────── */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-brand-primary/5 rounded-full blur-[120px] animate-float" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-brand-accent/5 rounded-full blur-[120px] animate-float [animation-delay:2s]" />
        
        {/* Animated Leaves falling in the background */}
        <div className="absolute inset-0">
          {mounted && [...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ top: -100, left: `${Math.random() * 100}%`, rotate: 0 }}
              animate={{ 
                top: '110vh', 
                left: `${(Math.random() * 20) - 10}%`, 
                rotate: 360 
              }}
              transition={{ 
                duration: 15 + Math.random() * 10, 
                repeat: Infinity, 
                ease: "linear",
                delay: i * 3
              }}
              className="absolute text-brand-secondary opacity-10"
            >
              <Leaf size={40 + Math.random() * 40} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* ─── Navigation ──────────────────────────────────────────────────────── */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-[100] bg-card-bg/50 dark:bg-card-bg/40 backdrop-blur-3xl border-4 border-card-border/70 rounded-[2.5rem] px-8 shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all hover:bg-card-bg/70 motion-safe:duration-300">
        <div className="h-20 flex items-center justify-between gap-4">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-4 group cursor-pointer">
            <div className="relative w-14 h-14 flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
              <div className="absolute inset-0 bg-brand-accent/30 rounded-full blur-xl animate-pulse" />
              <Image src="/owl_mascot.png" alt="Corujinha" width={56} height={56} className="object-contain relative z-10 animate-sway" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black text-brand-primary tracking-tight leading-none italic">Corujinha</span>
              <span className="text-[10px] font-bold text-brand-secondary uppercase tracking-[0.3em] mt-1">Ninho da Sabedoria</span>
            </div>
          </motion.div>
          
          <div className="hidden md:flex items-center gap-10">
            {[
              { label: 'Aventura', icon: Leaf, href: '#aventura' },
              { label: 'Sabedoria', icon: Sun, href: '#missão' },
              { label: 'Tesouros', icon: Star, href: '#preços' }
            ].map((item) => (
              <a 
                key={item.label}
                href={item.href} 
                className="group relative text-sm font-black text-brand-secondary uppercase tracking-[0.1em] flex items-center gap-2 hover:text-brand-primary transition-colors"
              >
                <item.icon size={16} className="group-hover:rotate-12 transition-transform" />
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-1 bg-brand-accent rounded-full group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <ThemeToggle />
            <Link href="/login" className="relative group">
              <div className="absolute inset-0 bg-brand-primary rounded-2xl blur-lg opacity-20 group-hover:opacity-40 transition-opacity" />
              <div className="relative bg-brand-primary text-white px-8 py-3 rounded-2xl font-black text-lg shadow-[0_6px_0_0_#1B4332] active:shadow-none active:translate-y-1 transition-all flex items-center gap-2 border-2 border-white/20">
                Entrar no Ninho <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
              </div>
            </Link>
          </div>
        </div>
      </nav>

      {/* ─── Hero Section ────────────────────────────────────────────────────── */}
      <section className="relative pt-40 lg:pt-56 pb-20 px-6 min-h-screen flex flex-col items-center">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center z-10">
          <motion.div style={{ y: heroY }} className="text-center lg:text-left space-y-10">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-3 px-8 py-3 bg-brand-primary/10 text-brand-primary rounded-full text-sm font-black uppercase tracking-widest border-2 border-brand-primary/20"
            >
              <Sparkles size={18} className="animate-pulse text-brand-accent" /> Onde a Imaginação Floresce
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-7xl md:text-9xl font-black text-text-main tracking-tight leading-[0.85]"
            >
              Transforme a rotina em <br/>
              <span className="text-gradient">Magia Pura.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-2xl md:text-3xl text-text-secondary font-bold leading-relaxed max-w-xl"
            >
              Uma jornada encantada onde cada pequena tarefa concluída ajuda o seu filho a voar mais alto.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center gap-8"
            >
              <Link href="/login" className="btn-primary h-24 px-16 text-3xl rounded-[2.5rem] w-full sm:w-auto shadow-[0_12px_0_0_#1B4332]">
                Começar Aventura <ArrowRight size={32} />
              </Link>
              <div className="flex flex-col text-left">
                <span className="text-brand-primary font-black text-2xl">+15k</span>
                <span className="text-text-muted font-bold text-sm uppercase tracking-widest">Famílias Felizes</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Hero Scene Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: 3 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-brand-primary/20 rounded-[5rem] blur-[80px] -z-10 group-hover:bg-brand-primary/30 transition-all animate-pulse" />
            <div className="premium-card !p-6 !rounded-[5rem] bg-white shadow-2xl relative overflow-hidden group">
              <div className="relative aspect-[4/5] md:aspect-square w-full rounded-[4rem] overflow-hidden">
                <Image 
                  src="/hero_forest.png" 
                  alt="Floresta Mágica Corujinha" 
                  fill
                  className="object-cover transform group-hover:scale-105 transition-transform duration-[2s]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/40 to-transparent" />
                
                {/* Floating Badges */}
                <motion.div 
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute top-10 left-10 bg-white/90 backdrop-blur-md p-4 rounded-3xl shadow-xl border-2 border-brand-primary/10 flex items-center gap-3"
                >
                  <div className="w-10 h-10 bg-brand-accent rounded-xl flex items-center justify-center text-xl shadow-inner">🏆</div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-brand-secondary">Conquista</p>
                    <p className="text-sm font-black text-text-main">Mestre do Ninho</p>
                  </div>
                </motion.div>

                <motion.div 
                  animate={{ y: [0, 15, 0] }}
                  transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                  className="absolute bottom-10 right-10 bg-white/90 backdrop-blur-md p-4 rounded-3xl shadow-xl border-2 border-brand-accent/20 flex items-center gap-3"
                >
                  <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center text-xl shadow-inner">💎</div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-brand-secondary">Ganhou</p>
                    <p className="text-sm font-black text-text-main">+50 Moedas</p>
                  </div>
                </motion.div>
              </div>
            </div>
            
            {/* Mascot Peek */}
            <motion.div 
              animate={{ rotate: [0, -10, 0], y: [0, -5, 0] }}
              transition={{ duration: 6, repeat: Infinity }}
              className="absolute -left-12 bottom-20 w-32 h-32 z-20"
            >
              <Image src="/owl_mascot.png" alt="Owl" width={128} height={128} className="animate-blink" />
            </motion.div>
          </motion.div>
        </div>

        <motion.div animate={{ y: [0, 15, 0] }} transition={{ repeat: Infinity, duration: 2.5 }} className="mt-20 text-brand-secondary opacity-30">
          <ChevronDown size={48} strokeWidth={3} />
        </motion.div>
      </section>

      {/* ─── Features Section ────────────────────────────────────────────────── */}
      <section id="aventura" className="py-40 px-6 relative overflow-hidden bg-white/40">
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-bg-main to-transparent" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-32 space-y-6">
            <h2 className="text-5xl md:text-7xl font-black text-text-main tracking-tight leading-tight">
              Transforme o tédio em <br/><span className="text-brand-primary italic underline decoration-brand-accent decoration-8 underline-offset-8">Missões Épicas.</span>
            </h2>
            <p className="text-2xl text-text-secondary font-bold max-w-2xl mx-auto leading-relaxed">
              O fim das brigas em casa. No Corujinha, arrumar o quarto vira a "Missão de Limpeza da Toca do Urso".
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
            <MagicCard 
              emoji="🪶"
              title="Penas de Ouro"
              description="Cada tarefa concluída gera recompensas que podem ser trocadas por privilégios reais escolhidos por você."
              bgColor="bg-brand-primary/5"
              borderColor="border-brand-primary/20"
              delay={0}
            />
            <MagicCard 
              emoji="🌳"
              title="Crescimento Vital"
              description="Acompanhe o desenvolvimento de responsabilidade, empatia e organização de forma lúdica."
              bgColor="bg-brand-secondary/5"
              borderColor="border-brand-secondary/20"
              delay={0.1}
            />
            <MagicCard 
              emoji="✨"
              title="Vínculos Mágicos"
              description="A Corujinha aproxima pais e filhos através do incentivo positivo e da diversão compartilhada."
              bgColor="bg-brand-accent/5"
              borderColor="border-brand-accent/20"
              delay={0.2}
            />
          </div>
        </div>
      </section>

      {/* ─── Quote Section ──────────────────────────────────────────────────── */}
      <section className="py-32 px-6 bg-brand-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'url("/forest_pattern.png")', backgroundSize: '200px' }} />
        <div className="max-w-5xl mx-auto text-center space-y-12 relative z-10">
          <div className="flex justify-center gap-2">
            {[1,2,3,4,5].map(i => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Star fill="#F9D423" className="text-brand-accent" size={32} />
              </motion.div>
            ))}
          </div>
          <h3 className="text-4xl md:text-6xl font-black text-white italic leading-[1.1] tracking-tight">
            "Antes a gente brigava. Agora, meu filho me pergunta se tem alguma missão nova no Corujinha. É simplesmente mágico!"
          </h3>
          <div className="flex items-center justify-center gap-6">
            <div className="w-20 h-20 bg-white rounded-[1.5rem] flex items-center justify-center text-4xl shadow-2xl border-4 border-brand-accent animate-float">👩‍👧</div>
            <div className="text-left">
              <p className="font-black text-white text-2xl leading-none">Helena Soares</p>
              <p className="text-brand-secondary font-black text-sm uppercase tracking-widest mt-1">Mãe do Theo (6 anos)</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Final CTA ──────────────────────────────────────────────────────── */}
      <section className="py-48 px-6 text-center relative">
        <div className="max-w-4xl mx-auto space-y-16">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-brand-accent/30 rounded-full blur-3xl animate-pulse" />
            <div className="relative w-56 h-56 flex items-center justify-center animate-float mx-auto mb-10">
              <Image src="/owl_mascot.png" alt="Owl" width={224} height={224} className="object-contain" />
            </div>
            <motion.div 
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="absolute -top-6 -right-6 bg-brand-magic text-white text-xs font-black px-4 py-2 rounded-full shadow-lg"
            >
              VEM VOAR!
            </motion.div>
          </div>
          
          <h2 className="text-6xl md:text-8xl font-black text-text-main tracking-tight leading-none">
            Inicie uma nova <br/><span className="text-gradient">Era de Alegria.</span>
          </h2>
          
          <div className="flex flex-col items-center gap-6">
            <Link href="/login" className="btn-primary h-28 px-20 text-4xl rounded-[3rem] shadow-[0_15px_0_0_#1B4332] group">
              Começar Grátis 
              <ArrowRight size={40} className="group-hover:translate-x-4 transition-transform" />
            </Link>
            <p className="text-text-muted font-bold text-xl flex items-center gap-2">
              <ShieldCheck className="text-brand-primary" /> Sem cartão. Pronto em 1 minuto.
            </p>
          </div>
        </div>
      </section>

      <footer className="py-20 border-t-8 border-brand-secondary/10 bg-white/40 text-center">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center text-xl">🦉</div>
             <span className="font-black text-brand-primary">Corujinha Floresta</span>
          </div>
          <p className="text-brand-secondary font-black uppercase tracking-[0.1em] text-sm">
            © 2026 Corujinha Labs · Cultivando Sabedoria em Família
          </p>
          <div className="flex gap-6 text-brand-secondary font-bold text-xs uppercase">
            <a href="#" className="hover:text-brand-primary transition-colors">Privacidade</a>
            <a href="#" className="hover:text-brand-primary transition-colors">Termos</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

function ShieldCheck({ className }: { className?: string }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>
    </svg>
  )
}

function MagicCard({ emoji, title, description, bgColor, borderColor, delay }: { emoji: string, title: string, description: string, bgColor: string, borderColor: string, delay: number }) {
  return (
    <motion.div 
      whileInView={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 50 }}
      transition={{ delay }}
      viewport={{ once: true }}
      whileHover={{ y: -15, scale: 1.02 }}
      className={`premium-card p-12 !rounded-[4rem] ${bgColor} border-4 ${borderColor} text-center group relative overflow-hidden`}
    >
      <div className="absolute -right-8 -bottom-8 text-brand-primary/5 group-hover:rotate-12 transition-transform">
        <Leaf size={120} />
      </div>
      <div className="text-7xl mb-10 group-hover:rotate-12 transition-transform duration-500">{emoji}</div>
      <h3 className="text-3xl font-black text-brand-primary mb-5 tracking-tight">{title}</h3>
      <p className="text-lg text-text-secondary font-bold leading-relaxed">{description}</p>
    </motion.div>
  )
}
