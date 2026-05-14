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
  const [isLoading, setIsLoading] = useState(true)

  const db = getFirebaseFirestore()

  useEffect(() => {
    // 1. Fetch Families
    const qFamilies = query(collection(db, 'families'), orderBy('createdAt', 'desc'))
    const unsubFamilies = onSnapshot(qFamilies, (snapshot) => {
      setFamilies(snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Family)))
    })

    // 2. Fetch Children
    const qChildren = query(collection(db, 'children'), orderBy('xp', 'desc'))
    const unsubChildren = onSnapshot(qChildren, (snapshot) => {
      setChildren(snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Child)))
    })

    // 3. Fetch Tasks (Templates/Configured)
    const qTasks = query(collection(db, 'tasks'), orderBy('createdAt', 'desc'))
    const unsubTasks = onSnapshot(qTasks, (snapshot) => {
      setTasks(snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Task)))
    })

    // 4. Fetch Pending Validations
    const qPending = query(
      collection(db, 'taskExecutions'), 
      where('status', '==', 'completed'),
      orderBy('completedAt', 'desc')
    )
    const unsubPending = onSnapshot(qPending, (snapshot) => {
      setPendingTasks(snapshot.docs.map(d => ({ id: d.id, ...d.data() } as TaskExecution)))
    })

    // 5. Fetch Rewards
    const qRewards = query(collection(db, 'rewards'), orderBy('createdAt', 'desc'))
    const unsubRewards = onSnapshot(qRewards, (snapshot) => {
      setRewards(snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Reward)))
      setIsLoading(false)
    })

    return () => {
      unsubFamilies()
      unsubChildren()
      unsubTasks()
      unsubPending()
      unsubRewards()
    }
  }, [db])

  // Actions
  const approveTask = async (execution: TaskExecution) => {
    const execRef = doc(db, 'taskExecutions', execution.id)
    const walletRef = doc(db, 'wallets', execution.childId) // Assuming wallet ID is childId

    // Update Execution
    await updateDoc(execRef, {
      status: 'approved',
      approvedAt: serverTimestamp(),
      approvedBy: 'system-admin' // Simplified for now
    })

    // Add Transaction
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

    // Update Child Stats (XP and Leveling logic should probably be on Functions, but simplified here)
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
    isLoading,
    approveTask,
    rejectTask
  }
}
