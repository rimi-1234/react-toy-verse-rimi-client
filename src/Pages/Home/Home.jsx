import React, { Suspense } from "react";
import HeroSlider from "../../components/HeroSlider/HeroSlider";
import PopularToys from "../../components/PopularToys/PopularToys";
import Loading from "../../components/Loading/Loading";
import ShopByAgeSection from "../../components/ShopByAgeSection/ShopByAgeSection";
import CustomerReview from "../../components/CustomerReview/CustomerReview";
import useTitle from "../../hooks/useTitle";

const Home = () => {
     useTitle("Home | ToyVerse");

    return (
        <div className="bg-base-100 min-h-screen">
            <HeroSlider></HeroSlider>

            <section className="px-4 md:px-8 py-10">
                <h2 className="text-3xl font-bold text-primary mb-6">Popular Toys</h2>
                <Suspense
                    fallback={<Loading></Loading>}
                >

                    <PopularToys />

                </Suspense>
            </section>
            <ShopByAgeSection></ShopByAgeSection>
            <CustomerReview></CustomerReview>



        </div>
    );
};

export default Home;
