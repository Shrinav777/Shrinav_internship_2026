const db = require("../config/db");



// CREATE CROP

exports.addCrop = (req,res)=>{


    const {
        crop_name,
        state,
        market,
        price
    } = req.body;



    const sql =

    `
    INSERT INTO crop_prices
    (crop_name,state,market,price)

    VALUES (?,?,?,?)
    `;



    db.query(

        sql,

        [
            crop_name,
            state,
            market,
            price
        ],


        (err,result)=>{


            if(err){

                return res.status(500).json(err);

            }



            res.json({

                message:"Crop Added Successfully",

                id:result.insertId

            });


        }


    );


};






// GET ALL CROPS

exports.getAllCrops=(req,res)=>{


    db.query(

        "SELECT * FROM crop_prices",

        (err,result)=>{


            if(err){

                return res.status(500).json(err);

            }



            res.json(result);


        }

    );


};






// GET SINGLE CROP

exports.getCropById=(req,res)=>{


    const id=req.params.id;



    db.query(

        "SELECT * FROM crop_prices WHERE id=?",

        [id],


        (err,result)=>{


            if(err){

                return res.status(500).json(err);

            }



            if(result.length===0){

                return res.status(404).json({

                    message:"Crop not found"

                });

            }



            res.json(result[0]);


        }

    );


};

// SEARCH CROP BY NAME

exports.searchCrop = (req,res)=>{

    const crop = req.params.crop;

    const sql =

    `
    SELECT
    id,
    crop_name,
    state,
    market,
    price

    FROM crop_prices

    WHERE crop_name LIKE ?

    ORDER BY state, market
    `;

    db.query(

        sql,

        [`%${crop}%`],

        (err,result)=>{

            if(err){

                return res.status(500).json(err);

            }

            res.json(result);

        }

    );

};



// UPDATE COMPLETE CROP (PUT)

exports.updateCrop=(req,res)=>{


    const id=req.params.id;



    const {

        crop_name,
        state,
        market,
        price

    }=req.body;



    const sql=

    `
    UPDATE crop_prices

    SET

    crop_name=?,

    state=?,

    market=?,

    price=?

    WHERE id=?

    `;



    db.query(

        sql,

        [

            crop_name,

            state,

            market,

            price,

            id

        ],


        (err,result)=>{


            if(err){

                return res.status(500).json(err);

            }



            res.json({

                message:"Crop Updated Successfully"

            });


        }

    );

};


// PATCH UPDATE PARTIAL DATA

exports.patchCrop=(req,res)=>{

    const id=req.params.id;

    const fields=req.body;

    db.query(

        "UPDATE crop_prices SET ? WHERE id=?",

        [

            fields,

            id

        ],

        (err,result)=>{

            if(err){

                return res.status(500).json(err);

            }

            res.json({

                message:"Crop Updated Successfully"

            });

        }

    );

};


// DELETE CROP

exports.deleteCrop=(req,res)=>{

    const id=req.params.id;

    db.query(

        "DELETE FROM crop_prices WHERE id=?",

        [id],

        (err,result)=>{

            if(err){

                return res.status(500).json(err);

            }

            res.json({

                message:"Crop Deleted Successfully"
            });
        }
    );
};