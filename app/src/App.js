import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import deploy from './helpers/contracts/deploy';
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
  const [courseContract, setCourseContract] = useState();

  useEffect(() => {
    async function getAccounts() {
      const accounts = await provider.send('eth_requestAccounts', []);

      setAccount(accounts[0]);
      setSigner(provider.getSigner());
    }
    async function deployContract() {
      setCourseContract(await deploy(signer));
    }

    getAccounts();
    if (!courseContract) {
      console.log('deploy contract')
      deployContract();
    }
    //console.log(contractAddress);
  }, [account]);

  return (
    <Router>
      <Header account={account}/>
      <main className="w-full">
        <div className="md:w-9/12 m-auto md:max-w-2xl p-2">
          <Routes>
            <Route path="/" exact element={<Home/>} />
            <Route path="/courses/publish" element={<PublishCourse contract={courseContract} signer={signer} />} />
          </Routes>
        </div>
      </main>
    </Router>
  );
}

export default App;
