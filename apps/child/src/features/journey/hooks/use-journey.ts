import { useState, useMemo, useCallback } from 'react'
import { JourneyEvent, JourneyMission } from '../types'
import { MOCK_JOURNEY_EVENTS } from '../data/mock-events'

export function useJourney() {
  const [events, setEvents] = useState<JourneyEvent[]>(MOCK_JOURNEY_EVENTS)
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null)

  // Derived state: Current selected event
  const selectedEvent = useMemo(
    () => events.find(evt => evt.id === selectedEventId) ?? null,
    [events, selectedEventId]
  )

  // Derived state: Overall journey progress
  const journeyProgress = useMemo(() => {
    const allMissions = events.flatMap(e => e.missions)
    if (allMissions.length === 0) return 0
    
    const completedMissions = allMissions.filter(m => m.status === 'done').length
    return Math.round((completedMissions / allMissions.length) * 100)
  }, [events])

  const toggleMission = useCallback((eventId: string, missionId: string) => {
    setEvents(prev =>
      prev.map(evt => {
        if (evt.id !== eventId) return evt

        return {
          ...evt,
          missions: evt.missions.map(mission =>
            mission.id === missionId
              ? {
                  ...mission,
                  status: mission.status === 'done' ? 'pending' : 'done',
                }
              : mission
          ),
        }
      })
    )
  }, [])

  return {
    events,
    selectedEvent,
    selectedEventId,
    setSelectedEventId,
    toggleMission,
    journeyProgress
  }
}
