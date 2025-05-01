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
  
  // Helper function to generate a random UK phone number
  const generateUKPhoneNumber = (): string => {
    const prefixes = ['07700', '07800', '07900', '07500', '07400']
    const randomPrefix = getRandomItem(prefixes)
    const randomSuffix = Math.floor(Math.random() * 900000) + 100000
    return `${randomPrefix} ${randomSuffix}`
  }
  
  // Helper function to generate a random Nigerian phone number
  const generateNigerianPhoneNumber = (): string => {
    const prefixes = ['+234 703', '+234 706', '+234 803', '+234 806', '+234 810', '+234 813', '+234 816', '+234 903']
    const randomPrefix = getRandomItem(prefixes)
    const randomSuffix = Math.floor(Math.random() * 9000000) + 1000000
    return `${randomPrefix} ${randomSuffix}`
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
  
  // UK names
  const ukFirstNames = [
    'James', 'John', 'Robert', 'Michael', 'William', 'David', 'Richard', 'Joseph', 'Thomas', 'Charles',
    'Mary', 'Patricia', 'Jennifer', 'Linda', 'Elizabeth', 'Barbara', 'Susan', 'Jessica', 'Sarah', 'Karen',
    'Oliver', 'Harry', 'George', 'Noah', 'Jack', 'Leo', 'Arthur', 'Muhammad', 'Oscar', 'Charlie',
    'Olivia', 'Amelia', 'Isla', 'Ava', 'Mia', 'Isabella', 'Sophia', 'Grace', 'Lily', 'Freya'
  ]
  
  const ukLastNames = [
    'Smith', 'Jones', 'Williams', 'Brown', 'Taylor', 'Davies', 'Wilson', 'Evans', 'Thomas', 'Johnson',
    'Roberts', 'Walker', 'Wright', 'Robinson', 'Thompson', 'White', 'Hughes', 'Edwards', 'Green', 'Hall',
    'Lewis', 'Harris', 'Clarke', 'Patel', 'Jackson', 'Wood', 'Turner', 'Martin', 'Cooper', 'Hill',
    'Ward', 'Morris', 'Moore', 'Clark', 'Lee', 'King', 'Baker', 'Harrison', 'Morgan', 'Allen'
  ]
  
  // Nigerian names
  const nigerianFirstNames = [
    'Adebayo', 'Chinedu', 'Oluwaseun', 'Ngozi', 'Emeka', 'Oluwatosin', 'Chioma', 'Oluwafemi', 'Adewale', 'Folake',
    'Tunde', 'Yetunde', 'Obinna', 'Aisha', 'Adeola', 'Chinwe', 'Ikechukwu', 'Funmilayo', 'Olumide', 'Amara',
    'Segun', 'Blessing', 'Onyeka', 'Fatima', 'Babatunde', 'Chiamaka', 'Olamide', 'Halima', 'Chukwudi', 'Zainab'
  ]
  
  const nigerianLastNames = [
    'Okafor', 'Adeyemi', 'Okonkwo', 'Ibrahim', 'Eze', 'Adebisi', 'Nwachukwu', 'Mohammed', 'Okeke', 'Afolabi',
    'Nwosu', 'Bello', 'Ugwu', 'Ogunleye', 'Chukwu', 'Adeniyi', 'Onyekachi', 'Yusuf', 'Obi', 'Adesina',
    'Njoku', 'Olawale', 'Amadi', 'Aliyu', 'Onuoha', 'Olanrewaju', 'Uche', 'Musa', 'Igwe', 'Adegoke'
  ]
  
  // UK locations
  const ukLocations = [
    'Wolverhampton, UK', 'Wolverhampton, West Midlands, UK', 'Birmingham, UK', 'Dudley, UK', 'Walsall, UK',
    'West Bromwich, UK', 'Coventry, UK', 'Stoke-on-Trent, UK', 'Telford, UK', 'Shrewsbury, UK',
    'Stafford, UK', 'Worcester, UK', 'Lichfield, UK', 'Cannock, UK', 'Solihull, UK'
  ]
  
  // Nigerian locations
  const nigerianLocations = [
    'Lagos, Nigeria', 'Abuja, Nigeria', 'Port Harcourt, Nigeria', 'Ibadan, Nigeria', 'Kano, Nigeria',
    'Enugu, Nigeria', 'Benin City, Nigeria', 'Calabar, Nigeria', 'Kaduna, Nigeria', 'Owerri, Nigeria',
    'Onitsha, Nigeria', 'Warri, Nigeria', 'Jos, Nigeria', 'Uyo, Nigeria', 'Abeokuta, Nigeria'
  ]
  
  // Current occupations
  const occupations = [
    'Plumber', 'Carpenter', 'Bricklayer', 'Construction Worker', 'Handyman', 'Electrician', 'Painter',
    'Laborer', 'Apprentice', 'Contractor', 'Self-employed', 'Student', 'Unemployed', 'Foreman',
    'Project Manager', 'Site Supervisor', 'General Maintenance', 'Facilities Manager', 'Joiner', 'Roofer'
  ]
  
  // Positions applied for
  const positions = ['Plumber', 'Carpenter', 'Bricklayer', 'Construction Expert']
  
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
  
  // Main function to generate application data
  export const generateApplicationData = (count: number): ApplicationData[] => {
    const applications: ApplicationData[] = []
    
    for (let i = 0; i < count; i++) {
      // Determine if this applicant is from Nigeria (about 30% chance)
      const isNigerian = Math.random() < 0.3
      
      // Generate name based on nationality
      let firstName, lastName
      if (isNigerian) {
        firstName = getRandomItem(nigerianFirstNames)
        lastName = getRandomItem(nigerianLastNames)
      } else {
        firstName = getRandomItem(ukFirstNames)
        lastName = getRandomItem(ukLastNames)
      }
      const fullName = `${firstName} ${lastName}`
      
      // Generate location based on nationality
      const location = isNigerian 
        ? getRandomItem(nigerianLocations)
        : getRandomItem(ukLocations)
      
      // Generate phone number based on nationality
      const phone = isNigerian
        ? generateNigerianPhoneNumber()
        : generateUKPhoneNumber()
      
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
      const workArrangement = getRandomItem(workArrangements)
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
  