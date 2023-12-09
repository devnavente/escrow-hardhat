import { ethers } from 'ethers';

/**
 * Calls publishCourse method from the Course Solidity contract.
 * 
 * @param {Object} contract
 * @param {Object} params
 * @param {string} signer
 * 
 * Params:
 * - string _courseName
 * - uint _numLessons
 * - uint256 _price
 *
 * @returns {boolean}
 */
export default async function callPublishCourse(contract, params, signer) {
    
    try {
        const weiValue = ethers.utils.parseEther(params['price']);

        contract.on('Published', () => {
            console.log('course was published!');
        });
    
        const approveTxn = await contract.connect(signer).publishCourse(params['courseName'],params['numLessons'],weiValue);
    
        await approveTxn.wait();

        return 1;

    } catch(err) {
        console.log('error in callPublishCourse:', err);

        return 0;
    }


}