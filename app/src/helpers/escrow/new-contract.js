export default async function newContract() {
    const beneficiary = document.getElementById('beneficiary').value;
    const arbiter = document.getElementById('arbiter').value;
    const value = ethers.BigNumber.from(document.getElementById('wei').value);
    const escrowContract = await deploy(signer, arbiter, beneficiary, value);


    const escrow = {
        address: escrowContract.address,
        arbiter,
        beneficiary,
        value: value.toString(),
        handleApprove: async () => {
            escrowContract.on('Approved', () => {
                document.getElementById(escrowContract.address).className =
                    'complete';
                document.getElementById(escrowContract.address).innerText =
                    "✓ It's been approved!";
            });

            await approve(escrowContract, signer);
        },
    };

    setEscrows([...escrows, escrow]);
}