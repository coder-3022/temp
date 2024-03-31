import React from 'react'
import ContactUsForm from '../components/ContactPage/ContactUsForm'
import Footer from '../components/common/Footer'

const Contact = () => {
  return (
    <div>
        <div className=' mb-5 flex  items-center justify-center w-11/12'>
            <ContactUsForm/>
        </div>
        <div>
            <Footer/>
        </div>
    </div>
  )
}

export default Contact