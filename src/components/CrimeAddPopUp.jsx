import React, { useState } from 'react';

const CrimeAddPopUp = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handleTogglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div className="relative">
      <button 
        className="bg-blue-500 text-white px-4 py-2 rounded" 
        onClick={handleTogglePopup}
      >
        Add Skill
      </button>

      {showPopup && (
        <div 
          className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75"
          style={{ zIndex: 1000 }}
        >
          <div 
            className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add Skill</h2>
              <button 
                className="text-gray-500 hover:text-gray-800"
                onClick={handleTogglePopup}
              >
                &times;
              </button>
            </div>
            <form>
              <div className="mb-4">
                <label 
                  className="block text-gray-700 mb-2" 
                  htmlFor="skill"
                >
                  Skill*
                </label>
                <input 
                  type="text" 
                  id="skill" 
                  name="skill" 
                  className="w-full p-2 border border-gray-300 rounded" 
                  placeholder="Skill (e.g., Project Management)"
                />
              </div>
              <div className="mb-4">
                <h3 className="text-gray-700 mb-2">Suggested based on your profile</h3>
                <div className="flex flex-wrap gap-2">
                  {['Java', 'Git', 'AngularJS', 'Redux.js', 'C#', 'C++', 'Software Development', 'React Native', 'Agile Methodologies', 'HTML'].map((skill) => (
                    <span 
                      key={skill} 
                      className="bg-gray-200 px-3 py-1 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex justify-end">
                <button 
                  type="button" 
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={handleTogglePopup}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CrimeAddPopUp;
