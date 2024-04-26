const mongodb = require("../db/connect");
const objectID = require("mongodb").ObjectId;
const dotenv = require("dotenv").config();


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

module.exports = {getAll,getID,getGender};