const Section = require("../models/Section");
const Course = require("../models/Course");

// create section
exports.createSection = async (req,res) => {
    try {
        // fetch data
        const {sectionName, courseId} =req.body;

        // data validation
        if(!sectionName || !courseId){
            return res.status(400).json({
                success: false,
                message: 'Missing properties',
            });
        }

        // create section
        const newsection = await Section.create({sectionName});

        // update course with this section objectId
        const updatedCourseDetails =await Course.findByIdAndUpdate(
                courseId,
                {
                    $push: {
                        courseContent:newsection._id,
                    }
                },
                {new:true},
        );
        // hw: use populate to replace sections/subsection both in updatedCoursedDetails

        // return response
        return res.status(200).json({
            success: true,
            message: 'section created successfully',
            updatedCourseDetails,
        });
    }
    catch(error) {
        return res.status(500).json({
            success: false,
            message: 'Unable to create Section,Please try again',
            error: error.message,
        });
    }
}

// update section
exports.updateSection = async (req,res) => {
    try {
        // fetch data
        const {sectionName,sectionId} =req.body;

        // data validate
        if(!sectionName || !sectionId){
            return res.status(400).json({
                success: false,
                message: 'Missing Property'
            })
        }

        // update data
        const section = await Section.findByIdAndUpdate(sectionId,{sectionName},{new:true});

        // return response
        return res.status(200).json({
            success: true,
            message: 'section updated successfully',  
        });

    }
    catch(error) {
        return res.status(500).json({
            success: false,
            message: 'Unable to update Section,Please try again',
            error: error.message,
        });
    }
}


// delete section
exports.deleteSection = async (req,res) => {
    try {
        // fetch id
        const {sectionId,courseId} = req.body;
        // do we need to delete the entry from the course schema??(testing me krenge)
        // auto update ho gya h Course. Course se Section wala khhud hi delete ho gya h

        // await Course.findByIdAndUpdate(
        //                         {_id: courseId},
        //                         {
        //                             $pull:{
        //                                 courseContent: sectionId,
        //                             },
        //                         },
        //                         {new:true},
        // )
        // find by id and delete
        await Section.findByIdAndDelete(sectionId);
        // return response
        return res.status(200).json({
            success: true,
            message: 'section Deleted successfully',  
        });
    }
    catch(error) {
        return res.status(500).json({
            success: false,
            message: 'Unable to update Section,Please try again',
            error: error.message,
        });
    }
}