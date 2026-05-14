import { ChildBottomNav } from '@/components/child-bottom-nav'

export default function ChildAppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen bg-brand-bg">
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -top-28 right-[-10%] h-80 w-80 rounded-full bg-brand-secondary/20 blur-[100px]" />
        <div className="absolute top-1/4 left-[-15%] h-80 w-80 rounded-full bg-brand-primary/15 blur-[100px]" />
      </div>
      
      {children}
      
      <ChildBottomNav />
    </div>
  )
}

