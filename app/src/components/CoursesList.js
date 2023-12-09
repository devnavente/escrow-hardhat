import { Link } from 'react-router-dom';
import { ethers } from 'ethers';

function CoursesList({ list, joined = false }) {
    return (
        <ul>
            {list.map(course => (
                <CoursesListItem course={course} joined={joined} />
            ))}
        </ul>
    );
}

function CoursesListItem({ course, joined }) {
    let price = ethers.utils.formatEther(course['price']);
    let index = parseInt(course['index']['_hex'], 16);
    let lessons = parseInt(course['numLessons']['_hex'], 16);
    let numStudents = parseInt(course['numStudents']['_hex'], 16);

    return (
        <li class="bg-white mb-2 px-6 pt-2 pb-2 rounded-xl shadow-lg border flex justify-between items-center" key={index}>
            <div>
                <h2 class="mt-2 text-gray-800 text-2xl font-bold">{course['courseName']}</h2>
                <p>{lessons} lessons</p>
                <p>{price} ETH</p>
                <p>{numStudents} students</p>
            </div>
            <Link to={`/courses/${course['teacher']}/${index+1}`} className="bg-emerald-600 hover:bg-emerald-500 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-1/2 -translate-x-1/2">{joined ? 'Continue learning' : 'Join'}</Link>
        </li>
    );
}

export default CoursesList;