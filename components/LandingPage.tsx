// @ts-nocheck
import React from 'react';
import { ArrowRight, Shirt, Users, Truck, ShieldCheck, Play, Sun, Moon } from 'lucide-react';
import { Button } from './ui/Button';

interface LandingPageProps {
  onLoginClick: () => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

// Wave components now accept a fill color to blend perfectly with previous/next sections
const WaveTop = ({ fill }: { fill: string }) => (
  <svg className="absolute top-0 left-0 w-full h-auto z-0 pointer-events-none transition-colors duration-300" viewBox="0 0 1440 320" preserveAspectRatio="none">
    <path fill={fill} fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,122.7C960,117,1056,171,1152,197.3C1248,224,1344,224,1392,224L1440,224L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
  </svg>
);

const WaveBottom = ({ fill }: { fill: string }) => (
  <svg className="absolute bottom-0 left-0 w-full h-auto z-10 -mb-1 pointer-events-none transition-colors duration-300" viewBox="0 0 1440 320" preserveAspectRatio="none">
    <path fill={fill} fillOpacity="1" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,197.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
  </svg>
);

export const LandingPage: React.FC<LandingPageProps> = ({ onLoginClick, isDarkMode, toggleTheme }) => {
  // Define colors for waves based on theme
  const colors = {
    bgGray: isDarkMode ? '#18181b' : '#f3f4f6', // zinc-900 or brand-gray
    bgWhite: isDarkMode ? '#27272a' : '#ffffff', // zinc-800 or white
    bgDark: '#1a1a1a', // Always dark
  };

  return (
    <div className="min-h-screen bg-brand-gray dark:bg-zinc-900 font-sans overflow-x-hidden transition-colors duration-300">
      {/* Navbar */}
      <nav className="fixed w-full z-50 bg-brand-dark/95 backdrop-blur-sm text-white py-4 px-6 md:px-12 flex justify-between items-center shadow-lg">
        <div className="flex items-center gap-2">
           <div className="bg-brand-red p-1.5 rounded-lg shadow-lg shadow-red-900/20">
             <Shirt className="w-6 h-6 text-white" />
           </div>
           <span className="text-xl font-bold tracking-tight">UFFIZI</span>
        </div>
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-300">
          <a href="#" className="hover:text-white transition-colors">MARCA</a>
          <a href="#" className="hover:text-white transition-colors">CLIENTES</a>
          <a href="#" className="hover:text-white transition-colors">SOBRE</a>
          <a href="#" className="hover:text-white transition-colors">CONTATO</a>
          
          <div className="flex items-center gap-4 ml-4">
             <button 
               onClick={toggleTheme}
               className="p-2 rounded-full hover:bg-white/10 text-gray-300 hover:text-white transition-all"
               title={isDarkMode ? "Modo Claro" : "Modo Escuro"}
             >
               {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
             </button>
             <Button size="sm" onClick={onLoginClick}>LOGIN</Button>
          </div>
        </div>
        <div className="md:hidden flex items-center gap-4">
           <button 
             onClick={toggleTheme}
             className="p-2 rounded-full hover:bg-white/10 text-gray-300 hover:text-white transition-all"
           >
             {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
           </button>
           <Button size="sm" onClick={onLoginClick}>LOGIN</Button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-32 pb-20 md:pt-48 md:pb-32 bg-brand-gray dark:bg-zinc-900 transition-colors duration-300 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 mb-12 md:mb-0 pr-0 md:pr-12">
              <h2 className="text-brand-red font-bold text-sm tracking-widest uppercase mb-4">Uffizi Uniformes</h2>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-brand-dark dark:text-white leading-tight mb-6 transition-colors">
                Reimaginando <br/>
                <span className="relative">
                  uniformes
                  <svg className="absolute -bottom-2 left-0 w-full h-3 text-brand-red/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                  </svg>
                </span> para <br/>
                sua empresa.
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-lg mb-8 max-w-md leading-relaxed transition-colors">
                Design exclusivo, tecidos tecnológicos e uma gestão de pedidos simplificada para vestir sua equipe com a identidade da sua marca.
              </p>
              <div className="flex gap-4">
                <Button size="lg" className="shadow-brand-red/30">Começar Agora</Button>
                <button className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-gray-300 dark:border-gray-600 hover:border-brand-red hover:text-brand-red dark:text-gray-300 dark:hover:text-brand-red transition-all">
                  <Play className="w-5 h-5 ml-1" />
                </button>
              </div>
            </div>
            
            <div className="w-full md:w-1/2 relative">
               {/* Decorative background blob */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-gray-200 to-white dark:from-zinc-800 dark:to-zinc-900 rounded-full blur-3xl opacity-60 -z-10 transition-colors"></div>
               
               {/* 3D Illustration Placeholder */}
               <div className="relative z-10">
                 <img 
                   src="https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&q=80&w=1000" 
                   alt="Equipe com uniformes" 
                   className="rounded-2xl shadow-2xl transform md:rotate-2 hover:rotate-0 transition-transform duration-500 object-cover h-[500px] w-full"
                 />
                 
                 {/* Floating Card 1 */}
                 <div className="absolute -bottom-6 -left-6 bg-white dark:bg-zinc-800 p-4 rounded-xl shadow-xl flex items-center gap-3 animate-bounce transition-colors" style={{animationDuration: '3s'}}>
                   <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full">
                     <ShieldCheck className="w-6 h-6 text-green-600 dark:text-green-400" />
                   </div>
                   <div>
                     <p className="text-xs text-gray-500 dark:text-gray-400">Qualidade</p>
                     <p className="font-bold text-gray-800 dark:text-white">Premium</p>
                   </div>
                 </div>

                  {/* Floating Card 2 */}
                 <div className="absolute top-10 -right-6 bg-white dark:bg-zinc-800 p-4 rounded-xl shadow-xl flex items-center gap-3 animate-bounce transition-colors" style={{animationDuration: '4s', animationDelay: '1s'}}>
                   <div className="bg-brand-red/10 dark:bg-brand-red/20 p-2 rounded-full">
                     <Users className="w-6 h-6 text-brand-red" />
                   </div>
                   <div>
                     <p className="text-xs text-gray-500 dark:text-gray-400">Clientes</p>
                     <p className="font-bold text-gray-800 dark:text-white">+500 Empresas</p>
                   </div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </header>

      {/* Target Audience Cards */}
      <section className="py-20 bg-white dark:bg-zinc-800 transition-colors duration-300 relative">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8 -mt-32 relative z-20">
            {/* Card 1 */}
            <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all border border-gray-100 dark:border-zinc-700 group">
              <div className="h-48 bg-gray-100 dark:bg-zinc-800 rounded-2xl mb-6 overflow-hidden relative">
                 <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Empresas" />
              </div>
              <h3 className="text-2xl font-bold text-brand-dark dark:text-white mb-2 transition-colors">Para <span className="text-brand-red">Empresas</span></h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 transition-colors">Soluções completas para grandes equipes. Gestão de tamanhos, entregas programadas e padronização visual.</p>
              <Button variant="outline" fullWidth>Conheça o catálogo</Button>
            </div>

            {/* Card 2 */}
            <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all border border-gray-100 dark:border-zinc-700 group">
              <div className="h-48 bg-gray-100 dark:bg-zinc-800 rounded-2xl mb-6 overflow-hidden relative">
                 <img src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Empreendedores" />
              </div>
              <h3 className="text-2xl font-bold text-brand-dark dark:text-white mb-2 transition-colors">Para <span className="text-brand-red">Empreendedores</span></h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 transition-colors">Crie sua marca do zero. Private label com sua etiqueta, design personalizado e pequenas tiragens.</p>
              <Button variant="outline" fullWidth>Falar com consultor</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features / Why Us */}
      {/* Significantly increased top padding to account for wave overlap on desktop */}
      <section className="pt-32 pb-24 md:pt-80 bg-brand-dark text-white relative overflow-hidden">
        {/* Wave color must match the previous section (White/Zinc-800) */}
        <WaveTop fill={colors.bgWhite} />
        <div className="container mx-auto px-6 relative z-10">
           <div className="flex flex-col md:flex-row gap-12 items-center">
             <div className="w-full md:w-1/3">
                <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-md border border-white/20 inline-block mb-6">
                  <Shirt className="w-12 h-12 text-brand-red" />
                </div>
                <h2 className="text-4xl font-bold mb-6">O que faz a gente <br/> diferente?</h2>
                <p className="text-gray-400">Não vendemos apenas roupas, entregamos identidade corporativa com a mais alta tecnologia têxtil.</p>
             </div>

             <div className="w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="border-l-4 border-brand-red pl-6">
                  <h4 className="text-xl font-bold mb-2">Design Exclusivo</h4>
                  <p className="text-gray-400 text-sm">Nossa equipe de estilistas cria modelos únicos alinhados ao seu brandbook.</p>
                </div>
                <div className="border-l-4 border-gray-700 pl-6 hover:border-brand-red transition-colors">
                  <h4 className="text-xl font-bold mb-2">Tecidos Tecnológicos</h4>
                  <p className="text-gray-400 text-sm">Anti-suor, proteção UV e alta durabilidade para o dia a dia.</p>
                </div>
                <div className="border-l-4 border-gray-700 pl-6 hover:border-brand-red transition-colors">
                  <h4 className="text-xl font-bold mb-2">Plataforma de Gestão</h4>
                  <p className="text-gray-400 text-sm">Acompanhe pedidos, tamanhos e entregas em tempo real pelo dashboard.</p>
                </div>
                <div className="border-l-4 border-gray-700 pl-6 hover:border-brand-red transition-colors">
                  <h4 className="text-xl font-bold mb-2">Logística Integrada</h4>
                  <p className="text-gray-400 text-sm">Entregamos em todo o Brasil com sistema de kit individual por funcionário.</p>
                </div>
             </div>
           </div>

           {/* Timeline Graphic (Simplified from image) */}
           <div className="mt-20 pt-10 border-t border-gray-800 flex justify-between items-center text-center overflow-x-auto">
             {['2021', '2022', '2023', '2024'].map((year, i) => (
               <div key={year} className="px-8 min-w-[150px] relative group cursor-default">
                 <div className="text-xs text-brand-red mb-2 opacity-0 group-hover:opacity-100 transition-opacity">Marco Histórico</div>
                 <div className={`text-3xl font-bold ${i === 3 ? 'text-brand-red' : 'text-gray-600'}`}>{year}</div>
                 <div className="mt-4 text-xs text-gray-500">Expansão e crescimento contínuo.</div>
               </div>
             ))}
           </div>
        </div>
      </section>

      {/* Featured Product Section - Red & White */}
      <section className="py-24 bg-white dark:bg-zinc-800 transition-colors duration-300">
        <div className="container mx-auto px-6">
           <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="w-full lg:w-1/2">
                <h3 className="text-brand-red font-bold uppercase tracking-widest mb-2">Uffizi Uniformes</h3>
                <h2 className="text-4xl font-bold text-brand-dark dark:text-white mb-6 transition-colors">Qualidade que se sente na pele.</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed transition-colors">
                  Utilizamos algodão Pima peruano e misturas sintéticas de alta performance. Cada costura é pensada para resistir a lavagens industriais sem perder a cor ou a forma.
                </p>
                <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed transition-colors">
                  Nosso processo de tingimento é sustentável, utilizando 40% menos água que a indústria tradicional.
                </p>
                <Button>Solicitar Amostra</Button>
              </div>
              <div className="w-full lg:w-1/2 bg-brand-dark rounded-3xl p-10 relative">
                 <div className="absolute top-0 right-0 p-4">
                   <div className="flex gap-2">
                     <div className="w-3 h-3 rounded-full bg-red-500"></div>
                     <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                     <div className="w-3 h-3 rounded-full bg-green-500"></div>
                   </div>
                 </div>
                 <img 
                    src="https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=800" 
                    alt="Camisa Vermelha Dobrada"
                    className="w-full h-auto rounded-xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500"
                 />
                 {/* Floating Clouds/Elements from image reference */}
                 <div className="absolute -top-10 -left-10 w-24 h-24 bg-brand-red/20 rounded-full blur-xl"></div>
                 <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-500/20 rounded-full blur-xl"></div>
              </div>
           </div>
        </div>
      </section>

      {/* About / Steps Section */}
      {/* Significantly increased top and bottom padding to clear the waves */}
      <section className="pt-32 pb-32 md:pt-80 md:pb-80 bg-brand-red text-white relative">
        <WaveTop fill={colors.bgWhite} />
        <div className="container mx-auto px-6 relative z-10">
           <div className="text-center mb-16">
             <h2 className="text-4xl font-bold mb-4">Como comprar?</h2>
             <p className="text-red-100 max-w-2xl mx-auto">Processo simplificado em 3 etapas para vestir sua empresa com excelência.</p>
           </div>

           <div className="grid md:grid-cols-3 gap-8">
             {[
               { step: '01', title: 'Consultoria', desc: 'Entendemos sua necessidade e definimos os modelos ideais.' },
               { step: '02', title: 'Aprovação', desc: 'Enviamos protótipos físicos e digitais para sua validação.' },
               { step: '03', title: 'Produção & Entrega', desc: 'Fabricação ágil e entrega separada por colaborador.' }
             ].map((item, idx) => (
               <div key={idx} className="bg-white dark:bg-zinc-900 text-brand-dark dark:text-gray-100 p-8 rounded-2xl relative overflow-hidden group hover:-translate-y-2 transition-transform duration-300">
                 <div className="absolute -right-4 -top-4 text-9xl font-bold text-gray-100 dark:text-zinc-800 group-hover:text-brand-red/10 transition-colors select-none">
                   {item.step}
                 </div>
                 <h3 className="text-xl font-bold mb-4 relative z-10">Fase {item.title}</h3>
                 <p className="text-gray-600 dark:text-gray-400 relative z-10 text-sm">{item.desc}</p>
                 <div className="mt-6 flex justify-center">
                    {/* Placeholder illustration for step */}
                    <div className="w-full h-32 bg-gray-100 dark:bg-zinc-800 rounded-lg overflow-hidden">
                       <img 
                        src={`https://picsum.photos/seed/${idx}/400/200`} 
                        className="w-full h-full object-cover opacity-80" 
                        alt="Step illustration"
                       />
                    </div>
                 </div>
               </div>
             ))}
           </div>
        </div>
        {/* WaveBottom now fills with the footer color (brand-dark) to create the transition */}
        <WaveBottom fill={colors.bgDark} />
      </section>

      {/* Footer */}
      <footer className="bg-brand-dark text-gray-400 pt-10 pb-10">
        <div className="container mx-auto px-6">
           <div className="grid md:grid-cols-4 gap-12 mb-16">
             <div>
               <div className="flex items-center gap-2 mb-6">
                <div className="bg-brand-red p-1 rounded">
                  <Shirt className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white tracking-tight">UFFIZI</span>
               </div>
               <p className="text-sm">Reimaginando uniformes corporativos com design, tecnologia e sustentabilidade.</p>
             </div>
             
             <div>
               <h4 className="text-white font-bold mb-4">Menu</h4>
               <ul className="space-y-2 text-sm">
                 <li><a href="#" className="hover:text-brand-red">Home</a></li>
                 <li><a href="#" className="hover:text-brand-red">Empresas</a></li>
                 <li><a href="#" className="hover:text-brand-red">Sobre nós</a></li>
                 <li><a href="#" className="hover:text-brand-red">Blog</a></li>
               </ul>
             </div>

             <div>
               <h4 className="text-white font-bold mb-4">Legal</h4>
               <ul className="space-y-2 text-sm">
                 <li><a href="#" className="hover:text-brand-red">Termos de uso</a></li>
                 <li><a href="#" className="hover:text-brand-red">Privacidade</a></li>
                 <li><a href="#" className="hover:text-brand-red">Política de Troca</a></li>
               </ul>
             </div>

             <div>
               <h4 className="text-white font-bold mb-4">Newsletter</h4>
               <div className="flex">
                 <input type="email" placeholder="Seu e-mail" className="bg-gray-800 border-none rounded-l-lg px-4 py-2 text-sm w-full focus:ring-1 focus:ring-brand-red outline-none" />
                 <button className="bg-brand-red text-white px-4 py-2 rounded-r-lg hover:opacity-90 transition-opacity">OK</button>
               </div>
             </div>
           </div>
           
           <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs">
             <p>&copy; 2024 Uffizi Uniformes. Todos os direitos reservados.</p>
             <div className="flex gap-4 mt-4 md:mt-0">
               <a href="#" className="hover:text-white">Instagram</a>
               <a href="#" className="hover:text-white">LinkedIn</a>
               <a href="#" className="hover:text-white">Facebook</a>
             </div>
           </div>
        </div>
      </footer>
    </div>
  );
};