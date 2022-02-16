const express = require('express');
const router = express.Router();
const mongoose = require("mongoose")

const User=require("../schema/user")

router.post('/',(req,res)=>{

    const  user = new User({
         _id:new mongoose.Types.ObjectId(),
         name: req.body.name,
         email: req.body.email,   
     });
      
     console.log(req.body);
     user.save()   
     .then(doc=>{
         res.status(200).json(doc);
     })
     .catch(err => {
         res.status(500).json({
           error: err
          
         });
         console.log(err);
     });
 })
 

 router.get("/:id",(req,res)=>{
    const id = req.params.id;
    User.findById(id).then(doc=>{
        console.log(doc);
        if(doc) {
            res.status(200).json(doc)
        } else {
            res.status(404).json({ message: 'Not Found' })
        }
    })
    .catch(error=>{
        console.log(error)
        res.status(500).json({
            error: error
        });
    })
})

router.get('/',(req,res)=>{
    User.find().lean()
    .then((users)=>{
        console.log(users);
        res.status(200).json(users)
    })
    .catch((err)=> {
        console.log(err);
        res.status(500).json({
          error: err
        });
    });
})

router.put("/:id", (req,res)=>{
    const id = req.params.id;
    let updateUser= {};
    for (const key in req.body) {
        updateUser[key] = req.body[key];
    }
    User.updateOne({_id: id},{$set:updateUser}).then(result=>{
        console.log(result)
        res.status(200).json(result)
    })
    .catch(error=>{
        console.log(error)
        res.status(500).json({
            error: error
        });
    })
})

router.delete("/:id",(req,res)=>{
    const id = req.params.id;
    User.remove({_id: id}).then(result=>{
        console.log(result)
        res.status(200).json(result)
    })
    .catch(error=>{
        console.log(error)
        res.status(500).json({
            error: error
        });
    })
})
module.exports = router;