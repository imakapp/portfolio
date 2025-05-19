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
    image: '/app-screens/Vytal.png',
    imageId: 'Vytal.png',
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
    image: '/app-screens/EduLearn.png',
    imageId: 'EduLearn.png',
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
    image: '/app-screens/FitTrackPro.png',
    imageId: 'FitTrackPro.png',
    tags: ['Flutter', 'Firebase', 'Machine Learning'],
    category: 'mobile',
    platforms: ['ios', 'android'],
    featured: true,
    latest: false
  },
  {
    "id": "travelcompanion",
    "title": "TravelCompanion",
    "description": "Travel and hospitality platform for seamless journeys",
    "image": "/app-screens/TravelCompanion.png",
    "imageId": "TravelCompanion.png",
    "tags": ["Flutter", "MongoDB", "Firebase"],
    "category": "mobile",
    "platforms": ["android", "ios"],
    "featured": true,
    "latest": true
  }
]; 