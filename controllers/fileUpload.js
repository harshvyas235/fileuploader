const File = require("../models/File");
const cloudinary = require("cloudinary").v2;

exports.localFileUpload = async (req, res) => {
    try {

        //fetch filefrom request
        const file = req.files.file;
        // console.log("FILE AAGYI JEE -> ",file);


        //create path where file need to be stored on server
        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;
        console.log("PATH-> ", path)

        //add path to the move fucntion
     file.mv(path,(err)=>{
        console.log(err);
     })

        //create a successful response
        res.json({
            success:true,
            message:'Local File Uploaded Successfully',
        });

    }
    catch(error) {
        console.log("Not able to upload the file on server")
        console.log(error);
    }
}

function isfilesupport(type,support) {
    return support.includes(type);
    
}

async function uploadFileToCloudinary(file,folder){
    const options ={folder};
    console.log("temp file path", file.tempFilePath);
    // if(quality) {
    //     options.quality = quality;
    // }

    options.resource_type = "auto";
    return await cloudinary.uploader.upload(file.tempFilePath, options);

}

exports.imageupload=async (req,res)=>{
   try{
    const {name, tags, email}=req.body
    console.log(name,email,tags)
    const file = req.files.imagefile;
    console.log(file)

    const support=["jpf","png","jpeg"];
    const filetype = file.name.split('.')[1].toLowerCase();

    console.log(filetype)
    if(!isfilesupport(filetype,support)){
        res.json({
            success: false,
            message:"does not support the type of the error"
        })
    }

    console.log("upload at cloud")
    
    const response = await uploadFileToCloudinary(file,"harshfolder")

        console.log(response);

        //db me entry save krni h
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
        });

        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:'Image Successfully Uploaded',
        })
   }
   catch(error) {
    console.error(error);
    res.status(400).json({
        success:false,
        message:'Something went wrong',
    });

}
    }



