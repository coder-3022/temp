const Profile = require("../models/Profile");
const User = require("../models/User");
const Course = require("../models/Course");
const CourseProgress = require("../models/CourseProgress");


// update profile
exports.updateProfile =async (req,res) => {
    try {
        // fetch data
        const {dateOfBirth="", about="", contactNumber, gender} = req.body;

        // user id
        const id =req.user.id;

        // validate data
        if(!contactNumber || !gender || !id){
            return res.status(400).json({
                success: false,
                message: 'all fields are required'
            });
        }

        // findProfile
        const userDetails = await User.findById(id);
        const profileId = userDetails.additionalDetails;
        const profileDetails = await Profile.findById(profileId);

        // update profile
        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.about = about;
        profileDetails.contactNumber = contactNumber;
        profileDetails.gender = gender;
        await profileDetails.save(); 

        // return response
        return res.status(200).json({
            success: true,
            message: 'Profile Updated successfully',  
            profileDetails,
            data:userDetails,
        });
    }
    catch(error) {
        return res.status(500).json({
            success: false,
           error: error.message,
        });
    }
};

// delete account
// how can we scheduled this deletion operation (and also read cron job)!!
exports.deleteAccount = async (req,res) => {
    try {
        // fetch data
        const id=req.user.id;

        // validate data
        const userDetails = await User.findById(id);
        if(!userDetails){
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        // delete profile
        await Profile.findByIdAndDelete({_id: userDetails.additionalDetails});

        // hw!! unenroll user from enrolled course
        for(const courseId of userDetails.courses) {
            await Course.findByIdAndUpdate(courseId, {$pull: {studentsEnrolled: id}}, {new: true} )
          }
        // delete user
        await User.findByIdAndDelete({_id:id});
        
        // delete user's courseprogress also
        await CourseProgress.deleteMany({userId: id});

        // return response
        return res.status(200).json({
            success: true,
            message: 'User Deleted successfully',  
        });

    }
    catch(error) {
        return res.status(500).json({
            success: false,
            message: 'User cannot be deleted, Please try after sometime',
        });
    }
};

// get all user details
exports.getAllUserDetails = async (req,res) => {
    try {
        // fetch data
        const id=req.user.id;

        // validate data and get user details
        const userDetails = await User.findById(id).populate("additionalDetails").exec();

        // return response
        return res.status(200).json({
            success: true,
            message: 'User Data fetched successfully',  
            data:userDetails,
        });
    }
    catch(error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};