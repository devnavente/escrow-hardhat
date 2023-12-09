// Components
import NewCourseForm from '../components/NewCourseForm';

function PublishCourse({contract, signer, setCoursesLength}) {
    return <NewCourseForm contract={contract} signer={signer} setCoursesLength={setCoursesLength} />;
}

export default PublishCourse;