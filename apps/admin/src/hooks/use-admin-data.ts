'use client'

import { 
  getFirebaseFirestore, 
  getFirebaseAuth 
} from '@corujinha/firebase'
import { 
  collection, 
  query, 
  onSnapshot, 
  doc, 
  updateDoc, 
  setDoc,
  addDoc, 
  deleteDoc,
  serverTimestamp,
  orderBy,
  limit,
  where
} from 'firebase/firestore'
import { useEffect, useState } from 'react'
import type { 
  Family, 
  Child, 
  Task, 
  TaskExecution, 
  Transaction,
  Reward
} from '@corujinha/domain'

export function useAdminData() {
  const [families, setFamilies] = useState<Family[]>([])
  const [children, setChildren] = useState<Child[]>([])
  const [tasks, setTasks] = useState<Task[]>([])
  const [pendingTasks, setPendingTasks] = useState<TaskExecution[]>([])
  const [rewards, setRewards] = useState<Reward[]>([])
  const [media, setMedia] = useState<any[]>([])
  const [tips, setTips] = useState<any[]>([])
  const [products, setProducts] = useState<any[]>([])
  const [partners, setPartners] = useState<any[]>([])
  const [mascots, setMascots] = useState<any[]>([])
  const [systemSettings, setSystemSettings] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  const db = getFirebaseFirestore()

  useEffect(() => {
    const unsubFamilies = onSnapshot(query(collection(db, 'families'), orderBy('createdAt', 'desc')), (snapshot) => {
      setFamilies(snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Family)))
    })

    const unsubChildren = onSnapshot(query(collection(db, 'children'), orderBy('xp', 'desc')), (snapshot) => {
      setChildren(snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Child)))
    })

    const unsubTasks = onSnapshot(query(collection(db, 'tasks'), orderBy('createdAt', 'desc')), (snapshot) => {
      setTasks(snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Task)))
    })

    const unsubPending = onSnapshot(query(
      collection(db, 'taskExecutions'), 
      where('status', '==', 'completed'),
      orderBy('completedAt', 'desc')
    ), (snapshot) => {
      setPendingTasks(snapshot.docs.map(d => ({ id: d.id, ...d.data() } as TaskExecution)))
    })

    const unsubMedia = onSnapshot(query(collection(db, 'media'), orderBy('createdAt', 'desc')), (snapshot) => {
      setMedia(snapshot.docs.map(d => ({ id: d.id, ...d.data() })))
    })

    const unsubTips = onSnapshot(query(collection(db, 'tips'), orderBy('createdAt', 'desc')), (snapshot) => {
      setTips(snapshot.docs.map(d => ({ id: d.id, ...d.data() })))
    })

    const unsubProducts = onSnapshot(query(collection(db, 'products'), orderBy('createdAt', 'desc')), (snapshot) => {
      setProducts(snapshot.docs.map(d => ({ id: d.id, ...d.data() })))
    })

    const unsubPartners = onSnapshot(query(collection(db, 'partners'), orderBy('createdAt', 'desc')), (snapshot) => {
      setPartners(snapshot.docs.map(d => ({ id: d.id, ...d.data() })))
    })

    const unsubMascots = onSnapshot(query(collection(db, 'mascots'), orderBy('createdAt', 'desc')), (snapshot) => {
      setMascots(snapshot.docs.map(d => ({ id: d.id, ...d.data() })))
    })

    const unsubSettings = onSnapshot(doc(db, 'systemSettings', 'global'), (snapshot) => {
      if (snapshot.exists()) {
        setSystemSettings(snapshot.data())
      } else {
        setSystemSettings({ allowNewAdmins: true })
      }
      setIsLoading(false)
    })

    const unsubRewards = onSnapshot(query(collection(db, 'rewards'), orderBy('createdAt', 'desc')), (snapshot) => {
      setRewards(snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Reward)))
    })

    return () => {
      unsubFamilies()
      unsubChildren()
      unsubTasks()
      unsubPending()
      unsubMedia()
      unsubTips()
      unsubProducts()
      unsubPartners()
      unsubMascots()
      unsubSettings()
      unsubRewards()
    }
  }, [db])

  // Actions
  const updateSystemSettings = async (settings: any) => {
    const settingsRef = doc(db, 'systemSettings', 'global')
    await setDoc(settingsRef, {
      ...settings,
      updatedAt: serverTimestamp()
    }, { merge: true })
  }

  const approveTask = async (execution: TaskExecution) => {
    const execRef = doc(db, 'taskExecutions', execution.id)
    await updateDoc(execRef, {
      status: 'approved',
      approvedAt: serverTimestamp(),
      approvedBy: 'system-admin'
    })

    const transRef = collection(db, 'transactions')
    await addDoc(transRef, {
      childId: execution.childId,
      familyId: execution.familyId,
      type: 'earn',
      amount: execution.taskRewardCoins,
      direction: 'credit',
      source: 'task_approval',
      referenceId: execution.id,
      description: `Tarefa Aprovada: ${execution.taskTitle}`,
      createdAt: serverTimestamp()
    } as any)

    const childRef = doc(db, 'children', execution.childId)
    await updateDoc(childRef, {
      xp: (children.find(c => c.id === execution.childId)?.xp || 0) + execution.taskRewardXp
    })
  }

  const rejectTask = async (executionId: string, reason: string) => {
    const execRef = doc(db, 'taskExecutions', executionId)
    await updateDoc(execRef, {
      status: 'rejected',
      rejectionReason: reason,
      updatedAt: serverTimestamp()
    })
  }

  return {
    families,
    children,
    tasks,
    pendingTasks,
    rewards,
    media,
    tips,
    products,
    partners,
    mascots,
    systemSettings,
    isLoading,
    approveTask,
    rejectTask,
    updateSystemSettings
  }
}
