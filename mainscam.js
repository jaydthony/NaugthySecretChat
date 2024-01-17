const APP_ID = "715256365a604115b1b83dcf237079a3";
const TOKEN = null;
let querystring = window.location.search;
let urlParams = new URLSearchParams(querystring);
let roomId = urlParams.get("room");
const CHANNEL = roomId;

const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

let localTracks = [];
let remoteUsers = {};
let userCount = 0;
let count = 0;
const userSessions = {};

// Function to cancel the channel
function cancelChannel() {
  // Implement your logic to cancel the channel here
  window.location = "https://naughty-secret.vercel.app/";
  console.log("Channel canceled due to 3-minute call duration for both users.");
}

let joinAndDisplayLocalStream = async () => {
  client.on("user-published", handleUserJoined);

  client.on("user-left", handleUserLeft);

  let UID = await client.join(APP_ID, CHANNEL, TOKEN, null);

  localTracks = await AgoraRTC.createMicrophoneAndCameraTracks();

  // Record user join time
  userSessions["user-1"] = Date.now();
  console.log(userSessions);
  localTracks[1].play("user-1");

  await client.publish([localTracks[0], localTracks[1]]);
};

let joinStream = async () => {
  await joinAndDisplayLocalStream();
};

let handleUserJoined = async (user, mediaType) => {
  remoteUsers[user.uid] = user;
  await client.subscribe(user, mediaType);

  // Record user join time
  userSessions["user-2"] = Date.now();

  if (mediaType === "video") {
    document.getElementById("user-2").style.display = "block";
    document.getElementById("user-1").classList.add("smallFrame");
    user.videoTrack.play("user-2");
  }

  if (mediaType === "audio") {
    user.audioTrack.play();
  }
  console.log(userSessions);
  console.log("user joined");
  // Calculate call duration whenever a new user joins
};

let handleUserLeft = async (user) => {
  delete remoteUsers[user.uid];
  document.getElementById("user-2").style.display = "none";
  document.getElementById("user-1").classList.remove("smallFrame");
};

let leaveAndRemoveLocalStream = async () => {
  for (let i = 0; localTracks.length > i; i++) {
    localTracks[i].stop();
    localTracks[i].close();
  }
  //document.getElementById("user-2").style.display = "none";
  document.getElementById("user-1").style.display = "none";
  document.getElementById("user-1").classList.remove("smallFrame");
  // change the status of the camgirl available for another user
  try {
    let camgirlStatusUrl = `https://naughty-secret.onrender.com/api/camgirl/status`;
    let camstatus = {
      status: false,
      username: roomId,
    };
    await axios.post(camgirlStatusUrl, camstatus).then((response) => {
      console.log("Successfully change user status:", response.data);
      window.location = "https://naughty-secret.vercel.app/";
    });
  } catch (error) {
    console.error("Error:", error);
  }
};

let toggleMic = async (e) => {
  if (localTracks[0].muted) {
    await localTracks[0].setMuted(false);
    document.getElementById("mic-btn").style.backgroundColor =
      "rgb(255, 80, 80)";
  } else {
    await localTracks[0].setMuted(true);
    document.getElementById("mic-btn").style.backgroundColor =
      "rgb(179, 102, 249)";
  }
};

let toggleCamera = async (e) => {
  if (localTracks[1].muted) {
    await localTracks[1].setMuted(false);
    document.getElementById("camera-btn").style.backgroundColor =
      "rgb(255, 80, 80)";
  } else {
    await localTracks[1].setMuted(true);
    document.getElementById("camera-btn").style.backgroundColor =
      "rgb(179, 102, 249)";
  }
};

joinStream();
document
  .getElementById("leave-btn")
  .addEventListener("click", leaveAndRemoveLocalStream);
document.getElementById("mic-btn").addEventListener("click", toggleMic);
document.getElementById("camera-btn").addEventListener("click", toggleCamera);
