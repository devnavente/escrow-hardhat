/**
 *     function hasJoined(address _student, uint _index) private view returns(bool) {
        return students[_student][_index].joined;
    }

 */
export default async function callHasJoined(student, course) {
    try {
        const txn = await contract.hasJoined(student, course);

        return txn;
    } catch (err) {
        console.log('error in callHasJoined:', err);

        return null;
    }
}