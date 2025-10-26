export interface Baby {
  id: string;
  name: string;
  dateOfBirth: string;
  gender: 'male' | 'female';
  photoUrl?: string;
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  allergies?: string;
  medicalNotes?: string;
  enrollmentDate: string;
}

export interface DailyLog {
  id: string;
  babyId: string;
  date: string;
  meals: MealEntry[];
  naps: NapEntry[];
  activities: ActivityEntry[];
  diaperChanges: number;
  mood: 'happy' | 'fussy' | 'calm' | 'sleepy';
  notes: string;
}

export interface MealEntry {
  id: string;
  time: string;
  type: 'bottle' | 'solid' | 'snack' | 'breast';
  description: string;
  amount?: string;
  finished: boolean;
}

export interface NapEntry {
  id: string;
  startTime: string;
  endTime: string;
  duration: number;
}

export interface ActivityEntry {
  id: string;
  time: string;
  type: 'play' | 'outdoor' | 'learning' | 'art' | 'music';
  description: string;
}
