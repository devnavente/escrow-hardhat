export default async function callPurchaseCourse(signer, course, contract) {
    try {
        const txn = await contract.connect(signer).purchaseCourse(course);

        await txn.wait();

        return 1;
    } catch (err) {
        console.log('error in callPurchaseCourse:', err);

        return 0;
    }
}