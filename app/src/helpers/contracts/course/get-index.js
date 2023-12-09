export default async function getIndex(contract) {
    try {
        const index = await contract.index();

        return parseInt(index['_hex'], 16);    
    } catch (err) {
        console.log('error in getIndex:', err);

        return null;
    }
}