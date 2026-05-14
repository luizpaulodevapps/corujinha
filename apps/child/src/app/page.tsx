import { redirect } from 'next/navigation'

export default function ChildHomePage() {
  redirect('/dashboard')
}
