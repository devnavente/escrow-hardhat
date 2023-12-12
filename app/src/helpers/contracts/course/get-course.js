export default async function callGetCourse(contract, courseIndex) {
    //console.log('get course', contract);
    try {
        const txn = await contract.getCourse(courseIndex);

        //console.log('txn', txn);
        return txn;
    } catch (err) {
        console.log('error in callGetCourse:', err);

        return null;
    }
}