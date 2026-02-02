
import { UserProfile } from './types';

export const MOCK_PROFILES: UserProfile[] = [
  {
    id: '1',
    name: 'Inès',
    age: 24,
    bio: 'Looking for someone to explore the shores of Lake Tanganyika with. Coffee lover and dancer. Amahoro!',
    location: 'Bujumbura',
    images: ['https://picsum.photos/id/64/600/800'],
    interests: ['Dancing', 'Beach', 'Culture'],
    distance: 2
  },
  {
    id: '2',
    name: 'Fabrice',
    age: 28,
    bio: 'Professional chef living in Gitega. I love traditional Burundian cuisine and modern fusion. Let\'s talk food!',
    location: 'Gitega',
    images: ['https://picsum.photos/id/91/600/800'],
    interests: ['Cooking', 'Art', 'Travel'],
    distance: 45
  },
  {
    id: '3',
    name: 'Bella',
    age: 22,
    bio: 'University student in Bujumbura. Music is my life. If you know good spots for live bands, let me know!',
    location: 'Bujumbura',
    images: ['https://picsum.photos/id/103/600/800'],
    interests: ['Music', 'Hiking', 'Socializing'],
    distance: 5
  },
  {
    id: '4',
    name: 'Arnaud',
    age: 31,
    bio: 'Entrepreneur. I work hard but I play harder. Always looking for a new perspective on our beautiful country.',
    location: 'Ngozi',
    images: ['https://picsum.photos/id/177/600/800'],
    interests: ['Business', 'Cars', 'Mountains'],
    distance: 120
  }
];

export const COLORS = {
  primary: '#ce1126', // Burundi Red
  secondary: '#118b44', // Burundi Green
  accent: '#ffffff',
  text: '#1f2937'
};
