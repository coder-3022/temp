import React from 'react'
import HighlightText from '../components/core/HomePage/HighlightText'
import BannerImage1 from '../assets/Images/aboutus1.webp'
import BannerImage2 from '../assets/Images/aboutus2.webp'
import BannerImage3 from '../assets/Images/aboutus3.webp'
import Quote from '../components/core/AboutPage/Quote'
import FoundingStory from '../assets/Images/FoundingStory.png'
import StatsComponent from '../components/core/AboutPage/Stats'
import LearningGrid from '../components/core/AboutPage/LearningGrid'
import ContactFormSection from '../components/core/AboutPage/ContactFormSection'
import Footer from '../components/common/Footer'



const About = () => {
  return (
    <div className=' mx-auto  mt-[100px] text-white '>


        {/* section 1 */}

        <section>
            <div>
                <header>
                    about us ka heading sbse upper wala
                    <HighlightText text={"Brighter Future"}/>
                    <p>yaha pe paragraph aayega about page ka </p>
                </header>
                <div className=' flex gap-x-3 mx-auto'>
                    <img src={BannerImage1}/>
                    <img src={BannerImage2}/>
                    <img src={BannerImage3}/>
                </div>
            </div>
        </section>

        {/* section  2 */}

        <section>
            <div>
                <Quote/>
            </div>
        </section>

        {/* section  3 */}

        <section>
            <div className=' flex flex-col'>
                {/* Founding ka parent div */}
                <div className='flex'>
                    {/* left box */}
                    <div>
                        <h1>Our Founding Story</h1>

                        <p>1st paragrph yaha daalna h</p>

                        <p>2nd paragraph yaha add krna h</p>

                    </div>

                    {/* right box */}
                    <div>
                        <img src={FoundingStory} />
                    </div>
                </div>

                {/* mission aur vision ka parent div */}

                <div className='flex'>
                    {/* left box */}
                    <div>
                        <h1>Our Vision</h1>
                        <p>our vison ka paragraph daalna h</p>
                    </div>

                    {/* right box */}
                    <div>
                        <h1>Our Mission</h1>
                        <p>yaha pe mission wala paragraph daalna h</p>
                    </div>
                </div>

            </div>
        </section>

        {/* section 4 */}
        <StatsComponent/>

        {/* section  5 */}
        <section className='mx-auto flex flex-col items-center justify-between gap-5 mb-[140px]'>
            <LearningGrid />
            <ContactFormSection/>
        </section>

        <section>
            <div>
                Reviews from others learners
                {/* <ReviewSlider/> */}
            </div>
        </section>
        
        <Footer/>
    </div>
  )
}

export default About