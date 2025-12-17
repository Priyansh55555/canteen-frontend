import React, { useState } from 'react'
import { useGetUser, useLogout } from '../../hooks/AuthHook'
import { ChevronDown, LogOut } from 'lucide-react';
import toast from 'react-hot-toast';

const ProfileDropDown = () => {
    const { data } = useGetUser();
    const { mutate: logout } = useLogout();
    const [showDropdown, setShowDropDown] = useState(false);

    const handleLogout = async () => {
        try {
            logout(undefined, {
                onSuccess: () => {
                    console.log("success")
                    toast.success("User Loged out Successfully.");
                },
                onError: (err) => {
                    toast.error("Could not log out user. plese try again.");
                    console.log(err);
                }
            });
        } catch (err) {
            console.log(err);
        }
    };
    const image = <div className="bg-gray-300 w-8 h-8 rounded-full flex items-center font-bold justify-center">{data?.user?.name?.[0]}</div>
    return (
        <div className=" relative  ml-auto h-full flex items-center">
            <div
                onClick={() => setShowDropDown(prev => !prev)}
                className="flex items-center gap-2 hover:bg-gray-100 bg-gray-50 cursor-pointer p-2 select-none">
                <div>{image} </div>
                <div className="flex flex-col justify-center">
                    <p className="leading-4 text-sm font-semibold ">{data?.user?.name}</p>
                    <p className="laeding-4 text-sm text-gray-700">{data?.user?.email}</p>
                </div>
                <ChevronDown className={`w-4 h-4 ${showDropdown ? "rotate-180" : ""} `} />
                {showDropdown &&
                    <div className="w-full absolute -bottom-12 left-0 rounded-lg bg-white overflow-hidden shadow-lg border border-gray-300">
                        <button onClick={handleLogout} className="flex gap-2 items-center p-2 w-full text-red-400 hover:bg-blue-50 cursor-pointer hover:text-red-600 hover:font-semibold"><LogOut className="w-4 h-4" /> <span>Logout</span> </button>

                    </div>
                }
            </div>
        </div>

    )
}

export default ProfileDropDown