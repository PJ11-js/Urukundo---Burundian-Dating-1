
import React, { useState } from 'react';
import { UserProfile } from '../types';
import { generateBio } from '../services/geminiService';

interface Props {
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
}

const ProfileScreen: React.FC<Props> = ({ user, setUser }) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateBio = async () => {
    setIsGenerating(true);
    const newBio = await generateBio(user.interests, user.name);
    setUser(prev => ({ ...prev, bio: newBio }));
    setIsGenerating(false);
  };

  const handleShareApp = async () => {
    const shareData = {
      title: 'Urukundo Burundi',
      text: 'Rejoins-moi sur Urukundo, l\'application de rencontre n°1 pour les Burundais ! 🇧🇮',
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Erreur de partage', err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Lien de l\'application copié ! Partage-le avec tes amis.');
    }
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Profile Header */}
      <div className="relative h-64 w-full">
        <img 
          src={user.images[0]} 
          className="w-full h-full object-cover" 
          alt="Your Profile"
        />
        <div className="absolute inset-0 bg-black/20"></div>
        <button className="absolute bottom-4 right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg text-red-500 hover:scale-105 transition-transform">
          <i className="fa-solid fa-camera"></i>
        </button>
      </div>

      <div className="p-6 space-y-8 flex-1 overflow-y-auto">
        {/* Basic Info */}
        <section>
          <div className="flex justify-between items-end mb-4">
            <h3 className="text-2xl font-bold text-gray-800">{user.name}, {user.age}</h3>
            <span className="text-sm font-medium text-gray-500 px-3 py-1 bg-gray-50 rounded-full border border-gray-100">
              {user.location}
            </span>
          </div>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">À propos de moi</label>
                <button 
                  onClick={handleGenerateBio}
                  disabled={isGenerating}
                  className="text-[10px] font-bold text-red-500 flex items-center gap-1.5 hover:opacity-70 disabled:opacity-50"
                >
                  <i className="fa-solid fa-wand-magic-sparkles"></i>
                  {isGenerating ? 'RÉDACTION...' : 'GÉNÉRER AVEC IA'}
                </button>
              </div>
              <textarea 
                className="w-full p-4 bg-gray-50 rounded-2xl text-sm border-none focus:ring-1 focus:ring-red-200 min-h-[100px]"
                value={user.bio}
                onChange={(e) => setUser({...user, bio: e.target.value})}
                placeholder="Dis-nous en plus sur toi..."
              />
            </div>
          </div>
        </section>

        {/* Bouton Partager (Nouveau) */}
        <button 
          onClick={handleShareApp}
          className="w-full py-4 bg-gradient-to-r from-red-600 to-green-600 text-white rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          <i className="fa-solid fa-share-nodes"></i>
          INVITER DES AMIS SUR URUKUNDO
        </button>

        {/* Interests */}
        <section>
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-3">Centres d'intérêt</label>
          <div className="flex flex-wrap gap-2">
            {user.interests.map(interest => (
              <span key={interest} className="px-4 py-1.5 bg-red-50 text-red-600 rounded-full text-xs font-medium border border-red-100">
                {interest}
              </span>
            ))}
            <button className="px-3 py-1.5 bg-gray-50 text-gray-400 rounded-full text-xs border border-dashed border-gray-300">
              + Ajouter
            </button>
          </div>
        </section>

        {/* Settings */}
        <section className="space-y-3 pb-8">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Compte</label>
          <div className="bg-gray-50 rounded-2xl overflow-hidden divide-y divide-gray-100">
            <div className="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-100">
              <span className="text-sm text-gray-700">Paramètres de découverte</span>
              <i className="fa-solid fa-chevron-right text-gray-300 text-xs"></i>
            </div>
            <div className="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-100">
              <span className="text-sm text-gray-700">Centre de sécurité</span>
              <i className="fa-solid fa-chevron-right text-gray-300 text-xs"></i>
            </div>
            <div className="p-4 flex justify-between items-center text-red-500 font-medium cursor-pointer hover:bg-red-50">
              <span>Se déconnecter</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProfileScreen;
