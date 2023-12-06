// Components
import NewCourseForm from '../components/NewCourseForm';

function PublishCourse({contract, signer}) {
    return <NewCourseForm contract={contract} signer={signer}/>;
}

export default PublishCourse;