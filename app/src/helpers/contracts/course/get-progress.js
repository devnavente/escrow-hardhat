/**
 *     function hasJoined(address _student, uint _index) private view returns(bool) {
        return students[_student][_index].joined;
    }

 */
export default async function callGetProgress(course, contract) {
    try {
        const txn = await contract.getProgress(course);

        return txn;
    } catch (err) {
        console.log('error in callHasJoined:', err);

        return null;
    }
}