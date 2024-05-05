const mongodb = require("../db/connect");
const objectID = require("mongodb").ObjectId;
const dotenv = require("dotenv").config();

//GET calls
const getAll = async (req, res) =>{
    const result = await mongodb.getDatabase().db(process.env.db).collection(process.env.collection).find();
    result.toArray().then((contacts) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(contacts)
    }).catch((err) =>{
        console.error(err);
    });
}

const getGender = async (req, res) =>{
    const param = req.params.filter;
    let returnList = [];
    const result = await mongodb.getDatabase().db(process.env.db).collection(process.env.collection).find();
    result.toArray().then((contacts) => {
        res.setHeader("Content-Type", "application/json");
        contacts.forEach(contact => {
            if(contact["gender"] == param.toUpperCase()){
                returnList.push(contact);
            }
        });
        res.status(200).json(returnList)
    }).catch((err) =>{
        console.error(err);
    });
}

const getID = async (req, res) =>{
    const contactID = new objectID(req.params.id);
    const result = await mongodb.getDatabase().db(process.env.db).collection(process.env.collection).find({_id: contactID});
    result.toArray().then((contact) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(contact[0])
    }).catch((err) =>{
        console.error(err);
    });
}

//POST call
const createContact = async (req,res) =>{
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday,
        gender: req.body.gender
    }
    const response = await mongodb.getDatabase().db(process.env.db).collection(process.env.collection).insertOne(contact);
    if(response.acknowledged){
        res.status(200).send();
    }else{
        res.status(404).json(response.error || "Malformed request. Please review contents and try again.")
    }
}

//PUT call
const updateContact = async (req,res) =>{
    const contactID = new objectID(req.params.id);
    const update = {
        $set: req.body
    }
    const response = await mongodb.getDatabase().db(process.env.db).collection(process.env.collection).replaceOne({_id: contactID}, update);
    if(response.modifiedCount > 0){
        res.status(200).send();
    }else{
        res.status(404).json(response.error || "Malformed request. Please review contents and try again.")
    }
}

//DELETE call
const deleteContact = async (req,res) =>{
    const contactID = new objectID(req.params.id);
    const response = await mongodb.getDatabase().db(process.env.db).collection(process.env.collection).deleteOne({_id: contactID});
    if(response.deletedCount > 0){
        res.status(200).send();
    }else{
        res.status(404).json(response.error || "Malformed request. Please review contents and try again.")
    }
}

module.exports = {getAll,getID,getGender,createContact,updateContact,deleteContact};