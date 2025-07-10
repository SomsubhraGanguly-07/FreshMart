import React, { use, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'
import { useEffect } from 'react'

const Navbar = () => {
    const [open, setOpen] = useState(false)
    const [profileDropdown, setProfileDropdown] = useState(false)
    const { user, setUser, setshowUserLogin, navigate, setSearchQuery, searchQuery, getCartCount } = useAppContext()

    const logout = async () => {
        setUser(null)
        setProfileDropdown(false)
        navigate('/')
    }

    useEffect(() => {
        if (searchQuery.length > 0) {
            navigate('/products')
        }
    }, [searchQuery])

    return (
        <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-3 border-b border-gray-300 bg-white relative transition-all" style={{ zIndex: 1000 }}>
            {/* Logo aligned left */}
            <div className="flex-shrink-0">
                <NavLink to='/' onClick={() => setOpen(false)}>
                    <img className="h-17" src={assets.logo} alt="logo" />
                </NavLink>
            </div>

            {/* All nav items aligned right */}
            <div className="hidden sm:flex items-center gap-8 ml-auto">
                <NavLink to='/'>Home</NavLink>
                <NavLink to='/products'>All Product</NavLink>
                <NavLink to='/'>Contact</NavLink>

                <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
                    <input onChange={(e)=> setSearchQuery(e.target.value)} className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500" type="text" placeholder="Search products" />
                    <img className="w-4 h-4" src={assets.search_icon} alt="search icon" />
                </div>

                <NavLink to="/cart" className="relative cursor-pointer">
                    <img className="w-6 opacity-80" src={assets.nav_cart_icon} alt="cart icon" />
                    {getCartCount() > 0 && (
                        <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">{getCartCount()}</button>
                    )}
                </NavLink>

                {!user ? (
                    <button className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition text-white rounded-full"
                        onClick={() => setshowUserLogin(true)}>
                        Login
                    </button>
                ) : (
                    <div className="relative">
                        <img
                            src={assets.profile_icon}
                            alt="profile"
                            className="w-8 h-8 rounded-full cursor-pointer"
                            onClick={() => setProfileDropdown((prev) => !prev)}
                        />
                        {profileDropdown && (
                            <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-50">
                                <NavLink to="/orders" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setProfileDropdown(false)}>
                                    My Orders
                                </NavLink>
                                <button className="block w-full text-left px-4 py-2 hover:bg-gray-100" onClick={logout}>
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>


            {/* Cart icon for mobile view (outside menu) */}
            <div className="flex sm:hidden items-center gap-6 ml-auto">
                <NavLink to="/cart" className="relative cursor-pointer">
                    <img className="w-6 opacity-80" src={assets.nav_cart_icon} alt="cart icon" />
                    {getCartCount() > 0 && (
                        <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">{getCartCount()}</button>
                    )}
                </NavLink>
                <button onClick={() => setOpen((prev) => !prev)} aria-label="Menu">
                    <img className="w-6 h-6" src={assets.menu_icon} alt="menu icon" />
                </button>
            </div>

            {/* Mobile Menu */}
            {open && (
                <div className={`${open ? 'flex' : 'hidden'} absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}>
                    <NavLink to='/' onClick={() => setOpen(false)}>Home</NavLink>
                    <NavLink to='/products' onClick={() => setOpen(false)}>All Product</NavLink>
                    {user && <NavLink to='/orders' onClick={() => setOpen(false)}>My Orders</NavLink>}
                    <NavLink to='/contact' onClick={() => setOpen(false)}>Contact</NavLink>
                    {!user ? (
                        <button
                            onClick={() => {
                                setOpen(false)
                                setshowUserLogin(true)
                            }}
                            className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm"
                        >
                            Login
                        </button>
                    ) : (
                        <button
                            onClick={() => {
                                setOpen(false)
                                logout()
                            }}
                            className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm"
                        >
                            Logout
                        </button>
                    )}
                </div>
            )}
        </nav>
    )
}

export default Navbar