import React, { useState } from "react";
import axios from "axios";

const SignalingBtn = () => {
  const [callerEmail, setCallerEmail] = useState("");
  const [receiverEmail, setReceiverEmail] = useState("");


  // Create an array to store generated ICE candidates

  let callerOffer;
  const callerCandidates = [];

  let receivedAnswer; 
  const receiverCandidates = [];


  let receiverAnswer; 

  let receivedCallerCandidate; // Assuming you receive the caller's ICE candidate from somewhere
  let receivedReceiverCandidate; // Assuming you receive the receiver's ICE candidate from somewhere

  const servers = {
    iceServers: [
      {
        urls: [
          "stun:stun1.l.google.com:19302",
          "stun:stun2.l.google.com:19302",
          "stun:stun3.l.google.com:19302",
        ],
      },
    ],
  };

  console.log("Caller Email:", callerEmail);
  console.log("Receiver Email:", receiverEmail);

















  let callerConnection;
  let receiverConnection;

  let createOffer = async () => {
    callerConnection = new RTCPeerConnection(servers);

    callerConnection.addEventListener("icecandidate", (event) => {
      if (event.candidate) {
        const iceCandidate = event.candidate;
        // Store the iceCandidate in the array
        callerCandidates.push(iceCandidate);
      }
    });

    // Create a data channel for communication
    const dataChannel = callerConnection.createDataChannel("channel");

    // Set up event listeners for the data channel
    dataChannel.onopen = () => {
      console.log("Data channel connection opened!");
    };

    dataChannel.onmessage = (event) => {
      console.log("Received a message:", event.data);
    };

    callerConnection
      .createOffer()
      .then((offer) => callerConnection.setLocalDescription(offer))
      .then(async () => {
        const offerDescription = callerConnection.localDescription;

        callerOffer = offerDescription;

        console.log("Caller offer created:", callerOffer);
        console.log("Caller ICE candidates:", callerCandidates);

        try {
          const response = await axios.post('http://localhost:3000/signaling', {

            callerEmail,
            receiverEmail,
            callerOffer,
            callerCandidates,
          });
          console.log('Data sent to the backend:', response.data);
        } catch (error) {
          console.error('Error sending data to the backend:', error);
        }

      })
      
      .catch((error) => {
        console.error("Error creating offer:", error);
      });
  };


















  // Function to create the receiver connection
  const createReceiverConnection = () => {
    receiverConnection = new RTCPeerConnection();

    receiverConnection.addEventListener("icecandidate", (event) => {
      if (event.candidate) {
        const iceCandidate = event.candidate;
        // console.log("Receiver ICE candidate:", iceCandidate);

        receiverCandidates.push(iceCandidate);
      }

    });

    receiverConnection.ondatachannel = (event) => {
      const dataChannel = event.channel;

      dataChannel.onopen = () => {
        console.log("Data channel connection opened!");
      };

      dataChannel.onmessage = (event) => {
        console.log("Received a message:", event.data);
      };
    };


// need to get receivedOffer 

    receiverConnection.setRemoteDescription(receivedOffer)
      .then(() => receiverConnection.createAnswer())
      .then((answer) => receiverConnection.setLocalDescription(answer))
      .then(() => {
        console.log("Receiver answer created:", receiverConnection.localDescription);
      
        receiverAnswer = receiverConnection.localDescription;

      })
      .catch((error) => {
        console.error("Error creating answer:", error);
      });
  };













  // Function to set received answer as remote description and add ICE candidate

  // get receivedAnswer and receivedCallerCandidate

  const handleReceivedAnswer = () => {
    callerConnection.setRemoteDescription(receivedAnswer)
      .then(() => {
        callerConnection.addIceCandidate(new RTCIceCandidate(receivedReceiverCandidate));
      })
      .catch(error => {
        console.error('Error setting remote description:', error);
      });
  };
















  // Function to add received ICE candidate to the receiver's RTCPeerConnection

  // get receivedCallerCandidate

  const handleReceivedReceiverCandidate = () => {
    receiverConnection.addIceCandidate(new RTCIceCandidate(receivedCallerCandidate));
  };








  return (
    <div>
      <input
        type="email"
        placeholder="Caller Email"
        value={callerEmail}
        onChange={(e) => setCallerEmail(e.target.value)}
      />
      <input
        type="email"
        placeholder="Receiver Email"
        value={receiverEmail}
        onChange={(e) => setReceiverEmail(e.target.value)}
      />
      <button onClick={createOffer}>Create Offer</button>
      <button onClick={createReceiverConnection}>Create Receiver Connection</button>
      <button onClick={handleReceivedAnswer}>Set Received Answer</button>
      <button onClick={handleReceivedReceiverCandidate}>Add Receiver Candidate</button>
    </div>
  );
};

export default SignalingBtn;
