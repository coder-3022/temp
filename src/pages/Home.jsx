import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight } from "react-icons/fa"
import HighlightText from '../components/core/HomePage/HighlightText'
import CTAButton from '../components/core/HomePage/Button'
import Banner from '../assets/Images/banner.mp4'
import CodeBlocks from '../components/core/HomePage/CodeBlocks'
import TimelineSection from '../components/core/HomePage/TimelineSection'
import LearningLanguageSection from '../components/core/HomePage/LearningLanguageSection'
import InstructorSection from '../components/core/HomePage/InstructorSection'
import ExploreMore from '../components/core/HomePage/ExploreMore'
import Footer from '../components/common/Footer'


const Home = () => {
  return (
    <div>
      {/* Section 1 */}
      <div className='relative mx-auto flex flex-col max-w-maxContent w-11/12 items-center
          text-white justify-between gap-8'>

        <Link to={"/signup"}>

          <div className=' group mt-16 p-1 mx-auto rounded-full bg-richblack-800 drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] font-bold text-richblack-200
                transition-all duration-200 hover:scale-95 w-fit hover:drop-shadow-none'>
            <div className='flex flex-row items-center gap-2 rounded-full px-10 py-[5px]
                    transition-all duration-200 group-hover:bg-richblack-900'>
              <p>Become an Instructor</p>
              <FaArrowRight />

            </div>
          </div>

        </Link>

        <div className='text-center text-4xl font-semibold mt-7'>
          Empower Your Future With
          <HighlightText text={"Coding Skills"} />
        </div>

        <div className='mt-4 w-[90%] txt-center text-lg font-bold text-richblack-300'>
          yaha  pe paste krna h original content
        </div>

        <div className='flex flex-row gap-7 mt-8'>
          <CTAButton active={true} linkto={"/signup"}>
            Learn More
          </CTAButton>

          <CTAButton active={false} linkto={"/login"}>
            Book a Demo
          </CTAButton>
        </div>

        <div className='mx-3 my-12 shadow-blue-200'>
          <video muted loop autoPlay>
            <source src={Banner} type='video/mp4' />
          </video>
        </div>

        {/* Code Section - 1 */}
        <div>
          <CodeBlocks
            position={"lg:flex-row"}
            heading={
              <div className='text-4xl font-semibold '>
                Unlock Your
                <HighlightText text={"coding potential "} />
                with our online courses
              </div>
            }
            subheading={
              "yaha  pe paste krna h original content"
            }
            ctabtn1={
              {
                btnText: "try it yourself",
                linkto: "/signup",
                active: true,
              }
            }

            ctabtn2={
              {
                btnText: "learn more",
                linkto: "/login",
                active: false,
              }
            }

            codeblocks={`<<!DOCTYPE html>\n<html?\n<head><title>Example</title>\nmy name is sandeep yaha pe original content aayega`}
            codeColor={"text-yellow-25"}
          />

        </div>

        {/* Code Section - 2 */}
        <div>
          <CodeBlocks
            position={"lg:flex-row-reverse "}
            heading={
              <div className='text-4xl font-semibold '>
                Unlock Your
                <HighlightText text={"coding potential "} />
                with our online courses
              </div>
            }
            subheading={
              "yaha  pe paste krna h original content"
            }
            ctabtn1={
              {
                btnText: "try it yourself",
                linkto: "/signup",
                active: true,
              }
            }

            ctabtn2={
              {
                btnText: "learn more",
                linkto: "/login",
                active: false,
              }
            }

            codeblocks={`<<!DOCTYPE html>\n<html?\n<head><title>Example</title>\nmy name is sandeep yaha pe original content aayega`}
            codeColor={"text-yellow-25"}
          />

        </div>

        <ExploreMore />

      </div>

      {/* Section 2 */}

      <div className='bg-pure-greys-5 text-richblack-700 '>
        <div className='homepage_bg h-[310px] '>

          <div className='w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-5 mx-auto'>
            <div className='h-[150px]'></div>
            <div className=' flex flex-row gap-7 text-white'>
              <CTAButton active={true} linkto={"/signup"}>
                <div className=' flex items-center gap-3'>
                  Explore Full Catalog
                  <FaArrowRight />
                </div>
              </CTAButton>

              <CTAButton active={false} linkto={"/signup"}>
                <div>
                  Learn More
                </div>

              </CTAButton>


            </div>
          </div>
        </div>

        <div className=' w-11/12 mx-auto max-w-maxContent flex flex-col items-center
              justify-between gap-7'>

          <div className=' flex flex-row gap-5 mb-10 mt-[95px]'>

            <div className=' text-4xl font-semibold w-[45%]'>
              Get the skills you need for a
              <HighlightText text={"job that is in demand"} />
            </div>

            <div className=' flex flex-col gap-10 w-[40%] items-start'>
              <div className=' text-[16px]'>
                The morden StudyNotion is the dictates its own terms. Today, to be a competitive
                specialist require more than professional skills.
              </div>
              <CTAButton active={true} linkto={"/signup"}>
                <div>
                  Learn more
                </div>
              </CTAButton>
            </div>

          </div>

          <TimelineSection />

          <LearningLanguageSection />

        </div>

      </div>


      {/* Section 3 */}
      <div className=' w-11/12 mx-auto max-w-maxContent flex-col items-center 
      justify-between gap-8 first-letter bg-richblack-900 text-white'>

            <InstructorSection />
            <h2 className=' text-center text-4xl font-semibold mt-10'>Reviews from other learners</h2>

            {/* Review Slider Here */}

      </div>



      {/* Footer */}

          <Footer/>

    </div>
  )
}

export default Home