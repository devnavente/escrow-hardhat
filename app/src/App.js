import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
/** Components */
import Header from './components/Header';
/** Pages */
import Home from './pages/Home';
import PublishCourse from './pages/PublishCourse';

/**
 * TODO:
 * - Home
 * - Course creation
 * - Courses list
 * - Course page (before/after joining)
 * - Lesson
 * - Course finished!!
 * - Teacher profile (me vs others)
 * - Student profile (me vs others)
 */

const provider = window.ethereum ? new ethers.providers.Web3Provider(window.ethereum) : null;

function App() {
  const [account, setAccount] = useState();
  const [signer, setSigner] = useState();

  useEffect(() => {
    async function getAccounts() {
      const accounts = await provider.send('eth_requestAccounts', []);
      //console.log(accounts[0]);

      setAccount(accounts[0]);
      setSigner(provider.getSigner());
    }

    getAccounts();
  }, [account]);

  return (
    <Router>
      <Header account={account}/>
      <main className="w-full">
        <div className="md:w-9/12 m-auto md:max-w-2xl p-2">
          <Routes>
            <Route path="/" exact element={<Home/>} />
            <Route path="/courses/publish" element={<PublishCourse />} />
          </Routes>
        </div>
      </main>
    </Router>
  );
}

export default App;
