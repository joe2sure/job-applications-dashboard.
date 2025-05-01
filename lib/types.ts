export interface ApplicationData {
    id: string
    name: string
    email: string
    phone: string
    location: string
    currentOccupation: string
    positionAppliedFor: string
    yearsOfExperience: number
    skills: string[]
    workArrangement: "Full-time" | "Part-time" | "Contract" | "Freelance"
    applicationDate: string
    cvFileName: string
  }
  