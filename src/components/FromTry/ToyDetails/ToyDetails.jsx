import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useLoaderData } from 'react-router';
import Navbar from '../Navbar/Navbar';
import FromTry from '../FromTry/FromTry';
import AllDetail from '../AllDetail/AllDetail';
;

const ToyDetails = () => {
    const data = useLoaderData();
    const { id } = useParams();
    const [toy, setToyDetail] = useState({});



    useEffect(() => {
        const ToyDetails = data.find((singleToy) => singleToy.toyId == id);
        setToyDetail(ToyDetails);



    }, [data, id]);
    if (!toy) return <p className="text-center mt-10">Toy not found!</p>;
    return (
        <div className='flex flex-col min-h-screen bg-base-100 text-base-content'>
            <Navbar />
            <AllDetail key={toy.toyId} toy={toy}></AllDetail>

            <FromTry></FromTry>





        </div>
    );
};

export default ToyDetails;