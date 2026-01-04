import React, { useState, useEffect } from 'react';
import { LayoutDashboard, User, GraduationCap, BookOpen, PenTool, Users, Menu, X, Globe } from 'lucide-react';
import { TabView, Language } from '../types';
import { UI_LABELS } from '../constants';

interface NavbarProps {
  activeTab: TabView;
  setActiveTab: (tab: TabView) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  profileImage: string;
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, language, setLanguage, profileImage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const labels = UI_LABELS[language];

  const menuItems = [
    { id: TabView.DASHBOARD, label: labels.dashboard, icon: LayoutDashboard },
    { id: TabView.PROFILE, label: labels.profile, icon: User },
    { id: TabView.EDUCATION, label: labels.education, icon: GraduationCap },
    { id: TabView.PUBLICATIONS, label: labels.publications, icon: BookOpen },
    { id: TabView.TEACHING, label: labels.teaching, icon: PenTool },
    { id: TabView.THESIS, label: labels.thesis, icon: Users },
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'fa' ? 'en' : 'fa');
  };

  return (
    <>
      <nav 
        className={`
          fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b
          ${isScrolled 
            ? 'bg-white/80 backdrop-blur-xl border-slate-200/50 shadow-sm py-3' 
            : 'bg-white/50 backdrop-blur-sm border-transparent py-5'}
        `}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          
          {/* Logo / Name */}
          <div className="flex items-center gap-3">
            <img 
              src={profileImage} 
              alt="Profile" 
              className="w-10 h-10 rounded-xl object-cover shadow-lg shadow-blue-500/20 border-2 border-white"
            />
            <div>
              <h1 className="font-bold text-slate-800 text-lg leading-tight">{language === 'fa' ? 'دکتر امیر دژآباد' : 'Dr. Amir Dezhabad'}</h1>
              <p className="text-xs text-blue-600 font-medium">{labels.role}</p>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center bg-slate-100/50 p-1.5 rounded-2xl border border-white/50 backdrop-blur-md">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`
                  flex items-center px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 whitespace-nowrap
                  ${activeTab === item.id 
                    ? 'bg-white text-blue-600 shadow-sm text-shadow-sm' 
                    : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200/50'}
                `}
              >
                <item.icon className={`w-4 h-4 ${language === 'fa' ? 'ml-2' : 'mr-2'} ${activeTab === item.id ? 'stroke-[2.5px]' : ''}`} />
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="group relative flex items-center gap-2 px-3 py-2 bg-slate-100/50 hover:bg-white border border-transparent hover:border-slate-200 rounded-xl transition-all duration-300"
              aria-label="Toggle Language"
            >
               <Globe className="w-4 h-4 text-slate-500 group-hover:text-blue-600 transition-colors" />
               <span className="text-xs font-bold text-slate-600 group-hover:text-blue-600 font-mono">
                 {language === 'fa' ? 'EN' : 'FA'}
               </span>
            </button>

            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      <div className={`
        fixed inset-0 z-40 bg-white/95 backdrop-blur-xl transition-transform duration-300 lg:hidden pt-24 px-6
        ${isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'}
      `}>
        <div className="grid gap-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setIsMobileMenuOpen(false);
              }}
              className={`
                flex items-center p-4 rounded-2xl text-base font-medium transition-all
                ${activeTab === item.id 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'text-slate-600 border border-slate-100 hover:bg-slate-50'}
              `}
            >
              <item.icon className={`w-5 h-5 ${language === 'fa' ? 'ml-3' : 'mr-3'}`} />
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;