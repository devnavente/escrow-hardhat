import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ethers } from 'ethers';
// Contract methods
import callGetCourse from '../helpers/contracts/course/get-course';
import callGetProgress from '../helpers/contracts/course/get-progress';
import callPurchaseCourse from '../helpers/contracts/course/purchase-course';

const provider = window.ethereum ? new ethers.providers.Web3Provider(window.ethereum) : null;

function Course({ contract }) {
    const [course, setCourse] = useState();
    const [state, setState] = useState('loading');
    const [purchased, setPurchased] = useState(false);
    const [price, setPrice] = useState();

    const { courseIndex } = useParams();

    const handlePurchase = async (e) => {
        e.preventDefault();
        let signer = await provider.getSigner();
        const result = await callPurchaseCourse(signer, courseIndex-1, contract);

        if (result) {
            setPurchased(true);
        } else {
            setState('failed');
        }
    }

    useEffect(() => {
        const setData = async () => {
            let courseData = await callGetCourse(contract, courseIndex-1);
            if (!courseData) {
                setState('failed');
            } else {
                setCourse(courseData);

                // has user purchased the course?
                let joined = await callGetProgress(courseIndex-1, contract);

                if (joined) {
                    setPurchased(true);
                } else {
                    let priceETH = ethers.utils.formatEther(courseData['price']);
                    setPrice(priceETH);
                }

                setState('ok');
            }
        }

        if (contract && !course) {
            setData();
        }

    });
    // you haven't purchased the course yet, <purchase here> -> calls purchaseCourse
    // -> the escrow initializes
    // when purchased, list of lessons with button to mark as completed
    // when all the lessons are completed, redirect to congratulations page 
    // and the escrow pages the money to teacher
    return (<section>
        {state === 'loading' && <div>
            <p className="text-center mt-2">Loading...</p>
        </div>}
        {state === 'failed' && <div>
            <p className="text-center mt-2">Oh, no. Something went wrong! 😢</p>
        </div>}
        {state === 'ok' && course && <>
            <h1 className="mb-6 mt-6 text-lg"><b>Course: </b>{course.courseName}</h1>

            {purchased && <p>You have this course!</p>}
            {!purchased && <p>You haven't purchased this course yet. {price && <button className="underline text-emerald-600 hover:no-underline" onClick={handlePurchase}>Start learning now for only {price} ETH! 😱😍</button>}</p>}
        </>}
    </section>);
}

export default Course;

// joined?
// no -> join
// yes -> course lessons