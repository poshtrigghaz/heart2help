import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from "./components/Navbar"; // Correct import path for the Navbar component
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import JobCard from "./components/JobCard";
import { collection, query, orderBy, where, getDocs } from "firebase/firestore";
import { db, auth } from "./firebase.config";

function App() {
  const [jobs, setJobs] = useState([]);
  const [customSearch, setCustomSearch] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const fetchJobs = async () => {
    try {
      setCustomSearch(false);
      const tempJobs = [];
      const jobsRef = collection(db, "jobs");
      const q = query(jobsRef, orderBy("postedOn", "desc"));
      const req = await getDocs(q);

      req.forEach((job) => {
        tempJobs.push({
          ...job.data(),
          id: job.id,
          postedOn: job.data().postedOn.toDate(),
        });
      });
      setJobs(tempJobs);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchJobsCustom = async (jobCriteria) => {
    try {
      setCustomSearch(true);
      const tempJobs = [];
      const jobsRef = collection(db, "jobs");
      const q = query(
        jobsRef,
        where("type", "==", jobCriteria.type),
        where("title", "==", jobCriteria.title),
        where("experience", "==", jobCriteria.experience),
        where("location", "==", jobCriteria.location),
        
        orderBy("postedOn", "desc")
      );
      const req = await getDocs(q);

      req.forEach((job) => {
        tempJobs.push({
          ...job.data(),
          id: job.id,
          postedOn: job.data().postedOn.toDate(),
        });
      });
      setJobs(tempJobs);
    } catch (error) {
      console.error("Error fetching custom jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsAuthenticated(true);
        fetchJobs();
      } else {
        setIsAuthenticated(false);
        window.location.href = '../public/login.html'; // Redirect to the login.html page in the public folder
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={isAuthenticated ? <MainContent fetchJobs={fetchJobs} fetchJobsCustom={fetchJobsCustom} customSearch={customSearch} jobs={jobs} /> : <Navigate to="../public/login.html" />} />
      </Routes>
    </Router>
  );
}

const MainContent = ({ fetchJobs, fetchJobsCustom, customSearch, jobs }) => (
  <div>
    <Navbar />
    <Header />
    <SearchBar fetchJobsCustom={fetchJobsCustom} />
    {customSearch && (
      <button onClick={fetchJobs} className="flex pl-[1250px] mb-2">
        <p className="bg-blue-500 px-10 py-2 rounded-md text-white">
          Clear Filters
        </p>
      </button>
    )}
    {jobs.map((job) => (
      <JobCard key={job.id} {...job} />
    ))}
  </div>
);

export default App;
