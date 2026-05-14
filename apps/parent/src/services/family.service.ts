import { 
  getFirebaseFirestore, 
  getFirebaseAuth 
} from '@corujinha/firebase'
import { 
  doc, 
  runTransaction, 
  collection, 
  serverTimestamp 
} from 'firebase/firestore'
import type { CreateFamilyInput, CreateChildInput } from '@corujinha/domain'

export const familyService = {
  /**
   * Cria a hierarquia familiar completa: documento da Família e documentos dos Filhos.
   */
  async createFamilyHierarchy(
    familyData: CreateFamilyInput, 
    children: any[],
    guardians: {
      userName: string;
      userRole: string;
      userAvatar: string;
      partnerName?: string;
      partnerEmail?: string;
      partnerRole?: string;
      partnerAvatar?: string;
    },
    initialTasks?: any[]
  ) {
    const db = getFirebaseFirestore()
    const auth = getFirebaseAuth()
    const user = auth.currentUser

    if (!user) throw new Error('Usuário não autenticado.')

    // 1. Referências
    const familyRef = doc(collection(db, 'families'))
    const userRef = doc(db, 'users', user.uid)

    try {
      await runTransaction(db, async (transaction) => {
        // 2. Criar Documento da Família
        transaction.set(familyRef, {
          ...familyData,
          parentId: user.uid,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
          active: true,
          // Armazenamos info básica dos guardiões na família para acesso rápido
          guardians: {
            [user.uid]: {
              name: guardians.userName,
              role: guardians.userRole,
              avatar: guardians.userAvatar
            },
            ...(guardians.partnerEmail ? {
              partner: {
                name: guardians.partnerName,
                email: guardians.partnerEmail,
                role: guardians.partnerRole,
                avatar: guardians.partnerAvatar
              }
            } : {})
          }
        })

        // 3. Criar cada Filho
        children.forEach((child) => {
          const childRef = doc(collection(familyRef, 'children'))
          transaction.set(childRef, {
            ...child,
            familyId: familyRef.id,
            parentId: user.uid,
            createdAt: serverTimestamp(),
            xp: 0,
            coins: 0,
            level: 1,
            active: true
          })
        })

        // 4. Criar Tarefas Iniciais (se houver)
        if (initialTasks && initialTasks.length > 0) {
          initialTasks.forEach((task) => {
            const taskRef = doc(collection(familyRef, 'tasks'))
            transaction.set(taskRef, {
              ...task,
              familyId: familyRef.id,
              createdBy: user.uid,
              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp(),
              active: true
            })
          })
        }

        // 4. Atualizar Perfil do Usuário
        transaction.set(userRef, {
          displayName: guardians.userName,
          avatar: guardians.userAvatar,
          roleInFamily: guardians.userRole,
          familyId: familyRef.id,
          role: 'parent',
          onboardingCompleted: true,
          updatedAt: serverTimestamp()
        }, { merge: true })
      })

      // 5. Forçar refresh do token para atualizar as Custom Claims (se houver function)
      // Por enquanto, apenas retornamos o ID
      return familyRef.id

    } catch (error) {
      console.error('[FamilyService] Erro na transação:', error)
      throw error
    }
  }
}
