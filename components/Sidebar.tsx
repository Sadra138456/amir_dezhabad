import React from 'react';
import { LayoutDashboard, User, GraduationCap, BookOpen, PenTool, Users } from 'lucide-react';
import { TabView } from '../types';

interface SidebarProps {
  activeTab: TabView;
  setActiveTab: (tab: TabView) => void;
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, isOpen, toggleSidebar }) => {
  const menuItems = [
    { id: TabView.DASHBOARD, label: 'داشبورد', icon: LayoutDashboard },
    { id: TabView.PROFILE, label: 'اطلاعات شخصی', icon: User },
    { id: TabView.EDUCATION, label: 'سوابق تحصیلی', icon: GraduationCap },
    { id: TabView.PUBLICATIONS, label: 'مقالات و پژوهش‌ها', icon: BookOpen },
    { id: TabView.TEACHING, label: 'تدریس', icon: PenTool },
    { id: TabView.THESIS, label: 'پایان‌نامه‌ها', icon: Users },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      <aside className={`
        fixed top-0 right-0 h-full z-50 transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1)
        ${isOpen ? 'w-72 translate-x-0' : 'w-72 translate-x-full md:translate-x-0'}
        bg-white/80 backdrop-blur-xl border-l border-white/50 shadow-[0_0_40px_-10px_rgba(0,0,0,0.05)]
      `}>
        <div className="p-8 flex flex-col items-center justify-center">
          <div className="relative mb-4 group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-cyan-300 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-2xl font-bold text-white shadow-xl">
               AD
            </div>
          </div>
          <div className="text-center">
            <h1 className="font-bold text-lg text-slate-800">دکتر امیر دژآباد</h1>
            <p className="text-sm text-blue-500 font-medium mt-1">پنل تخصصی و رزومه</p>
          </div>
        </div>

        <nav className="mt-2 px-4">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => {
                    setActiveTab(item.id);
                    if (window.innerWidth < 768) toggleSidebar();
                  }}
                  className={`
                    w-full flex items-center p-3.5 rounded-2xl transition-all duration-300 group
                    ${activeTab === item.id 
                      ? 'bg-blue-50/80 text-blue-600 shadow-sm' 
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}
                  `}
                >
                  <item.icon className={`
                    w-5 h-5 ml-3 transition-colors duration-300
                    ${activeTab === item.id ? 'text-blue-600' : 'text-slate-400 group-hover:text-blue-500'}
                  `} />
                  <span className="font-medium">{item.label}</span>
                  {activeTab === item.id && (
                    <span className="mr-auto w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="absolute bottom-0 w-full p-6">
           <div className="bg-gradient-to-r from-blue-50 to-transparent p-4 rounded-2xl border border-blue-100/50">
             <div className="flex items-center gap-2 text-slate-500 text-xs font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                در دسترس برای مشاوره
             </div>
           </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;