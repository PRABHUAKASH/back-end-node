// const { ObjectId } = require('mongodb');
// const {connect} = require("../connect");
// const mongo = require("../connect");
// GET Employees data function

// module.exports.getEmployees =async  (req,res) => {
//    try{
//     const employeesData = await connect().then((res)=>res.collection("employees").find().toArray());
//     res.send(employeesData);
    
//    }catch(err){
//     console.error(err);
//     res.status(500).send(err);
//    }
// };
// // Data CREATE function
// // module.exports.createEmployees = async (req,res) => {
// //     try{
// //         // console.log(req.body);
// //         // console.log(mongo);
// //        const insertedResponse = await connect().then((res)=>res.collection("employees").insertOne(req.body));
// //        res.send(insertedResponse);
       
// //     }catch(err){
// //         console.error(err);
// //         res.status(500).send(err);
// //     }
    
// // };
// // UPDATE function
// module.exports.updateEmployees =async (req,res) => {
//    try{
  
//     const updateDetails = await connect().then((res)=>res.collection("employees").findOneAndUpdate({_id:ObjectId(req.params.employeesId)},
//                              {$set:{...req.body}},{returnDocument : "after"}));
//                   res.send(updateDetails);           

//    }catch(err){
//     console.log(err);
//     res.status(500).send(err);
//    }
// };

// module.exports.deleteEmployees =async (req,res) => {
//     try{
//         const deleteResponse = await connect().then((res)=>res.collection("employees").remove({_id:ObjectId}));
//         res.send(deleteResponse );
//     }
//     catch(err){
//         console.error(err);
//         res.send(err);
//     }
  
// };

// ============================================================================================================

const mongo = require("../connect");
const { ObjectId } = require("mongodb");

module.exports.getEmployees = async (req, res) => {
  try {
    const employeesData = await mongo.selectedDb
      .collection("employees")
      .find()
      .toArray();
    res.send(employeesData);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

module.exports.updateEmployees = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = await mongo.selectedDb
      .collection("employees")
      .findOneAndUpdate(
        { _id: ObjectId(id) },
        { $set: { ...req.body } },
        { returnDocument: "after" }
      );
    res.send(updatedData);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

module.exports.createEmployees = async (req, res) => {
  try {
    const insertedResponse = await mongo.selectedDb
      .collection("employees")
      .insertOne(req.body.employees);
    res.send(insertedResponse);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

module.exports.deleteEmployees = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedData = await mongo.selectedDb
      .collection("employees")
      .remove({ _id: ObjectId(id) });
    res.send(deletedData);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};
  