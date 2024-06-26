import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, matchPath, useLocation } from 'react-router-dom'
import logo from '../../assets/Logo/Logo-Full-Light.png'
import {NavbarLinks} from '../../data/navbar-links'
import { apiConnector } from '../../services/apiconnector'
import { categories } from '../../services/apis'
import { ACCOUNT_TYPE } from '../../utils/constants'
import {AiOutlineMenu, AiOutlineShoppingCart} from 'react-icons/ai'
import {BsChevronDown} from 'react-icons/bs'
import ProfileDropdown from '../core/Auth/ProfileDropdown'


// const subLinks =[ 
//   {
//     title: "python",
//     link: "/catalog/python",
//   },
//   {
//     title: "web Dev",
//     link: "/catalog/web-development",
//   }
// ]


const Navbar = () => {

  const {token} = useSelector( (state) => state.auth);
  const {user} = useSelector( (state) => state.profile);
  const {totalItems} = useSelector( (state) => state.cart);
  
  const location = useLocation();

  const [subLinks, setSubLinks] = useState([]);
  const [loading, setLoading] = useState(false);

  // const fetchSublinks = async() =>{
  //   try{
  //       const result = await apiConnector("GET",categories.CATEGORIES_API);
  //       console.log("printing Sublink results: ", result);
  //       setSubLinks(result.data.data);
  //   }
  //   catch(error) {
  //     console.log("Could not fetch tha catalog list");
  //   }
  // }

  useEffect( () => {
    ;(async() => {
      setLoading(true)
      try {
        const result = await apiConnector("GET",categories.CATEGORIES_API)
        console.log("printing Sublink results...... ", result);
        setSubLinks(result.data.data)
      }
      catch(error) {
        console.log("Could not fetch the catalog..... ",error);
      }
      setLoading(false);
    })()

  },[])


  const matchRoute = (route) =>{
    return matchPath ({path:route}, location.pathname);
  }

  return (
    <div className=' flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700'>
        <div className=' flex w-11/12 max-w-maxContent items-center justify-between'>

          {/* image */}

          <Link to="/">
              <img src={logo} alt="" width={160} height={42} loading='lazy' />
          </Link>

          {/* Nave Links */}
          <nav>
            <ul className='flex gap-x-6 text-richblack-25'>

              {
                NavbarLinks.map( (link,index) => (

                  <li key={index}>
                    {
                      link.title === "Catalog" ? (
                        <>
                          <div className=' relative flex items-center gap-2 group'>
                            <p>{link.title}</p>
                            <BsChevronDown />

                            <div className=' invisible absolute left-[50%] translate-x-[-50%] translate-y-[3em] top-[50%]
                             flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all
                             duration-200 group-hover:visible group-hover:opacity-100 lg:w-[300px]'>
                            
                            <div className=' absolute left-[50%] top-0 translate-x-[80%] translate-y-[-40%] h-6 w-6 rotate-45 rounded bg-richblack-5'>
                            </div>
                            {
                              loading ? (<p className=' text-center'>Loading...</p>) :
                              subLinks.length ? (
                                <> 
                                    { subLinks?.filter( (subLink) => subLink?.courses?.length > 0)?.map((subLink, i) => (
                                                                                                  <Link to={`/catalog/${subLink.name.split(" ").join("-").toLowerCase()}`} className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"  key={i} >
                                                                                                      <p>{subLink.name}</p>
                                                                                                  </Link>
                                                                                            ))
                                    }
                                </>
                              ) : (<p className="text-center">No Courses Found</p>)
                            }
                            </div>
                          </div>
                        </>
                      ) : (
                        <Link to={link?.path}>

                          <p className={`${matchRoute(link?.path) ? "text-yellow-25" : "text-richblack-25"}`}>
                            {link.title}
                          </p>

                        </Link>
                      )
                    }

                  </li>

                ))
              }

            </ul>
          </nav>

          {/* login/Singup/Dashboard */}
          
          <div className=' flex gap-x-4 items-center'>
              {
                user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
                  <Link to="/dashboard/card" className=' relative'>
                    <AiOutlineShoppingCart className="text-2xl text-richblack-100"/>
                    {
                      totalItems > 0 && (
                        <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center 
                        text-xs font-bold text-yellow-100">
                          {totalItems}
                        </span>
                      )
                    }
                  
                  </Link>
                )
              }

              {
                token === null && (
                  <Link to='/login'>
                    <button className=' border border-richblack-700 bg-richblack-800 px-[12px] py-[8px]
                     text-richblack-100 rounded-md'>
                      Log in
                    </button>
                  </Link>
                )
              }

              {
                token === null &&(
                  <Link to='/signup'>
                    <button className=' border border-richblack-700 bg-richblack-800 px-[12px] py-[8px]
                     text-richblack-100 rounded-md'>
                      Sign Up
                    </button>
                  </Link>
                )
              }

              {
                token !== null && <ProfileDropdown />
                
                
              }

          </div>

          <button className="mr-4 md:hidden">  
            <AiOutlineMenu fontSize={24} fill="#AFB2BF" /> 
          </button>



        </div>
    </div>
  )
}

export default Navbar