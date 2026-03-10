import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  BookOpen, 
  Star, 
  Quote, 
  Heart, 
  Zap, 
  ShieldCheck, 
  CreditCard, 
  Clock,
  ArrowRight,
  Instagram,
  Twitter,
  Mail,
  Coffee,
  Info,
  ChevronDown
} from 'lucide-react';

// --- Components ---

const Logo = ({ className = "" }: { className?: string }) => (
  <div className={`flex items-center gap-3 ${className}`}>
    <div className="relative group">
      <div className="absolute -inset-2 bg-gradient-to-tr from-neon-purple to-electric-blue rounded-full blur-md opacity-40 group-hover:opacity-100 transition-opacity duration-500" />
      <svg 
        width="40" 
        height="40" 
        viewBox="0 0 40 40" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10"
      >
        <circle cx="20" cy="20" r="19" stroke="white" strokeOpacity="0.1" strokeWidth="0.5" />
        <path 
          d="M10 28V12L20 22L30 12V28" 
          stroke="url(#logo-gradient)" 
          strokeWidth="3" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="drop-shadow-[0_0_8px_rgba(188,19,254,0.8)]"
        />
        <path 
          d="M12 32C12 32 15 35 20 35C25 35 28 32 28 29C28 26 25 25 20 24C15 23 12 22 12 19C12 16 15 13 20 13C25 13 28 16 28 16" 
          stroke="white" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          strokeDasharray="1 4"
          className="opacity-50"
        />
        <defs>
          <linearGradient id="logo-gradient" x1="10" y1="12" x2="30" y2="28" gradientUnits="userSpaceOnUse">
            <stop stopColor="#bc13fe" />
            <stop offset="1" stopColor="#00d2ff" />
          </linearGradient>
        </defs>
      </svg>
    </div>
    <span className="font-display font-bold tracking-tighter text-lg sm:text-xl uppercase">
      Marcos Soares<span className="text-neon-purple">.</span>
    </span>
  </div>
);

const Navbar = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <nav className="fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center bg-deep-black/50 backdrop-blur-md border-b border-white/5">
      <Link to="/">
        <Logo />
      </Link>
      <div className="hidden sm:flex gap-8 text-sm font-medium text-white/70">
        {isHome ? (
          <>
            <a href="#livros" className="hover:text-white transition-colors">Livros</a>
            <Link to="/autor" className="hover:text-white transition-colors">O Autor</Link>
            <a href="#depoimentos" className="hover:text-white transition-colors">Leitores</a>
          </>
        ) : (
          <>
            <Link to="/" className="hover:text-white transition-colors">Início</Link>
            <Link to="/autor" className="text-white transition-colors">O Autor</Link>
          </>
        )}
      </div>
      <a href="https://wa.me/5569992511509" target="_blank" rel="noopener noreferrer">
        <button className="px-4 py-2 rounded-full bg-white text-black text-[10px] sm:text-xs font-bold hover:bg-neon-purple hover:text-white transition-all shrink-0">
          COMPRAR AGORA
        </button>
      </a>
    </nav>
  );
};

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 45, seconds: 12 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex gap-2 sm:gap-4 font-mono text-xl sm:text-2xl md:text-4xl font-bold">
      <div className="flex flex-col items-center">
        <span className="text-electric-blue">{String(timeLeft.hours).padStart(2, '0')}</span>
        <span className="text-[8px] sm:text-[10px] uppercase tracking-widest text-white/40">Horas</span>
      </div>
      <span className="opacity-30 text-white/20">:</span>
      <div className="flex flex-col items-center">
        <span className="text-electric-blue">{String(timeLeft.minutes).padStart(2, '0')}</span>
        <span className="text-[8px] sm:text-[10px] uppercase tracking-widest text-white/40">Minutos</span>
      </div>
      <span className="opacity-30 text-white/20">:</span>
      <div className="flex flex-col items-center">
        <span className="text-electric-blue">{String(timeLeft.seconds).padStart(2, '0')}</span>
        <span className="text-[8px] sm:text-[10px] uppercase tracking-widest text-white/40">Segundos</span>
      </div>
    </div>
  );
};

const TechnicalSpecs = ({ specs }: { specs: any }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-white/5">
    {Object.entries(specs).map(([key, value]: [string, any]) => (
      <div key={key} className="space-y-1">
        <p className="text-[10px] uppercase tracking-wider text-white/30">{key}</p>
        <p className="text-xs font-medium text-white/70 break-words">{value}</p>
      </div>
    ))}
  </div>
);

const BookCard = ({ 
  title, 
  description, 
  quotes, 
  image, 
  color, 
  specs, 
  isMain = false,
  price,
  oldPrice,
  discount,
  preSaleInfo
}: { 
  title: string, 
  description: string, 
  quotes: string[], 
  image: string, 
  color: string, 
  specs?: any, 
  isMain?: boolean,
  price?: string,
  oldPrice?: string,
  discount?: string,
  preSaleInfo?: string
}) => {
  const [showSpecs, setShowSpecs] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`futuristic-card rounded-[2rem] p-6 sm:p-8 md:p-12 flex flex-col ${isMain ? 'lg:flex-row' : 'flex-col'} gap-10 items-start group relative overflow-hidden`}
    >
      <div className={`absolute top-0 right-0 w-64 h-64 bg-${color}/10 blur-[80px] rounded-full -mr-32 -mt-32 pointer-events-none`} />
      
      <div className="relative w-full lg:w-2/5 aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl shadow-black/80 border border-white/10 shrink-0">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className={`absolute inset-0 bg-gradient-to-t from-deep-black/60 to-transparent opacity-60`} />
        {isMain && (
          <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-neon-purple text-[10px] font-bold uppercase tracking-widest">
            Obra de Estreia
          </div>
        )}
        {discount && (
          <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-electric-blue text-[10px] font-bold uppercase tracking-widest">
            {discount} OFF
          </div>
        )}
      </div>
      
      <div className="flex-1 space-y-8 relative z-10 w-full overflow-hidden">
        <div className="space-y-4">
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold leading-tight break-words">{title}</h3>
          <p className="text-white/60 leading-relaxed text-base sm:text-lg font-light italic break-words">
            {description}
          </p>
        </div>
        
        {preSaleInfo && (
          <div className="p-4 rounded-xl bg-electric-blue/10 border border-electric-blue/20 flex gap-3 items-start">
            <Clock className="text-electric-blue shrink-0" size={20} />
            <p className="text-xs text-electric-blue/90 leading-relaxed font-medium">
              {preSaleInfo}
            </p>
          </div>
        )}

        <div className="space-y-6">
          {quotes.map((quote, idx) => (
            <div key={idx} className="flex gap-3 sm:gap-4 italic text-white/80 border-l-2 border-neon-purple pl-4 sm:pl-6 py-2 bg-white/2 rounded-r-xl">
              <Quote size={16} className="text-neon-purple shrink-0 opacity-50 mt-1" />
              <p className="text-sm sm:text-base leading-relaxed break-words">"{quote}"</p>
            </div>
          ))}
        </div>
        
        <div className="flex flex-wrap gap-3">
          {['Limpeza da Alma', 'Luz no Desconhecido', 'Conforto', 'Reflexão'].map(tag => (
            <span key={tag} className="px-4 py-1.5 rounded-full bg-white/5 text-[10px] uppercase tracking-widest font-bold border border-white/10 text-white/60">
              {tag}
            </span>
          ))}
        </div>

        <div className="space-y-6 pt-4">
          {price && (
            <div className="flex items-end gap-4">
              <div className="space-y-1">
                {oldPrice && <p className="text-white/30 line-through text-sm tracking-widest">De: R$ {oldPrice}</p>}
                <p className="text-4xl font-display font-bold text-white">R$ {price}</p>
              </div>
              {preSaleInfo && <span className="mb-1 px-3 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-white/40">Pré-venda</span>}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="https://wa.me/5569992511509" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex-1"
            >
              <button className={`w-full px-8 py-5 rounded-2xl bg-gradient-to-r from-neon-purple to-electric-blue font-bold text-sm tracking-widest uppercase glow-button flex items-center justify-center gap-2`}>
                COMPRAR ESTE LIVRO
                <ArrowRight size={18} />
              </button>
            </a>
            {specs && (
              <button 
                onClick={() => setShowSpecs(!showSpecs)}
                className="px-6 py-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-widest font-bold"
              >
                <Info size={16} />
                Ficha Técnica
                <ChevronDown size={16} className={`transition-transform duration-300 ${showSpecs ? 'rotate-180' : ''}`} />
              </button>
            )}
          </div>
          
          <AnimatePresence>
            {showSpecs && specs && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <TechnicalSpecs specs={specs} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

const TikTokIcon = ({ size = 24 }: { size?: number }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const AuthorPage = () => (
  <div className="pt-32">
    <section className="py-20 px-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-neon-purple/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-electric-blue/10 blur-[120px] rounded-full" />
      
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative order-2 lg:order-1"
        >
          <div className="absolute -inset-6 bg-gradient-to-tr from-neon-purple to-electric-blue rounded-[3rem] blur-3xl opacity-10" />
          <img 
            src="https://picsum.photos/seed/marcos-soares/900/1200" 
            alt="Marcos Soares" 
            className="relative rounded-[2.5rem] grayscale hover:grayscale-0 transition-all duration-1000 border border-white/5 shadow-2xl"
            referrerPolicy="no-referrer"
          />
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-10 order-1 lg:order-2"
        >
          <div className="space-y-4">
            <h2 className="text-5xl sm:text-7xl md:text-8xl font-display font-bold leading-none break-words">Marcos <br /><span className="text-neon-purple italic">Soares</span></h2>
            <p className="text-lg md:text-xl text-electric-blue font-medium tracking-widest uppercase">Escritor & Poeta</p>
          </div>
          <div className="space-y-6 sm:space-y-8 text-white/70 leading-relaxed text-base sm:text-lg md:text-xl font-light break-words">
            <p>
              O filho mais novo de cinco irmãos, criado no interior de Rondônia, Marcos descobriu que escrever o fazia bem em muito segredo ainda na infância, logo após a primeira chama do amor surgir em sua vida.
            </p>
            <p>
              Apegado aos versos que se tornaram sua morada — e talvez sua doce prisão — ele hoje, aos 20 anos, expande seu universo literário através de novas paixões: a profundidade da filosofia e a imensidão da astronomia.
            </p>
            <p>
              Sua escrita é um reflexo de sua alma inquieta, buscando sempre traduzir o indizível em versos que tocam o coração de quem se permite sentir. Marcos acredita que a poesia não é apenas arte, mas uma forma de sobrevivência e conexão humana.
            </p>
            <div className="p-6 sm:p-8 rounded-3xl bg-white/5 border border-white/10 font-serif italic text-white text-xl sm:text-2xl relative">
              <Quote className="absolute -top-4 -left-4 text-neon-purple opacity-30" size={32} />
              "A poesia é o refúgio onde a alma se despe sem medo do frio."
            </div>
          </div>
          <div className="flex gap-6 pt-4">
            <a href="https://instagram.com/marcos.soareslp" target="_blank" rel="noopener noreferrer" className="p-4 rounded-2xl bg-white/5 hover:bg-neon-purple transition-all hover:-translate-y-1 flex items-center gap-2 group">
              <Instagram size={24} />
              <span className="text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">@marcos.soareslp</span>
            </a>
            <a href="https://tiktok.com/@marcosoaresl" target="_blank" rel="noopener noreferrer" className="p-4 rounded-2xl bg-white/5 hover:bg-neon-purple transition-all hover:-translate-y-1 flex items-center gap-2 group">
              <TikTokIcon size={24} />
              <span className="text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">@marcosoaresl</span>
            </a>
            <a href="mailto:contato@marcossoares.com" className="p-4 rounded-2xl bg-white/5 hover:bg-neon-purple transition-all hover:-translate-y-1">
              <Mail size={24} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  </div>
);

const HomePage = () => (
  <>
    {/* Hero Section */}
    <section className="relative min-h-screen flex items-center justify-center pt-20 px-6 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-neon-purple/20 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-electric-blue/20 blur-[120px] rounded-full animate-pulse delay-1000" />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-10"
        >
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-[11px] uppercase tracking-[0.25em] font-bold text-electric-blue">
            <Zap size={14} className="animate-pulse" /> Lançamento Exclusivo 2025
          </div>
          
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-7xl md:text-9xl font-display font-bold leading-[0.85] tracking-tighter glow-text break-words">
              Sinta cada <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-electric-blue">verso</span> escrito aqui.
            </h1>
            <p className="text-lg md:text-3xl font-serif italic text-white/40">
              Por Marcos Soares
            </p>
          </div>
          
          <p className="text-lg sm:text-xl text-white/60 max-w-xl leading-relaxed font-light break-words">
            O filho mais novo de cinco irmãos, criado no interior de Rondônia. Desde a infância, descobriu no segredo da escrita seu maior refúgio. Hoje, aos 20 anos, <span className="text-white font-medium">Marcos Soares</span> une a paixão pelos versos com a profundidade da filosofia e a imensidão da astronomia.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5">
            <a 
              href="https://wa.me/5569992511509" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex-1"
            >
              <button className="w-full px-12 py-6 rounded-2xl bg-white text-black font-bold text-xl hover:bg-neon-purple hover:text-white transition-all glow-button flex items-center justify-center gap-3 group">
                QUERO LER AGORA
                <ArrowRight className="group-hover:translate-x-2 transition-transform" />
              </button>
            </a>
            <div className="flex items-center gap-5 px-8 py-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <Coffee className="text-neon-purple" size={24} />
              <div className="text-xs">
                <p className="font-bold uppercase tracking-widest text-white/80">Ideal com um café</p>
                <p className="text-white/40">Leitura para a alma</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative"
        >
          <div className="relative z-10">
            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              <div className="absolute -inset-10 bg-neon-purple/20 blur-[100px] rounded-full opacity-50" />
              <img 
                src="https://picsum.photos/seed/poeta-capa/800/1100" 
                alt="Não sei se sou poeta - Capa" 
                className="rounded-3xl shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] border border-white/10 relative z-10"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-electric-blue rounded-full flex items-center justify-center font-display font-bold text-black text-center leading-tight p-4 rotate-12 shadow-2xl z-20">
                MAIS VENDIDO
              </div>
            </motion.div>
          </div>
          {/* Decorative ring */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] h-[130%] border border-white/5 rounded-full pointer-events-none animate-[spin_20s_linear_infinite]" />
        </motion.div>
      </div>
    </section>

    {/* Books Section */}
    <section id="livros" className="py-20 sm:py-32 px-6 relative">
      <div className="max-w-6xl mx-auto space-y-16 sm:space-y-24">
        <div className="text-center space-y-6">
          <h2 className="text-4xl sm:text-6xl font-display font-bold break-words">Obras em Destaque</h2>
          <p className="text-white/40 max-w-2xl mx-auto text-base sm:text-lg">Mergulhe em universos de emoções e reflexões profundas através das palavras de Marcos Soares.</p>
        </div>
        
        <div className="space-y-20">
          <BookCard 
            isMain
            title="Ainda não sei se sou poeta"
            description="Uma coletânea visceral que captura a essência do amor e o abismo do desconhecido. Um convite para desfrutar da leitura acompanhada de uma boa xícara de café."
            quotes={[
              "Palavras que confortam, refletem e imploram discretamente por auxílio.",
              "Uma obra que limpa a alma do autor e oferece luz ao leitor."
            ]}
            image="https://picsum.photos/seed/nao-sei-poeta/800/1000"
            color="neon-purple"
            price="39,90"
            oldPrice="57,88"
            discount="31%"
            specs={{
              "Editora": "FLYVE LTDA",
              "Publicação": "14 Fev 2025",
              "Páginas": "196",
              "ISBN-13": "978-6501068909",
              "Peso": "233g",
              "Dimensões": "15 x 23 x 6 cm"
            }}
          />

          <BookCard 
            title="Tudo o que eu escreveria se ainda te amasse"
            description="Um mergulho no que resta quando o amor se vai — ou quando descobrimos que ele nunca existiu. Uma jornada confessional entre a obsessão e a cura."
            quotes={[
              "Não é apenas sobre o amor que adoece, mas sobre o que cura.",
              "Transformando a ausência em poesia e o silêncio em recomeço."
            ]}
            image="https://picsum.photos/seed/ainda-te-amasse/800/1000"
            color="electric-blue"
            price="54,90"
            preSaleInfo="Este livro está em pré-venda, e será enviado somente após a finalização, com data prevista para: 25/04/2026"
            specs={{
              "Editora": "FLYVE",
              "Páginas": "118",
              "Papel": "Amarelado",
              "Formato": "14x21",
              "Peso": "139g",
              "Gênero": "Poesia"
            }}
          />
          
          <div className="grid md:grid-cols-1 gap-12">
            <div className="bg-gradient-to-br from-neon-purple/20 to-electric-blue/20 rounded-[2.5rem] p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 border border-white/10">
              <div className="space-y-4 text-center md:text-left">
                <h3 className="text-2xl sm:text-3xl font-display font-bold break-words">Por que ler Marcos Soares?</h3>
                <p className="text-white/50 text-sm sm:text-base break-words">A poesia que entende suas dores e celebra suas curas.</p>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 w-full max-w-2xl">
                {[
                  "Conexão emocional imediata.",
                  "Linguagem moderna e visceral.",
                  "Reflexões que transformam.",
                  "O presente perfeito para a alma."
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 sm:gap-4 items-center text-white/70">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                      <ChevronDown size={12} className="-rotate-90 text-electric-blue" />
                    </div>
                    <span className="text-base sm:text-lg break-words">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Experience Section */}
    <section className="py-20 sm:py-32 px-6 bg-deep-black relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {[
            { icon: <Heart className="text-neon-purple" />, title: "Paixão", desc: "A essência de alguém apaixonado em cada linha escrita." },
            { icon: <Coffee className="text-electric-blue" />, title: "Conforto", desc: "A companhia perfeita para uma tarde reflexiva com café." },
            { icon: <Zap className="text-neon-purple" />, title: "Luz", desc: "Palavras que oferecem clareza aos sentimentos desconhecidos." },
            { icon: <Quote className="text-electric-blue" />, title: "Auxílio", desc: "Um pedido discreto de ajuda que ressoa em quem lê." }
          ].map((item, i) => (
            <div key={i} className="futuristic-card p-6 sm:p-10 rounded-[2rem] space-y-6 border-t-2 border-t-white/5 group hover:border-t-neon-purple transition-all duration-500">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-white/5 flex items-center justify-center transition-transform group-hover:scale-110 group-hover:rotate-3">
                {item.icon}
              </div>
              <h3 className="text-xl sm:text-2xl font-display font-bold break-words">{item.title}</h3>
              <p className="text-white/50 leading-relaxed text-sm sm:text-base break-words">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Social Proof */}
    <section id="depoimentos" className="py-32 px-6 bg-gradient-to-b from-deep-black to-zinc-950">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20">
          <div className="space-y-4">
            <h2 className="text-5xl font-display font-bold">Vozes da <span className="text-electric-blue">Comunidade</span></h2>
            <p className="text-white/40 text-lg">O impacto real das palavras de Marcos Soares na vida dos leitores.</p>
          </div>
          <div className="flex items-center gap-4 px-6 py-3 rounded-full bg-white/5 border border-white/10">
            <div className="flex text-yellow-500">
              {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="currentColor" />)}
            </div>
            <span className="font-bold text-sm">4.9/5 de Avaliação Média</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {[
            { name: "Ana Silva", text: "Ler 'Não sei se sou poeta' foi como ter uma conversa sincera comigo mesma. Marcos tem o dom de tocar na ferida e curar ao mesmo tempo.", rating: 5 },
            { name: "Lucas Rocha", text: "Acompanhei a leitura com um café expresso e foi a melhor decisão. Cada verso pede uma pausa para respirar e sentir.", rating: 5 },
            { name: "Carla Mendes", text: "Impactante. As poesias limpam a alma de um jeito que eu não esperava. Recomendo a todos que buscam luz.", rating: 5 }
          ].map((test, i) => (
            <div key={i} className="p-6 sm:p-10 rounded-[2.5rem] bg-white/5 border border-white/10 relative group hover:bg-white/[0.08] transition-all">
              <Quote className="absolute top-8 right-10 text-white/5 group-hover:text-neon-purple/20 transition-colors" size={60} />
              <div className="flex text-yellow-500 mb-6">
                {[...Array(test.rating)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
              </div>
              <p className="text-white/80 italic mb-8 leading-relaxed text-base sm:text-lg break-words">"{test.text}"</p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-neon-purple to-electric-blue" />
                <p className="font-bold text-xs sm:text-sm uppercase tracking-widest break-words">— {test.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Special Offer */}
    <section id="oferta" className="py-20 sm:py-32 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-neon-purple/5 blur-[150px]" />
      <div className="max-w-5xl mx-auto futuristic-card rounded-[3rem] p-8 sm:p-12 md:p-24 text-center space-y-12 relative z-10 border-2 border-neon-purple/10">
        <div className="space-y-6">
          <span className="px-6 py-2 rounded-full bg-neon-purple/10 text-neon-purple text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] border border-neon-purple/20">Oferta de Lançamento</span>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-display font-bold leading-tight break-words">Comece sua jornada <br />hoje mesmo.</h2>
          <p className="text-lg sm:text-xl text-white/50 max-w-2xl mx-auto">Adquira "Ainda não sei se sou poeta" e receba um guia digital de reflexão poética como bônus.</p>
        </div>
        
        <div className="flex flex-col items-center gap-10">
          <Countdown />
          <div className="space-y-3">
            <p className="text-white/30 line-through text-xl sm:text-2xl tracking-widest">R$ 57,88</p>
            <p className="text-6xl sm:text-7xl md:text-8xl font-display font-bold text-white glow-text">R$ 39,90</p>
            <p className="text-electric-blue text-[10px] sm:text-sm font-bold uppercase tracking-widest">Disponível via WhatsApp</p>
          </div>
          <a 
            href="https://wa.me/5569992511509" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full md:w-auto"
          >
            <button className="w-full px-10 sm:px-16 py-6 sm:py-8 rounded-2xl bg-white text-black font-bold text-xl sm:text-2xl glow-button hover:bg-neon-purple hover:text-white transition-all uppercase tracking-tighter">
              GARANTIR MEU EXEMPLAR
            </button>
          </a>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 pt-12 border-t border-white/5">
          {[
            { icon: <ShieldCheck size={20} />, label: "Compra Segura" },
            { icon: <CreditCard size={20} />, label: "Até 10x" },
            { icon: <Clock size={20} />, label: "Envio em 24h" },
            { icon: <Coffee size={20} />, label: "Bônus Digital" }
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center gap-2 opacity-40 hover:opacity-100 transition-opacity">
              <div className="text-electric-blue">{item.icon}</div>
              <span className="text-[8px] sm:text-[10px] uppercase tracking-[0.1em] sm:tracking-[0.2em] font-bold text-center">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Final CTA */}
    <section className="py-32 sm:py-48 px-6 relative text-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-neon-purple/30 to-transparent" />
      <div className="max-w-5xl mx-auto relative z-10 space-y-16">
        <h2 className="text-5xl sm:text-7xl md:text-9xl font-display font-bold leading-[0.85] tracking-tighter break-words">
          Alguns livros você lê. <br />
          <span className="italic text-white/20">Outros mudam você.</span>
        </h2>
        <div className="flex flex-col items-center gap-8">
          <a 
            href="https://wa.me/5569992511509" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full sm:w-auto"
          >
            <button className="w-full px-10 sm:px-20 py-8 sm:py-10 rounded-full bg-gradient-to-r from-neon-purple to-electric-blue font-bold text-xl sm:text-3xl tracking-tighter glow-button uppercase group">
              <span className="flex items-center justify-center gap-4">
                SENTIR CADA VERSO AGORA
                <ArrowRight size={24} className="group-hover:translate-x-4 transition-transform hidden sm:block" />
              </span>
            </button>
          </a>
          <p className="text-white/30 text-[10px] sm:text-sm font-medium tracking-widest uppercase">Garantia de satisfação total ou seu investimento de volta.</p>
        </div>
      </div>
    </section>
  </>
);

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    } else {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [pathname, hash]);

  return null;
};

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen font-sans overflow-x-hidden selection:bg-neon-purple selection:text-white">
        <Navbar />
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/autor" element={<AuthorPage />} />
        </Routes>

        {/* Footer */}
        <footer className="py-16 px-6 border-t border-white/5 bg-deep-black relative z-10">
          <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12 items-center">
            <div className="flex flex-col items-center md:items-start gap-4">
              <Logo />
              <p className="text-white/30 text-xs text-center md:text-left leading-relaxed pl-1">
                Sinta cada verso escrito aqui. <br />
                Uma jornada poética pela alma humana.
              </p>
            </div>
            
            <div className="flex justify-center gap-8 text-white/40 text-xs font-bold uppercase tracking-widest">
              <Link to="/" className="hover:text-white transition-colors">Início</Link>
              <Link to="/autor" className="hover:text-white transition-colors">O Autor</Link>
              <a href="mailto:contato@marcossoares.com" className="hover:text-white transition-colors">Contato</a>
            </div>
            
            <div className="flex justify-center md:justify-end gap-6">
              <a href="https://instagram.com/marcos.soareslp" target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl bg-white/5 hover:bg-neon-purple transition-all"><Instagram size={18} /></a>
              <a href="https://tiktok.com/@marcosoaresl" target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl bg-white/5 hover:bg-neon-purple transition-all"><TikTokIcon size={18} /></a>
              <a href="mailto:contato@marcossoares.com" className="p-3 rounded-xl bg-white/5 hover:bg-neon-purple transition-all"><Mail size={18} /></a>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/5 text-center text-[10px] text-white/20 uppercase tracking-[0.3em]">
            © 2026 Marcos Soares. Todos os direitos reservados.
          </div>
        </footer>
      </div>
    </Router>
  );
}
