import {
  Dumbbell,
  UserCheck,
  Activity,
  Target,
  HeartPulse,
  Flame,
  Zap,
  Footprints,
} from 'lucide-react'

/** Maps stored icon keys to Lucide icons. */
export const PROGRAM_ICONS = {
  dumbbell: Dumbbell,
  'user-check': UserCheck,
  activity: Activity,
  target: Target,
  'heart-pulse': HeartPulse,
  flame: Flame,
  zap: Zap,
  footprints: Footprints,
}

export function getProgramIcon(key) {
  return PROGRAM_ICONS[key] || Dumbbell
}
