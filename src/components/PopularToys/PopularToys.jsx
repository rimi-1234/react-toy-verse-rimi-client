import React, { use } from 'react';
import ToyCard from '../ToyCard/ToyCard ';
const ToysPromise = fetch("../toysData.json").then((res) => res.json());
const PopularToys = () => {
    const toys = use(ToysPromise);
    console.log(toys);

    return (
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  {toys.map((toy) => (
    <ToyCard key={toy.toyId} toy={toy} />
  ))}
</div>



    );
};

export default PopularToys;