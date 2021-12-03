import React, { useEffect, useState } from 'react';
import './style.css';

const url = 'https://course-api.com/react-tabs-project';
export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [index, setIndex] = useState(0);
  useEffect(() => {
    fetchJob();
  }, []);
  const fetchJob = async () => {
    const response = await fetch(url);
    const data = await response.json();
    setJobs(data);
    setIsLoading(false);
  };
  if (isLoading) {
    return <div>Loading...</div>;
  }

  const { company, dates, duties, title } = jobs[index];
  return (
    <section className="section">
      <div className="title">
        <h2>experience</h2>
        <div className="underline"></div>
      </div>
      <div className="jobs-center">
        <div className="btn-container">
          {jobs.map((job, i) => (
            <button
              key={job.id}
              onClick={() => setIndex(i)}
              className={`job-btn ${i === index ? 'active' : ''}`}
            >
              {job.company}
            </button>
          ))}
        </div>
        <article className="job-info">
          <h3>{title}</h3>
          <h4>{company}</h4>
          <p className="job-date">{dates}</p>
          {duties.map((duty, i) => (
            <div key={i} className="job-desc">
              <span className="job-icon">&#8680;</span>
              <p>{duty}</p>
            </div>
          ))}
        </article>
      </div>
    </section>
  );
}
