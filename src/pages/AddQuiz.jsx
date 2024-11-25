import React, { useContext, useEffect } from 'react';
import { getDatabase, ref, set } from "firebase/database";
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { MainContext } from './context';


function AddQuiz() {
  const { user} = useContext(MainContext)
  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      question: formData.get('question'),
      option1: formData.get('option1'),
      option2: formData.get('option2'),
      option3: formData.get('option3'),
      option4: formData.get('option4'),
      correctOption: formData.get('correctOption'),
    };

    const quizId=uuidv4();
    const db = getDatabase();
    set(ref(db, 'quiz/' + quizId), data);

    e.target.reset()
  };

  useEffect(
    ()=>{
       const lsUserData=localStorage.getItem("user");
       if(lsUserData == undefined ){
        navigate("/login")
       }
    },
    [user]
  )

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md"
      >
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Create a Quiz Question
        </h2>

        {/* Question Input */}
        <div className="mb-4">
          <label htmlFor="question" className="block text-gray-600 font-medium mb-2">
            Question:
          </label>
          <input
            type="text"
            id="question"
            name="question"
            placeholder="Enter your question"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Options Input */}
        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-2">Options:</label>
          {[1, 2, 3, 4].map((option) => (
            <div key={option} className="flex items-center mb-2">
              <input
                type="text"
                id={`option-${option}`}
                name={`option${option}`}
                placeholder={`Option ${option}`}
                className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 mr-2"
              />
            </div>
          ))}
        </div>

        {/* Correct Option Selector */}
        <div className="mb-4">
          <label htmlFor="correctOption" className="block text-gray-600 font-medium mb-2">
            Correct Option:
          </label>
          <select
            id="correctOption"
            name="correctOption"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select the correct option</option>
            {[1, 2, 3, 4].map((option) => (
              <option key={option} value={option}>
                {`Option ${option}`}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600"
        >
          Submit Question
        </button>
      </form>
    </div>
  );
}

export default AddQuiz;
