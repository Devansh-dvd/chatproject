import multer from 'multer';

const storage = multer.diskStorage({
    destination: function(req , file, cb) {
        cb(null, './public/temp');
},
filename: function(req , file , cb){
    cb(null, file.originalname)
}});

const filefilter = (req , file , cb)=>{
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/gif' || file.mimetype === 'image/webp'){
        cb(null, true);
    } else {
        cb(null, false);
        alert('Only .jpeg, .jpg, .png, .gif and .webp format allowed!');
    }
}

export const upload = multer({storage: storage, fileFilter: filefilter});


