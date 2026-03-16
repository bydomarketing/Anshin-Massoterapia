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
              {['Atendimento exclusivo para mulheres', 'Técnicas terapêuticas integrativas', 'Cuidado físico e emocional'].map((tag) => (
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
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-sage-800 text-white p-12 md:p-16 rounded-[40px] shadow-2xl text-center flex flex-col items-center gap-8 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <Flower2 size={400} className="absolute -bottom-20 -right-20" />
              </div>
              <h3 className="text-2xl md:text-4xl font-serif italic relative z-10 font-bold max-w-4xl">
                "Aqui você encontra Muito mais que uma massagem, é um lugar para você se sentir em casa dentro de si mesma."
              </h3>
              <p className="text-lg md:text-xl text-white/90 relative z-10 max-w-4xl font-light leading-relaxed">
                Entendo que seu corpo carrega muito mais do que tensões físicas; ele guarda sua rotina, sua história e suas emoções. Por isso, no meu espaço, o cuidado é verdadeiramente integrativo. Antes de qualquer toque, dedico meu tempo para entender você. Através do Método Anshin, traduzo o que seu corpo fala em um protocolo exclusivo e personalizado, desenhado para acolher suas necessidades únicas e transformar cada ponto de estresse em uma profunda e duradoura sensação de leveza e equilíbrio. Você não sai apenas com uma sessão feita, sai entendendo melhor a si mesma.
              </p>
              <WhatsAppButton 
                label="AGENDAR SESSÃO" 
                className="bg-white text-sage-800 hover:bg-sage-50 px-12 py-5 text-base font-bold tracking-[0.2em] relative z-10" 
              />
            </motion.div>
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

        {/* Results Section - Before/After Sliders */}
        <section className="section-padding bg-earth-50 mt-20 md:mt-32">
          <div className="max-w-[80%] mx-auto">
            <div className="text-center mb-16">
              <span className="text-sage-600 font-bold uppercase tracking-[0.2em] text-xs">Resultados</span>
              <h2 className="text-3xl md:text-5xl font-serif text-sage-800 mt-4">Transformações Reais</h2>
              <p className="text-earth-800/60 mt-4 max-w-2xl mx-auto">Veja a diferença que o cuidado especializado pode fazer no seu corpo e rosto.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
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
  <div className="pt-32 section-padding">
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
);

const About = () => (
  <div className="pt-32 section-padding">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      <div className="rounded-3xl overflow-hidden shadow-2xl">
        <img 
          src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=1000" 
          alt="Roseli Martiñs" 
          className="w-full aspect-square object-cover"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="flex flex-col gap-8">
        <h1 className="text-4xl md:text-5xl text-sage-800 font-bold">Cuidado, experiência e dedicação ao bem-estar feminino</h1>
        <p className="text-lg leading-relaxed">
          Roseli Martiñs é massoterapeuta e reflexoterapeuta dedicada ao cuidado da saúde e do equilíbrio do corpo feminino. Seu trabalho une conhecimento técnico, sensibilidade terapêutica e um atendimento acolhedor, focado nas necessidades individuais de cada mulher.
        </p>
        <p>
          Ao longo de sua trajetória, desenvolveu um atendimento que une conhecimento técnico, sensibilidade terapêutica e cuidado individual. Seu propósito é ajudar mulheres a viverem com mais leveza, saúde e energia.
        </p>
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-serif text-sage-800 font-bold">Especializações:</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {['Reflexoterapia podal', 'Drenagem linfática', 'Massagem terapêutica', 'Aromaterapia', 'Lifting facial manual'].map(s => (
              <li key={s} className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-sage-600" />
                <span>{s}</span>
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
  <div className="pt-32 pb-24">
    <div className="max-w-[80%] mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
        <div className="flex flex-col gap-8">
          <span className="text-sage-600 font-bold uppercase tracking-[0.2em] text-xs">Aromaterapia</span>
          <h1 className="text-4xl md:text-6xl font-serif text-sage-800 font-bold">Produtos doTerra</h1>
          <p className="text-lg leading-relaxed text-earth-800/80">
            A dōTERRA oferece os óleos essenciais mais puros e potentes do mundo. Em meus atendimentos, utilizo esses óleos para potencializar os resultados terapêuticos e proporcionar uma experiência sensorial completa.
          </p>
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-serif text-sage-800 font-bold">Por que dōTERRA?</h3>
            <ul className="grid grid-cols-1 gap-3">
              {[
                'Pureza garantida (CPTG)',
                'Extração ética e sustentável',
                'Potencializa o relaxamento e alívio de dores',
                'Suporte emocional e físico natural'
              ].map(item => (
                <li key={item} className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-sage-600" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <WhatsAppButton label="Quero conhecer os produtos" />
        </div>
        <div className="rounded-3xl overflow-hidden shadow-2xl">
          <img 
            src="https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=1000" 
            alt="Óleos Essenciais doTerra" 
            className="w-full aspect-square object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </div>
  </div>
);

const NossoEspaco = () => (
  <div className="pt-32 pb-24">
    <div className="max-w-[80%] mx-auto px-6">
      <div className="text-center mb-16">
        <span className="text-sage-600 font-bold uppercase tracking-[0.2em] text-xs">O Ambiente</span>
        <h1 className="text-4xl md:text-6xl font-serif text-sage-800 mt-4 font-bold">Nosso Espaço</h1>
        <p className="text-earth-800/60 mt-4 max-w-2xl mx-auto">
          Um refúgio de tranquilidade e cuidado, projetado exclusivamente para proporcionar o máximo conforto e relaxamento durante seus atendimentos.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=800",
          "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&q=80&w=800",
          "https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&q=80&w=800",
          "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=800",
          "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=800",
          "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=800"
        ].map((img, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="rounded-2xl overflow-hidden shadow-lg aspect-[4/3] card-hover"
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

      <div className="mt-20 bg-sage-800 text-white p-12 rounded-[40px] text-center">
        <h2 className="text-2xl md:text-4xl font-serif mb-6 font-bold">Venha nos visitar</h2>
        <p className="mb-8 text-sage-100 max-w-xl mx-auto">
          Estamos localizados em Ribeirão Pires, prontos para te receber com todo o carinho e profissionalismo que você merece.
        </p>
        <WhatsAppButton label="Agendar visita" className="bg-white text-sage-800 hover:bg-sage-50" />
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
            <Route path="/servicos/lifting-facial" element={<TreatmentPage title="Lifting Facial Manual" description="Rejuvenescimento natural através do estímulo muscular." benefits={['Firmeza', 'Brilho', 'Relaxamento']} indications={['Rugas', 'Flacidez']} image="https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=1000" />} />
            <Route path="/servicos/drenagem-linfatica" element={<TreatmentPage title="Drenagem Linfática" description="Redução de inchaços e melhora do sistema circulatório." benefits={['Desintoxicação', 'Leveza']} indications={['Retenção', 'Celulite']} image="https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&q=80&w=1000" />} />
            <Route path="/servicos/reflexologia-podal" element={<TreatmentPage title="Reflexologia Podal" description="Equilíbrio através de pontos estratégicos nos pés." benefits={['Alívio de estresse', 'Equilíbrio']} indications={['Insônia', 'Tensão']} image="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=1000" />} />
            <Route path="/servicos/massagem-relaxante" element={<TreatmentPage title="Massagem Relaxante" description="Um momento de pausa para relaxamento profundo." benefits={['Paz mental', 'Músculos soltos']} indications={['Estresse', 'Ansiedade']} image="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=1000" />} />
            <Route path="/servicos/quick-massage" element={<TreatmentPage title="Quick Massage" description="Massagem focada e revitalizante, ideal para alívio imediato de tensões. Perfeita para rotinas dinâmicas, disponível em pacotes individuais ou para ações em empresas e eventos locais." benefits={['Alívio imediato', 'Revitalização', 'Praticidade']} indications={['Tensões musculares', 'Estresse', 'Empresas e Eventos']} image="https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&q=80&w=1000" ctaLabel="Pacotes para Empresas e Grupos" />} />
            <Route path="/servicos/terapias-integrativas" element={<TreatmentPage title="Terapias Integrativas" description="Cuidado holístico para a saúde integral da mulher." benefits={['Equilíbrio total', 'Conexão']} indications={['Saúde da mulher']} image="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=1000" />} />
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
