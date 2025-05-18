import React, { useEffect, useState, useMemo } from 'react'; // Added useMemo
import { useNavigate } from 'react-router-dom';

// Placeholder icons (consider using an SVG icon library like Heroicons or Feather Icons for better quality)
const UserIcon = () => <span role="img" aria-label="user" className="text-5xl">🧑</span>;
const EmailIcon = () => <span role="img" aria-label="email" className="mr-2">📧</span>;
const XPIcon = () => <span role="img" aria-label="xp" className="mr-2">✨</span>;
const StarIcon = () => <span role="img" aria-label="stars" className="mr-2 text-yellow-400">⭐</span>;
const LevelIcon = () => <span role="img" aria-label="level" className="mr-2">🏆</span>;
const BadgeIcon = () => <span role="img" aria-label="badges" className="mr-2">🎖️</span>;
const CloseIcon = () => <span role="img" aria-label="close" className="text-2xl">&times;</span>;


const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showLearnedItemsModal, setShowLearnedItemsModal] = useState(false); // New state for modal
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError('');
      const token = localStorage.getItem('authToken');

      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const profileResponse = await fetch('http://localhost:5000/api/users/profile', {
          method: 'GET',
          headers: { 'Authorization': `Bearer ${token}` },
        });

        if (!profileResponse.ok) {
          if (profileResponse.status === 401) {
            localStorage.removeItem('authToken');
            navigate('/login');
            return;
          }
          const errorData = await profileResponse.json().catch(() => ({ message: 'Failed to fetch profile, server returned non-JSON response.' }));
          throw new Error(errorData.message || 'Failed to fetch profile');
        }
        const profileData = await profileResponse.json();
        setProfile(profileData);

        const progressResponse = await fetch(`http://localhost:5000/api/progress/${profileData._id}`, {
          method: 'GET',
          headers: { 'Authorization': `Bearer ${token}` },
        });

        if (!progressResponse.ok) {
          const errorData = await progressResponse.json().catch(() => ({ message: 'Failed to fetch progress, server returned non-JSON response.' }));
          if (progressResponse.status === 404) {
            setProgress({ xp: 0, stars: 0, learnedItems: [] });
            console.warn("Progress not found for user, defaulting to 0.");
          } else {
            throw new Error(errorData.message || 'Failed to fetch progress');
          }
        } else {
          const progressData = await progressResponse.json();
          setProgress(progressData);
        }

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  const xpPerLevel = 100;
  const currentLevel = progress ? Math.floor(progress.xp / xpPerLevel) : 0;

  // Memoize unique learned items to prevent recalculation on every render
  const uniqueLearnedItems = useMemo(() => {
    if (progress?.learnedItems) {
      // The API response shows ' FOR ELEPHANT' and 'E FOR ELEPHANT'.
      // new Set() will treat these as distinct.
      return Array.from(new Set(progress.learnedItems));
    }
    return [];
  }, [progress]);


  const InfoRow = ({ icon, label, value, valueClass = "text-indigo-700", onClick }) => (
    <div
      className={`flex items-center justify-between py-3 border-b border-slate-200 last:border-b-0 ${onClick ? 'cursor-pointer hover:bg-slate-100/70 -mx-2 px-2 rounded-md transition-colors' : ''}`}
      onClick={onClick}
    >
      <span className="flex items-center text-sm font-medium text-slate-500">
        {icon}
        {label}
      </span>
      <span className={`text-sm font-semibold ${valueClass}`}>{value}</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-indigo-200 to-sky-300 flex items-center justify-center p-4 sm:p-6 selection:bg-purple-500 selection:text-white">
      <div className="bg-white/90 backdrop-blur-lg shadow-2xl rounded-3xl p-6 sm:p-8 md:p-10  w-[80vw]">
        <div className="text-center mb-8">
          <div className="w-28 h-28 mx-auto rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg mb-5 ring-4 ring-white/50">
            <UserIcon />
          </div>
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-700">
            {profile ? profile.name : 'Your Profile'}
          </h1>
          <p className="text-slate-500 mt-1 text-sm">Welcome back! Here's your learning journey.</p>
        </div>

        {loading && (
          <div className="flex justify-center items-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-t-2 border-purple-600"></div>
            <p className="ml-3 text-slate-600">Loading your awesomeness...</p>
          </div>
        )}

        {error && !loading && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md my-6" role="alert">
                <p className="font-bold">Oops! Something went wrong</p>
                <p>{error}</p>
            </div>
        )}

        {profile && !loading && !error && (
          <div>
            <div className="mb-8 p-5 bg-slate-50/50 rounded-xl shadow-sm border border-slate-200/70">
              <h3 className="text-lg font-semibold text-indigo-600 mb-3 border-b pb-2">Account Details</h3>
              {profile.name && <InfoRow icon={<span className="mr-2">👤</span>} label="Name:" value={profile.name} />}
              {profile.email && <InfoRow icon={<EmailIcon />} label="Email:" value={profile.email} />}
            </div>

            {progress && (
                <div className="p-5 bg-slate-50/50 rounded-xl shadow-sm border border-slate-200/70">
                    <h3 className="text-lg font-semibold text-indigo-600 mb-3 border-b pb-2">Learning Achievements</h3>
                    <InfoRow icon={<XPIcon/>} label="Experience Points (XP):" value={progress.xp !== undefined ? progress.xp : 'N/A'} valueClass="text-purple-600 font-bold" />
                    <InfoRow icon={<StarIcon/>} label="Stars Collected:" value={progress.stars !== undefined ? progress.stars : 'N/A'} valueClass="text-amber-500 font-bold" />
                    <InfoRow icon={<LevelIcon/>} label="Current Level:" value={currentLevel} valueClass="text-green-600 font-bold" />
                    <InfoRow
                        icon={<BadgeIcon/>}
                        label="Unique Items Learned:"
                        value={`${uniqueLearnedItems.length} Items`}
                        valueClass={`font-bold ${uniqueLearnedItems.length > 0 ? 'text-sky-600 hover:underline' : 'text-slate-500'}`}
                        onClick={uniqueLearnedItems.length > 0 ? () => setShowLearnedItemsModal(true) : undefined}
                    />
                     {uniqueLearnedItems.length > 0 && (
                        <div className="mt-3  text-xl text-right flex justify-center ">
                            <button
                                onClick={() => setShowLearnedItemsModal(true)}
                                className="text-amber-50 h-12 w-44 bg-purple-600 rounded-2xl hover:text-amber-50"
                                aria-label="View all learned items"
                            >
                                Learned Items
                            </button>
                        </div>
                    )}
                </div>
            )}
             {!progress && !loading && (
                <p className="text-slate-500 text-center my-4">No progress information available yet.</p>
            )}

            <button
              onClick={handleLogout}
              className="w-full mt-10 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transform transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-opacity-75 active:scale-95"
            >
              Log Out
            </button>
          </div>
        )}
         {!profile && !loading && !error && (
             <p className="text-slate-600 text-center">Could not load profile information. You might be redirected to login.</p>
         )}
      </div>

      {/* Learned Items Modal */}
      {showLearnedItemsModal && progress && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-opacity duration-300 ease-in-out">
          <div className="bg-white rounded-xl shadow-2xl p-6 max-w-sm sm:max-w-md w-full max-h-[85vh] flex flex-col transform transition-all duration-300 ease-in-out scale-95 opacity-0 animate-modal-scale-fade-in">
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-200">
              <h4 className="text-xl font-semibold text-indigo-700">You've Learned!</h4>
              <button
                onClick={() => setShowLearnedItemsModal(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-full hover:bg-slate-100"
                aria-label="Close learned items modal"
              >
                <CloseIcon />
              </button>
            </div>
            {uniqueLearnedItems.length > 0 ? (
              <ul className="space-y-2 overflow-y-auto custom-scrollbar pr-2">
                {uniqueLearnedItems.map((item, index) => (
                  <li
                    key={index}
                    className="p-3 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 text-indigo-800 rounded-lg shadow-sm text-sm font-medium"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-slate-500 text-center py-4">No items learned yet. Keep going!</p>
            )}
            <button
                onClick={() => setShowLearnedItemsModal(false)}
                className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 px-4 rounded-lg shadow-md hover:shadow-lg transition-all"
            >
                Close
            </button>
          </div>
        </div>
      )}
      {/* Add this to your global CSS or a <style> tag if you don't have it for modal animation */}
      <style jsx global>{`
        @keyframes modal-scale-fade-in {
          0% {
            opacity: 0;
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-modal-scale-fade-in {
          animation: modal-scale-fade-in 0.3s ease-out forwards;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1; /* slate-300 */
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8; /* slate-500 */
        }
      `}</style>
    </div>
  );
};

export default ProfilePage;