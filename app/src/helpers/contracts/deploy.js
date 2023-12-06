import { ethers } from 'ethers';
import Course from '../../artifacts/contracts/Course.sol/Course';

export default async function deploy(signer) {

    const factory = new ethers.ContractFactory(
        Course.abi,
        Course.bytecode,
        signer
    );

    return factory.deploy();
}