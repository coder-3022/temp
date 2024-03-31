const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

// create subsection
exports.createSubSection = async (req,res) => {
    try {
        // fetch data
        const {title, timeDuration, description, sectionId} = req.body;

        // extract file/video
        const video =req.files.videoFile;

        // validate data
        if(!sectionId || !title || !timeDuration || !description || !video){
            return res.status(400).json({
                success: false,
                message: 'All fields are required',
            });
        }

        // upload video to cloudinary
        const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);

        // create subsection
        const subSectionDetails = await SubSection.create({
            title: title,
            timeDuration: timeDuration,
            description: description,
            videoUrl: uploadDetails.secure_url,

        });

        // add this subsection into section
        const updatedSection = await Section.findByIdAndUpdate({_id: sectionId},
                {
                    $push: {
                        subSection: subSectionDetails._id,
                    }
                },
                {new: true},
        ).populate("subSection")
        // log updated section here after adding populated query hw!!

        // return response
        return res.status(200).json({
            success: true,
            message: 'Subsection created successfully',
            data:updatedSection,
        });
    }
    catch(error) {
        return res.status(500).json({
            success: false,
            message: 'Unable to create SubSection,Please try again',
            error: error.message,
        });
    }
};

// update subsection
exports.updateSubSection = async (req,res) => {
    try {
        // fetch data 
        const {title, description, sectionId, subSectionId} = req.body;
        const subSection = await SubSection.findById(subSectionId);
        // validation
        if(!subSection){
            return res.status(404).json({
                success: false,
                message: 'SubSection not found',
            });
        }
        
        // update the subsection 
        if(title !== undefined){
            subSection.title = title;
        }

        if(description !== undefined){
            subSection.description = description;
        }

        if(req.files && res.files.videoFile !== undefined) {
            const video = req.files.videoFile;
            const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);
            subSection.videoUrl = uploadDetails.secure_url;
            subSection.timeDuration = `${uploadDetails.duration}`
        }

        await subSection.save();

        // find updated section 

        const updatedSection = await Section.findById(sectionId)
        .populate("subSection")

        console.log(updatedSection);

        // return response
        return res.status(200).json({
            success: true,
            message: 'subSection updated successfully',
            data: updatedSection,
        });

    }
    catch(error) {
        return res.status(500).json({
            success: false,
            message: 'An error occurred while updating the section',
        });
    }
}

// delete subsection
exports.deleteSubSection = async (req,res) => {
    try {
        // fetch data
        const {subSectionId, sectionId} = req.body;
        // validation
        if(!subSectionId){
            return res.status(404).json({
                success: false,
                message: 'SubSection not found',
            });
        }
        // update section by deleting SubSection
        const updatedSection = await Section.findByIdAndUpdate(
                                                {_id: sectionId},
                                                {
                                                    $pull: {
                                                        subSection: subSectionId,
                                                    },
                                                },
                                                {new:true},
                                            )
                                            .populate("subSection")
        
        // return response
        return res.status(200).json({
            success: true,
            message: 'SubSection deleted successfully',
            data: updatedSection,
        });                             
    }
    catch(error) {
        return res.status(500).json({
            success: false,
            message: 'An error occurred while deleting the SubSection',
        });
    }
}
