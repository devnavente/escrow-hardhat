import { useState } from 'react';
// Validations
import isValidCourseName from '../helpers/validate/is-valid-course-name';
import isValidInteger from '../helpers/validate/is-valid-integer';
import isValidFloat from '../helpers/validate/is-valid-float';
// Error messages
import showErrorMessage from '../helpers/errors/show-error-message';
import hideAllErrorMessages from '../helpers/errors/hide-all-error-messages';
// Contract methods
import callPublishCourse from '../helpers/contracts/publish-course';

function NewCourseForm({ contract, signer }) {
    // new -> form to fill new course
    // transaction -> transaction in progress
    // failed -> transaction failed
    // success -> transaction was successful
    const [state, setState] = useState('new');
    const [courseName, setCourseName] = useState('');
    const [numLessons, setNumLessons] = useState('12');
    const [price, setPrice] = useState('0.0242297');

    const handleErrors = () => {
        if (!isValidCourseName(courseName)) {
            showErrorMessage('name');
        }
        if (!isValidInteger(numLessons)) {
            showErrorMessage('lessons');
        }
        if (!isValidFloat(price)) {
            showErrorMessage('price');
        }
    };

    const handleSubmit = e => {
        e.preventDefault();

        hideAllErrorMessages();

        const valid = (
            isValidCourseName(courseName) &&
            isValidInteger(numLessons) &&
            isValidFloat(price)
        );

        if (valid) {
            setState('transaction');
            // call contract Course and register course
            callPublishCourse(
                contract,
                { courseName, numLessons, price },
                signer
            ).then(res => setState(res ? 'success' : 'failed'));
        } else {
            handleErrors();
        }
    };

    return (
        <section className="border max-w-xs m-auto mt-10 p-5 rounded-lg">
            <h1 className="mb-6 text-lg">New Course</h1>

            {state === 'transaction' && <div>
                    <p className="text-xl rounded-full animate-spin w-8 h-8 m-auto">꩜</p>
                    <p className="text-center mt-5">creating course...</p>
                </div>}
            {state === 'failed' && <div>
                    <p className="text-center mb-5">Oh, no. Something went wrong! 😢</p>
                    <button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-1/2 -translate-x-1/2" onClick={()=>setState('new')}>Try again</button>
                </div>}
            {state === 'success' && <div>
                    <p className="text-center mb-5">Course was created successfully 🎉</p>
                    <button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-1/2 -translate-x-1/2" onClick={()=>setState('new')}>Create another</button>
                </div>}
            {state === 'new' && <form onSubmit={handleSubmit}>
                <Input
                    id="name"
                    value={courseName}
                    handleOnChange={(e) => setCourseName(e.target.value)}
                    errorMessage={courseName === '' ? 'Required field' : !isValidCourseName(courseName) ? 'Invalid name' : ''}
                />
                <Input
                    id="lessons"
                    value={numLessons}
                    handleOnChange={(e) => setNumLessons(e.target.value)}
                    errorMessage={numLessons === '' ? 'Required field' : !isValidInteger(numLessons) ? 'Must be an integer' : ''}
                />
                <Input
                    id="price"
                    value={price}
                    handleOnChange={(e) => setPrice(e.target.value)}
                    errorMessage={price === '' ? 'Required field' : !isValidFloat(price) ? 'Must be a float number' : ''}
                />
                <button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-1/2 -translate-x-1/2" type="submit">
                    Create
                </button>

            </form>}

        </section>);
}

function Input({ id, value, handleOnChange, errorMessage }) {
    const labels = {
        'name': 'Course name',
        'lessons': 'Number of lessons',
        'price': 'Price (in ETH)'
    };

    return (
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={id}>
                {labels[id]}: *
            </label>
            <p className="text-red-500 text-xs italic mb-1 hidden" data-error={id}>{errorMessage}</p>
            <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id={id}
                name={id}
                type="text"
                placeholder=""
                value={value}
                maxLength={id === 'name' ? '100' : null}
                onChange={handleOnChange}
            />
        </div>
    );
}

export default NewCourseForm;