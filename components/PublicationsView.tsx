import React, { useState } from 'react';
import { Article } from '../types';
import { FileText, Mic, Search, Filter } from 'lucide-react';
import { motion } from 'framer-motion';

interface Props {
  articles: Article[];
  labels: any;
}

const PublicationsView: React.FC<Props> = ({ articles, labels }) => {
  const [filter, setFilter] = useState<'all' | 'journal' | 'conference'>('all');
  const [search, setSearch] = useState('');

  const filteredArticles = articles.filter(article => {
    const matchesFilter = filter === 'all' || article.type === filter;
    const matchesSearch = article.title.toLowerCase().includes(search.toLowerCase()) || 
                          article.authors.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Search and Filter Header */}
      <div className="bg-white/70 backdrop-blur-md p-2 rounded-[1.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex p-1.5 bg-slate-100/50 rounded-2xl w-full md:w-auto">
          {['all', 'journal', 'conference'].map((f) => (
            <button 
              key={f}
              onClick={() => setFilter(f as any)}
              className={`
                px-6 py-2.5 text-sm font-bold rounded-xl transition-all duration-300
                ${filter === f 
                  ? 'bg-white text-blue-600 shadow-md shadow-slate-200' 
                  : 'text-slate-400 hover:text-slate-600'}
              `}
            >
              {f === 'all' ? labels.filterAll : f === 'journal' ? labels.filterJournal : labels.filterConf}
            </button>
          ))}
        </div>
        
        <div className="relative w-full md:w-80 px-2 pb-2 md:pb-0">
          <Search className="absolute rtl:right-6 ltr:left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input 
            type="text" 
            placeholder={labels.searchPlaceholder}
            className="w-full rtl:pr-12 rtl:pl-4 ltr:pl-12 ltr:pr-4 py-3 bg-white border-none rounded-2xl text-sm shadow-sm focus:ring-2 focus:ring-blue-100 focus:shadow-md transition-all outline-none text-slate-700 placeholder:text-slate-400"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Results */}
      <div className="grid gap-5">
        {filteredArticles.map((article, index) => (
          <motion.div 
            key={article.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white/80 backdrop-blur-sm p-6 rounded-[2rem] border border-white shadow-sm hover:shadow-[0_8px_30px_rgb(59,130,246,0.08)] hover:-translate-y-1 transition-all duration-300 group"
          >
            <div className="flex items-start gap-5">
              <div className={`
                w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-inner
                ${article.type === 'journal' ? 'bg-blue-50 text-blue-600' : 'bg-cyan-50 text-cyan-600'}
              `}>
                {article.type === 'journal' ? <FileText className="w-7 h-7" /> : <Mic className="w-7 h-7" />}
              </div>
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-3 mb-2">
                   <h3 className="text-lg font-bold text-slate-800 group-hover:text-blue-600 transition-colors leading-relaxed line-clamp-2" dir="auto">
                    {article.title}
                   </h3>
                   <span className="px-4 py-1.5 text-xs font-bold rounded-xl bg-slate-50 text-slate-500 shrink-0 border border-slate-100">
                     {article.year}
                   </span>
                </div>
                <p className="text-sm text-slate-500 mb-4 leading-relaxed line-clamp-2" dir="auto">{article.authors}</p>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="px-3 py-1 bg-blue-50/50 text-blue-700 text-xs font-medium rounded-lg border border-blue-100/50">
                    {article.journal}
                  </span>
                  {(article.volume || article.page) && (
                    <div className="flex gap-2 text-xs text-slate-400 font-mono">
                      {article.volume && <span>Vol: {article.volume}</span>}
                      {article.page && <span>Pp: {article.page}</span>}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PublicationsView;