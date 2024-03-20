// Home.jsx
import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import './Home.css'
import Ask from './Ask/Ask';
import FindPeers from './FindPeers/FindPeers';
import SolveRequests from './SolveRequests/SolveRequests';
import axios from 'axios';

const Home = ({ userID }) => {
  const [showPopupAsk, setShowPopupAsk] = useState(false);
  const [showPopupFindPeer, setShowPopupFindPeer] = useState(false);
  const [showPopupSolve, setShowPopupSolve] = useState(false)
  const [showLoader, setShowLoader] = useState(false)

  const [questionID, setQuestionID] = useState(0)

  const [subjects, setSubjects] = useState([]);
  const [subjectIDs, setSubjectIDs] = useState([]);
  
  useEffect(() => {
    
  }, [])


  const togglePopupAsk = async () => {
    // console.log("Toggled  togglePopupAsk")
    setShowLoader(false)
    setShowPopupFindPeer(false)
    setShowPopupSolve(false)

    
    await getSubjects()

    
    setShowPopupAsk(!showPopupAsk);
    // setShowLoader(!showLoader)
    
  };

  const togglePopupFindPeer = () => {
    // console.log("Toggled ")
    setShowLoader(false)
    setShowPopupSolve(false)
    setShowPopupAsk(false);
    setShowPopupFindPeer(!showPopupFindPeer)
  }

  const togglePopupSolve = () => {
    // console.log("Toggled solve")
    setShowPopupFindPeer(false)
    setShowLoader(false)
    setShowPopupAsk(false)
    setShowPopupSolve(!showPopupSolve)
  }

  const toggleLoader = () => {
    setShowLoader(!showLoader)
  }

  const getSubjects = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/subject/all")
      const arr = response.data.subjects;
      // console.log(arr)

      const tempSub = [];
      const tempSubIDs = [];
      arr.map((value, index) => {
        tempSub[index] = value.description;
        tempSubIDs[index] = value._id;
      })
      setSubjects(tempSub)
      setSubjectIDs(tempSubIDs)
      console.log(subjects)
    } catch (error){
      console.log("Error getting subject list: ", error)
    }
  }

  
  return (
    <div className='hero'>
      {/* <Navbar loggedIn={true} onLogout={onLogout} /> */}
      <div className='left-parent'>
        <div className='home-texts-box'>
          <h1 className='home-title-left'>Get your answers Instantly</h1>
          <h3>Get 24x7 hours help from our experts.Ask doubts anytime, anywhere</h3>
        </div>

      </div>
      <div className='right-parent'>
        <button className="button-divs-left"
        onClick={togglePopupAsk}
        >
          <h3>Ask</h3>
          <p>Some Desc.</p>
        </button>
        {showPopupAsk && <Ask subjects={subjects} subjectIDs={subjectIDs} userID={userID} togglePopupAsk={togglePopupAsk} togglePopupFindPeer={togglePopupFindPeer} togglePopupSolve={togglePopupSolve} questionID={questionID} setQuestionID={setQuestionID}/>}
        {showPopupFindPeer && <FindPeers togglePopupAsk={togglePopupAsk} togglePopupFindPeer={togglePopupFindPeer} togglePopupSolve={togglePopupSolve} questionID={questionID} userID={userID}/>}
        {showPopupSolve && <SolveRequests togglePopupAsk={togglePopupAsk} togglePopupFindPeer={togglePopupFindPeer} togglePopupSolve={togglePopupSolve}/>}
        
        <button className="button-divs-left" 
        onClick={togglePopupSolve}>
          <h3>Solve</h3>
          <p>Some Desc.</p>

        </button>

        <button className="button-divs-left">
          <h3>Dashboard</h3>
          <p>Some Desc.</p>

        </button>



        <div className=''>
          {/* <p>Welcome, {userID}!</p> */}
          {/* <button onClick={onLogout}>Logout</button> */}

        </div>
      </div>




    </div>
  );
};

export default Home;
