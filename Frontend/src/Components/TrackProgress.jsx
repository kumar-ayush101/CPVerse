import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import ParticlesBg from "./HomePage/ParticlesBg";

const TrackProgress = () => {
  const [handle, setHandle] = useState("");
  const [verificationToken, setVerificationToken] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [userData, setUserData] = useState(null);
  const [upcomingContests, setUpcomingContests] = useState([]);
  const [pastContests, setPastContests] = useState([]);
  const [error, setError] = useState("");
  const [upsolveList, setUpsolveList] = useState([]);
  const [importantQuestions, setImportantQuestions] = useState([]);
  const [questionInput, setQuestionInput] = useState("");

  useEffect(() => {
    const checkCFStatus = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/cfuser/status", { withCredentials: true });
        setIsVerified(true);
        setHandle(res.data.handle);
        setUserData(res.data.cfData);
        fetchContests();
        fetchImportantQuestions();
      } catch (err) {
        console.log("CF not verified yet or error:", err.response?.data?.message);
      }
    };

    const fetchImportantQuestions = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/cfuser/important-questions", { withCredentials: true });
        setImportantQuestions(res.data.importantQuestions);
      } catch (err) {
        console.error("Failed to fetch important questions", err);
      }
    };

    checkCFStatus();
  }, []);

  const initiateVerification = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/cfuser/initiate",
        { cfHandle: handle },
        { withCredentials: true }
      );
      setVerificationToken(res.data.token);
      setError("");
    } catch (err) {
      setError("Failed to initiate verification. Please try again.");
    }
  };

  const verifyHandle = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/cfuser/verify", {}, { withCredentials: true });
      if (res.data.message) {
        setIsVerified(true);
        fetchUserData();
        fetchContests();
        fetchImportantQuestions();
        setError("");
      } else {
        setError("Verification failed. Make sure you submitted the token.");
      }
    } catch (err) {
      setError("Verification error. Please try again.");
    }
  };

  const fetchUserData = async () => {
    const res = await axios.get(`https://codeforces.com/api/user.info?handles=${handle}`);
    setUserData(res.data.result[0]);
  };

  const fetchContests = async () => {
    try {
      const res = await axios.get("https://codeforces.com/api/contest.list");
      const contests = res.data.result;
      const upcoming = contests.filter(c => c.phase === "BEFORE").slice(0, 5);
      const past = contests.filter(c => c.phase === "FINISHED").slice(0, 5);
      setUpcomingContests(upcoming);
      setPastContests(past);
    } catch (err) {
      console.error("Failed to fetch contests");
    }
  };

  const handleAttend = (contest) => {
    window.open(`https://codeforces.com/contest/${contest.id}`, "_blank");
  };

  const handleAddToUpsolve = (contest) => {
    if (!upsolveList.some(c => c.id === contest.id)) {
      setUpsolveList([...upsolveList, contest]);
    }
  };

  const handleAddImportantQuestion = async () => {
    if (questionInput.trim()) {
      try {
        await axios.post(
          "http://localhost:5000/api/cfuser/important-questions",
          { question: questionInput.trim() },
          { withCredentials: true }
        );
        setImportantQuestions([...importantQuestions, questionInput.trim()]);
        setQuestionInput("");
      } catch (err) {
        console.error("Failed to save question", err);
      }
    }
  };

  return (
    <div className="min-h-screen text-white p-6">
      <Navbar />
      <ParticlesBg />

      <h1 className="text-3xl font-bold mb-6 text-center mt-12 text-blue-400">
        Track Your Codeforces Progress
      </h1>

      {!verificationToken && !isVerified && (
        <div className="flex justify-center mb-4">
          <input
            className="px-4 py-2 rounded-l bg-gray-700 text-white"
            placeholder="Enter Codeforces handle"
            value={handle}
            onChange={(e) => setHandle(e.target.value)}
          />
          <button
            onClick={initiateVerification}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-r"
          >
            Verify Handle
          </button>
        </div>
      )}

      {verificationToken && !isVerified && (
        <div className="text-center mb-6">
          <p className="mb-2">Submit this token as a comment in any Codeforces problem (Compile Error submission):</p>
          <div className="bg-gray-800 text-green-400 p-2 rounded mb-2 inline-block">{verificationToken}</div>
          <button
            onClick={verifyHandle}
            className="ml-3 bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
          >
            I've Submitted
          </button>
        </div>
      )}

      {error && <p className="text-center text-red-500 mb-4">{error}</p>}

      {userData && (
        <div className="max-w-xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-xl font-bold text-green-400 mb-2">{userData.handle}</h2>
          <p>Rank: {userData.rank}</p>
          <p>Rating: {userData.rating || "Unrated"}</p>
          <p>Max Rating: {userData.maxRating}</p>
          <p>Contribution: {userData.contribution}</p>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-6 mx-4 lg:mx-16">
        <div className="flex-1">
          <h3 className="text-2xl font-semibold text-yellow-400 mb-4 ml-60">Upcoming Contests</h3>
          <ul className="space-y-4">
            {upcomingContests.map(contest => (
              <li
                key={contest.id}
                className="bg-gray-800 p-4 rounded-lg flex justify-between items-center"
              >
                <div>
                  <p className="font-bold">{contest.name}</p>
                  <p className="text-sm text-gray-400">
                    Starts at: {new Date(contest.startTimeSeconds * 1000).toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={() => handleAttend(contest)}
                  className="bg-green-500 hover:bg-green-600 px-3 py-1 rounded"
                >
                  Attend
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex-1">
          <h3 className="text-2xl font-semibold text-pink-400 mb-4 ml-60">Past Contests</h3>
          <ul className="space-y-4">
            {pastContests.map(contest => (
              <li
                key={contest.id}
                className="bg-gray-800 p-4 rounded-lg flex justify-between items-center"
              >
                <div>
                  <p className="font-bold">{contest.name}</p>
                  <p className="text-sm text-gray-400">
                    Ended: {new Date((contest.startTimeSeconds + contest.durationSeconds) * 1000).toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={() => handleAddToUpsolve(contest)}
                  className="bg-purple-500 hover:bg-purple-600 px-3 py-1 rounded"
                >
                  Upsolve
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {upsolveList.length > 0 && (
        <div className="max-w-5xl mx-auto mt-10">
          <h3 className="text-2xl font-semibold text-purple-400 mb-4">Your Upsolve List</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {upsolveList.map(c => (
              <li key={c.id} className="bg-gray-700 p-3 rounded-md">
                {c.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="max-w-3xl mx-auto mt-10">
        <h3 className="text-2xl ml-60 font-semibold text-cyan-400 mb-4">Important Questions</h3>
        <div className="flex mb-4">
          <input
            className="flex-1 px-4 py-2 bg-gray-700 rounded-l"
            placeholder="Enter question ID or URL (e.g. 1862A)"
            value={questionInput}
            onChange={(e) => setQuestionInput(e.target.value)}
          />
          <button
            onClick={handleAddImportantQuestion}
            className="bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded-r"
          >
            Add
          </button>
        </div>
        <ul className="space-y-2">
          {importantQuestions.map((q, index) => (
            <li key={index} className="bg-gray-700 p-2 rounded">
              <a
                href={q.startsWith("http") ? q : `https://codeforces.com/problemset/problem/${q}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-300 hover:underline"
              >
                {q}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TrackProgress;
