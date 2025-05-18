import React, { useState, useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// --- Data Definitions ---

// More structured question data with explicit options and scores
const disorderQuestions = {
  Autism: [
    { id: 'autism-q1', text: "How often does your child make eye contact when you are speaking directly to them?", options: [{ value: 'Rarely', score: 2 }, { value: 'Sometimes', score: 1 }, { value: 'Often', score: 0 }, { value: 'Almost Always', score: 0 }] },
    { id: 'autism-q2', text: "Does your child have difficulty understanding the facial expressions of others (e.g., happiness, sadness, anger)?", options: [{ value: 'Yes', score: 2 }, { value: 'Sometimes', score: 1 }, { value: 'No', score: 0 }] },
    { id: 'autism-q3', text: "Does your child seem more interested in solitary activities than playing with other children?", options: [{ value: 'Yes', score: 2 }, { value: 'Often', score: 2 }, { value: 'Sometimes', score: 1 }, { value: 'No', score: 0 }] },
    { id: 'autism-q4', text: "Does your child struggle with back-and-forth conversations or taking turns?", options: [{ value: 'Yes', score: 2 }, { value: 'Sometimes', score: 1 }, { value: 'No', score: 0 }] },
    { id: 'autism-q5', text: "Does your child engage in repetitive movements like rocking, hand-flapping, or spinning objects?", options: [{ value: 'Often', score: 2 }, { value: 'Sometimes', score: 1 }, { value: 'Rarely', score: 0 }, { value: 'Never', score: 0 }] },
    { id: 'autism-q6', text: "Does your child become very distressed by small changes in their routine?", options: [{ value: 'Yes', score: 2 }, { value: 'Very easily', score: 2 }, { value: 'Sometimes', score: 1 }, { value: 'Not really', score: 0 }] },
    { id: 'autism-q7', text: "Does your child have very intense and focused interests that seem unusual in their scope or intensity?", options: [{ value: 'Yes', score: 2 }, { value: 'Very much so', score: 2 }, { value: 'Moderately', score: 1 }, { value: 'Not really', score: 0 }] },
    { id: 'autism-q8', text: "Is your child overly sensitive to loud noises?", options: [{ value: 'Yes', score: 2 }, { value: 'Very', score: 2 }, { value: 'Moderately', score: 1 }, { value: 'Not really', score: 0 }] },
  ],
  ADHD: [
    { id: 'adhd-q1', text: "How often does your child have trouble paying close attention to details or makes careless mistakes?", options: [{ value: 'Often', score: 3 }, { value: 'Sometimes', score: 2 }, { value: 'Rarely', score: 1 }, { value: 'Never', score: 0 }] },
    { id: 'adhd-q2', text: "How often does your child have difficulty sustaining attention in tasks or play activities?", options: [{ value: 'Often', score: 3 }, { value: 'Sometimes', score: 2 }, { value: 'Rarely', score: 1 }, { value: 'Never', score: 0 }] },
    { id: 'adhd-q3', text: "How often does your child seem not to listen when spoken to directly?", options: [{ value: 'Often', score: 3 }, { value: 'Sometimes', score: 2 }, { value: 'Rarely', score: 1 }, { value: 'Never', score: 0 }] },
    { id: 'adhd-q4', text: "How often does your child fidget with or tap hands or feet or squirm in seat?", options: [{ value: 'Often', score: 3 }, { value: 'Sometimes', score: 2 }, { value: 'Rarely', score: 1 }, { value: 'Never', score: 0 }] },
    { id: 'adhd-q5', text: "How often does your child have difficulty waiting their turn?", options: [{ value: 'Often', score: 3 }, { value: 'Sometimes', score: 2 }, { value: 'Rarely', score: 1 }, { value: 'Never', score: 0 }] },
    { id: 'adhd-q6', text: "How often does your child interrupt or intrude on others?", options: [{ value: 'Often', score: 3 }, { value: 'Sometimes', score: 2 }, { value: 'Rarely', score: 1 }, { value: 'Never', score: 0 }] },
  ],
  Dyslexia: [
    { id: 'dyslexia-q1', text: "How often does your child have difficulty recognizing letters (e.g., b, d, p, q) or matching sounds to letters?", options: [{ value: 'Often', score: 3 }, { value: 'Sometimes', score: 2 }, { value: 'Rarely', score: 1 }, { value: 'Never', score: 0 }] },
    { id: 'dyslexia-q2', text: "How often does your child reverse letters (e.g., 'was' for 'saw', 'b' for 'd') or words when reading or writing?", options: [{ value: 'Often', score: 3 }, { value: 'Sometimes', score: 2 }, { value: 'Rarely', score: 1 }, { value: 'Never', score: 0 }] },
    { id: 'dyslexia-q3', text: "How often does your child struggle with spelling words correctly?", options: [{ value: 'Often', score: 3 }, { value: 'Sometimes', score: 2 }, { value: 'Rarely', score: 1 }, { value: 'Never', score: 0 }] },
    { id: 'dyslexia-q4', text: "How often does your child have difficulty remembering the sequence of letters in words or steps in a task?", options: [{ value: 'Often', score: 3 }, { value: 'Sometimes', score: 2 }, { value: 'Rarely', score: 1 }, { value: 'Never', score: 0 }] },
    { id: 'dyslexia-q5', text: "Compared to other children their age, how would you rate your child's reading speed?", options: [{ value: 'Much slower', score: 3 }, { value: 'Slightly slower', score: 2 }, { value: 'About the same', score: 0 }, { value: 'Slightly faster', score: -1 }, { value: 'Much faster', score: -2 }] }, // Note negative scores possible
  ],
  SPD: [ // Sensory Processing Disorder
    { id: 'spd-q1', text: "How often does your child show strong negative reactions to loud or unexpected sounds?", options: [{ value: 'Often', score: 3 }, { value: 'Sometimes', score: 2 }, { value: 'Rarely', score: 1 }, { value: 'Never', score: 0 }] },
    { id: 'spd-q2', text: "How often does your child avoid wearing certain textures of clothing (e.g., itchy, scratchy) or refuse to eat foods based on their texture?", options: [{ value: 'Often', score: 3 }, { value: 'Sometimes', score: 2 }, { value: 'Rarely', score: 1 }, { value: 'Never', score: 0 }] },
    { id: 'spd-q3', text: "How often does your child seem to have a very high or very low sensitivity to pain or touch compared to others?", options: [{ value: 'Often', score: 3 }, { value: 'Sometimes', score: 2 }, { value: 'Rarely', score: 1 }, { value: 'Never', score: 0 }] },
    { id: 'spd-q4', text: "How often does your child seek out intense sensory experiences like constant movement, spinning, crashing, or deep pressure?", options: [{ value: 'Often', score: 3 }, { value: 'Sometimes', score: 2 }, { value: 'Rarely', score: 1 }, { value: 'Never', score: 0 }] },
  ]
};

const categoryOrder = Object.keys(disorderQuestions);

const resources = [
  { name: "Autism Society of India", description: "Provides support, advocacy, and resources for individuals with autism and their families.", website: "https://www.autismsocietyofindia.org/", contact: "Contact information available on their website." },
  { name: "ADHD India (Search - No single national body)", description: "Look for local support groups, psychologists, or psychiatrists specializing in ADHD.", website: null, contact: "Search online directories (e.g., Indian Association of Clinical Psychologists, local hospitals)." },
  { name: "Dyslexia Association of India", description: "Works to raise awareness and provide support for individuals with dyslexia.", website: "http://www.dyslexiaindia.org.in/", contact: "Contact information available on their website." },
  { name: "Occupational Therapy Association of India (Search for Sensory Integration)", description: "OTs can help with SPD. Search for therapists with SI certification.", website: "https://aiota.org/", contact: "Check website for directories or search local listings." },
  { name: "Developmental Pediatrician (General Search)", description: "Specialists in child development who can diagnose and manage neurodevelopmental conditions. Search online for local practitioners.", contact: "Search online directories (e.g., Practo, Justdial, local hospital websites)." },
  { name: "Child Psychologist/Clinical Psychologist (General Search)", description: "Professionals who can assess and provide therapy for behavioral and emotional issues in children. Search online for local practitioners.", contact: "Search online directories (e.g., Practo, Justdial, IACP)." },
  { name: "Child Neurologist (General Search)", description: "Medical doctors specializing in the nervous system, including brain development. Often consulted for complex cases.", contact: "Search online directories or get referrals." },
];

// --- Helper Functions ---

// Calculate max score for a category
const getMaxScore = (category) => {
  return disorderQuestions[category].reduce((maxSum, q) => {
    const maxOptionScore = Math.max(...q.options.map(opt => opt.score));
    // Ensure we don't add negative values if the highest score is 0 or less
    return maxSum + Math.max(0, maxOptionScore);
  }, 0);
};

// Determine likelihood based on score percentage
const getLikelihood = (category, score) => {
  const maxScore = getMaxScore(category);
  if (maxScore <= 0) return 'Low'; // Avoid division by zero or weird results

  const percentage = (score / maxScore) * 100;

  // Adjust thresholds as needed - these are examples
  if (category === 'Autism') {
    if (percentage >= 65) return 'High'; // e.g. score >= ~10.4 out of 16
    if (percentage >= 30) return 'Moderate'; // e.g. score >= ~4.8 out of 16
    return 'Low';
  } else if (category === 'ADHD') {
    if (percentage >= 70) return 'High'; // e.g. score >= 12.6 out of 18
    if (percentage >= 40) return 'Moderate'; // e.g. score >= 7.2 out of 18
    return 'Low';
  } else if (category === 'Dyslexia') {
     // Max score can be tricky due to negative points. Let's base on positive potential.
     const positiveMax = disorderQuestions[category].reduce((sum, q) => sum + Math.max(0, ...q.options.map(o => o.score)), 0); // Max positive is 15
     const normalizedScore = Math.max(0, score); // Treat negative total score as 0 for likelihood %
     const percentageOfPositive = positiveMax > 0 ? (normalizedScore / positiveMax) * 100 : 0;

    if (percentageOfPositive >= 60) return 'High'; // e.g. score >= 9 out of 15 positive
    if (percentageOfPositive >= 35) return 'Moderate';// e.g. score >= 5.25 out of 15 positive
    return 'Low';
  } else if (category === 'SPD') {
    if (percentage >= 75) return 'High'; // e.g. score >= 9 out of 12
    if (percentage >= 40) return 'Moderate'; // e.g. score >= 4.8 out of 12
    return 'Low';
  }
  return 'Low'; // Default
};

// --- Component ---

const SurveyPage = () => {
  const [responses, setResponses] = useState({});
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [resultData, setResultData] = useState(null); // Store scores, likelihoods, etc.
  const [submissionError, setSubmissionError] = useState(null);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [showDiagnosticInfo, setShowDiagnosticInfo] = useState(false);
  const [showResources, setShowResources] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState('');

  const currentCategory = categoryOrder[currentCategoryIndex];
  const questions = disorderQuestions[currentCategory];
  const totalCategories = categoryOrder.length;

  // Memoize calculations for max scores to avoid recalculating on every render
  const maxScores = useMemo(() => {
    const scores = {};
    categoryOrder.forEach(cat => {
      scores[cat] = getMaxScore(cat);
    });
    return scores;
  }, []); // Depends only on the static categoryOrder

  // Handle selection change for radio buttons
  const handleChange = (questionId, value) => {
    setResponses({
      ...responses,
      [questionId]: value,
    });
    setValidationError(''); // Clear validation error on change
  };

  // Check if all questions in the current category are answered
  const validateCurrentCategory = () => {
    for (const question of questions) {
      if (!responses[question.id]) {
        setValidationError(`Please answer all questions for ${currentCategory} before proceeding.`);
        return false;
      }
    }
    setValidationError('');
    return true;
  };

  // Move to the next category or calculate results
  const handleNext = () => {
    if (!validateCurrentCategory()) {
      return; // Stop if validation fails
    }

    if (currentCategoryIndex < totalCategories - 1) {
      setCurrentCategoryIndex(currentCategoryIndex + 1);
    } else {
      // Last category, calculate and submit
      calculateAndSubmit();
    }
  };

  // Move to the previous category
  const handlePrevious = () => {
    if (currentCategoryIndex > 0) {
      setCurrentCategoryIndex(currentCategoryIndex - 1);
      setValidationError(''); // Clear validation error when going back
    }
  };

  // Toggle visibility sections
  const toggleDiagnosticInfo = () => setShowDiagnosticInfo(!showDiagnosticInfo);
  const toggleResources = () => setShowResources(!showResources);

  // Calculate scores and likelihoods
  const calculateResults = () => {
    const scores = {};
    const percentages = {};
    const likelihoods = {};
    const detailedResults = []; // For display and export

    categoryOrder.forEach(category => {
      let categoryScore = 0;
      disorderQuestions[category].forEach(q => {
        const selectedValue = responses[q.id];
        const selectedOption = q.options.find(opt => opt.value === selectedValue);
        if (selectedOption) {
          categoryScore += selectedOption.score;
        }
      });

      // Ensure score isn't below a logical minimum if negative scores exist
      // For Dyslexia, the minimum possible score is -2 (if only Q5 is answered as 'Much Faster')
      // Let's clamp minimum score at 0 for simplicity unless specific logic dictates otherwise.
       scores[category] = category === 'Dyslexia' ? categoryScore : Math.max(0, categoryScore);

      const maxScore = maxScores[category];
      percentages[category] = maxScore > 0 ? Math.max(0, Math.round((scores[category] / maxScore) * 100)) : 0; // Ensure percentage >= 0
      likelihoods[category] = getLikelihood(category, scores[category]);

      detailedResults.push({
          category: category,
          score: scores[category],
          maxScore: maxScore,
          percentage: percentages[category],
          likelihood: likelihoods[category]
      });
    });

    return { scores, percentages, likelihoods, detailedResults };
  };

  // Process results and handle submission
  const calculateAndSubmit = async () => {
    setIsSubmitting(true);
    setSubmissionError(null);
    setSubmissionSuccess(false);

    const calculatedData = calculateResults();
    setResultData(calculatedData); // Set state to trigger result display

    // Prepare chart data based on percentages
    const chartLabels = calculatedData.detailedResults.map(r => r.category);
    const chartValues = calculatedData.detailedResults.map(r => r.percentage);
    const chartBackgroundColors = calculatedData.detailedResults.map(r => {
        if (r.likelihood === 'High') return 'rgba(255, 99, 132, 0.6)'; // Red
        if (r.likelihood === 'Moderate') return 'rgba(255, 206, 86, 0.6)'; // Yellow
        return 'rgba(75, 192, 192, 0.6)'; // Green/Teal
    });

    const preparedChartData = {
      labels: chartLabels,
      datasets: [
        {
          label: 'Likelihood Percentage (%)',
          data: chartValues,
          backgroundColor: chartBackgroundColors,
          borderColor: chartBackgroundColors.map(c => c.replace('0.6', '1')), // Darker border
          borderWidth: 1,
        },
      ],
    };

     // --- Optional: Backend Submission ---
     try {
       const authToken = localStorage.getItem('authToken'); // Ensure you handle auth appropriately
       const response = await fetch('http://localhost:5000/api/surveys', { // Replace with your actual API endpoint
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
           'Authorization': `Bearer ${authToken || ''}`,
         },
         body: JSON.stringify({
           responses, // Raw answers
           results: calculatedData // Calculated scores/likelihoods
         }),
       });

       if (!response.ok) {
         const errorData = await response.json();
         throw new Error(errorData.message || 'Failed to submit survey results to server');
       }

       const data = await response.json();
       console.log('Survey submitted successfully to server:', data);
       setSubmissionSuccess(true);
       // Optionally clear responses if needed after successful submission
       // setResponses({});
     } catch (error) {
       console.error('Error submitting survey to server:', error);
       setSubmissionError(error.message);
       // Keep results displayed even if server submission fails
     } finally {
         setIsSubmitting(false);
     }
     // --- End Optional: Backend Submission ---

    // Set chart data *after* calculation and potential submission attempt
     setResultData({ ...calculatedData, chartData: preparedChartData });

  };

  // Save results locally
  const handleSaveResults = () => {
    if (!resultData) return;
    const saveData = { responses, results: resultData };
    try {
        localStorage.setItem('surveyResults', JSON.stringify(saveData));
        alert('Results saved locally in your browser!');
    } catch (e) {
        console.error("Error saving to local storage", e);
        alert('Could not save results locally. Storage might be full or disabled.');
    }
  };

  // Export results as a text file
  const handleExportText = () => {
    if (!resultData) return;

    let text = "Child Neurological Survey Results:\n\n";
    text += "--- Responses ---\n";
    categoryOrder.forEach(category => {
        text += `\nCategory: ${category}\n`;
        disorderQuestions[category].forEach(q => {
            const answer = responses[q.id] || "Not Answered";
            text += `- ${q.text}: ${answer}\n`;
        });
    });

    text += "\n\n--- Calculated Results ---\n";
     resultData.detailedResults.forEach(r => {
        text += `${r.category}:\n`;
        text += `  Score: ${r.score} / ${r.maxScore}\n`;
        text += `  Percentage: ${r.percentage}%\n`;
        text += `  Likelihood: ${r.likelihood}\n\n`;
    });

    text += "\n--- Recommendations ---\n";
    text += "Disclaimer: This is a preliminary screening tool, not a formal diagnosis. ";
    text += "Consult with qualified professionals (like Developmental Pediatricians, Psychologists, Neurologists, or OTs) for accurate assessment.\n\n";
    if (resultData.detailedResults.some(r => r.likelihood === 'High' || r.likelihood === 'Moderate')) {
       text += "Consider seeking professional evaluation based on the areas showing moderate or high likelihood.\n";
    } else {
       text += "Based on these responses, the likelihood for the screened conditions appears low. Continue monitoring your child's development.\n";
    }


    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'child_neuro_survey_results.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };


  // --- Rendering Logic ---

  // Render Results View
  if (resultData) {
    return (
      <div className="p-4 md:p-8 max-w-4xl mx-auto bg-white shadow-lg rounded-lg mt-6">
        <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">📊 Survey Results</h2>

        {/* Submission Status */}
        {isSubmitting && <div className="mb-4 p-3 bg-blue-100 text-blue-700 rounded text-center">Submitting...</div>}
        {submissionSuccess && <div className="mb-4 p-3 bg-green-100 text-green-700 rounded text-center">Results submitted successfully to the server!</div>}
        {submissionError && <div className="mb-4 p-3 bg-red-100 text-red-600 rounded text-center">Server Submission Error: {submissionError} (Results are still shown below)</div>}

        {/* Chart */}
         {resultData.chartData && (
           <div className="mb-8 p-4 border rounded-md bg-gray-50">
             <h4 className="text-xl font-semibold mb-3 text-gray-800">Likelihood Overview (%)</h4>
             <Bar data={resultData.chartData} options={{ responsive: true, plugins: { legend: { display: false }, title: { display: true, text: 'Percentage Likelihood for Each Category' } } }} />
           </div>
         )}

        {/* Detailed Scores Table */}
        <div className="mb-6 overflow-x-auto">
             <h4 className="text-xl font-semibold mb-3 text-gray-800">Detailed Scores</h4>
             <table className="min-w-full divide-y divide-gray-200 border">
               <thead className="bg-gray-100">
                 <tr>
                   <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Category</th>
                   <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Score</th>
                   <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Max Possible</th>
                   <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Percentage</th>
                   <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Likelihood</th>
                 </tr>
               </thead>
               <tbody className="bg-white divide-y divide-gray-200">
                 {resultData.detailedResults.map((res) => (
                   <tr key={res.category} className={
                       res.likelihood === 'High' ? 'bg-red-50' : res.likelihood === 'Moderate' ? 'bg-yellow-50' : ''
                   }>
                     <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{res.category}</td>
                     <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{res.score}</td>
                     <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{res.maxScore}</td>
                     <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{res.percentage}%</td>
                     <td className={`px-4 py-2 whitespace-nowrap text-sm font-semibold ${
                        res.likelihood === 'High' ? 'text-red-600' : res.likelihood === 'Moderate' ? 'text-yellow-600' : 'text-green-600'
                     }`}>{res.likelihood}</td>
                   </tr>
                 ))}
               </tbody>
             </table>
        </div>

        {/* Disclaimer */}
        <div className="mb-6 p-3 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800">
            <p className="font-bold">Important Disclaimer:</p>
            <p>This tool provides a preliminary indication based on your responses and is NOT a substitute for a professional diagnosis. Scores and likelihoods are estimates.</p>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button onClick={handleSaveResults} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-150 ease-in-out">💾 Save Locally</button>
          <button onClick={handleExportText} className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition duration-150 ease-in-out">📄 Export as Text</button>
          <button onClick={toggleDiagnosticInfo} className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600 transition duration-150 ease-in-out">
            {showDiagnosticInfo ? 'Hide' : 'Show'} Next Steps Info
          </button>
          <button onClick={toggleResources} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-150 ease-in-out">
            {showResources ? 'Hide' : 'Show'} Resources
          </button>
           {/* Optional: Button to start over */}
           <button onClick={() => {setResultData(null); setResponses({}); setCurrentCategoryIndex(0); setSubmissionError(null); setSubmissionSuccess(false);}} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition duration-150 ease-in-out">🔄 Start New Survey</button>
        </div>

        {/* Conditional Sections */}
        {showDiagnosticInfo && (
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded">
            <h4 className="font-semibold text-lg text-blue-800 mb-2">🩺 Recommended Next Steps:</h4>
             <p className="text-blue-700">If any category shows 'Moderate' or 'High' likelihood, or if you have ongoing concerns regardless of the score, it is strongly recommended to consult with qualified professionals for a comprehensive evaluation. Consider:</p>
             <ul className="list-disc pl-5 mt-2 text-blue-700 space-y-1">
                 <li>A <strong>Developmental Pediatrician</strong> for overall developmental assessment.</li>
                 <li>A <strong>Child Psychologist</strong> or <strong>Clinical Psychologist</strong> for behavioral, emotional, and learning assessments (including ADHD, Autism screening).</li>
                 <li>An <strong>Occupational Therapist</strong> (especially one trained in Sensory Integration) if SPD indicators are present.</li>
                 <li>A <strong>Speech-Language Pathologist</strong> if communication or language delays are suspected (often co-occur with these conditions).</li>
                 <li>A <strong>Special Educator</strong> or assessment from a relevant body (like the Dyslexia Association) if learning difficulties like Dyslexia are suspected.</li>
                 <li>A <strong>Child Neurologist</strong> for complex cases or ruling out underlying neurological conditions.</li>
             </ul>
             <p className="mt-2 text-blue-700">Bring these results (e.g., the exported text file) to your appointment as a starting point for discussion.</p>
          </div>
        )}

        {showResources && (
          <div className="mt-6 bg-gray-50 p-4 rounded border border-gray-200">
            <h4 className="font-bold text-lg text-gray-800 mb-3">📚 Helpful Resources (India Focus):</h4>
            <ul className="space-y-3">
              {resources.map((res, index) => (
                <li key={index} className="border-b pb-2 last:border-b-0">
                  <strong className="text-gray-900">{res.name}</strong>:
                  <p className="text-sm text-gray-700 my-1">{res.description}</p>
                  {res.website && <div className="text-sm"><a href={res.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Visit Website</a></div>}
                  <div className="text-sm text-gray-600">{res.contact}</div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }

  // Render Survey Question View
  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto bg-white shadow-lg rounded-lg mt-6">
      <h2 className="text-3xl font-bold mb-4 text-center text-indigo-700">🧠 Child Neurological Screening</h2>
      <p className="text-center text-gray-600 mb-6">Please answer the following questions based on your child's typical behavior.</p>

      {/* Progress Indicator */}
      <div className="mb-6 text-center">
        <span className="text-sm font-semibold text-gray-700">
            Section {currentCategoryIndex + 1} of {totalCategories}: <span className="text-indigo-600">{currentCategory}</span>
        </span>
         <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
            <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: `${((currentCategoryIndex + 1) / totalCategories) * 100}%` }}></div>
        </div>
      </div>

      {/* Category Questions */}
      <div className="space-y-6">
        {questions.map((question, index) => (
          <div key={question.id} className="p-4 border border-gray-200 rounded-md shadow-sm bg-gray-50">
            <label className="block font-medium text-gray-800 mb-3">{index + 1}. {question.text}</label>
            <div className="space-y-2">
              {question.options.map(option => (
                <label key={option.value} className="flex items-center space-x-2 p-2 rounded hover:bg-indigo-50 cursor-pointer">
                  <input
                    type="radio"
                    name={question.id} // Group radios for the same question
                    value={option.value}
                    checked={responses[question.id] === option.value}
                    onChange={() => handleChange(question.id, option.value)}
                    className="form-radio h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                    required // Basic HTML5 required validation
                  />
                  <span className="text-gray-700">{option.value}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

       {/* Validation Error Message */}
        {validationError && (
            <div className="mt-4 text-red-600 font-semibold text-center p-2 bg-red-50 rounded border border-red-200">
                {validationError}
            </div>
        )}


      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <button
            onClick={handlePrevious}
            disabled={currentCategoryIndex === 0}
            className="px-5 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150 ease-in-out"
        >
          Previous
        </button>
        <button
            onClick={handleNext}
            disabled={isSubmitting} // Disable while submitting
            className="px-5 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-70 disabled:cursor-wait transition duration-150 ease-in-out"
        >
          {currentCategoryIndex === totalCategories - 1 ? (isSubmitting ? 'Calculating...' : 'View Results') : 'Next Section'}
        </button>
      </div>
    </div>
  );
};

export default SurveyPage;