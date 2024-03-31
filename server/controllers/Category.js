const Category = require("../models/Category");

// function getRandomInt(max){
//     return Math.floor(Math.random()*max)
// }

// create category ka handler 
exports.createCategory = async (req,res) => {
    try {
        // fetch data
        const {name, description} = req.body;

        // validate data
        if(!name || !description){
            return res.status(400).json({
                success: false,
                message: 'All fields are required',
            });
        }

        //create entry in db
        const categoryDetails = await Category.create({
            name: name,
            description: description,
        }); 
        console.log(categoryDetails);
        return res.status(200).json({
            success: true,
            message: 'category created successfully',
        });
    }
    catch(error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

// get all Category function
exports.showAllCategory = async (req,res) => {
    try {
        // allTags ke andar name aur decription hona hi chahiye
        const allCategory = await Category.find({},{name:true, description:true});
        res.status(200).json({
            success: true,
            message: 'All category returned successfully',
            allCategory,
        });
    }
    catch(error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

//categoryPageDetails
exports.categoryPageDetails = async (req,res) => {
    try {
        //get categoryId
        const {categoryId} =req.body;
        // get courses for sepcified  categoryId
        const selectedCategory =await Category.findById(categoryId)
                                        .populate("courses")
                                        .exec();
        // validation
        if(!selectedCategory){
            return res.status(404).json({
                success: false,
                message: 'Data not found',
            });
        }
        // get courses for different categories
        const differentCategories = await Category.find({
                                        _id: {$ne: categoryId},
                                    })
                                    .populate("courses")
                                    .exec();

        // get top 10 selling courses
        // upper wala khud se dekhna h

        // return response
        return res.status(200).json({
            success: true,
            data: {
                selectedCategory,
                differentCategories
            },
        });
    }
    catch(error) {
        console.log((erroe));
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
