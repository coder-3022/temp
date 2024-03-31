const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");
const {uploadImageToCloudinary} = require("../utils/imageUploader");

// create course function
exports.createCourse = async (req,res) => {
    try {
        // fetch data
        const {courseName, courseDescription, whatYouWillLearn, price, category, tag} = req.body;

        // get thumbnail
        const thumbnail = req.files.thumbnailImage;
        
        // validation
        if(!courseName || !courseDescription || !whatYouWillLearn || !price 
            || !category || !tag || !thumbnail){
            return res.status(400).json({
                success: false,
                message: 'All fields are required',
            });
        }

        // check for instructor
        const userId = req.user.id;
        const instructorDetails = await User.findById(userId);
        console.log("instructor details: ",instructorDetails);
        if(!instructorDetails){
            return res.status(404).json({
                success: false,
                message: 'Instructor Details not found',
            });
        }
        // databse me verify that userid and instructor id are same or different

        // check category is valid or not 
        const categoryDetails =await Category.findById(category);
        if(!categoryDetails){
            return res.status(404).json({
                success: false,
                message: 'Category Details not found',
            });
        }
        // upload Image to cloudinary
        const thumbnailImage = await uploadImageToCloudinary(thumbnail,process.env.FOLDER_NAME);

        // create an entry for new course
        const newCourse =await Course.create({
            courseName,
            courseDescription,
            instructor: instructorDetails._id,
            whatYouWillLearn,
            price,
            category: categoryDetails._id,
            tag,
            thumbnail: thumbnailImage.secure_url,
        });

        // add the new  course to the user schema of Instructor
        await User.findByIdAndUpdate(
            {_id: instructorDetails._id},
            {
                $push: {
                    courses: newCourse._id,
                }
            },
            {
                new: true
            },
        );

        // update the category  ka schema 
        // ye check krna h kyuki khud se likhe h
        await Category.findByIdAndUpdate(
            {_id: categoryDetails._id},
            {
                $push: {
                    courses: newCourse._id,
                }
            },
            {
                new: true
            },
        );

        // return response
        return res.status(200).json({
            success: true,
            message: 'course created successfully',
            data: newCourse,
        });

    }
    catch(error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Failed to create course',
            error: error.message,
        });
    }
};

// get all course
exports.getAllCourses = async (req,res) => {
    try {
        // find course
        const allCourses = await Course.find({status: "Published"},
            {
                courseName:true,
                price:true,
                thumbnail:true,
                instructor:true,
                ratingAndReview:true,
                studentEnrolled:true,
            }
        )
        .populate("instructor")
        .exec();
        
        // return response
        return res.status(200).json({
            success: true,
            message: 'Data for all courses fetch successfully',
            data: allCourses,
        });

    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Cannot fetch Course data',
            error: error.message,
        })
    }
};

// getCourseDetails
exports.getCourseDetails = async (req,res) => {
    try {
        // fetch course id
        const {courseId} =req.body;

        // find Course details
        const courseDetails = await Course.find(
            {_id: courseId})
            .populate(
                {
                    path: "instructor",
                    populate:{
                        path: "additionalDetails",
                    },
                }
            )
            .populate("category")
            .populate("ratingAndReviews")
            .populate(
                {
                    path: "courseContent",
                    populate: {
                        path: "subSection",
                    },
                }
            )
            .exec();
        // validaton
        if(!courseDetails){
            return res.status(400).json({
                success: false,
                message: `Could not find the course with ${courseId}`,
            });
        }

        // return response
        return res.status(200).json({
            success: true,
            message: 'Course details fetch successfully',
            data: courseDetails,
        });
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};