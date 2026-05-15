'use client'

import { useState } from 'react'
import { ChevronRight } from 'lucide-react'

interface SettingsItemProps {
  icon: React.ReactNode
  label: string
  description: string
  onClick: () => void
  last?: boolean
}

export function SettingsItem({ icon, label, description, onClick, last = false }: SettingsItemProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between p-6 hover:bg-brand-primary/5 transition-all text-left group
      ${!last ? 'border-b-4 border-card-border' : ''}`}
    >
      <div className="flex items-center gap-5">
        <div className="w-12 h-12 bg-brand-primary/5 text-brand-primary rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all border-2 border-card-border shadow-sm">
          {icon}
        </div>
        <div className="flex flex-col">
          <h3 className="font-black text-brand-primary text-xl italic leading-tight">{label}</h3>
          <p className="text-sm font-bold text-brand-secondary/40 mt-1 uppercase tracking-widest">{description}</p>
        </div>
      </div>
      <ChevronRight size={24} className="text-brand-secondary/20 group-hover:text-brand-primary group-hover:translate-x-2 transition-all" />
    </button>
  )
}

export function InputGroup({ label, ...props }: any) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black text-brand-secondary/40 uppercase tracking-widest ml-4">{label}</label>
      <input 
        {...props}
        className={`w-full h-14 px-6 bg-brand-primary/5 rounded-2xl border-4 border-card-border shadow-sm font-bold text-brand-primary placeholder:text-brand-secondary/20 focus:outline-none focus:border-brand-primary/20 transition-all ${props.className || ''}`} 
      />
    </div>
  )
}

export function ToggleItem({ label, description, defaultChecked = false }: any) {
  const [checked, setChecked] = useState(defaultChecked)
  return (
    <div className="flex items-center justify-between p-6 bg-brand-primary/5 rounded-[2rem] border-4 border-card-border shadow-sm">
      <div>
        <p className="font-black text-brand-primary text-xl italic">{label}</p>
        <p className="text-xs text-brand-secondary/40 font-bold mt-1 uppercase tracking-widest">{description}</p>
      </div>
      <button
        onClick={() => setChecked(!checked)}
        className={`w-16 h-8 rounded-full transition-all relative ${checked ? 'bg-brand-primary' : 'bg-brand-secondary/20'}`}
      >
        <div className={`absolute top-1 w-6 h-6 bg-card-bg rounded-full transition-all shadow-sm ${checked ? 'left-9' : 'left-1'}`} />
      </button>
    </div>
  )
}
