export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  imageId: string;
  tags: string[];
  category: string;
  platforms: string[];
  featured: boolean;
  latest?: boolean;
  playStore?: string;
  appStore?: string;
}

export const projectsData: Project[] = [
  {
    id: 'vytal',
    title: 'Vytal',
    description: 'Be the change. Every single day.',
    image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/ecfac37664-aaf002540768427d81c6.png',
    imageId: 'ecfac37664-aaf002540768427d81c6.png',
    tags: ['Sustainability', 'Food & Drink', 'Reusable Packaging'],
    category: 'mobile',
    platforms: ['ios', 'android'],
    featured: true,
    latest: true,
    playStore: 'https://play.google.com/store/apps/details?id=com.vytal.vytalconsumerapp',
    appStore: 'https://apps.apple.com/us/app/vytal/id1476201142'
  },
  {
    id: 'edulearn',
    title: 'EduLearn',
    description: 'Comprehensive learning platform with personalized education tracking',
    image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/2bb554b93d-077ccd5a2cfb0b1469f9.png',
    imageId: '2bb554b93d-077ccd5a2cfb0b1469f9.png',
    tags: ['React Native', 'Education', 'Learning Analytics'],
    category: 'mobile',
    platforms: ['ios', 'android'],
    featured: true,
    latest: false
  },
  {
    id: 'fittrack',
    title: 'FitTrack Pro',
    description: 'Pro fitness tracking app with AI-powered workout recommendations',
    image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/ecfac37664-aaf002540768427d81c6.png',
    imageId: 'ecfac37664-aaf002540768427d81c6.png',
    tags: ['React Native', 'Firebase', 'Machine Learning'],
    category: 'mobile',
    platforms: ['ios', 'android'],
    featured: true,
    latest: false
  },
  {
    id: 'fooddash',
    title: 'FoodDash',
    description: 'Restaurant and food delivery service app',
    image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/71d137bc6c-9f5e0c36af283f7999d6.png',
    imageId: '71d137bc6c-9f5e0c36af283f7999d6.png',
    tags: ['Swift UI', 'ARKit', 'Core ML'],
    category: 'mobile',
    platforms: ['ios'],
    featured: true,
    latest: false
  },
  {
    id: 'travelcompanion',
    title: 'TravelCompanion',
    description: 'Travel and hospitality platform for seamless journeys',
    image: '/app-screens/TravelCompanion.png',
    imageId: 'TravelCompanion.png',
    tags: ['Kotlin', 'MongoDB', 'AR Core'],
    category: 'mobile',
    platforms: ['android'],
    featured: true,
    latest: false
  },
  {
    id: 'eventhub',
    title: 'EventHub',
    description: 'Event management solution for organizers and attendees',
    image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/0f177d83fc-1f8ede5823132e067399.png',
    imageId: '0f177d83fc-1f8ede5823132e067399.png',
    tags: ['React Native', 'JavaScript', 'Redux'],
    category: 'mobile',
    platforms: ['ios', 'android'],
    featured: false,
    latest: false
  },
  {
    id: 'propertypulse',
    title: 'PropertyPulse',
    description: 'Comprehensive real estate management system',
    image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/71d137bc6c-9f5e0c36af283f7999d6.png',
    imageId: '71d137bc6c-9f5e0c36af283f7999d6.png',
    tags: ['Swift', 'HealthKit', 'CloudKit'],
    category: 'mobile',
    platforms: ['ios'],
    featured: false,
    latest: false
  },
  {
    id: 'healthconnect',
    title: 'HealthConnect',
    description: 'Telemedicine platform with admin dashboard',
    image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/0f177d83fc-1f8ede5823132e067399.png',
    imageId: '0f177d83fc-1f8ede5823132e067399.png',
    tags: ['React Native', 'JavaScript', 'Redux'],
    category: 'mobile',
    platforms: ['ios', 'android'],
    featured: false,
    latest: false
  },
  {
    id: 'healthconnect-patient',
    title: 'HealthConnect Patient App',
    description: 'A mobile app for patients to book appointments, consult doctors, and manage health records.',
    image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/placeholder-patient.png',
    imageId: 'placeholder-patient.png',
    tags: ['React Native', 'Healthcare', 'Patient'],
    category: 'mobile',
    platforms: ['ios', 'android'],
    featured: false,
    latest: false
  },
  {
    id: 'healthconnect-doctor',
    title: 'HealthConnect Doctor App',
    description: 'A mobile app for doctors to manage appointments, consult patients, and access medical records.',
    image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/placeholder-doctor.png',
    imageId: 'placeholder-doctor.png',
    tags: ['React Native', 'Healthcare', 'Doctor'],
    category: 'mobile',
    platforms: ['ios', 'android'],
    featured: false,
    latest: false
  }
]; 