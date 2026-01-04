import React, { useState, useRef } from 'react';
import { PersonalInfo, Article, Education } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FileText, Award, Book, Briefcase, Activity, MapPin, Navigation, Instagram, Camera, Upload, Lock, Save, X, Image as ImageIcon, Link, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ADMIN_PASSWORD } from '../constants';

interface Props {
  info: PersonalInfo;
  articles: Article[];
  education: Education[];
  labels: any;
  onImageUpdate: (base64: string) => void;
}

const DashboardOverview: React.FC<Props> = ({ info, articles, education, labels, onImageUpdate }) => {
  // Admin / Upload Logic States
  const [clickCount, setClickCount] = useState(0);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadMode, setUploadMode] = useState<'file' | 'url'>('file');
  const [passwordInput, setPasswordInput] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [urlInput, setUrlInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const yearCounts: Record<string, number> = {};
  articles.forEach(article => {
    yearCounts[article.year] = (yearCounts[article.year] || 0) + 1;
  });

  const chartData = Object.keys(yearCounts)
    .sort()
    .map(year => ({ year, count: yearCounts[year] }));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  // --- Logic for Admin Trigger ---
  const handleImageAreaClick = () => {
    if (isAdmin) {
      setShowUploadModal(true);
      setPreviewImage(null);
      setUrlInput('');
      return;
    }
    
    const newCount = clickCount + 1;
    setClickCount(newCount);
    if (newCount >= 8) {
      setShowPasswordModal(true);
      setClickCount(0);
    }
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === ADMIN_PASSWORD) {
      setIsAdmin(true);
      setShowPasswordModal(false);
      setPasswordInput('');
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  };

  // Resize and compress image
  const processImageFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (readerEvent) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        const MAX_SIZE = 600;

        if (width > height) {
          if (width > MAX_SIZE) {
            height *= MAX_SIZE / width;
            width = MAX_SIZE;
          }
        } else {
          if (height > MAX_SIZE) {
            width *= MAX_SIZE / height;
            height = MAX_SIZE;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
          setPreviewImage(dataUrl);
        }
      };
      if (readerEvent.target?.result) {
        img.src = readerEvent.target.result as string;
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      processImageFile(file);
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrlInput(e.target.value);
    // Simple check to show preview immediately
    if (e.target.value.match(/^https?:\/\/.+/)) {
      setPreviewImage(e.target.value);
    }
  };

  const saveImage = () => {
    if (previewImage) {
      try {
        onImageUpdate(previewImage);
        setShowUploadModal(false);
        setPreviewImage(null);
        alert('تصویر با موفقیت در دیتابیس ذخیره شد.');
      } catch (error) {
        console.error("Storage failed", error);
        alert('خطا در ذخیره سازی.');
      }
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  // Medical Hero Component
  const MedicalHero = () => (
    <div className="relative w-full bg-gradient-to-br from-white via-blue-50/30 to-white rounded-[3rem] p-8 md:p-12 shadow-[0_20px_40px_-15px_rgba(59,130,246,0.1)] border border-white overflow-hidden mb-12 group">
      {/* Abstract Medical Background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-100/40 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
      
      {/* Decorative Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-[0.05] pointer-events-none"></div>

      <div className="relative z-10 flex flex-col md:flex-row items-center gap-10 md:gap-20">
        
        {/* Large Responsive Round Field (Medical Style) */}
        <div className="relative shrink-0">
           {/* Animated Pulse Rings */}
           <div className="absolute inset-0 rounded-full border-[3px] border-blue-100 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
           <div className="absolute -inset-6 rounded-full border border-cyan-100/60 animate-[pulse_4s_ease-in-out_infinite]"></div>
           <div className="absolute -inset-12 rounded-full border border-blue-50/30 animate-[pulse_5s_ease-in-out_infinite_reverse]"></div>
           
           {/* Main Circular Field - CLICK TRIGGER AREA */}
           <div className="w-48 h-48 md:w-72 md:h-72 rounded-full bg-white shadow-[0_15px_50px_-10px_rgba(59,130,246,0.25)] flex items-center justify-center p-3 relative">
              <div 
                className={`w-full h-full rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center overflow-hidden border-[6px] border-white shadow-inner relative transition-transform duration-700 ease-out cursor-pointer ${isAdmin ? 'hover:scale-[1.02]' : ''}`}
                onClick={handleImageAreaClick}
                title={isAdmin ? "برای تغییر عکس کلیک کنید" : ""}
              >
                  {/* Abstract DNA/Structure Background */}
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 z-10"></div>
                  
                  {/* Profile Image */}
                  <img 
                    src={info.profileImage} 
                    alt={info.name} 
                    className="w-full h-full object-cover relative z-0" 
                  />
                  
                  {/* Admin Indicator Overlay */}
                  {isAdmin && (
                    <div className="absolute inset-0 bg-black/30 z-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                       <Camera className="w-12 h-12 text-white/80" />
                    </div>
                  )}

                  {/* Glossy Overlay */}
                  <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/20 to-transparent blur-[1px] rounded-t-full z-20 pointer-events-none"></div>
              </div>
              
              {/* Status Indicator - BLUE */}
              <div className="absolute bottom-6 right-4 md:bottom-8 md:right-8 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg z-20">
                 <div className="w-6 h-6 bg-blue-500 rounded-full border-[3px] border-white animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
              </div>
           </div>
        </div>

        {/* Hero Text Content */}
        <div className="text-center md:text-right flex-1 space-y-6">
           <motion.div 
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/80 backdrop-blur rounded-full text-blue-600 text-sm font-bold shadow-sm border border-blue-100"
           >
              <Activity className="w-5 h-5 animate-pulse" />
              <span>{info.rank} {info.field}</span>
           </motion.div>
           
           <h1 className="text-4xl md:text-6xl font-black text-slate-800 tracking-tight leading-tight">
             {info.name}
           </h1>
           
           <p className="text-lg md:text-xl text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto md:mr-0">
             {education[education.length-1]?.degree} <span className="text-blue-600">{education[education.length-1]?.field}</span> {education[education.length-1]?.university ? (
               labels.dashboard === 'Dashboard' ? `from ${education[education.length-1]?.university}` : `از ${education[education.length-1]?.university}`
             ) : ''}.
             <span className="block mt-3 opacity-80 text-base font-normal">
               {labels.researcherDesc}
             </span>
           </p>

           {/* Quick Stats Row */}
           <div className="flex flex-wrap justify-center md:justify-start gap-8 md:gap-12 pt-6 border-t border-slate-100 mt-6">
              <div className="text-center md:text-right group/stat">
                 <p className="text-3xl font-black text-slate-800 group-hover/stat:text-blue-600 transition-colors">۲۲+</p>
                 <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-1">{labels.yearsExperience}</p>
              </div>
              <div className="hidden md:block w-px h-12 bg-slate-200"></div>
              <div className="text-center md:text-right group/stat">
                 <p className="text-3xl font-black text-slate-800 group-hover/stat:text-blue-600 transition-colors">{articles.length}</p>
                 <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-1">{labels.articlesCount}</p>
              </div>
              <div className="hidden md:block w-px h-12 bg-slate-200"></div>
               <div className="text-center md:text-right group/stat">
                 <p className="text-3xl font-black text-slate-800 group-hover/stat:text-blue-600 transition-colors">۱۰+</p>
                 <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-1">{labels.thesesCount}</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );

  const StatCard = ({ title, value, icon: Icon, color, subValue }: any) => (
    <motion.div 
      variants={itemVariants} 
      className="bg-white/80 backdrop-blur-md p-6 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(59,130,246,0.1)] transition-all duration-300 border border-white group"
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-slate-500 font-medium mb-1">{title}</p>
          <h3 className="text-2xl font-extrabold text-slate-800 tracking-tight group-hover:text-blue-600 transition-colors">{value}</h3>
          {subValue && <p className="text-xs text-slate-400 mt-2 font-medium">{subValue}</p>}
        </div>
        <div className={`p-4 rounded-2xl ${color} bg-opacity-20 transition-transform group-hover:scale-110`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </motion.div>
  );

  return (
    <motion.div 
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Password Modal */}
      <AnimatePresence>
        {showPasswordModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl border border-white/20"
            >
              <div className="flex items-center gap-3 mb-4 text-blue-600">
                <Lock className="w-6 h-6" />
                <h3 className="text-xl font-bold">ورود مدیر</h3>
              </div>
              <p className="text-sm text-slate-500 mb-6">برای دسترسی به قابلیت تغییر تصویر، رمز عبور را وارد کنید.</p>
              <form onSubmit={handlePasswordSubmit}>
                <input 
                  type="password" 
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="رمز عبور..."
                  className={`w-full p-4 rounded-xl bg-slate-50 border ${passwordError ? 'border-red-300 focus:ring-red-200' : 'border-slate-200 focus:ring-blue-200'} focus:ring-4 outline-none transition-all mb-4 text-center tracking-widest`}
                  autoFocus
                />
                <div className="flex gap-3">
                  <button 
                    type="button" 
                    onClick={() => { setShowPasswordModal(false); setPasswordError(false); setPasswordInput(''); }}
                    className="flex-1 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-100 transition-colors"
                  >
                    انصراف
                  </button>
                  <button 
                    type="submit" 
                    className="flex-1 py-3 rounded-xl font-bold bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30"
                  >
                    تایید
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Upload Image Modal with SAVE capability */}
      <AnimatePresence>
        {showUploadModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => setShowUploadModal(false)}
          >
            <motion.div 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-[2rem] p-6 max-w-md w-full shadow-2xl relative overflow-hidden"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-blue-600" />
                  مدیریت تصویر پروفایل
                </h3>
                <button onClick={() => setShowUploadModal(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>

              {/* Tabs */}
              <div className="flex p-1 bg-slate-100 rounded-xl mb-6">
                <button 
                  onClick={() => setUploadMode('file')}
                  className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${uploadMode === 'file' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500'}`}
                >
                  آپلود فایل
                </button>
                <button 
                  onClick={() => setUploadMode('url')}
                  className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${uploadMode === 'url' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500'}`}
                >
                  لینک مستقیم (Global)
                </button>
              </div>

              <div className="space-y-6">
                {/* Content based on Tab */}
                {uploadMode === 'file' ? (
                  <>
                     <div className="w-full aspect-square rounded-full bg-slate-100 border-4 border-dashed border-slate-200 flex items-center justify-center overflow-hidden relative group max-w-[200px] mx-auto">
                        {previewImage ? (
                          <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                        ) : (
                          <div className="text-center text-slate-400 p-4">
                            <Upload className="w-8 h-8 mx-auto mb-2 opacity-50" />
                            <span className="text-xs">انتخاب فایل</span>
                          </div>
                        )}
                        <div 
                          className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
                          onClick={triggerFileUpload}
                        >
                          <p className="text-white font-bold text-sm">انتخاب عکس</p>
                        </div>
                     </div>
                     <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleFileChange} 
                        className="hidden" 
                        accept="image/*"
                      />
                     <div className="bg-orange-50/50 p-3 rounded-xl text-xs text-orange-700 leading-relaxed border border-orange-100 flex items-start gap-2">
                       <Lock className="w-4 h-4 shrink-0 mt-0.5" />
                       <p><strong>توجه:</strong> آپلود فایل فقط روی این دستگاه ذخیره می‌شود. برای نمایش در همه گوشی‌ها از تب "لینک مستقیم" استفاده کنید.</p>
                     </div>
                  </>
                ) : (
                  <>
                    <div className="space-y-3">
                      <label className="text-xs font-bold text-slate-500">لینک مستقیم تصویر (از اینترنت)</label>
                      <div className="relative">
                        <Link className="absolute right-3 top-3 w-5 h-5 text-slate-400" />
                        <input 
                          type="text" 
                          placeholder="https://example.com/my-photo.jpg" 
                          value={urlInput}
                          onChange={handleUrlChange}
                          className="w-full pr-10 pl-3 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-blue-200 outline-none text-left"
                          dir="ltr"
                        />
                      </div>
                      
                      {previewImage && (
                        <div className="mt-4 flex items-center gap-4 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                          <img src={previewImage} alt="Preview" className="w-16 h-16 rounded-xl object-cover border border-white shadow-sm" />
                          <div className="text-xs text-green-600 font-bold">
                            پیش‌نمایش تصویر بارگذاری شد.
                          </div>
                        </div>
                      )}
                      
                       <div className="bg-green-50/50 p-3 rounded-xl text-xs text-green-700 leading-relaxed border border-green-100 flex items-start gap-2">
                         <Globe className="w-4 h-4 shrink-0 mt-0.5" />
                         <p><strong>پیشنهاد:</strong> استفاده از لینک مستقیم باعث می‌شود عکس شما در تمام گوشی‌ها و دستگاه‌ها دیده شود.</p>
                       </div>
                    </div>
                  </>
                )}

                <div className="flex gap-3 pt-2">
                  <button 
                    onClick={saveImage}
                    disabled={!previewImage}
                    className={`flex-1 py-3 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all shadow-lg ${previewImage ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/30 cursor-pointer' : 'bg-slate-300 cursor-not-allowed'}`}
                  >
                    <Save className="w-4 h-4" />
                    ذخیره در دیتابیس
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div variants={itemVariants}>
         <MedicalHero />
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title={labels.publishedArticles} 
          value={articles.length} 
          icon={FileText} 
          color="bg-blue-100 text-blue-600"
          subValue={labels.journalConf}
        />
        <StatCard 
          title={labels.specialty} 
          value={info.field} 
          icon={Briefcase} 
          color="bg-cyan-100 text-cyan-600"
        />
        <StatCard 
          title={labels.lastDegree} 
          value={education[education.length-1]?.degree} 
          icon={Book} 
          color="bg-indigo-100 text-indigo-600"
          subValue={education[education.length-1]?.field}
        />
        <StatCard 
          title={labels.rank} 
          value={info.rank} 
          icon={Award} 
          color="bg-emerald-100 text-emerald-600"
        />
      </div>

      {/* Clinic Location Section (Moved Here for Better Visibility) */}
      <motion.div 
        variants={itemVariants}
        className="bg-white/80 backdrop-blur-md p-8 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white relative overflow-hidden group hover:border-blue-100 transition-colors"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50 pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-right">
           <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20 shrink-0 transform group-hover:rotate-6 transition-transform duration-300">
                 <MapPin className="w-10 h-10" />
              </div>
              <div>
                 <h3 className="text-2xl font-black text-slate-800 mb-2">{labels.clinicName}</h3>
                 <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-sm font-bold border border-blue-100">
                    <Activity className="w-4 h-4" />
                    <span>{labels.clinicSub}</span>
                 </div>
                 <p className="text-slate-400 text-sm mt-3 max-w-md">{labels.clinicDesc}</p>
              </div>
           </div>

           <a 
              href="https://maps.app.goo.gl/bx7NQ59vrZhAxMPR6"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-8 py-4 bg-slate-800 hover:bg-blue-600 text-white rounded-2xl font-bold transition-all hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-1 group/btn min-w-[200px] justify-center"
           >
              <span>{labels.getDirections}</span>
              <Navigation className="w-5 h-5 group-hover/btn:-translate-x-1 transition-transform rtl:rotate-180" />
           </a>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart Section */}
        <motion.div 
          variants={itemVariants} 
          className="lg:col-span-2 bg-white/80 backdrop-blur-md p-8 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white"
        >
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                 <Activity className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-800">{labels.researchAnalysis}</h3>
                <p className="text-sm text-slate-500 mt-1">{labels.researchDist}</p>
              </div>
            </div>
          </div>
          <div className="h-[300px] w-full min-h-[300px]" style={{ minHeight: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.6}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="year" 
                  stroke="#94a3b8" 
                  tick={{fontSize: 12, fill: '#64748b'}} 
                  axisLine={false}
                  tickLine={false}
                  dy={10}
                />
                <YAxis 
                  allowDecimals={false} 
                  stroke="#94a3b8" 
                  tick={{fontSize: 12, fill: '#64748b'}} 
                  axisLine={false}
                  tickLine={false}
                  dx={-10}
                />
                <Tooltip 
                  cursor={{fill: '#f8fafc', radius: 12}}
                  contentStyle={{
                    borderRadius: '16px', 
                    border: 'none', 
                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    padding: '16px',
                    fontFamily: 'inherit'
                  }} 
                />
                <Bar 
                  dataKey="count" 
                  name={labels.articlesChart} 
                  radius={[8, 8, 8, 8]} 
                  barSize={40}
                  fill="url(#colorCount)"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Contact Info */}
        <motion.div variants={itemVariants} className="space-y-6">
           <div className="bg-gradient-to-br from-blue-600 to-cyan-500 p-8 rounded-[2.5rem] shadow-xl text-white relative overflow-hidden h-full flex flex-col justify-center">
             <div className="absolute top-0 left-0 w-32 h-32 bg-white opacity-10 rounded-full -translate-x-10 -translate-y-10 blur-2xl"></div>
             <div className="absolute bottom-0 right-0 w-32 h-32 bg-cyan-300 opacity-20 rounded-full translate-x-10 translate-y-10 blur-xl animate-pulse"></div>
             
             <h3 className="text-xl font-bold mb-8 relative z-10 border-b border-white/20 pb-4 flex items-center gap-2">
               <span className="w-2 h-2 bg-white rounded-full"></span>
               {labels.contactInfo}
             </h3>
             
             <div className="space-y-6 relative z-10">
               <div>
                 <p className="text-blue-100 text-xs mb-1">{labels.personalEmail}</p>
                 <p className="font-mono text-sm opacity-90 bg-white/10 p-2 rounded-lg inline-block" dir="ltr">{info.email}</p>
               </div>
               
               <div>
                 <p className="text-blue-100 text-xs mb-1">{labels.academicEmail}</p>
                 <p className="font-mono text-sm opacity-90 bg-white/10 p-2 rounded-lg inline-block" dir="ltr">{info.academicEmail}</p>
               </div>
               
               <div>
                 <p className="text-blue-100 text-xs mb-1">{labels.socials}</p>
                 <a 
                   href="https://www.instagram.com/dr.dezhabad/?hl=en" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="flex items-center gap-3 bg-white/10 hover:bg-white/20 p-2 rounded-xl transition-all w-fit group/insta"
                 >
                   <div className="p-1.5 bg-white rounded-lg text-purple-600 group-hover/insta:scale-110 transition-transform">
                      <Instagram className="w-4 h-4" />
                   </div>
                   <span className="text-sm font-bold font-mono tracking-wide" dir="ltr">@dr.dezhabad</span>
                 </a>
               </div>
             </div>
           </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DashboardOverview;