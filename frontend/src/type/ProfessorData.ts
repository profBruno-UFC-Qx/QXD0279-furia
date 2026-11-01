// --- Tipos do Perfil do Professor (ProfessorProfile) ---

export interface ProfessorData {
  id: string
  name: string
  department: string
  avatarUrl: string
  rating: number
  reviewCount: number
}

export interface RatingMetric {
  label: string
  score: number
}

export interface Discipline {
  id: number
  code: string
  name: string
}

export interface SubRating {
  label: string
  score: number
}

export interface ReviewData {
  id: string
  authorName: string
  authorInitials: string
  discipline: string
  date: string
  rawDate?: string | Date
  overallRating: number
  content: string
  subRatings: SubRating[]
}

// --- Tipos do Dashboard do Professor (ProfessorDashboard) ---

export interface DashboardStat {
  label: string
  value: string | number
  suffix?: string
  subtitle: string
  icon: string
}

export interface DashboardReview {
  id: string
  professorName: string
  discipline: string
  status: string
  date: string
  rating: number
  tags: string[]
  comment: string
}

export interface ActiveDiscipline {
  id: string
  name: string
  studentCount: number
  averageRating: number
}

export interface RecentDocument {
  id: string
  fileName: string
  fileSize: string
  disciplineName: string
}
