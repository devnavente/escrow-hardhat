import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
/** Helpers */
import deploy from './helpers/contracts/deploy';
import getIndex from './helpers/contracts/course/get-index';
import callGetCourse from './helpers/contracts/course/get-course';
/** Components */
import Header from './components/Header';
/** Pages */
import Home from './pages/Home';
import PublishCourse from './pages/PublishCourse';
import Course from './pages/Course';

/**
 * TODO: purchased courses!
 * - Home ✅
 * - Course creation ✅
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
  const [courses, setCourses] = useState([]);
  const [coursesLength, setCoursesLength] = useState(null);
  const [purchasedCourses, setPurchasedCourses] = useState([]);

  async function getCourses() {
    let index = coursesLength - 1;
    const newCourses = [];

    while (index > courses.length - 1) {
      let course = await callGetCourse(courseContract, index);
      console.log('course', course);
      if (course) {
        newCourses.push(course);

        if (course['available'] && parseInt(course['numLessons'], 16) > 0) {
          // has student joined?

        }
      }
      index--;
    }

    setCourses(courses.concat(newCourses));
  }

  useEffect(() => {
    async function getAccounts() {
      const accounts = await provider.send('eth_requestAccounts', []);

      setAccount(accounts[0]);
      setSigner(provider.getSigner());
    }
    async function deployContract() {
      setCourseContract(await deploy(signer));
    }
    async function getCoursesLength() {
      setCoursesLength(await getIndex(courseContract));
    }

    setCourses([]);
    setPurchasedCourses([]);

    getAccounts();
    if (!courseContract) {
      deployContract();
      console.log('contract deployed 🚀')
    }

    getCoursesLength();
    getCourses();

  }, [account]);

  useEffect(() => {
    if (courseContract) {
      getCourses();
    } else {
      setCourses([]);
    }
  }, [coursesLength]);

  return (
    <Router>
      <Header account={account} />
      <main className="w-full">
        <div className="md:w-9/12 m-auto md:max-w-2xl p-2">
          <Routes>
            <Route path="/" exact element={<Home contract={courseContract} courses={courses} />} />
            <Route path="/courses/publish" element={<PublishCourse contract={courseContract} signer={signer} setCoursesLength={setCoursesLength} />} />
            <Route path="/courses/:teacher/:courseIndex" element={<Course signer={signer}/>} />
          </Routes>
        </div>
      </main>
    </Router>
  );
}

export default App;
