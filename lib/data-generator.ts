import { ApplicationData } from "./types"

// Helper function to generate a random date between Feb 2025 and Jan 2024
const generateRandomDate = (): string => {
  const end = new Date("2025-02-28")
  const start = new Date("2024-01-01")
  const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
  return randomDate.toISOString().split("T")[0]
}
  
// Helper function to generate a random integer between min and max (inclusive)
const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
  
// Helper function to get a random item from an array
const getRandomItem = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)]
}

// Helper function to get a random item with weight
const getWeightedRandomItem = <T>(items: T[], weights: number[]): T => {
  const totalWeight = weights.reduce((sum, weight) => sum + weight, 0)
  let random = Math.random() * totalWeight
  
  for (let i = 0; i < items.length; i++) {
    if (random < weights[i]) {
      return items[i]
    }
    random -= weights[i]
  }
  
  return items[items.length - 1] // Fallback
}

// Phone number generators by region
const generatePhoneNumber = (region: string): string => {
  switch (region) {
    case 'UK':
      const ukPrefixes = ['07700', '07800', '07900', '07500', '07400']
      const ukRandomPrefix = getRandomItem(ukPrefixes)
      const ukRandomSuffix = Math.floor(Math.random() * 900000) + 100000
      return `${ukRandomPrefix} ${ukRandomSuffix}`
    
    case 'Nigeria':
      const nigPrefixes = ['+234 703', '+234 706', '+234 803', '+234 806', '+234 810', '+234 813', '+234 816', '+234 903']
      const nigRandomPrefix = getRandomItem(nigPrefixes)
      const nigRandomSuffix = Math.floor(Math.random() * 9000000) + 1000000
      return `${nigRandomPrefix} ${nigRandomSuffix}`
    
    case 'South Africa':
      const saPrefixes = ['+27 71', '+27 72', '+27 73', '+27 76', '+27 78', '+27 79', '+27 82']
      const saRandomPrefix = getRandomItem(saPrefixes)
      const saRandomSuffix = Math.floor(Math.random() * 9000000) + 1000000
      return `${saRandomPrefix} ${saRandomSuffix}`
      
    case 'Ghana':
      const ghanaPrefixes = ['+233 20', '+233 24', '+233 25', '+233 27', '+233 50', '+233 55']
      const ghanaRandomPrefix = getRandomItem(ghanaPrefixes)
      const ghanaRandomSuffix = Math.floor(Math.random() * 9000000) + 1000000
      return `${ghanaRandomPrefix} ${ghanaRandomSuffix}`
      
    case 'Kenya':
      const kenyaPrefixes = ['+254 7', '+254 1']
      const kenyaPrefix = getRandomItem(kenyaPrefixes)
      const kenyaSuffix = Math.floor(Math.random() * 90000000) + 10000000
      return `${kenyaPrefix}${kenyaSuffix}`
      
    case 'Brazil':
      const brazilAreaCodes = ['11', '21', '31', '41', '51', '61', '71', '81', '91']
      const brazilAreaCode = getRandomItem(brazilAreaCodes)
      const brazilSuffix = Math.floor(Math.random() * 900000000) + 100000000
      return `+55 ${brazilAreaCode} ${brazilSuffix}`
      
    case 'Colombia':
      const colombiaPrefixes = ['+57 3']
      const colombiaSuffix = Math.floor(Math.random() * 90000000) + 10000000
      return `${colombiaPrefixes[0]}${colombiaSuffix}`
      
    case 'USA':
      const usAreaCodes = ['202', '212', '213', '305', '312', '404', '415', '512', '617', '702', '713', '214']
      const usAreaCode = getRandomItem(usAreaCodes)
      const usPrefix = Math.floor(Math.random() * 900) + 100
      const usSuffix = Math.floor(Math.random() * 9000) + 1000
      return `+1 ${usAreaCode} ${usPrefix} ${usSuffix}`
      
    case 'Canada':
      const caAreaCodes = ['416', '647', '437', '519', '226', '613', '343', '705', '249', '807', '905', '289']
      const caAreaCode = getRandomItem(caAreaCodes)
      const caPrefix = Math.floor(Math.random() * 900) + 100
      const caSuffix = Math.floor(Math.random() * 9000) + 1000
      return `+1 ${caAreaCode} ${caPrefix} ${caSuffix}`
      
    default:
      return generatePhoneNumber('UK') // Fallback to UK
  }
}
  
// Generate skills based on position
const generateSkillsForPosition = (position: string): string[] => {
  const commonSkills = ['Communication', 'Teamwork', 'Problem Solving', 'Time Management', 'Safety Awareness']
  
  const positionSkills: Record<string, string[]> = {
    'Plumber': [
      'Pipe Fitting', 'Leak Repair', 'Fixture Installation', 'Drainage Systems', 
      'Water Heater Installation', 'Blueprint Reading', 'Soldering', 'Plumbing Codes'
    ],
    'Carpenter': [
      'Woodworking', 'Framing', 'Cabinet Making', 'Finish Carpentry', 
      'Measuring & Cutting', 'Power Tool Operation', 'Blueprint Reading', 'Furniture Making'
    ],
    'Bricklayer': [
      'Masonry', 'Mortar Mixing', 'Wall Construction', 'Stone Laying', 
      'Concrete Work', 'Blueprint Reading', 'Scaffolding', 'Pointing'
    ],
    'Construction Expert': [
      'Project Management', 'Cost Estimation', 'Building Codes', 'Site Supervision', 
      'Quality Control', 'Blueprint Reading', 'Contract Management', 'Risk Assessment'
    ],
    'Sales Rep': [
      'Customer Service', 'Negotiation', 'Product Knowledge', 'Lead Generation',
      'CRM Software', 'Sales Strategy', 'Client Relationship Management', 'Market Research'
    ]
  }
  
  // Get position-specific skills
  const specificSkills = positionSkills[position] || []
  
  // Combine some common skills with position-specific skills
  const selectedCommonSkills = commonSkills.filter(() => Math.random() > 0.5)
  const selectedSpecificSkills = specificSkills.filter(() => Math.random() > 0.3)
  
  // Return 3-7 skills
  return [...selectedCommonSkills, ...selectedSpecificSkills].slice(0, getRandomInt(3, 7))
}
  
// Generate a random CV filename
const generateCVFilename = (name: string, position: string): string => {
  const fileTypes = ['pdf', 'docx', 'pdf', 'pdf'] // More PDFs than DOCXs
  const fileType = getRandomItem(fileTypes)
  const nameParts = name.replace(/[^a-zA-Z ]/g, '').split(' ')
  const formattedName = nameParts.join('_').toLowerCase()
  return `${formattedName}_cv_${position.toLowerCase().replace(' ', '_')}.${fileType}`
}

// Names by region
const names: Record<string, { first: string[], last: string[] }> = {
  'UK': {
    first: [
      'Oliver', 'Harry', 'George', 'Noah', 'Jack', 'Leo', 'Arthur', 'Muhammad', 'Oscar', 'Charlie',
      'Olivia', 'Amelia', 'Isla', 'Ava', 'Mia', 'Isabella', 'Sophia', 'Grace', 'Lily', 'Freya'
    ],
    last: [
      'Smith', 'Jones', 'Williams', 'Brown', 'Taylor', 'Davies', 'Wilson', 'Evans', 'Thomas', 'Johnson',
      'Roberts', 'Walker', 'Wright', 'Robinson', 'Thompson', 'White', 'Hughes', 'Edwards', 'Green', 'Hall'
    ]
  },
  'Nigeria': {
    first: [
      'Deborah', 'Stephen', 'Chinedu', 'Oluwaseun', 'Ngozi', 'Emeka', 'Oluwatosin', 'Chioma', 'Oluwafemi',
      'Adewale', 'Folake', 'Tunde', 'Yetunde', 'Obinna', 'Aisha', 'Adeola', 'Chinwe', 'Ikechukwu', 'Funmilayo',
      'Olumide', 'Amara', 'Segun', 'Blessing', 'Onyeka', 'Fatima', 'Babatunde', 'Chiamaka', 'Olamide'
    ],
    last: [
      'Lawal', 'Akwemoh', 'Monye', 'Okafor', 'Adeyemi', 'Okonkwo', 'Ibrahim', 'Eze', 'Adebisi', 'Nwachukwu',
      'Mohammed', 'Okeke', 'Afolabi', 'Nwosu', 'Bello', 'Ugwu', 'Ogunleye', 'Chukwu', 'Adeniyi', 'Onyekachi',
      'Yusuf', 'Obi', 'Adesina', 'Njoku', 'Olawale', 'Amadi', 'Aliyu', 'Onuoha', 'Olanrewaju', 'Nwabeke'
    ]
  },
  'South Africa': {
    first: [
      'Thabo', 'Sipho', 'Mandla', 'Themba', 'Nomusa', 'Thandi', 'Sibusiso', 'Zanele', 'Nkosi',
      'Precious', 'Lerato', 'Andile', 'Ayanda', 'Nonhlanhla', 'Lucky', 'Blessing', 'Thulani', 'Nomvula',
      'Bongani', 'Siyabonga'
    ],
    last: [
      'Mkhize', 'Nkosi', 'Ndlovu', 'Khumalo', 'Dlamini', 'Zuma', 'Sithole', 'Tshabalala', 'Mbatha', 'Mahlangu',
      'Maseko', 'Mthembu', 'Buthelezi', 'Mokoena', 'Moloi', 'Ngubane', 'Zwane', 'Mabaso', 'Ntuli', 'Vilakazi'
    ]
  },
  'Ghana': {
    first: [
      'Kwame', 'Kofi', 'Akua', 'Abena', 'Kwesi', 'Ama', 'Yaw', 'Adwoa', 'Kojo', 'Esi',
      'Akosua', 'Afua', 'Kwabena', 'Afia', 'Kwaku', 'Aba', 'Fiifi', 'Maame', 'Nana', 'Adjoa'
    ],
    last: [
      'Mensah', 'Osei', 'Boateng', 'Owusu', 'Asante', 'Agyeman', 'Adjei', 'Agyei', 'Appiah', 'Anane',
      'Addo', 'Amankwah', 'Darko', 'Frimpong', 'Gyasi', 'Kuffour', 'Nkrumah', 'Sarpong', 'Yeboah', 'Poku'
    ]
  },
  'Kenya': {
    first: [
      'Wangari', 'Njeri', 'Muthoni', 'Wambui', 'Kamau', 'Wanjiku', 'Odhiambo', 'Otieno', 'Kipchoge', 'Akinyi',
      'Onyango', 'Wafula', 'Nyambura', 'Maina', 'Achieng', 'Wekesa', 'Njoroge', 'Auma', 'Kibet', 'Chebet'
    ],
    last: [
      'Wanjiru', 'Mwangi', 'Ochieng', 'Kimani', 'Ndung\'u', 'Kiptoo', 'Korir', 'Njau', 'Njuguna', 'Onyango',
      'Omondi', 'Karanja', 'Mutua', 'Chepkoech', 'Kiplagat', 'Cheruiyot', 'Kamau', 'Maina', 'Wambua', 'Mugo'
    ]
  },
  'Brazil': {
    first: [
      'João', 'Maria', 'Pedro', 'Ana', 'Carlos', 'Mariana', 'Rafael', 'Juliana', 'Lucas', 'Fernanda',
      'Bruno', 'Camila', 'Gabriel', 'Amanda', 'Matheus', 'Larissa', 'Thiago', 'Carolina', 'Leonardo', 'Beatriz'
    ],
    last: [
      'Silva', 'Santos', 'Oliveira', 'Souza', 'Rodrigues', 'Ferreira', 'Almeida', 'Pereira', 'Lima', 'Gomes',
      'Costa', 'Ribeiro', 'Martins', 'Carvalho', 'Alves', 'Lopes', 'Barbosa', 'Nascimento', 'Moreira', 'Vieira'
    ]
  },
  'Colombia': {
    first: [
      'Andrés', 'Isabella', 'Santiago', 'Valentina', 'David', 'Mariana', 'Sebastián', 'Gabriela', 'Alejandro', 'Camila',
      'Juan', 'Sofía', 'Daniel', 'Valeria', 'Carlos', 'Luciana', 'Felipe', 'Catalina', 'Mateo', 'Daniela'
    ],
    last: [
      'Rodríguez', 'Gómez', 'González', 'Hernández', 'Martínez', 'García', 'López', 'Sánchez', 'Ramírez', 'Torres',
      'Morales', 'Ortiz', 'Vargas', 'Jiménez', 'Castro', 'Gutiérrez', 'Mejía', 'Álvarez', 'Pérez', 'Castillo'
    ]
  },
  'USA': {
    first: [
      'James', 'Emma', 'Michael', 'Olivia', 'Robert', 'Sophia', 'John', 'Isabella', 'David', 'Ava',
      'William', 'Charlotte', 'Richard', 'Mia', 'Joseph', 'Amelia', 'Thomas', 'Harper', 'Charles', 'Evelyn'
    ],
    last: [
      'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Miller', 'Davis', 'Garcia', 'Rodriguez', 'Wilson',
      'Martinez', 'Anderson', 'Taylor', 'Thomas', 'Hernandez', 'Moore', 'Martin', 'Jackson', 'Thompson', 'White'
    ]
  },
  'Canada': {
    first: [
      'Liam', 'Olivia', 'Noah', 'Emma', 'Benjamin', 'Charlotte', 'Lucas', 'Sophia', 'William', 'Amelia',
      'Jacob', 'Ava', 'Oliver', 'Ella', 'Alexander', 'Chloe', 'Ethan', 'Abigail', 'Daniel', 'Emily'
    ],
    last: [
      'Smith', 'Brown', 'Roy', 'Tremblay', 'Lee', 'Gagnon', 'Wilson', 'Martin', 'Côté', 'Singh',
      'Li', 'Wong', 'Chen', 'Nguyen', 'Patel', 'Johnson', 'Williams', 'Jones', 'Anderson', 'Taylor'
    ]
  }
}

// Locations by region
const locations: Record<string, string[]> = {
  'UK': [
    'London, UK', 'Birmingham, UK', 'Manchester, UK', 'Glasgow, UK', 'Leeds, UK',
    'Liverpool, UK', 'Bristol, UK', 'Sheffield, UK', 'Edinburgh, UK', 'Cardiff, UK',
    'Belfast, UK', 'Nottingham, UK', 'Wolverhampton, UK', 'Plymouth, UK', 'Southampton, UK'
  ],
  'Nigeria': [
    'Lagos, Nigeria', 'Abuja, Nigeria', 'Port Harcourt, Nigeria', 'Ibadan, Nigeria', 'Kano, Nigeria',
    'Enugu, Nigeria', 'Benin City, Nigeria', 'Calabar, Nigeria', 'Kaduna, Nigeria', 'Owerri, Nigeria',
    'Onitsha, Nigeria', 'Warri, Nigeria', 'Jos, Nigeria', 'Uyo, Nigeria', 'Abeokuta, Nigeria'
  ],
  'South Africa': [
    'Johannesburg, South Africa', 'Cape Town, South Africa', 'Durban, South Africa', 'Pretoria, South Africa',
    'Port Elizabeth, South Africa', 'Bloemfontein, South Africa', 'East London, South Africa',
    'Pietermaritzburg, South Africa', 'Nelspruit, South Africa', 'Kimberley, South Africa'
  ],
  'Ghana': [
    'Accra, Ghana', 'Kumasi, Ghana', 'Tamale, Ghana', 'Sekondi-Takoradi, Ghana', 'Cape Coast, Ghana',
    'Koforidua, Ghana', 'Sunyani, Ghana', 'Ho, Ghana', 'Techiman, Ghana', 'Obuasi, Ghana'
  ],
  'Kenya': [
    'Nairobi, Kenya', 'Mombasa, Kenya', 'Kisumu, Kenya', 'Nakuru, Kenya', 'Eldoret, Kenya',
    'Nyeri, Kenya', 'Machakos, Kenya', 'Malindi, Kenya', 'Kitale, Kenya', 'Garissa, Kenya'
  ],
  'Brazil': [
    'São Paulo, Brazil', 'Rio de Janeiro, Brazil', 'Brasília, Brazil', 'Salvador, Brazil', 'Fortaleza, Brazil',
    'Belo Horizonte, Brazil', 'Manaus, Brazil', 'Curitiba, Brazil', 'Recife, Brazil', 'Belém, Brazil'
  ],
  'Colombia': [
    'Bogotá, Colombia', 'Medellín, Colombia', 'Cali, Colombia', 'Barranquilla, Colombia', 'Cartagena, Colombia',
    'Cúcuta, Colombia', 'Bucaramanga, Colombia', 'Pereira, Colombia', 'Santa Marta, Colombia', 'Ibagué, Colombia'
  ],
  'USA': [
    'New York, USA', 'Los Angeles, USA', 'Chicago, USA', 'Houston, USA', 'Phoenix, USA',
    'Philadelphia, USA', 'San Antonio, USA', 'San Diego, USA', 'Dallas, USA', 'San Jose, USA'
  ],
  'Canada': [
    'Toronto, Canada', 'Montreal, Canada', 'Vancouver, Canada', 'Calgary, Canada', 'Edmonton, Canada',
    'Ottawa, Canada', 'Winnipeg, Canada', 'Quebec City, Canada', 'Hamilton, Canada', 'Halifax, Canada'
  ]
}
  
// Current occupations
const occupations = [
  'Plumber', 'Carpenter', 'Bricklayer', 'Construction Worker', 'Handyman', 'Electrician', 'Painter',
  'Laborer', 'Apprentice', 'Contractor', 'Self-employed', 'Student', 'Unemployed', 'Foreman',
  'Project Manager', 'Site Supervisor', 'General Maintenance', 'Facilities Manager', 'Joiner', 'Roofer',
  'Sales Rep', 'Construction Expert'
]
  
// Positions applied for
const positions = ['Plumber', 'Carpenter', 'Bricklayer', 'Construction Expert', 'Sales Rep']
  
// Work arrangements
const workArrangements = ['Full-time', 'Part-time', 'Contract', 'Freelance'] as const
  
// Generate a random email based on name
const generateEmail = (name: string): string => {
  const providers = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'icloud.com', 'mail.com']
  const nameParts = name.toLowerCase().split(' ')
  const randomProvider = getRandomItem(providers)
  
  // Different email formats
  const emailFormats = [
    `${nameParts[0]}.${nameParts[nameParts.length - 1]}@${randomProvider}`,
    `${nameParts[0]}${nameParts[nameParts.length - 1]}@${randomProvider}`,
    `${nameParts[0]}${nameParts[nameParts.length - 1]}${getRandomInt(1, 99)}@${randomProvider}`,
    `${nameParts[0][0]}${nameParts[nameParts.length - 1]}@${randomProvider}`,
    `${nameParts[nameParts.length - 1]}.${nameParts[0]}@${randomProvider}`
  ]
  
  return getRandomItem(emailFormats)
}

// Real applicant data from Google form
const realApplicants: ApplicationData[] = [
  {
    id: "APPR001",
    name: "Deborah Lawal",
    email: "Deborahlawal26@gmail.com",
    phone: "+234 8074143293",
    location: "Lagos, Nigeria",
    currentOccupation: "Sales Rep",
    positionAppliedFor: "Sales Rep",
    yearsOfExperience: getRandomInt(1, 5),
    skills: generateSkillsForPosition("Sales Rep"),
    workArrangement: getRandomItem([...workArrangements]),
    applicationDate: generateRandomDate(),
    cvFileName: "deborah_lawal_cv_sales_rep.pdf"
  },
  {
    id: "APPR002",
    name: "Stephen Akwemoh",
    email: "stevetameso@gmail.com",
    phone: "+234 8161922669",
    location: "Lagos, Nigeria",
    currentOccupation: "Plumber",
    positionAppliedFor: "Plumber",
    yearsOfExperience: getRandomInt(2, 7),
    skills: generateSkillsForPosition("Plumber"),
    workArrangement: getRandomItem([...workArrangements]),
    applicationDate: generateRandomDate(),
    cvFileName: "stephen_akwemoh_cv_plumber.pdf"
  },
  {
    id: "APPR003",
    name: "CYNTHIA MONYE",
    email: "omop74@yahoo.com",
    phone: "+234 7042361845",
    location: "Lagos, Nigeria",
    currentOccupation: getRandomItem(occupations),
    positionAppliedFor: getRandomItem(positions),
    yearsOfExperience: getRandomInt(1, 6),
    skills: generateSkillsForPosition(getRandomItem(positions)),
    workArrangement: getRandomItem([...workArrangements]),
    applicationDate: generateRandomDate(),
    cvFileName: "cynthia_monye_cv_construction.pdf"
  },
  {
    id: "APPR004",
    name: "Uchenna Nwabeke",
    email: "stevetameso@gmail.com", // Using provided email even though it's duplicated
    phone: "07935355325",
    location: "Wolverhampton, UK",
    currentOccupation: getRandomItem(occupations),
    positionAppliedFor: getRandomItem(positions),
    yearsOfExperience: getRandomInt(2, 8),
    skills: generateSkillsForPosition(getRandomItem(positions)),
    workArrangement: getRandomItem([...workArrangements]),
    applicationDate: generateRandomDate(),
    cvFileName: "uchenna_nwabeke_cv_construction.pdf"
  }
]

// Distribution weights for different regions
// Higher weights mean more applicants from that region
const regionWeights = {
  'UK': 15,        // Reduced but still present as base country
  'Nigeria': 20,   // One of the main sources
  'South Africa': 15,  // Another African country
  'Ghana': 10,     // Another African country
  'Kenya': 10,     // Another African country
  'Brazil': 15,    // South America
  'Colombia': 10,  // South America
  'USA': 3,        // North America but fewer applicants
  'Canada': 2      // North America but fewer applicants
}

// Main function to generate application data
export const generateApplicationData = (count: number): ApplicationData[] => {
  // Always include the real applicants
  const applications: ApplicationData[] = [...realApplicants]
  
  // Generate additional random applicants
  const randomCount = Math.max(0, count - realApplicants.length)
  
  // Define region weights for random selection
  const regions = Object.keys(regionWeights)
  const weights = Object.values(regionWeights)
  
  for (let i = 0; i < randomCount; i++) {
    // Select region based on weights
    const region = getWeightedRandomItem(regions, weights)
    
    // Generate name based on region
    const firstName = getRandomItem(names[region].first)  
    const lastName = getRandomItem(names[region].last)
    const fullName = `${firstName} ${lastName}`
    
    // Generate location based on region
    const location = getRandomItem(locations[region])
    
    // Generate phone number based on region
    const phone = generatePhoneNumber(region)
    
    // Generate other data
    const email = generateEmail(fullName)
    const currentOccupation = getRandomItem(occupations)
    const positionAppliedFor = getRandomItem(positions)
    
    // Years of experience - weighted to have more experienced applicants
    let yearsOfExperience
    const expRandom = Math.random()
    if (expRandom < 0.2) {
      yearsOfExperience = getRandomInt(0, 1) // 0-1 years: 20%
    } else if (expRandom < 0.5) {
      yearsOfExperience = getRandomInt(1, 3) // 1-3 years: 30%
    } else if (expRandom < 0.8) {
      yearsOfExperience = getRandomInt(3, 5) // 3-5 years: 30%
    } else {
      yearsOfExperience = getRandomInt(5, 15) // 5+ years: 20%
    }
    
    const skills = generateSkillsForPosition(positionAppliedFor)
    const workArrangement = getRandomItem([...workArrangements])
    const applicationDate = generateRandomDate()
    const cvFileName = generateCVFilename(fullName, positionAppliedFor)
    
    applications.push({
      id: `APP${i.toString().padStart(3, '0')}`,
      name: fullName,
      email,
      phone,
      location,
      currentOccupation,
      positionAppliedFor,
      yearsOfExperience,
      skills,
      workArrangement,
      applicationDate,
      cvFileName
    })
  }
  
  // Sort by application date (newest first)
  return applications.sort((a, b) => new Date(b.applicationDate).getTime() - new Date(a.applicationDate).getTime())
}


// import { ApplicationData } from "./types"

// // Helper function to generate a random date between Feb 2025 and Jan 2024
// const generateRandomDate = (): string => {
//   const end = new Date("2025-02-28")
//   const start = new Date("2024-01-01")
//   const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
//   return randomDate.toISOString().split("T")[0]
// }
  
// // Helper function to generate a random integer between min and max (inclusive)
// const getRandomInt = (min: number, max: number): number => {
//   return Math.floor(Math.random() * (max - min + 1)) + min
// }
  
// // Helper function to get a random item from an array
// const getRandomItem = <T>(array: T[]): T => {
//   return array[Math.floor(Math.random() * array.length)]
// }
  
// // Helper function to generate a random UK phone number
// const generateUKPhoneNumber = (): string => {
//   const prefixes = ['07700', '07800', '07900', '07500', '07400']
//   const randomPrefix = getRandomItem(prefixes)
//   const randomSuffix = Math.floor(Math.random() * 900000) + 100000
//   return `${randomPrefix} ${randomSuffix}`
// }
  
// // Helper function to generate a random Nigerian phone number
// const generateNigerianPhoneNumber = (): string => {
//   const prefixes = ['+234 703', '+234 706', '+234 803', '+234 806', '+234 810', '+234 813', '+234 816', '+234 903']
//   const randomPrefix = getRandomItem(prefixes)
//   const randomSuffix = Math.floor(Math.random() * 9000000) + 1000000
//   return `${randomPrefix} ${randomSuffix}`
// }
  
// // Generate skills based on position
// const generateSkillsForPosition = (position: string): string[] => {
//   const commonSkills = ['Communication', 'Teamwork', 'Problem Solving', 'Time Management', 'Safety Awareness']
  
//   const positionSkills: Record<string, string[]> = {
//     'Plumber': [
//       'Pipe Fitting', 'Leak Repair', 'Fixture Installation', 'Drainage Systems', 
//       'Water Heater Installation', 'Blueprint Reading', 'Soldering', 'Plumbing Codes'
//     ],
//     'Carpenter': [
//       'Woodworking', 'Framing', 'Cabinet Making', 'Finish Carpentry', 
//       'Measuring & Cutting', 'Power Tool Operation', 'Blueprint Reading', 'Furniture Making'
//     ],
//     'Bricklayer': [
//       'Masonry', 'Mortar Mixing', 'Wall Construction', 'Stone Laying', 
//       'Concrete Work', 'Blueprint Reading', 'Scaffolding', 'Pointing'
//     ],
//     'Construction Expert': [
//       'Project Management', 'Cost Estimation', 'Building Codes', 'Site Supervision', 
//       'Quality Control', 'Blueprint Reading', 'Contract Management', 'Risk Assessment'
//     ],
//     'Sales Rep': [
//       'Customer Service', 'Negotiation', 'Product Knowledge', 'Lead Generation',
//       'CRM Software', 'Sales Strategy', 'Client Relationship Management', 'Market Research'
//     ]
//   }
  
//   // Get position-specific skills
//   const specificSkills = positionSkills[position] || []
  
//   // Combine some common skills with position-specific skills
//   const selectedCommonSkills = commonSkills.filter(() => Math.random() > 0.5)
//   const selectedSpecificSkills = specificSkills.filter(() => Math.random() > 0.3)
  
//   // Return 3-7 skills
//   return [...selectedCommonSkills, ...selectedSpecificSkills].slice(0, getRandomInt(3, 7))
// }
  
// // Generate a random CV filename
// const generateCVFilename = (name: string, position: string): string => {
//   const fileTypes = ['pdf', 'docx', 'pdf', 'pdf'] // More PDFs than DOCXs
//   const fileType = getRandomItem(fileTypes)
//   const nameParts = name.replace(/[^a-zA-Z ]/g, '').split(' ')
//   const formattedName = nameParts.join('_').toLowerCase()
//   return `${formattedName}_cv_${position.toLowerCase().replace(' ', '_')}.${fileType}`
// }
  
// // UK names
// const ukFirstNames = [
//   'Uchenna','Mary', 'Patricia', 'Jennifer', 'Linda', 'Elizabeth', 'Barbara', 'Susan', 'Jessica', 'Sarah', 'Karen',
//   'Oliver', 'Harry', 'George', 'Noah', 'Jack', 'Leo', 'Arthur', 'Muhammad', 'Oscar', 'Charlie',
//   'Olivia', 'Amelia', 'Isla', 'Ava', 'Mia', 'Isabella', 'Sophia', 'Grace', 'Lily', 'Freya'
// ]
  
// const ukLastNames = [
//   'Nwabeke','Smith', 'Jones', 'Williams', 'Brown', 'Taylor', 'Davies', 'Wilson', 'Evans', 'Thomas', 'Johnson',
//   'Roberts', 'Walker', 'Wright', 'Robinson', 'Thompson', 'White', 'Hughes', 'Edwards', 'Green', 'Hall',
//   'Lewis', 'Harris', 'Clarke', 'Patel', 'Jackson', 'Wood', 'Turner', 'Martin', 'Cooper', 'Hill',
//   'Ward', 'Morris', 'Moore', 'Clark', 'Lee', 'King', 'Baker', 'Harrison', 'Morgan', 'Allen'
// ]
  
// // Nigerian names
// const nigerianFirstNames = [
//   'Deborah', 'Stephen', 'CYNTHIA', 'Adebayo', 'Chinedu', 'Oluwaseun', 'Ngozi', 'Emeka', 'Oluwatosin', 'Chioma', 
//   'Oluwafemi', 'Adewale', 'Folake', 'Tunde', 'Yetunde', 'Obinna', 'Aisha', 'Adeola', 'Chinwe', 'Ikechukwu', 
//   'Funmilayo', 'Olumide', 'Amara', 'Segun', 'Blessing', 'Onyeka', 'Fatima', 'Babatunde', 'Chiamaka', 'Olamide', 
//   'Halima', 'Chukwudi', 'Zainab'
// ]
  
// const nigerianLastNames = [
//   'Lawal', 'Akwemoh', 'MONYE', 'Okafor', 'Adeyemi', 'Okonkwo', 'Ibrahim', 'Eze', 'Adebisi', 'Nwachukwu', 
//   'Mohammed', 'Okeke', 'Afolabi', 'Nwosu', 'Bello', 'Ugwu', 'Ogunleye', 'Chukwu', 'Adeniyi', 'Onyekachi', 
//   'Yusuf', 'Obi', 'Adesina', 'Njoku', 'Olawale', 'Amadi', 'Aliyu', 'Onuoha', 'Olanrewaju', 'Uche', 
//   'Musa', 'Igwe', 'Adegoke'
// ]
  
// // UK locations
// const ukLocations = [
//   'Wolverhampton, UK', 'Wolverhampton, West Midlands, UK', 'Birmingham, UK', 'Dudley, UK', 'Walsall, UK',
//   'West Bromwich, UK', 'Coventry, UK', 'Stoke-on-Trent, UK', 'Telford, UK', 'Shrewsbury, UK',
//   'Stafford, UK', 'Worcester, UK', 'Lichfield, UK', 'Cannock, UK', 'Solihull, UK'
// ]
  
// // Nigerian locations
// const nigerianLocations = [
//   'Lagos, Nigeria','Lagos, Nigeria', 'Abuja, Nigeria', 'Port Harcourt, Nigeria', 'Ibadan, Nigeria', 'Kano, Nigeria',
//   'Enugu, Nigeria', 'Benin City, Nigeria', 'Calabar, Nigeria', 'Kaduna, Nigeria', 'Owerri, Nigeria',
//   'Onitsha, Nigeria', 'Warri, Nigeria', 'Jos, Nigeria', 'Uyo, Nigeria', 'Abeokuta, Nigeria'
// ]
  
// // Current occupations
// const occupations = [
//   'Sales Rep','Plumber', 'Carpenter', 'Bricklayer', 'Construction Worker', 'Handyman', 'Electrician', 'Painter',
//   'Laborer', 'Apprentice', 'Contractor', 'Self-employed', 'Student', 'Unemployed', 'Foreman',
//   'Project Manager', 'Site Supervisor', 'General Maintenance', 'Facilities Manager', 'Joiner', 'Roofer'
// ]
  
// // Positions applied for
// const positions = ['Plumber', 'Carpenter', 'Bricklayer', 'Construction Expert', 'Sales Rep']
  
// // Work arrangements
// const workArrangements = ['Full-time', 'Part-time', 'Contract', 'Freelance'] as const
  
// // Generate a random email based on name
// const generateEmail = (name: string): string => {
//   const providers = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'icloud.com', 'mail.com']
//   const nameParts = name.toLowerCase().split(' ')
//   const randomProvider = getRandomItem(providers)
  
//   // Different email formats
//   const emailFormats = [
//     `${nameParts[0]}.${nameParts[nameParts.length - 1]}@${randomProvider}`,
//     `${nameParts[0]}${nameParts[nameParts.length - 1]}@${randomProvider}`,
//     `${nameParts[0]}${nameParts[nameParts.length - 1]}${getRandomInt(1, 99)}@${randomProvider}`,
//     `${nameParts[0][0]}${nameParts[nameParts.length - 1]}@${randomProvider}`,
//     `${nameParts[nameParts.length - 1]}.${nameParts[0]}@${randomProvider}`
//   ]
  
//   return getRandomItem(emailFormats)
// }

// // Real applicant data from Google form
// const realApplicants: ApplicationData[] = [
//   {
//     id: "APPR001",
//     name: "Deborah Lawal",
//     email: "Deborahlawal26@gmail.com",
//     phone: "+234 8074143293",
//     location: "Lagos, Nigeria",
//     currentOccupation: "Sales Rep",
//     positionAppliedFor: "Sales Rep",
//     yearsOfExperience: getRandomInt(1, 5),
//     skills: generateSkillsForPosition("Sales Rep"),
//     workArrangement: getRandomItem([...workArrangements]),
//     applicationDate: generateRandomDate(),
//     cvFileName: "deborah_lawal_cv_sales_rep.pdf"
//   },
//   {
//     id: "APPR002",
//     name: "Stephen Akwemoh",
//     email: "stevetameso@gmail.com",
//     phone: "+234 8161922669",
//     location: "Lagos, Nigeria",
//     currentOccupation: "Plumber",
//     positionAppliedFor: "Plumber",
//     yearsOfExperience: getRandomInt(2, 7),
//     skills: generateSkillsForPosition("Plumber"),
//     workArrangement: getRandomItem([...workArrangements]),
//     applicationDate: generateRandomDate(),
//     cvFileName: "stephen_akwemoh_cv_plumber.pdf"
//   },
//   {
//     id: "APPR003",
//     name: "CYNTHIA MONYE",
//     email: "omop74@yahoo.com",
//     phone: "+234 7042361845",
//     location: "Lagos, Nigeria",
//     currentOccupation: getRandomItem(occupations),
//     positionAppliedFor: getRandomItem(positions),
//     yearsOfExperience: getRandomInt(1, 6),
//     skills: generateSkillsForPosition(getRandomItem(positions)),
//     workArrangement: getRandomItem([...workArrangements]),
//     applicationDate: generateRandomDate(),
//     cvFileName: "cynthia_monye_cv_construction.pdf"
//   },
//   {
//     id: "APPR004",
//     name: "Uchenna Nwabeke",
//     email: "stevetameso@gmail.com", // Using provided email even though it's duplicated
//     phone: "07935355325",
//     location: "Wolverhampton, UK",
//     currentOccupation: getRandomItem(occupations),
//     positionAppliedFor: getRandomItem(positions),
//     yearsOfExperience: getRandomInt(2, 8),
//     skills: generateSkillsForPosition(getRandomItem(positions)),
//     workArrangement: getRandomItem([...workArrangements]),
//     applicationDate: generateRandomDate(),
//     cvFileName: "uchenna_nwabeke_cv_construction.pdf"
//   }
// ]
  
// // Main function to generate application data
// export const generateApplicationData = (count: number): ApplicationData[] => {
//   // Always include the real applicants
//   const applications: ApplicationData[] = [...realApplicants]
  
//   // Generate additional random applicants
//   const randomCount = Math.max(0, count - realApplicants.length)
  
//   for (let i = 0; i < randomCount; i++) {
//     // Determine if this applicant is from Nigeria (about 30% chance)
//     const isNigerian = Math.random() < 0.3
    
//     // Generate name based on nationality
//     let firstName, lastName
//     if (isNigerian) {
//       firstName = getRandomItem(nigerianFirstNames)
//       lastName = getRandomItem(nigerianLastNames)
//     } else {
//       firstName = getRandomItem(ukFirstNames)
//       lastName = getRandomItem(ukLastNames)
//     }
//     const fullName = `${firstName} ${lastName}`
    
//     // Generate location based on nationality
//     const location = isNigerian 
//       ? getRandomItem(nigerianLocations)
//       : getRandomItem(ukLocations)
    
//     // Generate phone number based on nationality
//     const phone = isNigerian
//       ? generateNigerianPhoneNumber()
//       : generateUKPhoneNumber()
    
//     // Generate other data
//     const email = generateEmail(fullName)
//     const currentOccupation = getRandomItem(occupations)
//     const positionAppliedFor = getRandomItem(positions)
    
//     // Years of experience - weighted to have more experienced applicants
//     let yearsOfExperience
//     const expRandom = Math.random()
//     if (expRandom < 0.2) {
//       yearsOfExperience = getRandomInt(0, 1) // 0-1 years: 20%
//     } else if (expRandom < 0.5) {
//       yearsOfExperience = getRandomInt(1, 3) // 1-3 years: 30%
//     } else if (expRandom < 0.8) {
//       yearsOfExperience = getRandomInt(3, 5) // 3-5 years: 30%
//     } else {
//       yearsOfExperience = getRandomInt(5, 15) // 5+ years: 20%
//     }
    
//     const skills = generateSkillsForPosition(positionAppliedFor)
//     const workArrangement = getRandomItem([...workArrangements])
//     const applicationDate = generateRandomDate()
//     const cvFileName = generateCVFilename(fullName, positionAppliedFor)
    
//     applications.push({
//       id: `APP${i.toString().padStart(3, '0')}`,
//       name: fullName,
//       email,
//       phone,
//       location,
//       currentOccupation,
//       positionAppliedFor,
//       yearsOfExperience,
//       skills,
//       workArrangement,
//       applicationDate,
//       cvFileName
//     })
//   }
  
//   // Sort by application date (newest first)
//   return applications.sort((a, b) => new Date(b.applicationDate).getTime() - new Date(a.applicationDate).getTime())
// }