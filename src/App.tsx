import React from 'react';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  Link, 
  useLocation 
} from 'react-router-dom';
import { 
  MessageCircle, 
  Menu, 
  X, 
  CheckCircle2, 
  Activity, 
  Wind, 
  Droplets, 
  Footprints, 
  Sparkles, 
  Flower2,
  Instagram,
  Facebook,
  MapPin,
  Clock,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SITE_CONFIG, TREATMENTS, TESTIMONIALS, FAQS } from './constants';

// --- Components ---

const BeforeAfterSlider = ({ before, after, label }: { before: string, after: string, label: string }) => {
  const [sliderPos, setSliderPos] = React.useState(50);
  const [isResizing, setIsResizing] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isResizing || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const position = ((x - rect.left) / rect.width) * 100;
    
    if (position >= 0 && position <= 100) {
      setSliderPos(position);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div 
        ref={containerRef}
        className="relative w-full aspect-square rounded-2xl overflow-hidden cursor-col-resize select-none shadow-xl border border-earth-100"
        onMouseMove={handleMove}
        onTouchMove={handleMove}
        onMouseDown={() => setIsResizing(true)}
        onTouchStart={() => setIsResizing(true)}
        onMouseUp={() => setIsResizing(false)}
        onTouchEnd={() => setIsResizing(false)}
        onMouseLeave={() => setIsResizing(false)}
      >
        {/* After Image */}
        <img 
          src={after} 
          alt="Depois" 
          className="absolute inset-0 w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        
        {/* Before Image (Clipped) */}
        <div 
          className="absolute inset-0 w-full h-full overflow-hidden"
          style={{ width: `${sliderPos}%` }}
        >
          <img 
            src={before} 
            alt="Antes" 
            className="absolute inset-0 w-full h-full object-cover"
            style={{ width: `${100 / (sliderPos / 100)}%` }}
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Slider Line */}
        <div 
          className="absolute top-0 bottom-0 w-1 bg-white shadow-lg z-20"
          style={{ left: `${sliderPos}%`, transform: 'translateX(-50%)' }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-xl flex items-center justify-center">
            <div className="flex gap-1">
              <div className="w-0.5 h-3 bg-sage-400 rounded-full"></div>
              <div className="w-0.5 h-3 bg-sage-400 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Labels */}
        <div className="absolute top-4 left-4 z-10 bg-black/30 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded">
          Antes
        </div>
        <div className="absolute top-4 right-4 z-10 bg-black/30 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded">
          Depois
        </div>
      </div>
      <div className="text-center">
        <h4 className="font-serif text-lg text-sage-800">{label}</h4>
        <p className="text-[10px] uppercase tracking-widest text-earth-500 mt-1">Arraste para comparar</p>
      </div>
    </div>
  );
};

const FloatingWhatsApp = () => (
  <a 
    href={`https://wa.me/${SITE_CONFIG.whatsapp}`}
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-6 right-6 z-[60] bg-[#25D366] hover:bg-gold-soft text-white hover:text-sage-900 p-3.5 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 flex items-center justify-center group animate-pulse-gold"
    aria-label="Contato via WhatsApp"
  >
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-8 h-8 fill-current animate-blink">
      <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-5.5-2.8-23.2-8.5-44.2-27.1-16.4-14.6-27.4-32.7-30.6-38.2-3.2-5.6-.3-8.6 2.5-11.3 2.5-2.5 5.5-6.5 8.3-9.7 2.8-3.3 3.7-5.6 5.5-9.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 13.3 5.7 23.7 9.2 31.7 11.7 13.3 4.2 25.4 3.6 35 2.2 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
    </svg>
    {/* Notification Badge */}
    <div className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-lg">
      1
    </div>
    <span className="absolute right-full mr-4 bg-white text-sage-800 px-4 py-2 rounded-lg text-sm font-medium shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-earth-100">
      Fale com Roseli
    </span>
  </a>
);

const WhatsAppButton = ({ className = "", label = "Agendar atendimento pelo WhatsApp", message = "" }: { className?: string, label?: string, message?: string }) => {
  const encodedMessage = message ? `?text=${encodeURIComponent(message)}` : "";
  return (
    <a 
      href={`https://wa.me/${SITE_CONFIG.whatsapp}${encodedMessage}`}
      target="_blank"
      rel="noopener noreferrer"
      className={`btn-primary px-6 py-4 sm:px-10 sm:py-5 text-sm sm:text-lg animate-pulse-gold ${className}`}
    >
      <MessageCircle size={20} className="animate-blink sm:w-6 sm:h-6" />
      <span className="text-center">{label}</span>
    </a>
  );
};

const BackToTop = () => {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const toggleVisible = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    window.addEventListener('scroll', toggleVisible);
    return () => window.removeEventListener('scroll', toggleVisible);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button 
      onClick={scrollToTop}
      className={`back-to-top flex items-center gap-2 p-3 md:px-5 md:py-3 rounded-full ${visible ? 'visible' : ''}`}
      aria-label="Voltar ao topo"
    >
      <span className="hidden md:inline text-xs font-bold uppercase tracking-widest">Voltar ao topo</span>
      <ArrowRight size={20} className="-rotate-90" />
    </button>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isServicesOpen, setIsServicesOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const location = useLocation();

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Sobre mim', path: '/sobre' },
    { name: 'Nosso Espaço', path: '/nosso-espaco' },
    { 
      name: 'Serviços', 
      path: '#',
      sublinks: [
        { name: 'Lifting Facial Manual', path: '/servicos/lifting-facial' },
        { name: 'Drenagem Linfática', path: '/servicos/drenagem-linfatica' },
        { name: 'Reflexologia Podal', path: '/servicos/reflexologia-podal' },
        { name: 'Massagem Relaxante', path: '/servicos/massagem-relaxante' },
        { name: 'Quick Massage', path: '/servicos/quick-massage' },
        { name: 'Terapias Integrativas', path: '/servicos/terapias-integrativas' },
      ]
    },
    { name: 'Resultados', path: '/resultados' },
    { name: 'Produtos doTerra', path: '/produtos-doterra' },
    { name: 'Agendar', path: '/agendamento' },
    { name: 'Contato', path: '/contato' },
  ];

  const isHome = location.pathname === '/';

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled || !isHome ? 'bg-earth-50/90 backdrop-blur-md border-b border-earth-200 py-4' : 'bg-transparent py-8'
    }`}>
      <div className="max-w-[90%] md:max-w-[80%] mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center shrink-0 mr-4 md:mr-12">
          <img 
            src="https://res.cloudinary.com/dq1vvtg9v/image/upload/v1773591696/ROSELI_-_LOGOTIPO_ANSHIN_yeqvpy.png" 
            alt={SITE_CONFIG.name}
            className={`h-20 sm:h-28 md:h-36 w-auto transition-all duration-300 ${
              isScrolled || !isHome ? '' : 'brightness-0 invert'
            }`}
            referrerPolicy="no-referrer"
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center justify-between flex-grow gap-10">
          <div className="flex items-center gap-10">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group whitespace-nowrap">
                {link.sublinks ? (
                  <div 
                    className={`flex items-center gap-1 cursor-pointer text-lg font-medium transition-colors py-2 ${
                      isScrolled || !isHome ? 'text-earth-800 hover:text-sage-600' : 'text-white hover:text-white/70'
                    }`}
                    onMouseEnter={() => setIsServicesOpen(true)}
                    onMouseLeave={() => setIsServicesOpen(false)}
                  >
                    {link.name}
                    <ChevronRight size={16} className="rotate-90" />
                    
                    <AnimatePresence>
                      {isServicesOpen && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute top-full left-0 bg-white shadow-xl border border-earth-100 rounded-xl py-4 min-w-[220px]"
                        >
                          {link.sublinks.map((sub) => (
                            <Link 
                              key={sub.path}
                              to={sub.path}
                              className="block px-6 py-2 text-base text-earth-800 hover:bg-gold-satin hover:text-sage-900 transition-colors"
                            >
                              {sub.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link 
                    to={link.path}
                    className={`text-lg font-medium transition-colors ${
                      isScrolled || !isHome 
                        ? (location.pathname === link.path ? 'text-sage-600 underline underline-offset-8' : 'text-earth-800 hover:text-sage-600')
                        : (location.pathname === link.path ? 'text-white underline underline-offset-8' : 'text-white hover:text-white/70')
                    }`}
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Toggle */}
        <button className={`lg:hidden transition-colors ${isScrolled || !isHome ? 'text-sage-800' : 'text-white'}`} onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden absolute top-full left-0 right-0 bg-earth-50 border-b border-earth-200 p-6 flex flex-col gap-4 shadow-xl max-h-[80vh] overflow-y-auto"
          >
            {navLinks.map((link) => (
              <div key={link.name}>
                {link.sublinks ? (
                  <div className="flex flex-col gap-2">
                    <button 
                      onClick={() => setIsServicesOpen(!isServicesOpen)}
                      className="text-xl font-serif py-2 border-b border-earth-100 flex items-center justify-between w-full text-sage-800"
                    >
                      {link.name}
                      <ChevronRight size={24} className={isServicesOpen ? 'rotate-90' : ''} />
                    </button>
                    {isServicesOpen && (
                      <div className="pl-4 flex flex-col gap-2">
                        {link.sublinks.map((sub) => (
                          <Link 
                            key={sub.path}
                            to={sub.path}
                            onClick={() => setIsOpen(false)}
                            className="text-lg py-2 text-earth-800 hover:bg-gold-satin hover:text-sage-900 px-4 rounded-lg transition-colors border-b border-earth-50"
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link 
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className="text-xl font-serif py-2 border-b border-earth-100 block text-sage-800"
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const MapSection = () => (
  <section className="py-20 bg-white">
    <div className="max-w-[95%] md:max-w-[80%] mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-serif text-sage-800 font-bold">Nossa Localização</h2>
        <p className="text-earth-800/60 mt-4">{SITE_CONFIG.address}</p>
      </div>
      <div className="w-full h-[300px] md:h-[450px] rounded-[40px] overflow-hidden shadow-2xl border border-earth-100">
        <iframe 
          src="https://maps.google.com/maps?q=R.%20Dourados,%20309%20-%20Pouso%20Alegre,%20Ribeir%C3%A3o%20Pires%20-%20SP,%2009440-120&t=&z=15&ie=UTF8&iwloc=&output=embed" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title="Localização Roseli Martiñs"
        ></iframe>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-sage-800 text-sage-50 pt-20 pb-10 px-6">
    <div className="max-w-[95%] md:max-w-[80%] mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-sage-600 pb-12">
      <div className="flex flex-col sm:flex-row items-center md:items-start gap-6 md:col-span-1">
        <img 
          src="https://res.cloudinary.com/dq1vvtg9v/image/upload/v1773591696/ROSELI_-_LOGOTIPO_ANSHIN_yeqvpy.png" 
          alt={SITE_CONFIG.name}
          className="h-32 md:h-40 w-auto brightness-0 invert"
          referrerPolicy="no-referrer"
        />
        <div className="flex flex-col gap-4 text-center md:text-left">
          <h3 className="font-serif text-2xl font-bold">{SITE_CONFIG.brand}</h3>
          <p className="text-sage-200 text-sm max-w-xs">
            Massoterapia terapêutica e terapias integrativas exclusivas para o cuidado e bem-estar da mulher.
          </p>
          <p className="brand-phrase text-sage-100 mt-2 font-bold">"{SITE_CONFIG.brandPhrase}"</p>
        </div>
      </div>
      
      <div className="flex flex-col gap-4">
        <h4 className="font-serif text-xl font-bold">Contato</h4>
        <div className="flex flex-col gap-3 text-sm text-sage-200">
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-sage-200" />
            <span>{SITE_CONFIG.city} / Região</span>
          </div>
          <a 
            href={`https://wa.me/${SITE_CONFIG.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-white transition-colors"
          >
            <MessageCircle size={16} className="text-sage-200" />
            <span>WhatsApp: {SITE_CONFIG.whatsapp}</span>
          </a>
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-sage-200" />
            <span>{SITE_CONFIG.hours}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h4 className="font-serif text-xl font-bold">Links Úteis</h4>
        <div className="grid grid-cols-2 gap-2 text-sm text-sage-200">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <Link to="/metodo-anshin" className="hover:text-white transition-colors">Método Anshin</Link>
          <Link to="/massoterapia" className="hover:text-white transition-colors">Massoterapia</Link>
          <Link to="/servicos/drenagem-linfatica" className="hover:text-white transition-colors">Drenagem</Link>
          <Link to="/servicos/quick-massage" className="hover:text-white transition-colors">Quick Massage</Link>
          <Link to="/sobre" className="hover:text-white transition-colors">Sobre Roseli</Link>
          <Link to="/contato" className="hover:text-white transition-colors">Agendamento</Link>
        </div>
      </div>
    </div>

    <div className="max-w-[95%] md:max-w-[80%] mx-auto mt-10 flex flex-col items-center gap-8">
      {/* Social Icons - Centered and Harmonious */}
      <div className="flex items-center gap-8">
        <a 
          href={SITE_CONFIG.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white/10 p-3 rounded-full hover:bg-white/20 transition-all hover:scale-110 text-sage-200 hover:text-white"
          aria-label="Instagram"
        >
          <Instagram size={24} />
        </a>
        <a 
          href={SITE_CONFIG.facebookUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white/10 p-3 rounded-full hover:bg-white/20 transition-all hover:scale-110 text-sage-200 hover:text-white"
          aria-label="Facebook"
        >
          <Facebook size={24} />
        </a>
      </div>

      <div className="text-center flex flex-col gap-4">
        <p className="text-sm font-medium text-sage-200">{SITE_CONFIG.footerSecurity}</p>
        <div className="text-[10px] uppercase tracking-widest text-sage-400">
          © {new Date().getFullYear()} {SITE_CONFIG.name} - Todos os direitos reservados.
        </div>
      </div>
    </div>
  </footer>
);

// --- Pages ---

const Home = () => {
  const iconMap: Record<string, any> = {
    Activity, Wind, Droplets, Footprints, Sparkles, Flower2, Clock
  };

  return (
    <div className="">
      {/* Hero Section - Full Width & Height, Centralized */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-20">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=2000" 
            alt="Ambiente relaxante de massoterapia" 
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
          {/* Subtle Overlay for High Contrast */}
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        <div className="section-padding relative z-10 w-full text-center pt-24 md:pt-32">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center gap-6 md:gap-8 max-w-[90%] mx-auto"
          >
            <div className="flex flex-wrap items-center justify-center gap-4 mb-4">
              {['Atendimento exclusivo para mulheres', 'Técnicas terapêuticas integrativas', 'Cuidados físico e emocional'].map((tag) => (
                <span key={tag} className="bg-white/10 backdrop-blur-md text-white text-[10px] sm:text-[12px] font-bold uppercase tracking-wider px-5 py-2 rounded-full flex items-center gap-2 border border-white/20 w-fit">
                  <CheckCircle2 size={14} /> {tag}
                </span>
              ))}
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-[64px] lg:text-[80px] leading-[1.1] text-white font-serif font-bold w-full max-w-none px-4 text-center">
              Roseli Martiñs | Massoterapia, <br />
              Drenagem Linfática, Reflexoterapia Podal, <br />
              Aromaterapia em Ribeirão Pires-SP. <br />
              <span className="animate-pulsar inline-block">Exclusivo para Mulheres</span>
            </h1>
            <p className="text-base sm:text-lg md:text-[25px] text-white/90 max-w-4xl font-light px-4 leading-relaxed">
              Recupere sua leveza através de protocolos manuais integrativos em um ambiente acolhedor, desenhado exclusivamente para o cuidado e o equilíbrio do corpo feminino.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4 w-full sm:w-auto px-6 sm:px-0">
              <WhatsAppButton label="Agendar atendimento pelo WhatsApp" className="bg-white text-sage-800 hover:bg-white/90 px-8 py-4 text-sm sm:text-base font-bold tracking-widest w-full sm:w-auto" />
              <Link to="/sobre" className="bg-transparent border border-white text-white hover:bg-white/10 px-8 py-4 text-sm sm:text-base font-bold tracking-widest transition-colors rounded-full uppercase w-full sm:w-auto">
                Conheça o Espaço
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Marquee Section */}
      <div className="bg-sage-800 py-6 overflow-hidden border-y border-white/10">
        <div className="animate-marquee whitespace-nowrap flex items-center">
          {[1, 2, 3, 4].map((i) => (
            <span key={i} className="text-white text-2xl md:text-4xl font-serif italic px-4">
              Entre um toque e outro… o bem-estar acontece. //&nbsp;
            </span>
          ))}
        </div>
      </div>

      <div className="content-below-hero">
        {/* About Section - Redesigned */}
        <section className="section-padding max-w-[95%] md:max-w-[80%] mx-auto flex flex-col lg:flex-row gap-12 md:gap-16 items-stretch lg:mt-32">
          <div className="flex-1 flex flex-col gap-6 justify-center py-4">
            <h2 className="text-2xl md:text-4xl text-sage-800 font-bold">Sobre a Roseli Martiñs</h2>
            <div className="flex flex-col gap-4 text-sm md:text-base">
              <p>
                Sou Roseli Martiñs, massoterapeuta e proprietária do Espaço ANSHIN Massoterapia. Com uma trajetória dedicada ao bem-estar feminino, trago autoridade e um olhar sensível para cada protocolo realizado. Atendo exclusivamente mulheres que buscam aliviar dores, reduzir o estresse, a ansiedade e cuidar melhor do próprio corpo.
              </p>
              <p>
                Meu atendimento é integrativo e utiliza técnicas especializadas como <strong>Massoterapia, Drenagem Linfática, Reflexoterapia Podal e Aromaterapia</strong>. Tudo começa pela escuta atenta, para entender seu momento e suas necessidades únicas. A partir disso, planejo um cuidado personalizado, desenhado para oferecer o máximo de alívio, equilíbrio e renovação.
              </p>
              <p>
                Meu objetivo é ajudar cada mulher a se reconectar com o próprio corpo, garantindo que você esteja em mãos seguras e experientes para conquistar mais leveza no seu dia a dia.
              </p>
            </div>
            
            <p className="font-serif text-lg italic text-sage-600">
              "Meu propósito é oferecer um refúgio de cuidado onde cada toque promove uma transformação real."
            </p>
            <Link to="/sobre" className="btn-primary w-fit">Conhecer mais</Link>
          </div>
          <div className="flex-1 flex items-center justify-center lg:justify-end">
            <img 
              src="https://res.cloudinary.com/dq1vvtg9v/image/upload/v1773590868/roseli_martins_massoterapia_em_ribeirao_pires_perto_de_mim53_c30i2s.jpg" 
              alt="Roseli Martiñs" 
              className="max-h-full w-auto object-contain rounded-3xl shadow-2xl"
              referrerPolicy="no-referrer"
            />
          </div>
        </section>

        {/* Pain Section - Redesigned Circular Layout */}
        <section className="bg-[#F8F9F7] py-32 px-6 overflow-hidden">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto flex flex-col gap-20"
          >
            <div className="text-center flex flex-col gap-6">
              <h2 className="text-4xl md:text-6xl text-sage-900 font-bold leading-[1.1] max-w-4xl mx-auto">
                Seu corpo anda pedindo mais atenção?
              </h2>
              <p className="text-3xl md:text-[40px] font-serif italic text-sage-700 font-bold leading-tight">
                Quando foi a última vez que você se sentiu leve e sem dor no corpo?
              </p>
            </div>

            <div className="relative h-[700px] md:h-[700px] flex items-center justify-center">
              {/* Central Circle */}
              <div className="relative z-20 w-24 h-24 sm:w-32 sm:h-32 md:w-64 md:h-64 rounded-full bg-white shadow-2xl border-4 md:border-8 border-sage-100 flex items-center justify-center overflow-hidden group">
                <img 
                  src="https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&q=80&w=500" 
                  alt="Cuidado Feminino" 
                  className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-sage-800/20 flex items-center justify-center">
                  <Flower2 size={32} className="text-white drop-shadow-lg md:hidden" />
                  <Flower2 size={48} className="text-white drop-shadow-lg hidden md:block" />
                </div>
              </div>

              {/* Symptoms - Floating Points */}
              <div className="absolute inset-0 z-10">
                {[
                  { text: 'Dores nas costas e tensão muscular', icon: Activity, pos: 'top-[5%] left-[50%] -translate-x-1/2 md:top-[5%]' },
                  { text: 'Cansaço constante e falta de energia', icon: Wind, pos: 'top-[20%] right-[5%] md:right-[15%] md:top-[20%]' },
                  { text: 'Retenção de líquidos e inchaço', icon: Droplets, pos: 'bottom-[20%] right-[5%] md:right-[15%] md:bottom-[20%]' },
                  { text: 'Ansiedade e dificuldade para relaxar', icon: Flower2, pos: 'bottom-[5%] left-[50%] -translate-x-1/2 md:bottom-[5%]' },
                  { text: 'Sensação de corpo pesado e fadigado', icon: Activity, pos: 'bottom-[20%] left-[5%] md:left-[15%] md:bottom-[20%]' },
                  { text: 'Aparência cansada e sem viço no rosto', icon: Sparkles, pos: 'top-[20%] left-[5%] md:left-[15%] md:top-[20%]' },
                ].map((item, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    className={`absolute ${item.pos} flex flex-col items-center gap-2 md:gap-3 max-w-[120px] md:max-w-[180px] text-center`}
                  >
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gold-soft text-sage-900 flex items-center justify-center shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),0_4px_8px_rgba(0,0,0,0.15)] border border-gold-soft/20">
                      <item.icon size={18} className="md:w-5 md:h-5" />
                    </div>
                    <span className="text-xs md:text-base font-medium text-sage-800 leading-tight">
                      {item.text}
                    </span>
                    {/* Subtle connecting line (visual only) */}
                    <div className="hidden md:block absolute top-1/2 left-1/2 -z-10 w-32 h-px border-t border-dashed border-sage-300 origin-left rotate-45 opacity-40"></div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Closing Block (CTA) */}
          </motion.div>
        </section>

        <section className="py-32 px-6 bg-white">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="max-w-[80%] mx-auto bg-sage-800 text-white p-12 md:p-16 rounded-[40px] shadow-2xl text-center flex flex-col items-center gap-8 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
              <Flower2 size={400} className="absolute -bottom-20 -right-20" />
            </div>
            <h3 className="text-2xl md:text-4xl font-serif italic relative z-10 font-bold w-full">
              "Aqui você encontra Muito mais que uma massagem, é um lugar para você se sentir em casa dentro de si mesma."
            </h3>
            <p className="text-lg md:text-xl text-white/90 relative z-10 w-full font-light leading-relaxed">
              Entendo que seu corpo carrega muito mais do que tensões físicas; ele guarda sua rotina, sua história e suas emoções. Por isso, no meu espaço, o cuidado é verdadeiramente integrativo. Antes de qualquer toque, dedico meu tempo para entender você. Através do Método Anshin, traduzo o que seu corpo fala em um protocolo exclusivo e personalizado, desenhado para acolher suas necessidades únicas e transformar cada ponto de estresse em uma profunda e duradoura sensação de leveza e equilíbrio. Você não sai apenas com uma sessão feita, sai entendendo melhor a si mesma.
            </p>
            <WhatsAppButton 
              label="AGENDAR SESSÃO" 
              className="bg-white text-sage-800 hover:bg-sage-50 px-12 py-5 text-base font-bold tracking-[0.2em] relative z-10" 
            />
          </motion.div>
        </section>

        {/* Anshin Method */}
        <section className="section-padding max-w-[95%] md:max-w-[80%] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <div className="aspect-square rounded-3xl overflow-hidden shadow-xl">
               <img 
                src="https://res.cloudinary.com/dq1vvtg9v/image/upload/v1773591427/IMG_3620_1_a1kzuf.jpg" 
                alt="Cuidado terapêutico" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6 order-1 lg:order-2"
          >
            <h2 className="text-2xl md:text-4xl text-sage-800 font-bold">Método Anshin — um cuidado pensado para o momento do seu corpo</h2>
            <p className="text-sm md:text-base">
              Cada corpo tem uma história. Por isso, cada atendimento também precisa ser único. O Método Anshin é a forma como Roseli conduz cada sessão, combinando escuta, observação do corpo e técnicas terapêuticas para oferecer um cuidado realmente personalizado.
            </p>
            <div className="flex flex-col gap-4">
              {[
                'Avaliação do momento físico e emocional',
                'Escolha das técnicas mais adequadas',
                'Abordagem integrativa do corpo',
                'Acompanhamento do processo de equilíbrio'
              ].map((check, i) => (
                <motion.div 
                  key={check} 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2 size={20} className="text-sage-600" />
                  <span className="font-medium">{check}</span>
                </motion.div>
              ))}
            </div>
            <p className="italic text-sage-600">
              A massoterapia vai além do relaxamento. Ela ajuda a aliviar dores, melhorar a circulação e restaurar sua energia.
            </p>
            <Link to="/metodo-anshin" className="text-sage-800 font-bold flex items-center gap-2 hover:gap-4 transition-all">
              Saiba mais sobre o método <ArrowRight size={18} />
            </Link>
          </motion.div>
        </section>

        {/* Treatments Grid */}
        <section id="tratamentos" className="bg-earth-100 py-24 px-6">
          <div className="max-w-[95%] md:max-w-[80%] mx-auto">
            <div className="text-center mb-16 flex flex-col gap-4">
              <h2 className="text-2xl md:text-4xl text-sage-800 font-bold">Tratamentos terapêuticos para cuidar do seu corpo</h2>
              <p className="text-earth-800/70 max-w-2xl mx-auto text-sm md:text-base">Cada atendimento pode integrar diferentes técnicas terapêuticas para recuperar o equilíbrio natural do seu organismo.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {TREATMENTS.map((treatment, i) => {
                const Icon = iconMap[treatment.icon];
                return (
                  <motion.div 
                    key={treatment.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ y: -10 }}
                    className="bg-white p-8 rounded-3xl shadow-sm border border-earth-200 flex flex-col gap-4 card-hover group"
                  >
                    <div className="w-12 h-12 bg-gold-soft text-sage-900 rounded-full flex items-center justify-center shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),0_4px_8px_rgba(0,0,0,0.15)] border border-gold-soft/20 group-hover:scale-110 transition-transform duration-300">
                      <Icon size={24} />
                    </div>
                    <h3 className="text-xl font-serif text-sage-800 font-bold uppercase">{treatment.title}</h3>
                    <p className="text-sm text-earth-800/70 leading-relaxed">{treatment.description}</p>
                    <Link to={treatment.path} className="mt-auto text-sage-600 text-xs font-bold uppercase tracking-wider flex items-center gap-1 hover:gap-2 transition-all">
                      {treatment.id === 'quick-massage' ? 'Pacotes para Empresas' : 'Ver detalhes'} <ChevronRight size={14} />
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="section-padding max-w-[95%] md:max-w-[80%] mx-auto text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-4xl text-sage-800 font-bold mb-12"
          >
            O que muitas mulheres percebem após os atendimentos
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-6 md:gap-8">
            {[
              { label: 'Redução de dores', icon: Activity },
              { label: 'Melhora do sono', icon: Wind },
              { label: 'Menos inchaço', icon: Droplets },
              { label: 'Melhor circulação', icon: Activity },
              { label: 'Relaxamento', icon: Flower2 },
              { label: 'Autoestima renovada', icon: Sparkles },
              { label: 'Leveza no corpo', icon: Sparkles },
            ].map((benefit, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center gap-4 group"
              >
                <motion.div 
                  whileHover={{ y: -10, scale: 1.1 }}
                  className="w-16 h-16 rounded-full bg-gold-soft text-sage-900 flex items-center justify-center shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),0_4px_8px_rgba(0,0,0,0.15)] border border-gold-soft/20 transition-all duration-300 group-hover:bg-sage-800 group-hover:text-gold-soft"
                >
                  <benefit.icon size={28} />
                </motion.div>
                <span className="text-sm font-medium group-hover:text-sage-800 transition-colors">{benefit.label}</span>
              </motion.div>
            ))}
          </div>
        </section>



        {/* Testimonials */}
        <section className="bg-sage-800 text-white py-24 px-6 overflow-hidden relative">
          <div className="absolute top-0 right-0 p-20 opacity-10">
            <Flower2 size={300} />
          </div>
          <div className="max-w-[95%] md:max-w-[80%] mx-auto relative z-10">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-16 text-center">O que dizem as mulheres que já passaram por aqui</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {TESTIMONIALS.map((t, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm p-8 rounded-3xl border border-white/10 flex flex-col gap-4 card-hover"
                >
                  <p className="italic text-lg">"{t.text}"</p>
                  <span className="text-xs font-bold uppercase tracking-widest text-sage-200">— {t.author}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-white py-24 px-6">
          <div className="max-w-[80%] mx-auto">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl text-sage-800 font-bold mb-12 text-center"
            >
              Perguntas Frequentes
            </motion.h2>
            <div className="flex flex-col gap-4">
              {FAQS.map((faq, i) => (
                <motion.details 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group bg-white rounded-2xl border border-earth-100 overflow-hidden shadow-sm"
                >
                  <summary className="font-serif text-lg text-white bg-sage-800 p-6 flex items-center justify-between list-none cursor-pointer hover:bg-sage-900 transition-colors">
                    {faq.question}
                    <ChevronRight size={20} className="group-open:rotate-90 transition-transform" />
                  </summary>
                  <div className="p-6 bg-earth-50">
                    <p className="text-earth-800/70 text-sm leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </motion.details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Final - Redesigned Modern Gold Banner */}
        <section className="relative py-32 px-6 overflow-hidden bg-earth-50">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold-soft/10 via-transparent to-transparent"></div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center gap-8"
          >
            <div className="bg-white p-12 md:p-20 rounded-[60px] border border-gold-soft/30 shadow-2xl relative overflow-hidden group">
              {/* Subtle gold glow inside the box */}
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-gold-soft/10 rounded-full blur-3xl group-hover:bg-gold-soft/20 transition-colors duration-700"></div>
              
              <div className="relative z-10">
                <h2 className="text-2xl md:text-7xl text-sage-900 font-bold leading-tight mb-6">
                  Seu corpo não pede perfeição. <br className="hidden md:block" />
                  <span className="text-sage-800 italic">Ele pede cuidado.</span>
                </h2>
                <p className="text-base md:text-2xl text-sage-900/80 font-medium max-w-2xl mx-auto mb-10">
                  Recupere seu equilíbrio e bem-estar com protocolos personalizados para suas necessidades.
                </p>
              </div>
            </div>
          </motion.div>
          
          {/* Decorative elements */}
          <motion.div 
            animate={{ 
              rotate: 360,
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 20, 
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute -bottom-20 -left-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"
          />
          <motion.div 
            animate={{ 
              rotate: -360,
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 25, 
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute -top-20 -right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"
          />
        </section>
      </div>
    </div>
  );
};

const MetodoAnshin = () => (
  <div className="pt-32 section-padding">
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto flex flex-col gap-8"
    >
      <h1 className="text-4xl md:text-5xl text-sage-800 font-bold">Método Anshin — Atendimento terapêutico personalizado em {SITE_CONFIG.city}</h1>
      <p className="text-lg leading-relaxed">
        O Método Anshin é a abordagem exclusiva utilizada por Roseli Martiñs para conduzir seus atendimentos. A palavra Anshin está associada à sensação de tranquilidade, segurança e bem-estar.
      </p>
      
      <div className="grid grid-cols-1 gap-12 my-8">
        {[
          { title: 'Escuta do corpo', desc: 'Cada cliente chega com necessidades diferentes. O primeiro passo é entender como o corpo está no momento.' },
          { title: 'Técnicas integrativas', desc: 'A combinação de terapias permite atuar de forma mais completa no equilíbrio físico.' },
          { title: 'Atendimento personalizado', desc: 'Cada sessão é pensada de forma individual.' }
        ].map((pilar, i) => (
          <div key={i} className="flex gap-6 items-start">
            <div className="w-12 h-12 rounded-full bg-gold-soft text-sage-900 flex items-center justify-center shrink-0 font-serif text-xl shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),0_4px_8px_rgba(0,0,0,0.15)] border border-gold-soft/20">
              0{i+1}
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-2xl text-sage-800 font-bold">{pilar.title}</h3>
              <p className="text-earth-800/70">{pilar.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-sage-100 p-8 rounded-3xl">
        <h3 className="text-xl font-serif text-sage-800 mb-4 font-bold">Benefícios do método:</h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {['alívio de tensões', 'redução de dores', 'melhora da circulação', 'relaxamento profundo', 'recuperação de energia'].map(b => (
            <li key={b} className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-sage-600" />
              <span className="capitalize">{b}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <WhatsAppButton className="w-fit" />
    </motion.div>
  </div>
);

const TreatmentPage = ({ title, description, benefits, indications, image, ctaLabel }: any) => (
  <div className="pt-48 pb-24 px-6">
    <div className="max-w-[80%] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col gap-8"
        >
          <h1 className="text-4xl md:text-5xl text-sage-800 font-bold">{title}</h1>
          <p className="text-lg leading-relaxed text-earth-800/80">{description}</p>
          
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-serif text-sage-800 font-bold">Benefícios:</h3>
            <ul className="grid grid-cols-1 gap-2">
              {benefits.map((b: string) => (
                <li key={b} className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-sage-600" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          {indications && (
            <div className="flex flex-col gap-4">
              <h3 className="text-xl font-serif text-sage-800 font-bold">Indicado para:</h3>
              <div className="flex flex-wrap gap-2">
                {indications.map((ind: string) => (
                  <span key={ind} className="bg-earth-100 px-4 py-2 rounded-full text-sm">{ind}</span>
                ))}
              </div>
            </div>
          )}

          <WhatsAppButton className="w-fit" label={ctaLabel} />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-3xl overflow-hidden shadow-2xl sticky top-32"
        >
          <img src={image} alt={title} className="w-full aspect-[4/5] object-cover" referrerPolicy="no-referrer" />
        </motion.div>
      </div>
    </div>
  </div>
);

const LiftingFacialPage = () => (
  <div className="pt-48 pb-24 px-6">
    <div className="max-w-[80%] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col gap-8"
        >
          <h1 className="text-4xl md:text-5xl text-sage-800 font-bold">Lifting Facial Manual</h1>
          
          <div className="flex flex-col gap-4 text-lg leading-relaxed text-earth-800/80">
            <p>
              O Lifting Facial Manual é um método de rejuvenescimento natural e não invasivo que realizo através de estímulos musculares e técnicas manuais específicas para cuidar da pele e da musculatura do rosto.
            </p>
            <p>
              Esse atendimento foi pensado para mulheres que desejam cuidar da aparência de forma mais natural, sem procedimentos invasivos e respeitando o tempo e as necessidades da própria pele.
            </p>
            <p>
              Durante a sessão, utilizo movimentos que ajudam a estimular a circulação facial, ativar a musculatura e aliviar tensões que muitas vezes ficam acumuladas no rosto.
            </p>
            <p>
              Com esse estímulo, a pele tende a apresentar uma aparência mais descansada, firme e saudável.
            </p>
            <p>
              Mais do que um cuidado estético, gosto de enxergar o lifting facial como um momento de autocuidado e bem-estar.
            </p>
            <p>
              Muitas vezes, o rosto também carrega o cansaço, o estresse e a tensão do dia a dia — e quando cuidamos dele com presença e delicadeza, isso também se reflete na autoestima e na forma como nos sentimos.
            </p>
            <p>
              Aqui no Espaço Anshin Massoterapia, em Ribeirão Pires, realizo cada atendimento de forma personalizada, observando o momento e as necessidades de cada mulher.
            </p>
          </div>
          
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-serif text-sage-800 font-bold">Benefícios:</h3>
            <ul className="grid grid-cols-1 gap-2">
              {[
                "suaviza linhas de expressão",
                "melhora a firmeza da pele",
                "estimula a circulação",
                "tonifica a musculatura facial",
                "promove aspecto mais rejuvenescido",
                "ajuda no relaxamento facial",
                "melhora o viço e a aparência da pele"
              ].map((b: string) => (
                <li key={b} className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-sage-600" />
                  <span className="text-lg text-earth-800/90">{b}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4 text-lg leading-relaxed text-earth-800/80">
            <h3 className="text-xl font-serif text-sage-800 font-bold">Indicações:</h3>
            <p>
              O Lifting Facial Manual é ideal para quem busca cuidados faciais naturais, prevenção do envelhecimento e melhora da aparência da pele sem procedimentos invasivos.
            </p>
            <p>
              Costumo indicar esse cuidado para mulheres que desejam:
            </p>
            <ul className="grid grid-cols-1 gap-2 mt-2">
              {[
                "prevenir sinais do envelhecimento",
                "suavizar aparência de cansaço facial",
                "estimular firmeza e vitalidade da pele",
                "manter uma rotina de autocuidado natural",
                "promover rejuvenescimento facial de forma leve e natural"
              ].map((ind: string) => (
                <li key={ind} className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-sage-600" />
                  <span className="text-lg text-earth-800/90">{ind}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4 text-lg leading-relaxed text-earth-800/80 mt-4 border-t border-earth-200 pt-6">
            <p className="italic">
              Cada pele tem sua própria história. Por isso, realizo o atendimento respeitando as características e necessidades individuais de cada mulher.
            </p>
            <p className="text-2xl font-serif text-sage-800 italic font-bold mt-2 text-center">
              Entre um toque e outro… o bem-estar acontece.
            </p>
          </div>

          <WhatsAppButton className="w-fit mt-4" />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-3xl overflow-hidden shadow-2xl sticky top-32"
        >
          <img 
            src="https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=1000" 
            alt="Lifting Facial Manual" 
            className="w-full aspect-[4/5] object-cover" 
            referrerPolicy="no-referrer" 
          />
        </motion.div>
      </div>
    </div>
  </div>
);

const DrenagemLinfaticaPage = () => (
  <div className="pt-48 pb-24 px-6">
    <div className="max-w-[80%] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col gap-8"
        >
          <h1 className="text-4xl md:text-5xl text-sage-800 font-bold">Drenagem Linfática Manual</h1>
          
          <div className="flex flex-col gap-4 text-lg leading-relaxed text-earth-800/80">
            <p>
              A Drenagem Linfática Manual é uma técnica realizada através de movimentos suaves, ritmados e precisos que utilizo para estimular o sistema linfático e ajudar o corpo a eliminar líquidos acumulados e toxinas de forma natural.
            </p>
            <p>
              Muitas mulheres chegam até mim sentindo o corpo inchado, pesado ou com sensação de retenção de líquidos. E, muitas vezes, esse desconforto não afeta apenas a aparência, mas também a disposição, o conforto e o bem-estar no dia a dia.
            </p>
            <p>
              Durante a sessão, realizo movimentos delicados e específicos que ajudam a ativar a circulação linfática, favorecendo o equilíbrio do organismo e proporcionando uma agradável sensação de leveza.
            </p>
            <p>
              A Drenagem Linfática Manual vai além do cuidado estético. Ela é um atendimento terapêutico que pode auxiliar no funcionamento natural do corpo, melhorar a circulação e contribuir para mais conforto físico e bem-estar.
            </p>
            <p>
              Aqui no Espaço Anshin Massoterapia, em Ribeirão Pires, realizo cada sessão de forma personalizada, respeitando o momento e as necessidades individuais de cada mulher.
            </p>
          </div>
          
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-serif text-sage-800 font-bold">Benefícios:</h3>
            <ul className="grid grid-cols-1 gap-2">
              {[
                "reduz inchaços e retenção de líquidos",
                "melhora a circulação",
                "auxilia na eliminação de toxinas",
                "promove sensação de leveza no corpo",
                "ajuda na prevenção de edemas",
                "favorece o equilíbrio do organismo",
                "contribui para mais conforto e bem-estar"
              ].map((b: string) => (
                <li key={b} className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-sage-600" />
                  <span className="text-lg text-earth-800/90">{b}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4 text-lg leading-relaxed text-earth-800/80">
            <h3 className="text-xl font-serif text-sage-800 font-bold">Indicações:</h3>
            <p>
              A Drenagem Linfática Manual pode ser indicada para mulheres que desejam melhorar a circulação e aliviar desconfortos relacionados ao acúmulo de líquidos e sensação de peso no corpo.
            </p>
            <p>
              Costumo realizar esse atendimento em situações como:
            </p>
            <ul className="grid grid-cols-1 gap-2 mt-2">
              {[
                "edemas",
                "lipedema",
                "pré e pós-operatório",
                "pós-parto",
                "retenção de líquidos",
                "sensação de peso e inchaço",
                "necessidade de estímulo circulatório"
              ].map((ind: string) => (
                <li key={ind} className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-sage-600" />
                  <span className="text-lg text-earth-800/90">{ind}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4 text-lg leading-relaxed text-earth-800/80 mt-4 border-t border-earth-200 pt-6">
            <p className="italic">
              Cada corpo tem suas próprias necessidades. Por isso, antes de cada atendimento, observo com atenção o seu momento para conduzir a sessão com cuidado, segurança e individualidade.
            </p>
            <p className="text-2xl font-serif text-sage-800 italic font-bold mt-2 text-center">
              Entre um toque e outro… o bem-estar acontece.
            </p>
          </div>

          <WhatsAppButton className="w-fit mt-4" />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-3xl overflow-hidden shadow-2xl sticky top-32"
        >
          <img 
            src="https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&q=80&w=1000" 
            alt="Drenagem Linfática Manual" 
            className="w-full aspect-[4/5] object-cover" 
            referrerPolicy="no-referrer" 
          />
        </motion.div>
      </div>
    </div>
  </div>
);

const ReflexologiaPodalPage = () => (
  <div className="pt-48 pb-24 px-6">
    <div className="max-w-[80%] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col gap-8"
        >
          <div>
            <span className="text-sage-600 font-bold uppercase tracking-[0.2em] text-xs">Reflexologia Podal</span>
            <h1 className="text-4xl md:text-5xl text-sage-800 font-bold mt-2">Reflexoterapia Podal</h1>
          </div>
          
          <div className="flex flex-col gap-4 text-lg leading-relaxed text-earth-800/80">
            <p>
              A Reflexoterapia Podal, também conhecida como Reflexologia Podal, é uma técnica terapêutica que realizo através da estimulação de pontos reflexos nos pés, buscando promover equilíbrio e bem-estar para o corpo como um todo.
            </p>
            <p>
              Os pés possuem áreas reflexas ligadas a diferentes órgãos e sistemas do organismo. Ao estimular esses pontos com movimentos específicos e cuidadosos, procuro favorecer o equilíbrio corporal, aliviar tensões e estimular respostas naturais de relaxamento e autorregulação do corpo.
            </p>
            <p>
              Muitas mulheres chegam até mim carregando não apenas dores físicas, mas também o cansaço mental e emocional acumulado pela rotina. E é justamente por isso que gosto de dizer que a reflexoterapia vai além do cuidado com os pés. Ela é um momento de pausa e reconexão.
            </p>
            <p>
              Durante a sessão, observo com atenção as necessidades de cada mulher, conduzindo o atendimento de forma acolhedora e personalizada aqui no Espaço Anshin Massoterapia, em Ribeirão Pires.
            </p>
          </div>
          
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-serif text-sage-800 font-bold">Benefícios:</h3>
            <p className="text-lg leading-relaxed text-earth-800/80 mb-2">
              A Reflexoterapia Podal pode contribuir para o equilíbrio do organismo e apoiar o bem-estar de forma complementar. Entre os benefícios mais percebidos estão:
            </p>
            <ul className="grid grid-cols-1 gap-2">
              {[
                "auxílio no alívio de dores de coluna",
                "apoio no cuidado complementar da fibromialgia",
                "melhora do funcionamento do sistema digestivo",
                "relaxamento físico e mental",
                "redução de tensões acumuladas",
                "estímulo ao equilíbrio emocional",
                "sensação de bem-estar e leveza"
              ].map((b: string) => (
                <li key={b} className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-sage-600" />
                  <span className="text-lg text-earth-800/90">{b}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4 text-lg leading-relaxed text-earth-800/80">
            <h3 className="text-xl font-serif text-sage-800 font-bold">Indicações:</h3>
            <p>
              Costumo indicar a Reflexoterapia Podal como um cuidado complementar para mulheres que buscam mais equilíbrio e conforto no dia a dia. Ela pode ser uma excelente aliada em situações como:
            </p>
            <ul className="grid grid-cols-1 gap-2 mt-2">
              {[
                "dores de coluna",
                "enxaquecas",
                "insônia",
                "tensões musculares e emocionais",
                "alterações digestivas",
                "sobrecarga emocional",
                "estresse e dificuldade para relaxar"
              ].map((ind: string) => (
                <li key={ind} className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-sage-600" />
                  <span className="text-lg text-earth-800/90">{ind}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4 text-lg leading-relaxed text-earth-800/80 mt-4 border-t border-earth-200 pt-6">
            <p className="italic">
              Cada corpo responde de uma forma e carrega sua própria história. Por isso, realizo cada sessão com presença, escuta e respeito ao momento de cada mulher.
            </p>
            <p className="text-2xl font-serif text-sage-800 italic font-bold mt-2 text-center">
              Entre um toque e outro… o bem-estar acontece.
            </p>
          </div>

          <WhatsAppButton className="w-fit mt-4" />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-3xl overflow-hidden shadow-2xl sticky top-32"
        >
          <img 
            src="https://res.cloudinary.com/dplhygs4v/image/upload/v1779149728/roseli_martins_massagem_em_ribeirao_pires_wvrwrc.png" 
            alt="Reflexoterapia Podal" 
            className="w-full aspect-[4/5] object-cover" 
            referrerPolicy="no-referrer" 
          />
        </motion.div>
      </div>
    </div>
  </div>
);

const MassagensPage = () => {
  const [activeTab, setActiveTab] = React.useState('sniper');

  const sniperInfo = {
    title: "Massagem Relaxante — Método Sniper",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=1000",
    paragraphs: [
      "A Massagem Relaxante — Método Sniper é uma técnica direcionada e precisa que realizo com foco em pontos específicos de dor, tensão e sobrecarga muscular.",
      "Muitas vezes, o corpo acumula tensões silenciosas que aparecem principalmente nos ombros, pescoço e região lombar. E quando essas tensões permanecem por muito tempo, podem afetar não apenas o conforto físico, mas também o humor, o sono e a disposição.",
      "Durante esse atendimento, utilizo manobras específicas para localizar e trabalhar áreas de maior rigidez muscular, ajudando o corpo a relaxar de forma mais profunda e direcionada.",
      "Gosto de enxergar essa massagem como um cuidado para quem vive em ritmo intenso e sente o peso da rotina no próprio corpo.",
      "Aqui no Espaço Anshin Massoterapia, em Ribeirão Pires, realizo cada sessão respeitando o momento e as necessidades individuais de cada mulher."
    ],
    benefitsIntro: "A Massagem Relaxante — Método Sniper pode ajudar a promover relaxamento e mais equilíbrio para o corpo. Entre os benefícios mais percebidos estão:",
    benefits: [
      "redução do estresse e da ansiedade",
      "alívio de tensões musculares",
      "melhora da circulação",
      "melhora da mobilidade",
      "relaxamento profundo",
      "equilíbrio físico e emocional",
      "sensação de leveza e bem-estar"
    ],
    indicationsIntro: "Costumo indicar esse atendimento para mulheres que convivem com tensão muscular e sobrecarga física ou emocional. Pode ser especialmente indicado para:",
    indications: [
      "rotinas intensas",
      "cansaço físico e mental",
      "sobrecarga muscular",
      "tensão nos ombros",
      "dores no pescoço",
      "desconfortos lombares",
      "dificuldade para relaxar"
    ],
    outro: "Cada corpo responde de uma forma. Por isso, conduzo o atendimento de maneira personalizada, buscando entender onde o corpo mais precisa de cuidado."
  };

  const doterraInfo = {
    title: "Massagem Relaxante Aromática dōTERRA",
    image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=1000",
    paragraphs: [
      "A Massagem Relaxante Aromática dōTERRA é um atendimento que une técnicas relaxantes com a aplicação de óleos essenciais dōTERRA, escolhidos de forma personalizada para proporcionar uma experiência profunda de cuidado e bem-estar.",
      "Acredito que o toque e os aromas possuem um grande poder de acolhimento. Por isso, durante essa sessão, combino movimentos suaves e relaxantes com óleos essenciais selecionados de acordo com o momento e as necessidades de cada mulher. O resultado é uma experiência que envolve corpo e emoções.",
      "Além do relaxamento físico, muitas mulheres relatam sensação de calma, leveza e desaceleração mental após o atendimento.",
      "Aqui no Espaço Anshin Massoterapia, em Ribeirão Pires, realizo cada sessão com atenção, presença e cuidado individualizado."
    ],
    benefitsIntro: "A Massagem Relaxante Aromática dōTERRA pode ajudar a promover equilíbrio e relaxamento profundo. Entre os benefícios mais percebidos estão:",
    benefits: [
      "potencializa o relaxamento",
      "auxilia no alívio de dores e tensões",
      "pode apoiar o cuidado de inflamações",
      "promove equilíbrio emocional",
      "reduz estresse e ansiedade",
      "melhora a sensação de bem-estar",
      "proporciona relaxamento físico e mental"
    ],
    indicationsIntro: "Costumo indicar esse atendimento para mulheres que desejam desacelerar e viver um momento de autocuidado mais profundo. Pode ser especialmente indicada para quem busca:",
    indications: [
      "relaxamento corporal",
      "acalmar a mente",
      "reduzir o estresse",
      "melhorar o humor",
      "equilíbrio emocional",
      "reconexão consigo mesma",
      "momentos de pausa e bem-estar"
    ],
    outro: "Cada aroma desperta sensações diferentes. Por isso, escolho os óleos essenciais com cuidado, respeitando o que seu corpo e seu momento pedem."
  };

  const info = activeTab === 'sniper' ? sniperInfo : doterraInfo;

  return (
    <div className="pt-48 pb-24 px-6">
      <div className="max-w-[80%] mx-auto">
        <div className="text-center mb-12">
          <span className="text-sage-600 font-bold uppercase tracking-[0.2em] text-xs">Tipos de Massagem</span>
          <h1 className="text-4xl md:text-5xl font-serif text-sage-800 mt-2 font-bold">Massagens Relaxantes</h1>
          <p className="text-earth-800/60 mt-4 max-w-xl mx-auto">
            Descubra as duas abordagens exclusivas que desenvolvi para acolher suas necessidades de relaxamento e alívio de dores musculares.
          </p>
          
          <div className="flex justify-center gap-4 mt-8">
            <button 
              onClick={() => setActiveTab('sniper')}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${activeTab === 'sniper' ? 'bg-sage-800 text-white shadow-lg' : 'bg-earth-100 text-earth-800 hover:bg-earth-200'}`}
            >
              Método Sniper
            </button>
            <button 
              onClick={() => setActiveTab('doterra')}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${activeTab === 'doterra' ? 'bg-sage-800 text-white shadow-lg' : 'bg-earth-100 text-earth-800 hover:bg-earth-200'}`}
            >
              Aromática dōTERRA
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mt-12">
          <motion.div 
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-8"
          >
            <h2 className="text-3xl md:text-4xl text-sage-800 font-bold font-serif">{info.title}</h2>
            
            <div className="flex flex-col gap-4 text-lg leading-relaxed text-earth-800/80">
              {info.paragraphs.map((p, index) => (
                <p key={index}>{p}</p>
              ))}
            </div>
            
            <div className="flex flex-col gap-4">
              <h3 className="text-xl font-serif text-sage-800 font-bold">Benefícios:</h3>
              <p className="text-lg leading-relaxed text-earth-800/80 mb-2">
                {info.benefitsIntro}
              </p>
              <ul className="grid grid-cols-1 gap-2">
                {info.benefits.map((b: string) => (
                  <li key={b} className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-sage-600 animate-pulse" />
                    <span className="text-lg text-earth-800/95">{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-4 text-lg leading-relaxed text-earth-800/80">
              <h3 className="text-xl font-serif text-sage-800 font-bold">Indicações:</h3>
              <p>
                {info.indicationsIntro}
              </p>
              <ul className="grid grid-cols-1 gap-2 mt-2">
                {info.indications.map((ind: string) => (
                  <li key={ind} className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-sage-600" />
                    <span className="text-lg text-earth-800/95">{ind}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-4 text-lg leading-relaxed text-earth-800/80 mt-4 border-t border-earth-200 pt-6">
              <p className="italic">
                {info.outro}
              </p>
              <p className="text-2xl font-serif text-sage-800 italic font-bold mt-2 text-center">
                Entre um toque e outro… o bem-estar acontece.
              </p>
            </div>

            <WhatsAppButton className="w-fit mt-4" />
          </motion.div>

          <motion.div 
            key={`${activeTab}-image`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="rounded-3xl overflow-hidden shadow-2xl sticky top-32"
          >
            <img 
              src={info.image} 
              alt={info.title} 
              className="w-full aspect-[4/5] object-cover" 
              referrerPolicy="no-referrer" 
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const QuickMassagePage = () => (
  <div className="pt-48 pb-24 px-6">
    <div className="max-w-[80%] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col gap-8"
        >
          <h1 className="text-4xl md:text-5xl text-sage-800 font-bold">Quick Massage — Método Sniper</h1>
          
          <div className="flex flex-col gap-4 text-lg leading-relaxed text-earth-800/80">
            <p>
              A Quick Massage — Método Sniper é um atendimento realizado em cadeira ergonômica, pensado para proporcionar alívio rápido de tensões e dores do dia a dia, sem necessidade de trocar de roupa.
            </p>
            <p>
              Essa é uma técnica prática e direcionada que realizo com duração entre 10 e 20 minutos, focando principalmente regiões que costumam acumular tensão, como ombros, pescoço, costas e lombar.
            </p>
            <p>
              Muitas vezes, o corpo pede uma pausa antes mesmo de percebermos. A rotina intensa, longos períodos sentada, excesso de responsabilidades e estresse acabam deixando marcas no corpo que se manifestam como rigidez, desconforto e cansaço físico.
            </p>
            <p>
              A proposta da Quick Massage — Método Sniper é justamente oferecer um cuidado rápido, eficiente e acessível, capaz de aliviar essas tensões in poucos minutos.
            </p>
            <p>
              Mesmo sendo um atendimento de curta duração, o toque direcionado e preciso pode trazer uma agradável sensação de leveza, relaxamento e renovação da energia.
            </p>
            <p>
              Aqui no Espaço Anshin Massoterapia, em Ribeirão Pires, realizo cada atendimento respeitando o momento e as necessidades individuais de cada pessoa.
            </p>
            <p>
              Além do atendimento individual, a Quick Massage também pode ser uma excelente opção para ações corporativas, eventos e ambientes profissionais que desejam promover mais bem-estar e qualidade de vida.
            </p>
          </div>
          
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-serif text-sage-800 font-bold">Benefícios:</h3>
            <p className="text-lg leading-relaxed text-earth-800/80 mb-2">
              A Quick Massage — Método Sniper foi desenvolvida para proporcionar resultados rápidos e sensação imediata de bem-estar. Entre os benefícios mais percebidos estão:
            </p>
            <ul className="grid grid-cols-1 gap-2">
              {[
                "redução rápida das tensões musculares",
                "melhora da disposição",
                "sensação de leveza em poucos minutos",
                "alívio de dores e desconfortos",
                "relaxamento físico e mental",
                "melhora da circulação",
                "pausa restauradora para o corpo"
              ].map((b: string) => (
                <li key={b} className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-sage-600" />
                  <span className="text-lg text-earth-800/90">{b}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4 text-lg leading-relaxed text-earth-800/80">
            <h3 className="text-xl font-serif text-sage-800 font-bold">Indicações:</h3>
            <p>
              Costumo indicar a Quick Massage para pessoas que precisam de um momento rápido de cuidado e alívio das tensões do cotidiano. Ela pode ser especialmente indicada para:
            </p>
            <ul className="grid grid-cols-1 gap-2 mt-2">
              {[
                "pausas durante o dia",
                "rotinas intensas",
                "ambientes corporativos",
                "eventos e ações de bem-estar",
                "tensão nos ombros e pescoço",
                "dores relacionadas ao estresse",
                "necessidade de relaxamento rápido"
              ].map((ind: string) => (
                <li key={ind} className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-sage-600" />
                  <span className="text-lg text-earth-800/90">{ind}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4 text-lg leading-relaxed text-earth-800/80 mt-4 border-t border-earth-200 pt-6">
            <p className="italic">
              Muitas vezes, poucos minutos de cuidado já fazem diferença na forma como o corpo e a mente seguem o restante do dia.
            </p>
            <p className="text-2xl font-serif text-sage-800 italic font-bold mt-2 text-center">
              Entre um toque e outro… o bem-estar acontece.
            </p>
          </div>

          <WhatsAppButton className="w-fit mt-4" />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-3xl overflow-hidden shadow-2xl sticky top-32"
        >
          <img 
            src="https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&q=80&w=1000" 
            alt="Quick Massage — Método Sniper" 
            className="w-full aspect-[4/5] object-cover" 
            referrerPolicy="no-referrer" 
          />
        </motion.div>
      </div>
    </div>
  </div>
);

const TerapiasIntegrativasPage = () => (
  <div className="pt-48 pb-24 px-6">
    <div className="max-w-[80%] mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-12"
      >
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-sage-600 font-bold uppercase tracking-[0.2em] text-xs">Terapias Integrativas</span>
          <h1 className="text-4xl md:text-5xl text-sage-800 font-bold mt-2 font-serif">Terapias Integrativas</h1>
          <p className="text-xl text-sage-700 italic mt-2">Protocolos complementares para um cuidado ainda mais personalizado</p>
        </div>
        
        {/* Intro Paragraphs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-lg leading-relaxed text-earth-800/80 max-w-5xl mx-auto">
          <div className="flex flex-col gap-4">
            <p>
              Acredito que cada corpo tem suas próprias necessidades e responde de uma forma única ao cuidado terapêutico.
            </p>
            <p>
              Por isso, aqui no Espaço Anshin Massoterapia, em Ribeirão Pires, os atendimentos podem integrar diferentes recursos e técnicas complementares, sempre respeitando o momento e as necessidades de cada mulher.
            </p>
            <p>
              Esses protocolos não são aplicados de forma automática.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <p>
              Eles podem ser incorporados às sessões conforme avaliação e indicação profissional, com o objetivo de ampliar o conforto, potencializar o relaxamento e promover uma experiência ainda mais acolhedora e personalizada.
            </p>
            <p>
              Mais do que seguir um atendimento padronizado, gosto de observar com atenção o que o corpo está comunicando.
            </p>
            <p>
              É dessa escuta que nasce um cuidado verdadeiramente integrativo.
            </p>
          </div>
        </div>

        {/* Protocolos Complementares Section */}
        <div className="flex flex-col gap-8 mt-6">
          <div className="text-center">
            <h2 className="text-3xl font-serif text-sage-800 font-bold">Protocolos Complementares</h2>
            <div className="h-0.5 w-24 bg-sage-300 mx-auto mt-2"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto w-full">
            {[
              {
                title: "Pedras Quentes",
                image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=600",
                desc: "As pedras quentes podem ser utilizadas como recurso complementar para proporcionar relaxamento profundo e conforto muscular. O calor ajuda a relaxar regiões de tensão, favorecendo sensação de acolhimento e bem-estar durante a sessão."
              },
              {
                title: "Manta Térmica",
                image: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&q=80&w=600",
                desc: "A manta térmica pode ser incorporada ao atendimento para promover aquecimento corporal e maior sensação de conforto. Esse recurso auxilia o relaxamento e pode complementar protocolos terapêuticos e corporais conforme necessidade."
              },
              {
                title: "Escalda-pés",
                image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=600",
                desc: "O escalda-pés é um momento simples e profundamente acolhedor. A água morna associada aos cuidados terapêuticos ajuda o corpo a desacelerar e pode favorecer sensação de relaxamento, descanso e reconexão consigo mesma. Muitas mulheres relatam que esse momento já inicia o processo de pausa e bem-estar."
              },
              {
                title: "Aromaterapia",
                subtitle: "com óleos essenciais dōTERRA",
                image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=600",
                desc: "A aromaterapia com óleos essenciais dōTERRA pode ser integrada aos atendimentos para complementar a experiência terapêutica. Os aromas são escolhidos de forma personalizada e podem contribuir para relaxamento, conforto emocional e sensação de equilíbrio e acolhimento. Acredito que o aroma também conversa com o corpo e pode tornar o cuidado ainda mais especial."
              }
            ].map((p, idx) => (
              <div key={idx} className="bg-white rounded-3xl overflow-hidden border border-earth-100 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col">
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={p.image} 
                    alt={p.title} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-8 flex flex-col flex-grow gap-2">
                  <h4 className="text-xl font-bold text-sage-800 font-serif">
                    {p.title}
                  </h4>
                  {p.subtitle && (
                    <span className="text-xs font-sans text-sage-600 font-bold tracking-wider uppercase -mt-1 block">
                      {p.subtitle}
                    </span>
                  )}
                  <p className="text-base text-earth-800/80 leading-relaxed mt-2">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Atendimento Integrativo Section */}
        <div className="bg-sage-50/50 rounded-3xl p-8 md:p-12 border border-sage-100 max-w-5xl mx-auto w-full mt-8 flex flex-col gap-6 text-center">
          <h3 className="text-3xl font-serif text-sage-800 font-bold">Atendimento Integrativo</h3>
          
          <div className="flex flex-col gap-4 text-lg leading-relaxed text-earth-800/80 max-w-3xl mx-auto">
            <p>
              Aqui no ANSHIN, cada atendimento é realizado de forma personalizada.
            </p>
            <p>
              Isso significa que observo com atenção as necessidades do seu corpo para integrar técnicas e protocolos complementares de maneira ética, cuidadosa e respeitosa.
            </p>
            <p>
              Meu propósito não é oferecer sessões padronizadas. É construir um cuidado que faça sentido para o seu momento.
            </p>
            <p>
              A massoterapia, as terapias integrativas e os protocolos complementares caminham juntos para promover conforto, relaxamento e uma experiência de bem-estar mais completa.
            </p>
            <p>
              Porque acredito que cuidar do corpo também é cuidar da forma como você se sente.
            </p>
          </div>

          <div className="mt-6 border-t border-sage-200/50 pt-8">
            <p className="text-3xl font-serif text-sage-800 italic font-bold">
              Entre um toque e outro… o bem-estar acontece.
            </p>
          </div>
        </div>

        {/* Center Booking Action */}
        <div className="flex justify-center mt-4">
          <WhatsAppButton className="w-fit" />
        </div>
      </motion.div>
    </div>
  </div>
);

const About = () => (
  <div className="pt-48 pb-24 px-6">
    <div className="max-w-[80%] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      <div className="rounded-3xl overflow-hidden shadow-2xl">
        <img 
          src="https://res.cloudinary.com/dplhygs4v/image/upload/v1779143638/sobre_mim_roseli_martins-massoterapia_labwqu.jpg" 
          alt="Roseli Martiñs" 
          className="w-full aspect-square object-cover"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="flex flex-col gap-8">
        <h1 className="text-4xl md:text-5xl text-sage-800 font-bold">Cuidado, experiência e dedicação ao bem-estar feminino</h1>
        <p className="text-lg leading-relaxed">
          Me chamo Roseli Martiñs, sou massoterapeuta e reflexoterapeuta dedicada ao cuidado da saúde e do equilíbrio do corpo feminino. Meu trabalho une conhecimento técnico, sensibilidade terapêutica e um atendimento acolhedor, focado nas necessidades individuais de cada mulher.
        </p>
        <p className="text-lg leading-relaxed">
          Ao longo de minha trajetória, desenvolvi um atendimento que une conhecimento técnico, sensibilidade terapêutica e cuidado individual. Meu propósito é ajudar mulheres a viverem com mais leveza, saúde e energia através dos serviços:
        </p>
        <div className="flex flex-col gap-4">
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {['Reflexoterapia podal', 'Drenagem linfática', 'Massagem terapêutica', 'Aromaterapia', 'Lifting facial manual'].map(s => (
              <li key={s} className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-sage-600" />
                <span className="text-lg">{s}</span>
              </li>
            ))}
          </ul>
        </div>
        <WhatsAppButton className="w-fit" />
      </div>
    </div>
  </div>
);

const Contact = () => (
  <div className="pt-32 section-padding text-center">
    <div className="max-w-2xl mx-auto flex flex-col gap-8">
      <h1 className="text-4xl md:text-5xl text-sage-800 font-bold">Agende seu atendimento</h1>
      <p className="text-lg">
        Se você deseja aliviar dores, reduzir o estresse e cuidar melhor do seu corpo, o próximo passo é simples.
      </p>
      <div className="bg-white p-12 rounded-[40px] shadow-xl border border-earth-200 flex flex-col gap-6 items-center">
        <div className="w-20 h-20 bg-sage-100 text-sage-600 rounded-full flex items-center justify-center mb-4">
          <MessageCircle size={40} />
        </div>
        <p className="text-earth-800/70 italic">"Entre um toque e outro… o bem-estar acontece."</p>
        <WhatsAppButton />
        <p className="text-sm text-earth-800/50">Clique no botão acima e agende seu atendimento pelo WhatsApp.</p>
      </div>
    </div>
  </div>
);

const ResultsPage = () => (
  <div className="pt-32 pb-24">
    <div className="max-w-[95%] md:max-w-[80%] mx-auto px-6">
      <div className="text-center mb-16">
        <span className="text-sage-600 font-bold uppercase tracking-[0.2em] text-xs">Resultados</span>
        <h1 className="text-4xl md:text-6xl font-serif text-sage-800 mt-4 font-bold">Transformações Reais</h1>
        <p className="text-earth-800/60 mt-4 max-w-2xl mx-auto">
          Confira os resultados visíveis de nossas terapias. Cada corpo responde de forma única, mas o compromisso com o bem-estar é constante.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-5xl mx-auto">
        <BeforeAfterSlider 
          before="https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=800" 
          after="https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=800"
          label="Lifting Facial Manual"
        />
        <BeforeAfterSlider 
          before="https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&q=80&w=800" 
          after="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=800"
          label="Drenagem Linfática"
        />
      </div>

      <div className="mt-20 text-center bg-earth-100 p-12 rounded-[40px]">
        <h2 className="text-2xl md:text-3xl text-sage-800 font-serif mb-6 font-bold">Quer ver esses resultados em você?</h2>
        <WhatsAppButton />
      </div>
    </div>
  </div>
);

const ProductsPage = () => (
  <div className="pt-48 pb-24 px-6">
    <div className="max-w-[80%] mx-auto">
      {/* Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col gap-8"
        >
          <div className="flex flex-col gap-2">
            <span className="text-sage-600 font-bold uppercase tracking-[0.2em] text-xs">Consultora Oficial dōTERRA</span>
            <h1 className="text-4xl md:text-6xl font-serif text-sage-800 font-bold">Aromaterapia & Bem-estar</h1>
            <p className="text-xl text-sage-700 italic">Sinta o poder da natureza em sua forma mais pura</p>
          </div>
          
          <p className="text-lg leading-relaxed text-earth-800/80">
            A dōTERRA é líder mundial em óleos essenciais de grau terapêutico. Em meus atendimentos no Espaço Anshin Massoterapia, em Ribeirão Pires, utilizo esses recursos naturais preciosos para ampliar o relaxamento, aliviar tensões físicas e promover o equilíbrio emocional.
          </p>
          
          <div className="flex flex-wrap gap-4 mt-2">
            <a 
              href="https://office.doterra.com/roselimartins/#/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-8 py-4 bg-sage-800 hover:bg-sage-900 text-white rounded-full font-medium transition-all duration-300 shadow-md hover:shadow-lg inline-flex items-center gap-2 text-center"
            >
              Quero Conhecer os Produtos
            </a>
            <WhatsAppButton label="Falar com Roseli" className="w-fit" />
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-3xl overflow-hidden shadow-2xl relative"
        >
          <img 
            src="https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=1000" 
            alt="Óleos Essenciais dōTERRA" 
            className="w-full aspect-[4/3] object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-earth-900/40 to-transparent"></div>
          <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur px-4 py-2 rounded-full border border-earth-100 shadow-lg text-xs font-bold text-sage-800 uppercase tracking-widest">
            Selo CPTG de Pureza
          </div>
        </motion.div>
      </div>

      {/* Pureza e Diferencial CPTG */}
      <div className="bg-earth-50/50 border border-earth-100 rounded-3xl p-8 md:p-12 mb-24 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="flex flex-col gap-3">
          <h3 className="text-xl font-bold text-sage-800 font-serif">O que são Óleos Essenciais?</h3>
          <p className="text-earth-800/80 leading-relaxed">
            Compostos aromáticos naturais altamente concentrados extraídos de sementes, cascas, raízes e flores. Eles possuem propriedades terapêuticas poderosas que apoiam o funcionamento do corpo e promovem a autocura.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="text-xl font-bold text-sage-800 font-serif">Pureza Garantida (CPTG)</h3>
          <p className="text-earth-800/80 leading-relaxed">
            Cada óleo dōTERRA passa pelo rigoroso Certificado de Pureza Testada e Garantida. Isso atesta que o óleo é 100% puro, livre de substâncias sintéticas, pesticidas, aditivos ou qualquer tipo de contaminação.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="text-xl font-bold text-sage-800 font-serif">Extração Sustentável</h3>
          <p className="text-earth-800/80 leading-relaxed">
            Através do programa Co-Impact Sourcing®, a dōTERRA colhe as plantas em seus habitats nativos globais, garantindo a maior potência terapêutica dos óleos e apoiando de forma justa as comunidades de agricultores parceiros.
          </p>
        </div>
      </div>

      {/* Principais Óleos Usados em Sessão */}
      <div className="flex flex-col gap-12 mb-24">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-sage-600 font-bold uppercase tracking-[0.2em] text-xs">Os Favoritos do Espaço Anshin</span>
          <h2 className="text-3xl md:text-4xl text-sage-800 font-bold font-serif mt-2">Os Óleos Essenciais Mais Usados</h2>
          <p className="text-earth-800/60 mt-4">
            Em cada sessão de massoterapia ou aromaterapia, seleciono o óleo essencial que mais atende ao seu momento físico e emocional.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              name: "Lavanda (Lavender)",
              tagline: "O Óleo do Relaxamento",
              desc: "Promove calma profunda, ajuda a aliviar sentimentos de ansiedade, estresse e contribui para um sono reparador e de alta qualidade.",
              benefit: "Relaxamento mental e muscular"
            },
            {
              name: "Hortelã-pimenta (Peppermint)",
              tagline: "Energia & Respiração",
              desc: "Refrescante e energizante, ajuda a aliviar tensões musculares, dores de cabeça e promove vias aéreas livres e respiração profunda.",
              benefit: "Revitalização e alívio de tensões"
            },
            {
              name: "Limão Siciliano (Lemon)",
              tagline: "Clareza & Foco",
              desc: "Estimulante e purificador natural. Ele melhora o humor, auxilia o foco mental, promove energia positiva e atua no suporte imunológico.",
              benefit: "Humor elevado e bem-estar"
            },
            {
              name: "Deep Blue® (Mix de Óleos)",
              tagline: "Alívio Muscular Profundo",
              desc: "Uma formulação de óleos com propriedades calmantes e reconfortantes, perfeita para acalmar articulações doloridas e tensões intensas.",
              benefit: "Alívio imediato da rigidez"
            }
          ].map((oil, idx) => (
            <div key={idx} className="bg-white border border-earth-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between">
              <div className="flex flex-col gap-3">
                <span className="text-sage-600 font-bold text-xs uppercase tracking-wider">{oil.tagline}</span>
                <h4 className="text-lg font-bold text-sage-800 font-serif">{oil.name}</h4>
                <p className="text-sm text-earth-800/80 leading-relaxed">{oil.desc}</p>
              </div>
              <div className="border-t border-earth-100 pt-4 mt-6">
                <span className="text-xs font-bold text-sage-800 bg-sage-50 px-3 py-1 rounded-full">{oil.benefit}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Como Adquirir / Cadastrar */}
      <div className="bg-sage-800 text-white rounded-3xl p-8 md:p-16 flex flex-col lg:flex-row items-center gap-12 justify-between">
        <div className="flex flex-col gap-6 lg:max-w-xl">
          <span className="text-sage-200 font-bold uppercase tracking-[0.2em] text-xs">Oportunidade Especial</span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold">Compre com 25% de Desconto</h2>
          <p className="text-sage-100 text-lg leading-relaxed">
            Como cliente preferencial cadastrado sob minha indicação, você garante um desconto exclusivo de 25% em todos os produtos dōTERRA, além de participar do programa de fidelidade para acumular pontos e ganhar óleos grátis.
          </p>
          <ul className="flex flex-col gap-3 text-sage-100">
            <li className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-sage-300" />
              <span>Sem obrigação de compra mensal</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-sage-300" />
              <span>Apoio e consultoria personalizada da Roseli Martins</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-sage-300" />
              <span>Entrega direta na sua casa em Ribeirão Pires ou qualquer localidade</span>
            </li>
          </ul>
        </div>
        <div className="bg-white/10 backdrop-blur border border-white/20 p-8 rounded-3xl flex flex-col gap-6 w-full lg:max-w-sm text-center">
          <h4 className="text-xl font-bold font-serif text-white">Quero me Cadastrar</h4>
          <p className="text-sm text-sage-100">
            Acesse o portal de consultora de Roseli Martins ou envie uma mensagem no WhatsApp para realizarmos o seu cadastro de forma segura!
          </p>
          <div className="flex flex-col gap-3">
            <a 
              href="https://office.doterra.com/roselimartins/#/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="py-3 px-6 bg-white text-sage-800 rounded-full font-bold hover:bg-sage-50 transition-all duration-300 shadow-md text-center"
            >
              Acessar Site dōTERRA da Roseli
            </a>
            <a 
              href="https://wa.me/5511973685934?text=Ol%C3%A1%2C%20Roseli!%20Gostaria%20de%20saber%20mais%20sobre%20os%20%C3%B3leos%20d%C5%8DTERRA%20e%20como%20comprar%20com%20desconto." 
              target="_blank" 
              rel="noopener noreferrer" 
              className="py-3 px-6 bg-transparent border border-white text-white rounded-full font-bold hover:bg-white/10 transition-all duration-300 text-center"
            >
              Falar no WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const NossoEspaco = () => (
  <div className="pt-48 pb-24 px-6">
    <div className="max-w-[80%] mx-auto">
      <div className="text-center mb-16">
        <span className="text-sage-600 font-bold uppercase tracking-[0.2em] text-xs">O Ambiente</span>
        <h1 className="text-4xl md:text-6xl font-serif text-sage-800 mt-4 mb-8 font-bold">Nosso Espaço</h1>
        <div className="max-w-3xl mx-auto flex flex-col gap-6 text-earth-800/80 text-lg leading-relaxed text-justify md:text-center">
          <p className="text-xl text-sage-800 font-serif italic font-semibold">
            "Quero que, quando você chegar aqui, sinta que encontrou um lugar onde pode desacelerar."
          </p>
          <p>
            O Espaço Anshin Massoterapia foi preparado com carinho para ser um ambiente de acolhimento, cuidado e bem-estar feminino. Mais do que um local de atendimento, esse é um espaço pensado para que você se sinta confortável, segura e tranquila durante cada sessão.
          </p>
          <p>
            Acredito que o cuidado começa antes mesmo do toque. Por isso, mantenho um ambiente aconchegante, organizado e cuidadosamente higienizado, onde cada detalhe foi pensado para proporcionar conforto e relaxamento. A iluminação suave, os aromas e a atmosfera acolhedora ajudam o corpo a desacelerar e a entrar em um estado mais profundo de relaxamento e equilíbrio.
          </p>
          <p>
            Aqui, cada atendimento acontece de forma reservada e personalizada. Seja para massagem terapêutica, drenagem linfática, reflexoterapia podal, aromaterapia ou lifting facial manual, preparo cada sessão respeitando o momento e as necessidades do seu corpo.
          </p>
          <p>
            Meu propósito é que você encontre não apenas um atendimento de massoterapia em Ribeirão Pires, mas um espaço onde possa pausar, respirar e cuidar de si mesma com presença e tranquilidade. O cuidado com a limpeza, organização e higienização do ambiente também faz parte da experiência, porque acredito que bem-estar e segurança caminham juntos.
          </p>
          <p>
            Quero que você se sinta acolhida do começo ao fim. Porque, muitas vezes, o que o corpo mais precisa é de um lugar onde possa finalmente relaxar.
          </p>
          <p className="text-2xl font-serif text-sage-800 italic mt-4 font-bold">
            Entre um toque e outro… o bem-estar acontece.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          "https://res.cloudinary.com/dplhygs4v/image/upload/v1779142819/nosso_espa%C3%A7o_roseli_martins_massoterapia_em_ribeirao_pires1_cqzpf7.jpg",
          "https://res.cloudinary.com/dplhygs4v/image/upload/v1779142826/nosso_espa%C3%A7o_roseli_martins_massoterapia_em_ribeirao_pires2_xcrchn.jpg",
          "https://res.cloudinary.com/dplhygs4v/image/upload/v1779142824/nosso_espa%C3%A7o_roseli_martins_massoterapia_em_ribeirao_pires3_mfcznb.jpg",
          "https://res.cloudinary.com/dplhygs4v/image/upload/v1779142826/nosso_espa%C3%A7o_roseli_martins_massoterapia_em_ribeirao_pires4_sqopbb.jpg",
          "https://res.cloudinary.com/dplhygs4v/image/upload/v1779142819/nosso_espa%C3%A7o_roseli_martins_massoterapia_em_ribeirao_pires5_fx7d3g.jpg",
          "https://res.cloudinary.com/dplhygs4v/image/upload/v1779142819/nosso_espa%C3%A7o_roseli_martins_massoterapia_em_ribeirao_pires6_idxhmk.jpg"
        ].map((img, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="rounded-2xl overflow-hidden shadow-lg aspect-[4/5] card-hover"
          >
            <img 
              src={img} 
              alt={`Espaço Anshin ${i + 1}`} 
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        ))}
      </div>

      <div className="mt-20 bg-sage-800 text-white p-12 rounded-[40px] text-center flex flex-col items-center gap-6">
        <h2 className="text-2xl md:text-4xl font-serif font-bold">Venha nos visitar</h2>
        <p className="text-sage-100 max-w-xl">
          Estamos prontos para te receber com todo o carinho e profissionalismo que você merece.
        </p>
        <div className="bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/20 max-w-2xl text-center">
          <p className="font-semibold text-white text-lg">Nosso Endereço:</p>
          <p className="text-sage-100 mt-1">
            R. Dourados, 309 – Pouso Alegre (Ouro Fino) – Ribeirão Pires – SP
          </p>
          <p className="text-sage-200 text-sm mt-1 italic">
            (Rua em frente ao McDonald's)
          </p>
        </div>
        <WhatsAppButton label="Agendar visita" className="bg-white text-sage-800 hover:bg-sage-50 w-fit mt-2" />
      </div>
    </div>
  </div>
);

const BookingPage = () => {
  React.useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
    
    // Scroll to top on mount
    window.scrollTo(0, 0);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="pt-40 pb-20 px-6 bg-earth-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-block bg-gold-soft/20 text-sage-800 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
            Agendamento Online
          </div>
          <h1 className="text-4xl md:text-7xl font-serif text-sage-800 font-bold mb-6">Como Funciona</h1>
          <p className="text-lg md:text-xl text-earth-800/70 max-w-3xl mx-auto leading-relaxed">
            O atendimento no Espaço Anshin é <span className="text-sage-800 font-bold">exclusivo para mulheres</span>. 
            A reserva antecipada garante a exclusividade do seu horário e a preparação personalizada do ambiente para você.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {[
            { step: '01', title: 'Escolha seu procedimento e horário', desc: 'Selecione o serviço desejado e o melhor momento na agenda abaixo.' },
            { step: '02', title: 'Realize o pagamento da taxa de reserva', desc: 'Após escolher o horário, você receberá as instruções para o pagamento da taxa.' },
            { step: '03', title: 'Receba a confirmação e instruções', desc: 'Confirmaremos seu agendamento e enviaremos as orientações pré-atendimento.' },
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-10 rounded-[40px] border border-earth-100 shadow-xl relative overflow-hidden group hover:border-gold-soft/50 transition-colors"
            >
              <span className="absolute -top-6 -right-6 text-9xl font-serif font-bold text-sage-50 group-hover:text-gold-soft/10 transition-colors">
                {item.step}
              </span>
              <div className="w-12 h-12 bg-sage-800 text-white rounded-2xl flex items-center justify-center mb-6 relative z-10 font-bold">
                {item.step}
              </div>
              <h3 className="text-xl font-bold text-sage-800 mb-4 relative z-10 leading-tight">{item.title}</h3>
              <p className="text-earth-800/60 text-sm relative z-10 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Calendly Widget */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-[60px] border border-earth-100 shadow-2xl p-4 md:p-10 mb-16 overflow-hidden"
        >
          <div className="mb-8 flex items-center justify-between px-4">
            <div className="flex items-center gap-3 text-sage-800">
              <Clock size={24} />
              <span className="font-bold uppercase tracking-widest text-sm">Agenda Disponível</span>
            </div>
            <div className="hidden md:flex items-center gap-2 text-earth-400 text-xs">
              <MapPin size={14} />
              <span>Ribeirão Pires - SP</span>
            </div>
          </div>
          
          {/* Calendly Inline Widget */}
          <div 
            className="calendly-inline-widget" 
            data-url="https://calendly.com/roselimartins-terapias" 
            style={{ minWidth: '320px', height: '750px' }}
          ></div>
        </motion.div>

        {/* Final CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center bg-sage-800 text-white p-12 md:p-20 rounded-[60px] shadow-2xl relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <Flower2 size={400} className="absolute -bottom-20 -right-20" />
            <Flower2 size={300} className="absolute -top-20 -left-20 rotate-180" />
          </div>
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-serif italic font-bold mb-8">
              Já escolheu seu horário na agenda acima?
            </h2>
            <p className="text-sage-100 mb-10 text-lg">
              Clique no botão abaixo para confirmar seu agendamento e receber as instruções para o pagamento da taxa de reserva.
            </p>
            <WhatsAppButton 
              label="Confirmar Agendamento via WhatsApp" 
              className="bg-white text-sage-800 hover:bg-sage-50 shadow-2xl scale-110"
              message="Olá Roseli, escolhi um horário na agenda para o procedimento [NOME DO PROCEDIMENTO] na [DIA E HORA]. Como faço para enviar o comprovante da taxa de reserva?"
            />
            <p className="mt-8 text-xs text-sage-300 uppercase tracking-widest font-bold">
              Atendimento exclusivo para mulheres
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sobre" element={<About />} />
            <Route path="/nosso-espaco" element={<NossoEspaco />} />
            <Route path="/metodo-anshin" element={<MetodoAnshin />} />
            <Route path="/resultados" element={<ResultsPage />} />
            <Route path="/produtos-doterra" element={<ProductsPage />} />
            <Route path="/agendamento" element={<BookingPage />} />
            <Route path="/contato" element={<Contact />} />
            
            {/* Treatment Routes */}
            <Route path="/servicos/lifting-facial" element={<LiftingFacialPage />} />
            <Route path="/servicos/drenagem-linfatica" element={<DrenagemLinfaticaPage />} />
            <Route path="/servicos/reflexologia-podal" element={<ReflexologiaPodalPage />} />
            <Route path="/servicos/massagem-relaxante" element={<MassagensPage />} />
            <Route path="/servicos/quick-massage" element={<QuickMassagePage />} />
            <Route path="/servicos/terapias-integrativas" element={<TerapiasIntegrativasPage />} />
          </Routes>
        </main>
        <MapSection />
        <Footer />
        <FloatingWhatsApp />
        <BackToTop />
      </div>
    </Router>
  );
}
