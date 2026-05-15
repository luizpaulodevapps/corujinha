import { 
  getFirebaseFirestore 
} from '@corujinha/firebase'
import { 
  collection, 
  query, 
  where, 
  getDocs, 
  orderBy,
  limit 
} from 'firebase/firestore'

export const dashboardService = {
  /**
   * Busca os dados da família (incluindo guardiões)
   */
  async getFamily(familyId: string) {
    const db = getFirebaseFirestore()
    const { doc, getDoc } = await import('firebase/firestore')
    const familyRef = doc(db, 'families', familyId)
    const snapshot = await getDoc(familyRef)
    
    if (!snapshot.exists()) return null
    return { id: snapshot.id, ...snapshot.data() }
  },

  /**
   * Busca a lista de filhos de uma família
   */
  async getChildren(familyId: string) {
    const db = getFirebaseFirestore()
    const childrenRef = collection(db, 'families', familyId, 'children')
    const q = query(childrenRef)
    
    const snapshot = await getDocs(q)
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
  },

  /**
   * Busca dados específicos de um filho
   */
  async getChild(familyId: string, childId: string) {
    const db = getFirebaseFirestore()
    const { doc, getDoc } = await import('firebase/firestore')
    const childRef = doc(db, 'families', familyId, 'children', childId)
    const snapshot = await getDoc(childRef)
    
    if (!snapshot.exists()) return null
    return { id: snapshot.id, ...snapshot.data() }
  },

  /**
   * Busca missões de um filho específico
   */
  async getChildTasks(childId: string) {
    const db = getFirebaseFirestore()
    const tasksRef = collection(db, 'tasks')
    const q = query(
      tasksRef,
      where('assignedChildIds', 'array-contains', childId),
      orderBy('createdAt', 'desc')
    )

    const snapshot = await getDocs(q)
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
  },

  /**
   * Busca tarefas pendentes de aprovação da família
   */
  async getPendingApprovals(familyId: string) {
    const db = getFirebaseFirestore()
    const tasksRef = collection(db, 'tasks') // Centralizado ou por família? Usaremos centralizado com familyId por performance
    const q = query(
      tasksRef, 
      where('familyId', '==', familyId),
      where('status', '==', 'pending_approval'),
      orderBy('completedAt', 'desc'),
      limit(10)
    )

    const snapshot = await getDocs(q)
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
  },

  /**
   * Cria uma nova tarefa/missão
   */
  async createTask(taskData: any) {
    const db = getFirebaseFirestore()
    const { addDoc, serverTimestamp } = await import('firebase/firestore')
    
    const docRef = await addDoc(collection(db, 'tasks'), {
      ...taskData,
      status: 'todo', // Status inicial
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    })

    return docRef.id
  },

  /**
   * Aprova uma missão concluída
   */
  async approveTask(taskId: string) {
    const db = getFirebaseFirestore()
    const { doc, updateDoc, serverTimestamp } = await import('firebase/firestore')
    
    const taskRef = doc(db, 'tasks', taskId)
    await updateDoc(taskRef, {
      status: 'approved',
      approvedAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    })
  },

  /**
   * Rejeita uma missão concluída
   */
  async rejectTask(taskId: string) {
    const db = getFirebaseFirestore()
    const { doc, updateDoc, serverTimestamp } = await import('firebase/firestore')
    
    const taskRef = doc(db, 'tasks', taskId)
    await updateDoc(taskRef, {
      status: 'rejected',
      updatedAt: serverTimestamp()
    })
  },

  /**
   * Busca o histórico de missões de uma família
   */
  async getHistory(familyId: string) {
    const db = getFirebaseFirestore()
    const tasksRef = collection(db, 'tasks')
    const q = query(
      tasksRef,
      where('familyId', '==', familyId),
      where('status', 'in', ['approved', 'rejected']),
      orderBy('updatedAt', 'desc'),
      limit(50)
    )

    const snapshot = await getDocs(q)
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
  },

  /**
   * Busca todas as missões da família
   */
  async getTasks(familyId: string) {
    const db = getFirebaseFirestore()
    const tasksRef = collection(db, 'tasks')
    const q = query(
      tasksRef,
      where('familyId', '==', familyId),
      orderBy('createdAt', 'desc')
    )

    const snapshot = await getDocs(q)
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
  },

  /**
   * Busca os eventos da jornada (Mapa da Semana)
   */
  async getJourneyEvents(familyId: string) {
    const db = getFirebaseFirestore()
    const eventsRef = collection(db, 'families', familyId, 'journey_events')
    const q = query(eventsRef, orderBy('date', 'asc'))
    
    const snapshot = await getDocs(q)
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
  },

  /**
   * Salva um novo evento de jornada
   */
  async saveJourneyEvent(familyId: string, eventData: any) {
    const db = getFirebaseFirestore()
    const { collection, addDoc, serverTimestamp } = await import('firebase/firestore')
    
    const eventsRef = collection(db, 'families', familyId, 'journey_events')
    const docRef = await addDoc(eventsRef, {
      ...eventData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    })

    return docRef.id
  }
}
