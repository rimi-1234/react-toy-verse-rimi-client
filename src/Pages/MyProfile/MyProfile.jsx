import React, { useContext, useState } from 'react';

import { AuthContext } from '../../Context/AuthContext';
import { toast } from 'react-toastify';
import userIcon from "../../assets/user.png";
import useTitle from "../../hooks/useTitle";
const MyProfile = () => {
      useTitle("MyProfile | ToyVerse");
    const {


        setUser,
        updateProfileFunc,
        setLoading,
        user


    } = useContext(AuthContext);
    const [name, setName] = useState(user?.displayName || "");
    const [photoURL, setPhotoURL] = useState(user?.photoURL || "");

    const handleUpdate = (e) => {
        e.preventDefault();


        updateProfileFunc({ displayName: name, photoURL: photoURL })
            .then(() => {
                console.log(user);
                setUser({ ...user, displayName: name, photoURL: photoURL });

                toast.success("Profile Successful!");
                setLoading(false);

            })
            .catch((error) => {
                console.log(error);
                setUser(user);
            });

    };
    return (
        <div className="hero min-h-[300px] bg-gradient-to-r from-pink-100 to-rose-200 p-6 shadow-lg">
            <div className="hero-content w-full flex flex-col lg:flex-row justify-between items-stretch gap-8">
                {/* Profile Info Form */}
                <div className="card bg-base-100 w-full lg:w-1/2 flex-1">
                    <div className="card-body bg-[#1313130d] rounded-lg p-4 flex justify-center items-center">
                        <figure className="w-full h-64 sm:h-80 md:h-96 bg-gray-100 rounded-lg shadow-inner overflow-hidden flex justify-center items-center">
                            <img
                                className="w-60 h-60 rounded-full object-cover shadow-md"
                                src={
                                    user?.photoURL
                                        ? user.photoURL
                                        : userIcon
                                }
                                alt="User"
                            />
                        </figure>
                    </div>
                </div>
                <div className="flex-1 w-full lg:w-1/2">
                    <div className="text-center lg:text-left">
                        <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#EB1551] to-[#FF5FA8]">
                            My Profile
                        </h1>

                        <p className="py-2 text-base sm:text-lg text-base-content">
                            <span className="font-semibold">Email: </span>{user?.email}
                        </p>

                        <div className="border-t border-gray-300 my-3"></div>

                        <form onSubmit={handleUpdate} className="space-y-4">
                            <div>
                                <label className="font-semibold">Name:</label>
                                <input
                                    type="text"
                                    value={name}

                                    placeholder="Enter your name"
                                    onChange={(e) => setName(e.target.value)}
                                    className="input input-bordered w-full mt-1"

                                    required
                                />

                            </div>

                            <div>
                                <label className="font-semibold">Photo URL:</label>
                                <input
                                    type="text"
                                    value={photoURL}
                                    onChange={(e) => setPhotoURL(e.target.value)}
                                    className="input input-bordered w-full mt-1"
                                    placeholder="Enter photo URL"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn bg-gradient-to-r from-[#EB1551] to-[#FF5FA8] border-none text-white w-full mt-4 hover:opacity-90"
                            >
                                Save Changes
                            </button>
                        </form>
                    </div>
                </div>

                {/* Profile Image Card */}

            </div>
        </div>

    );
};

export default MyProfile;