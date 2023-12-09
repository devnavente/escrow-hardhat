import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
/** Components */
import CoursesList from '../components/CoursesList';

function Home({courses}) {
    const [joined, setJoined] = useState([]);
    //console.log('courses',courses)
    
    return (
        <section>
            {courses.length === 0 && <div>
                <h1 className="mb-6 text-lg mt-10">Oops! We have no courses available at the moment. 😅</h1>
                <p>What do you say? It's the perfect moment to <Link to="/courses/publish" className="underline text-emerald-600 hover:no-underline">publish yours</Link>. 😉</p>
            </div>}
            {courses.length > 0 && joined.length === 0 && <div>
                <h1 className="mb-6 text-lg mt-10">Join a course and start learning today:</h1>

                <CoursesList list={courses}/>
            </div>}
            {joined.length > 0 && <p>joined some courses</p>}
        </section>
    );
}

export default Home;

/**
 * - has user joined a course?
 * -> yes -> list of joined courses + CTA to courses to join (/courses)
 * -> no ->  list of courses to join
 * 
 *
 */