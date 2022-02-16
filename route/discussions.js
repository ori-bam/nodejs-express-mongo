const express = require('express');
const router = express.Router();
const mongoose = require("mongoose")
const d = new Date();


const Discussion=require("../schema/discussion")

router.post('/',(req,res)=>{

    const  discussion = new Discussion({
         _id:new mongoose.Types.ObjectId(),
         name: req.body.name,
         comment : req.body.comment,   
         title:req.body.title,
         date:d.toLocaleString()
     });
      
     console.log(req.body);
     discussion.save()   
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
    Discussion.findById(id).then(doc=>{
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
    Discussion.find().lean()
    .then((discussion)=>{
        console.log(discussion);
        res.status(200).json(discussion)
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
    let updateDisc= {};
    for (const key in req.body) {
        updateDisc[key] = req.body[key];
    }
    Discussion.updateOne({_id: id},{$set:updateDisc}).then(result=>{
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
    Discussion.remove({_id: id}).then(result=>{
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