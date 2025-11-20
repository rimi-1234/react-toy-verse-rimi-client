import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useLoaderData } from 'react-router';
import Navbar from '../Navbar/Navbar';
import FromTry from '../FromTry/FromTry';
import AllDetail from '../AllDetail/AllDetail';
import errorImg from '../../assets/App-Error.png'
import useTitle from '../../hooks/useTitle';
import Footer from '../Footer/Footer';


const ToyDetails = () => {
     useTitle("ToyDetails | ToyVerse");
    let navigate = useNavigate();
    const data = useLoaderData();
    const { id } = useParams();
    const [toy, setToyDetail] = useState({});



    useEffect(() => {
        const ToyDetails = data.find((singleToy) => singleToy.toyId == id);
        setToyDetail(ToyDetails);



    }, [data, id]);
    if (!toy) 
     return(
        <>
            <div className="flex flex-col items-center justify-center h-screen text-center">
                <img
                    src={errorImg}  // your error image in `public/` folder
                    alt="Error"
                    className="w-96 h-96 mb-6"
                />
                <h2 className="text-5xl font-bold  mb-2">Oops, app not found!</h2>
                <p className="text-gray-500 text-xl py-2">The app you are looking for is not available.</p>
                <button onClick={() => navigate(-1)} className="btn mr-3 mt-3 bg-gradient-to-r from-[#632EE3] to-[#9F62F2] text-white"><span></span>Go Back!</button>
            </div>
        </>
     );
    return (
        <div className='flex flex-col min-h-screen bg-base-100 text-base-content'>
            <Navbar />
            <AllDetail key={toy.toyId} toy={toy}></AllDetail>

            <FromTry></FromTry>
            <Footer></Footer>





        </div>
    );
};

export default ToyDetails;