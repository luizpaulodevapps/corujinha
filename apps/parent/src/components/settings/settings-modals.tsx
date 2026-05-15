'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Camera, 
  Loader2, 
  Sparkles, 
  ShieldAlert, 
  Trash2, 
  Key, 
  Mail,
  Smartphone,
  CheckCircle2,
  AlertCircle
} from 'lucide-react'
import { InputGroup, ToggleItem } from './settings-ui'

export function ProfileSettings({ user, isSaving, onSave }: any) {
  const [firstName, setFirstName] = useState(user?.firstName || '')
  const [lastName, setLastName] = useState(user?.lastName || '')
  const [birthDate, setBirthDate] = useState(user?.birthDate || '')
  const [whatsapp, setWhatsapp] = useState(user?.whatsapp || '')
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center gap-4">
        <div className="relative group">
          <div className="w-24 h-24 bg-brand-primary/5 rounded-[2rem] flex items-center justify-center text-5xl border-4 border-card-border group-hover:border-brand-primary transition-all shadow-inner overflow-hidden">
            <span className="group-hover:scale-110 transition-transform">
              {user?.photoURL ? <img src={user.photoURL} className="w-full h-full object-cover" /> : '🦉'}
            </span>
          </div>
          <button className="absolute -right-1 -bottom-1 w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center text-white shadow-lg border-4 border-card-border hover:scale-110 transition-transform">
            <Camera size={18} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-[10px] font-black text-brand-secondary/40 uppercase tracking-widest ml-2">Nome</label>
          <input 
            className="w-full h-14 px-6 bg-white rounded-2xl border-4 border-card-border shadow-sm font-bold text-brand-primary focus:outline-none focus:border-brand-primary/20 transition-all"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Ex: Luiz"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black text-brand-secondary/40 uppercase tracking-widest ml-2">Sobrenome</label>
          <input 
            className="w-full h-14 px-6 bg-white rounded-2xl border-4 border-card-border shadow-sm font-bold text-brand-primary focus:outline-none focus:border-brand-primary/20 transition-all"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Ex: Silva"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-[10px] font-black text-brand-secondary/40 uppercase tracking-widest ml-2">Nascimento</label>
          <input 
            type="date"
            className="w-full h-14 px-6 bg-white rounded-2xl border-4 border-card-border shadow-sm font-bold text-brand-primary focus:outline-none focus:border-brand-primary/20 transition-all"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black text-brand-secondary/40 uppercase tracking-widest ml-2">WhatsApp</label>
          <input 
            className="w-full h-14 px-6 bg-white rounded-2xl border-4 border-card-border shadow-sm font-bold text-brand-primary focus:outline-none focus:border-brand-primary/20 transition-all"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            placeholder="(00) 00000-0000"
          />
        </div>
      </div>

      <div className="space-y-4">
        <InputGroup label="E-mail Eterno" value={user?.email || ''} readOnly className="bg-brand-primary/5 opacity-60" />
      </div>

      <button
        onClick={() => onSave({ firstName, lastName, birthDate, whatsapp })}
        disabled={isSaving}
        className="w-full py-5 mt-6 rounded-2xl bg-brand-primary text-white font-black shadow-[0_6px_0_0_#1B4332] active:translate-y-1 active:shadow-none flex items-center justify-center gap-2"
      >
        {isSaving ? <Loader2 className="animate-spin" size={24} /> : (
          <><Sparkles size={20} /> Consolidar Sabedoria</>
        )}
      </button>
    </div>
  )
}

export function SecuritySettings({ onResetPassword }: any) {
  const [sent, setSent] = useState(false)
  
  return (
    <div className="space-y-6">
      <div className="bg-brand-primary/5 p-6 rounded-3xl border-2 border-brand-primary/10 flex items-start gap-4">
        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-brand-primary shadow-sm shrink-0">
          <Key size={20} />
        </div>
        <div>
          <h4 className="font-black text-brand-primary text-sm uppercase">Redefinir Senha</h4>
          <p className="text-xs font-medium text-brand-secondary/60 mt-1">
            Enviaremos um pergaminho mágico para o seu e-mail com as instruções de troca.
          </p>
        </div>
      </div>

      {!sent ? (
        <button
          onClick={async () => {
            await onResetPassword()
            setSent(true)
          }}
          className="w-full py-5 rounded-2xl bg-white border-4 border-card-border text-brand-primary font-black shadow-sm hover:bg-brand-primary/5 transition-all flex items-center justify-center gap-2"
        >
          <Mail size={20} /> Enviar E-mail de Redefinição
        </button>
      ) : (
        <div className="flex flex-col items-center py-4 gap-2 animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 size={40} className="text-emerald-500" />
          <p className="font-black text-brand-primary text-center">E-mail Enviado!</p>
          <p className="text-xs font-medium text-brand-secondary/40 text-center">Verifique sua caixa de entrada e spam.</p>
        </div>
      )}
    </div>
  )
}

export function DeleteAccountModal({ onDelete }: any) {
  const [confirm, setConfirm] = useState('')
  
  return (
    <div className="space-y-8">
      <div className="bg-brand-danger/5 p-8 rounded-[2.5rem] border-4 border-dashed border-brand-danger/20 text-center space-y-4">
        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-brand-danger shadow-sm mx-auto border-4 border-brand-danger/10">
          <ShieldAlert size={32} />
        </div>
        <div>
          <h4 className="text-xl font-black text-brand-danger">Decisão Crítica</h4>
          <p className="text-xs font-medium text-brand-secondary/60 mt-2">
            Ao abandonar o ninho, todos os dados da família, missões e conquistas dos exploradores serão <b className="text-brand-danger">apagados para sempre</b>.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <p className="text-[10px] font-black text-brand-secondary/40 uppercase tracking-widest text-center">
          Digite <span className="text-brand-danger">ABANDONAR</span> para confirmar
        </p>
        <input 
          className="w-full h-14 px-6 bg-white rounded-2xl border-4 border-brand-danger/10 shadow-sm font-bold text-brand-danger text-center focus:outline-none focus:border-brand-danger/30 transition-all uppercase"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          placeholder="..."
        />
      </div>

      <button
        disabled={confirm !== 'ABANDONAR'}
        onClick={onDelete}
        className="w-full py-5 rounded-2xl bg-brand-danger text-white font-black shadow-[0_6px_0_0_#991B1B] active:translate-y-1 active:shadow-none disabled:opacity-30 disabled:translate-y-0 disabled:shadow-none transition-all flex items-center justify-center gap-2"
      >
        <Trash2 size={20} /> Excluir Tudo Permanentemente
      </button>
    </div>
  )
}
