function PublishCourse() {
    return (
        <form className="border max-w-xs m-auto mt-10 p-5 rounded-lg">
            <h1 className="mb-6 text-lg">Course Information</h1>

            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
                    Course name:
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="" />
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
                    Number of lessons:
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="" />
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
                    Price (in ETH):
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="" />
            </div>
            <button class="bg-emerald-600 hover:bg-emerald-500 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-1/2 -translate-x-1/2" type="button">
                Publish
            </button>
        </form>);
}

export default PublishCourse;

/**
 * - form: 
 * -- course name
 * -- category
 * -- number of lessons (populate with a number randomly generated) min: 3, max: 50
 * -- price
 * 
 * - course name: limit of X characters (letters, numbers, punctuation) and can't start with number or special character
 * - price validation: only float number
 * - number of lessons: only int number
 * - error messages
 * 
 * - contract:
 * -- create course
 * -- register/update teacher
 * -- 
 */