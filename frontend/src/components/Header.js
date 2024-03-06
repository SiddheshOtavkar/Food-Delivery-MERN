import React, { useState } from "react";
import logo from "../assest/logo.png";
import { Link } from "react-router-dom";
import { HiOutlineUserCircle } from "react-icons/hi";
// import { BsCartFill } from "react-icons/bs";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logoutRedux } from "../redux/userSlice";
import { toast } from 'react-hot-toast';

const Header = () => {
    const [showMenu, setShowMenu] = useState(false);
    const userData = useSelector((state) => state.user);
    const dispatch = useDispatch();

    console.log(userData);

    const handleShowMenu = () => {
        setShowMenu((prev) => !prev);
    };

    const handleLogout = () => {
        dispatch(logoutRedux());
        toast.success("Logout Successfull!!");
        console.log(userData._id);
    }

    return (
        <header className="fixed shadow-md w-full h-16 px-2 md:px-4 z-50 bg-white">
            {/* desktop */}
            <div className="flex items-center h-full justify-between">
                <Link to={""}>
                    <div className="flex items-center h-10">
                        <img
                            src="https://tse3.mm.bing.net/th?id=OIP.Tl4k-UvN9suTKoRVRMvJ4wHaD_&pid=Api&P=0&h=180"
                            className="h-full w-auto"
                            alt=""
                        />
                        <p
                            className="mr-5 font-serif font-extrabold"
                            style={{
                                marginLeft: "10px",
                                fontSize: "30px",
                                fontFamily: "cursive",
                            }}
                        >
                            YumRunner<span style={{ fontSize: "24px" }}>😋</span>
                        </p>
                    </div>
                </Link>

                <div className="flex items-center gap-4 md:gap-7">
                    <nav className="flex gap-4 md:gap-6 text-base md:text-lg">
                        <Link to={""}>Home</Link>
                        <Link to={"menu"}>Menu</Link>
                        <Link to={"about"}>About</Link>
                        <Link to={"contact"}>Contact</Link>
                    </nav>
                    {/* <div className='text-2xl text-slate-600 relative'>
                        <BsCartFill />
                        <div className='absolute -top-1 -right-1 text-white bg-red-500 h-4 w-4 rounded-full m-0 p-0 text-sm text-center'>1</div>
                        </div> */}
                    <div className="text-2xl text-slate-600 relative cursor-pointer">
                        <FaShoppingCart />
                        <span className="absolute -top-3 -right-3 bg-red-600 rounded-full text-white h-5 w-5 text-sm text-center">
                            0
                        </span>
                    </div>

                    <div className="text-slate-600" onClick={handleShowMenu}>
                        <div className="text-3xl cursor-pointer w-10 h-10 rounded-full overflow-hidden drop-shadow-md">
                            {userData.image ? (
                                <img className="h-full w-full" src={userData.image} alt="" />
                            ) : (
                                <HiOutlineUserCircle />
                            )}
                        </div>
                        {showMenu && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md overflow-hidden shadow-xl">
                                <Link
                                    to={"newproduct"}
                                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                                >
                                    New product
                                </Link>
                                {userData._id !== "" ? (
                                    <p
                                        onClick={handleLogout}
                                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                                        Logout
                                    </p>
                                ) : (
                                    <Link
                                        to={"login"}
                                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                                    >
                                        Login
                                    </Link>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* mobile */}
        </header>
    );
};

export default Header;
