const Signaling = require("../models/signaling");

// Function to handle the POST request
const stepOne = async (req, res) => {
    console.log(req.body)
  try {
    const { callerEmail, receiverEmail, callerOffer, callerCandidates } = req.body;

    // Find an existing record based on callerEmail and receiverEmail
    const existingRecord = await Signaling.findOne({ caller: callerEmail, receiver: receiverEmail });

    if (existingRecord) {
      // Update the existing record
      existingRecord.callerOffer = callerOffer;
      existingRecord.callerCandidates = callerCandidates;
      await existingRecord.save();

      res.status(200).json({ message: "Data updated successfully" });
    } else {
      // Create a new Signaling document
      const signalingData = new Signaling({
        caller: callerEmail,
        receiver: receiverEmail,
        callerOffer: callerOffer,
        callerCandidates: callerCandidates,
      });

      // Save the document to the database
      await signalingData.save();

      res.status(201).json({ message: "Data saved successfully" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { stepOne };
