import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import DashboardOverview from './components/DashboardOverview';
import PublicationsView from './components/PublicationsView';
import { getData } from './constants';
import { db } from './database';
import { TabView, Language } from './types';
import { motion, AnimatePresence } from 'framer-motion';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabView>(TabView.DASHBOARD);
  const [language, setLanguage] = useState<Language>('fa');
  const [customProfileImage, setCustomProfileImage] = useState<string | null>(null);

  // Load custom image from Database on mount
  useEffect(() => {
    const loadData = async () => {
      const savedImage = await db.getProfileImage();
      if (savedImage) {
        setCustomProfileImage(savedImage);
      }
    };
    loadData();
  }, []);

  // Update body classes for font changes based on language
  useEffect(() => {
    if (language === 'en') {
      document.body.classList.add('font-en');
    } else {
      document.body.classList.remove('font-en');
    }
  }, [language]);

  // Handler to update image in state and database
  const handleImageUpdate = async (newImage: string) => {
    setCustomProfileImage(newImage);
    await db.saveProfileImage(newImage);
  };

  const { personalInfo: basePersonalInfo, education, teaching, theses, articles, ui: labels } = getData(language);
  
  // Override profile image if custom one exists
  const personalInfo = {
    ...basePersonalInfo,
    profileImage: customProfileImage || basePersonalInfo.profileImage
  };

  const renderContent = () => {
    switch (activeTab) {
      case TabView.DASHBOARD:
        return (
          <DashboardOverview 
            info={personalInfo} 
            articles={articles} 
            education={education} 
            labels={labels}
            onImageUpdate={handleImageUpdate}
          />
        );
      case TabView.PUBLICATIONS:
        return <PublicationsView articles={articles} labels={labels} />;
      case TabView.PROFILE:
        return (
          <div className="bg-white/80 backdrop-blur-md p-8 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white">
            <div className="flex items-center gap-4 mb-8 border-b border-slate-100 pb-6">
               <img 
                 src={personalInfo.profileImage} 
                 alt={personalInfo.name} 
                 className="w-20 h-20 rounded-2xl object-cover shadow-lg border-4 border-white"
               />
               <div>
                  <h2 className="text-2xl font-bold text-slate-800">{labels.bioTitle}</h2>
                  <p className="text-slate-500 text-sm">{labels.bioSubtitle}</p>
               </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
               {[
                 { label: labels.nameLabel, value: personalInfo.name },
                 { label: labels.rankLabel, value: personalInfo.rank },
                 { label: labels.groupLabel, value: personalInfo.group },
                 { label: labels.fieldLabel, value: personalInfo.field },
               ].map((item, idx) => (
                 <div key={idx} className="group">
                    <label className="block text-xs font-bold text-blue-500 mb-2 uppercase tracking-wide opacity-80">{item.label}</label>
                    <p className="text-lg font-medium text-slate-700 border-b border-slate-100 pb-2 group-hover:border-blue-200 transition-colors">{item.value}</p>
                 </div>
               ))}
               
               <div className="md:col-span-2 mt-4">
                   <div className="bg-gradient-to-r from-blue-50 to-white p-6 rounded-3xl border border-blue-100">
                       <h3 className="text-blue-800 font-bold mb-4 flex items-center gap-2">
                         <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                         {labels.contactMe}
                       </h3>
                       <div className="grid md:grid-cols-2 gap-6">
                           <div>
                             <span className="text-xs text-slate-500 block mb-1">{labels.emailLabel}</span>
                             <span className="font-mono text-blue-600 bg-white px-3 py-1 rounded-lg border border-blue-100 block w-fit" dir="ltr">{personalInfo.email}</span>
                           </div>
                           <div>
                             <span className="text-xs text-slate-500 block mb-1">{labels.uniEmailLabel}</span>
                             <span className="font-mono text-blue-600 bg-white px-3 py-1 rounded-lg border border-blue-100 block w-fit" dir="ltr">{personalInfo.academicEmail}</span>
                           </div>
                       </div>
                   </div>
               </div>
            </div>
          </div>
        );
      case TabView.EDUCATION:
        return (
          <div className="space-y-8">
             <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-800">{labels.eduTitle}</h2>
                <div className="h-1 flex-1 mx-6 bg-slate-100 rounded-full"></div>
             </div>
             
             <div className="space-y-6">
               {education.map((edu, index) => (
                 <motion.div 
                    key={edu.id}
                    initial={{ opacity: 0, x: language === 'fa' ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-6"
                 >
                   <div className="flex flex-col items-center">
                      <div className="w-4 h-4 rounded-full bg-blue-500 border-4 border-blue-100 shadow-sm z-10"></div>
                      {index !== education.length - 1 && <div className="w-0.5 flex-1 bg-slate-200 my-2"></div>}
                   </div>
                   <div className="flex-1 pb-8">
                     <div className="bg-white/80 backdrop-blur-sm p-6 rounded-[2rem] shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-white hover:border-blue-100 transition-colors">
                        <div className="flex flex-wrap justify-between items-start mb-3 gap-2">
                          <h3 className="text-xl font-bold text-slate-800">{edu.degree}</h3>
                          <span className="px-4 py-1.5 bg-blue-50 text-blue-600 rounded-2xl text-sm font-bold shadow-sm">{edu.year}</span>
                        </div>
                        <p className="text-lg text-blue-600 font-medium mb-2">{edu.field}</p>
                        <div className="flex items-center gap-2 text-slate-500">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                          <p>{edu.university}</p>
                        </div>
                     </div>
                   </div>
                 </motion.div>
               ))}
             </div>
          </div>
        );
      case TabView.TEACHING:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">{labels.teachingTitle}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {teaching.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.03 }}
                  className="bg-white/70 backdrop-blur-sm p-5 rounded-[1.5rem] shadow-sm border border-white hover:border-blue-200 hover:shadow-md transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center font-bold text-lg group-hover:bg-cyan-100 group-hover:scale-110 transition-all">
                      {index + 1}
                    </div>
                    <span className="font-bold text-slate-700 group-hover:text-blue-600 transition-colors">{course.title}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );
      case TabView.THESIS:
        return (
          <div className="space-y-6">
             <h2 className="text-2xl font-bold text-slate-800 mb-6">{labels.thesisTitle}</h2>
             {theses.map((thesis) => (
               <div key={thesis.id} className="bg-white/80 backdrop-blur-sm p-8 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white relative overflow-hidden group">
                 <div className="absolute top-0 rtl:right-0 ltr:left-0 w-2 h-full bg-orange-400"></div>
                 <div className="rtl:mr-4 ltr:ml-4">
                    <div className="flex flex-col md:flex-row justify-between gap-6 mb-4">
                       <h3 className="text-xl font-bold text-slate-800 leading-relaxed">{thesis.title}</h3>
                       <span className="px-4 py-2 bg-orange-50 text-orange-600 rounded-2xl text-sm font-bold h-fit whitespace-nowrap text-center border border-orange-100">
                         {thesis.year}
                       </span>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-6 text-sm">
                      <div className="bg-slate-50 p-3 rounded-2xl">
                         <span className="block text-slate-400 text-xs mb-1">{labels.student}</span>
                         <span className="font-bold text-slate-700">{thesis.student}</span>
                      </div>
                      <div className="bg-slate-50 p-3 rounded-2xl">
                         <span className="block text-slate-400 text-xs mb-1">{labels.thesisRole}</span>
                         <span className="font-bold text-slate-700">{thesis.role}</span>
                      </div>
                      <div className="bg-slate-50 p-3 rounded-2xl">
                         <span className="block text-slate-400 text-xs mb-1">{labels.level}</span>
                         <span className="font-bold text-slate-700">{thesis.level}</span>
                      </div>
                    </div>
                    <p className="text-slate-400 text-xs mt-4 flex items-center gap-2">
                       <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                       {thesis.university}
                    </p>
                 </div>
               </div>
             ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen flex flex-col text-slate-800 pt-24 ${language === 'en' ? 'font-en' : ''}`} dir={language === 'fa' ? 'rtl' : 'ltr'}>
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        language={language}
        setLanguage={setLanguage}
        profileImage={personalInfo.profileImage}
      />

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 pb-12">
        {/* Only show Title for sections other than Dashboard (since dashboard has its own Hero) */}
        {activeTab !== TabView.DASHBOARD && (
          <div className="mb-10 text-center md:text-right rtl:md:text-right ltr:md:text-left">
              <motion.div
                 initial={{ opacity: 0, y: -10 }}
                 animate={{ opacity: 1, y: 0 }}
                 key={activeTab}
              >
                 <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
                   {activeTab === TabView.PROFILE ? labels.bioTitle :
                     activeTab === TabView.EDUCATION ? labels.eduTitle :
                     activeTab === TabView.PUBLICATIONS ? labels.pubTitle :
                     activeTab === TabView.TEACHING ? labels.teachingTitle : labels.thesisTitle
                   }
                 </h1>
                 <p className="text-slate-500 text-lg md:text-xl max-w-3xl leading-relaxed">
                   {activeTab === TabView.PROFILE ? labels.bioSubtitle :
                    activeTab === TabView.PUBLICATIONS ? labels.pubSubtitle :
                    ''}
                 </p>
              </motion.div>
          </div>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeTab}-${language}`}
            initial={{ opacity: 0, y: 20, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.99 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>
      
      <footer className="w-full mt-auto bg-slate-900 text-slate-400 py-3 text-center text-sm border-t border-slate-800">
         {labels.footerRights}
      </footer>
    </div>
  );
};

export default App;