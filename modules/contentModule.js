const mongo = require("../connect");
const { ObjectId } = require("mongodb");

module.exports.getContent = async (req, res) => {
  try {
    const contentData = await mongo.selectedDb
      .collection("content")
      .find()
      .toArray();
    res.send(contentData);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

module.exports.updateContent = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = await mongo.selectedDb
      .collection("content")
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

module.exports.createContent = async (req, res) => {
  try {
    const insertedResponse = await mongo.selectedDb
      .collection("content")
      .insertOne(req.body.content);
    res.send(insertedResponse);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

module.exports.deleteContent = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedData = await mongo.selectedDb
      .collection("content")
      .remove({ _id: ObjectId(id) });
    res.send(deletedData);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};