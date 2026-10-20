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
  overallRating: number
  content: string
  subRatings: SubRating[]
}
