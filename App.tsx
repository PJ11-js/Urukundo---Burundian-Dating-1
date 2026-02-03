
import React, { useState, useEffect } from 'react';
import { UserProfile, AppScreen, ChatSession, Message } from './types';
import { MOCK_PROFILES } from './constants';
import DiscoveryScreen from './components/DiscoveryScreen';
import MessagesScreen from './components/MessagesScreen';
import ProfileScreen from './components/ProfileScreen';
import ChatDetailScreen from './components/ChatDetailScreen';
import BottomNav from './components/BottomNav';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>(AppScreen.DISCOVERY);
  const [profiles, setProfiles] = useState<UserProfile[]>(MOCK_PROFILES);
  const [matches, setMatches] = useState<ChatSession[]>([]);
  const [activeChat, setActiveChat] = useState<ChatSession | null>(null);
  const [currentUser, setCurrentUser] = useState<UserProfile>({
    id: 'me',
    name: 'Jean',
    age: 26,
    bio: 'Proud Burundian looking for a connection.',
    location: 'Bujumbura',
    images: ['https://picsum.photos/id/1/600/800'],
    interests: ['Technology', 'Soccer']
  });

  const handleLike = (profile: UserProfile) => {
    // Logic for a "Match"
    const isMatch = Math.random() > 0.5; // Simulate matching probability
    if (isMatch) {
      const newSession: ChatSession = {
        id: `session-${Date.now()}`,
        partner: profile,
        messages: [
          {
            id: 'm1',
            senderId: profile.id,
            text: "It's a match! Amahoro!",
            timestamp: Date.now()
          }
        ]
      };
      setMatches(prev => [newSession, ...prev]);
      alert(`It's a Match with ${profile.name}!`);
    }
    setProfiles(prev => prev.filter(p => p.id !== profile.id));
  };

  const handleDislike = (profileId: string) => {
    setProfiles(prev => prev.filter(p => p.id !== profileId));
  };

  const openChat = (session: ChatSession) => {
    setActiveChat(session);
    setCurrentScreen(AppScreen.CHAT);
  };

  const sendMessage = (text: string) => {
    if (!activeChat) return;
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      senderId: 'me',
      text,
      timestamp: Date.now()
    };
    
    const updatedMatches = matches.map(m => {
      if (m.id === activeChat.id) {
        const updated = { ...m, messages: [...m.messages, newMessage] };
        setActiveChat(updated);
        return updated;
      }
      return m;
    });
    setMatches(updatedMatches);
  };

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-white shadow-2xl relative overflow-hidden">
      {/* Header */}
      <header className="px-6 py-4 flex justify-between items-center bg-white border-b border-gray-100 z-10">
        <h1 className="text-2xl font-bold tracking-tighter" style={{ color: '#ce1126' }}>
          URUKUNDO <span className="text-gray-300 font-light">| BURUNDI</span>
        </h1>
        <button className="text-gray-400 hover:text-gray-600">
          <i className="fa-solid fa-sliders text-xl"></i>
        </button>
      </header>

      {/* Screen Content */}
      <main className="flex-1 overflow-y-auto relative bg-gray-50">
        {currentScreen === AppScreen.DISCOVERY && (
          <DiscoveryScreen 
            profiles={profiles} 
            onLike={handleLike} 
            onDislike={handleDislike} 
          />
        )}
        {currentScreen === AppScreen.MESSAGES && (
          <MessagesScreen 
            matches={matches} 
            onSelectChat={openChat} 
          />
        )}
        {currentScreen === AppScreen.PROFILE && (
          <ProfileScreen user={currentUser} setUser={setCurrentUser} />
        )}
        {currentScreen === AppScreen.CHAT && activeChat && (
          <ChatDetailScreen 
            session={activeChat} 
            onSendMessage={sendMessage} 
            onBack={() => setCurrentScreen(AppScreen.MESSAGES)}
          />
        )}
      </main>

      {/* Bottom Navigation */}
      {currentScreen !== AppScreen.CHAT && (
        <BottomNav 
          currentScreen={currentScreen} 
          onNavigate={setCurrentScreen} 
        />
      )}
    </div>
  );
};

types.ts

export default App;
