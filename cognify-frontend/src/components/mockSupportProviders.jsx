// mockSupportProviders.js
export const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi (NCT)", "Puducherry", "Ladakh", "Jammu and Kashmir"
];

export const indianCities = {
  "Karnataka": ["Bengaluru", "Mysuru", "Mangaluru", "Hubballi"],
  "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik"],
  "Delhi (NCT)": ["New Delhi", "Delhi"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai"],
  "Telangana": ["Hyderabad", "Warangal"],
  "West Bengal": ["Kolkata", "Howrah"],
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Ghaziabad", "Noida"],
  "Gujarat": ["Ahmedabad", "Surat", "Vadodara"],
  // Add more states and their cities as needed
};


export const supportTypes = {
  "Specialist": [
    "Developmental Pediatrician",
    "Child Psychologist",
    "Clinical Psychologist",
    "Occupational Therapist",
    "Speech and Language Therapist",
    "Special Educator",
    "Behavioral Therapist (ABA/IBI)",
    "Neurologist",
    "Psychiatrist"
  ],
  "Institution": [
    "Therapy Center (Multidisciplinary)",
    "Early Intervention Center",
    "Special School / Inclusive School",
    "NGO / Parent Support Group",
    "Assessment & Diagnosis Center",
    "Vocational Training Center"
  ]
};

export const conditionsServed = [
  "Autism Spectrum Disorder (ASD)",
  "Attention-Deficit/Hyperactivity Disorder (ADHD)",
  "Learning Disabilities (Dyslexia, Dyscalculia, etc.)",
  "Speech and Language Disorders",
  "Developmental Delays",
  "Intellectual Disabilities",
  "Sensory Processing Issues",
  "Behavioral Challenges",
  "General Child Development Support"
];

export const mockSupportProviders = [
  {
    id: 1,
    name: "Manipal Hospital - Child Development Unit",
    category: "Institution",
    type: "Assessment & Diagnosis Center",
    specialties: ["Developmental Pediatrician", "Child Psychologist", "Occupational Therapist"],
    conditions: ["ASD", "ADHD", "Developmental Delays", "Learning Disabilities"],
    city: "Bengaluru",
    state: "Karnataka",
    address: "Old Airport Road, Bengaluru",
    contact: "080-25024444",
    website: "https://www.manipalhospitals.com/",
    description: "Comprehensive assessment and intervention services for children with developmental concerns."
  },
  {
    id: 2,
    name: "Dr. Priya Kulkarni",
    category: "Specialist",
    type: "Child Psychologist",
    specialties: ["Child Psychologist"],
    conditions: ["ADHD", "Behavioral Challenges", "Anxiety in Children"],
    city: "Pune",
    state: "Maharashtra",
    address: "Office 4B, Koregaon Park, Pune",
    contact: "020-98765432",
    website: "#",
    description: "Specializes in psychoeducational assessments and therapy for children and adolescents."
  },
  {
    id: 3,
    name: "Asha Kiran Special Needs School",
    category: "Institution",
    type: "Special School / Inclusive School",
    specialties: ["Special Educator", "Speech Therapist"],
    conditions: ["ASD", "Intellectual Disabilities", "Multiple Disabilities"],
    city: "New Delhi",
    state: "Delhi (NCT)",
    address: "Sector 5, Dwarka, New Delhi",
    contact: "011-23456789",
    website: "https://exampleashakiran.org",
    description: "Dedicated school providing tailored education programs for children with special needs."
  },
  {
    id: 4,
    name: "Nithya Therapy Centre",
    category: "Institution",
    type: "Therapy Center (Multidisciplinary)",
    specialties: ["Occupational Therapist", "Speech and Language Therapist", "Special Educator"],
    conditions: ["ASD", "Sensory Processing Issues", "Speech and Language Disorders", "Developmental Delays"],
    city: "Chennai",
    state: "Tamil Nadu",
    address: "No. 10, Anna Nagar, Chennai",
    contact: "044-67891234",
    website: "#",
    description: "Offers a range of therapies including OT, speech therapy, and early intervention programs."
  },
  {
    id: 5,
    name: "Dr. Sameer Patel",
    category: "Specialist",
    type: "Developmental Pediatrician",
    specialties: ["Developmental Pediatrician"],
    conditions: ["ASD", "ADHD", "Developmental Delays", "General Child Development Support"],
    city: "Mumbai",
    state: "Maharashtra",
    address: "Suite 201, Andheri West, Mumbai",
    contact: "022-54321098",
    website: "https://drsameerpatel.com",
    description: "Expert in diagnosing and managing developmental and behavioral conditions in children."
  },
  {
    id: 6,
    name: "Hyderabad Early Intervention Clinic",
    category: "Institution",
    type: "Early Intervention Center",
    specialties: ["Special Educator", "Behavioral Therapist (ABA/IBI)", "Occupational Therapist"],
    conditions: ["ASD", "Developmental Delays"],
    city: "Hyderabad",
    state: "Telangana",
    address: "Banjara Hills, Road No. 3, Hyderabad",
    contact: "040-11223344",
    website: "#",
    description: "Focused on early identification and intervention for toddlers and young children."
  },
   {
    id: 7,
    name: "Communicate & Connect Speech Therapy",
    category: "Specialist",
    type: "Speech and Language Therapist",
    specialties: ["Speech and Language Therapist"],
    conditions: ["Speech and Language Disorders", "Stuttering", "Articulation Issues"],
    city: "Kolkata",
    state: "West Bengal",
    address: "Park Street Area, Kolkata",
    contact: "033-88990011",
    website: "#",
    description: "Individual and group speech therapy sessions for children and adults."
  },
  {
    id: 8,
    name: "Enable India",
    category: "Institution",
    type: "NGO / Parent Support Group",
    specialties: ["Advocacy", "Vocational Training"],
    conditions: ["General Child Development Support", "Intellectual Disabilities", "Learning Disabilities"],
    city: "Bengaluru",
    state: "Karnataka",
    address: "Indiranagar, Bengaluru",
    contact: "080-55556666",
    website: "https://www.enableindia.org/",
    description: "NGO working towards economic independence and dignity of persons with disabilities."
  },
  // Add more diverse mock data entries
];