const iceCandidates = [];
let callerOffer;

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
let callerConnection;

let createOffer = async () => {
  callerConnection = new RTCPeerConnection(servers);

  callerConnection.addEventListener("icecandidate", (event) => {
    if (event.candidate) {
      const iceCandidate = event.candidate;
      // Store the iceCandidate in the array
      iceCandidates.push(iceCandidate);
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
    .then(() => {
      const offerDescription = callerConnection.localDescription;
      callerOffer = offerDescription;

      console.log("Caller offer created:", callerOffer);
      console.log("ICE candidates:", iceCandidates);
    })
    .catch((error) => {
      console.error("Error creating offer:", error);
    });
};
