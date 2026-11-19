'use client';

import {useEffect,useState} from 'react';
import {Moon,Sun} from 'lucide-react';

type Theme='light'|'dark';

export function ThemeSelector(){
  const [theme,setTheme]=useState<Theme>('light');

  useEffect(()=>{
    const sync=()=>setTheme(document.documentElement.dataset.theme==='dark'?'dark':'light');
    sync();
    window.addEventListener('campuspulse-theme-change',sync);
    window.addEventListener('storage',sync);
    return()=>{
      window.removeEventListener('campuspulse-theme-change',sync);
      window.removeEventListener('storage',sync);
    };
  },[]);

  const choose=(next:Theme)=>{
    setTheme(next);
    document.documentElement.dataset.theme=next;
    document.documentElement.style.colorScheme=next;
    try{
      window.localStorage.setItem('campuspulse-theme',next);
    }catch{
      // Theme still applies for this session if storage is unavailable.
    }
    window.dispatchEvent(new Event('campuspulse-theme-change'));
  };

  return <div className="theme-selector" role="group" aria-label="Colour theme">
    <button type="button" className={theme==='light'?'active':''} onClick={()=>choose('light')} aria-pressed={theme==='light'} title="Use light theme">
      <Sun size={14}/><span>Light</span>
    </button>
    <button type="button" className={theme==='dark'?'active':''} onClick={()=>choose('dark')} aria-pressed={theme==='dark'} title="Use dark theme">
      <Moon size={14}/><span>Dark</span>
    </button>
  </div>;
}
