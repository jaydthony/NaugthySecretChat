const APP_ID = "715256365a604115b1b83dcf237079a3";
const TOKEN = null;
let querystring = window.location.search;
let urlParams = new URLSearchParams(querystring);
let roomId = urlParams.get("room");
let usernameinfomation = urlParams.get("username");
const CHANNEL = roomId;
if (CHANNEL == null) {
  window.location = "https://naughty-secret.vercel.app/";
}

const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
let rtmClient;
let rtmChannel;
let localTracks = [];
let remoteUsers = {};
let userCount = 0;
let callStartTime = null;
let callEndTime = null;
let count = 0;
let timers = 0;
const userSessions = {};
var userInfo;
var camGirlInfo;

function isCamGirlInFavorites(username, favList) {
  if (favList !== null && favList.length > 0 && favList !== undefined) {
    const isPresent = favList.some(
      (entry) => entry.camGirlUserName === username
    );
    return isPresent;
  }
  return false;
}

// Function to retrieve the timeAvailable value from the API
async function getTimeAvailableFromAPI() {
  var UserName = usernameinfomation;
  var CamgirlUserName = roomId;
  axios
    .get(
      `https://naughty-secret.onrender.com/api/user/me/username/info/${UserName}`
    )
    .then((response) => {
      // Handle the successful response here
      console.log("Response data:", response.data);
      userInfo = response.data;
      console.log(parseInt(userInfo.result.timeAvailable, 10) * 60 * 1000);
      timers = parseInt(userInfo.result.timeAvailable, 10) * 60 * 1000; // Convert to milliseconds
    })
    .catch((error) => {
      // Handle any errors here
      console.error("Error:", error);
    });
  axios
    .get(
      `https://naughty-secret.onrender.com/api/user/me/username/info/${CamgirlUserName}`
    )
    .then((response) => {
      // Handle the successful response here
      console.log("Response data:", response.data);
      camGirlInfo = response.data;
      if (
        camGirlInfo.result.userName !== null &&
        camGirlInfo.result.userName !== undefined
      ) {
        console.log("girls", camGirlInfo.result.userName);
        console.log(userInfo.result.favLists);
        if (
          isCamGirlInFavorites(
            camGirlInfo.result.userName,
            userInfo.result.favLists
          )
        ) {
          document.getElementById("fav-btn").style.display = "none";
        } else {
          document.getElementById("unlike-btn").style.display = "none";
        }
      }
    })
    .catch((error) => {
      // Handle any errors here
      console.error("Error:", error);
    });
}

// Function to calculate the call duration
async function calculateCallDuration() {
  if ("user-1" in userSessions && "user-2" in userSessions) {
    const user1Duration = userSessions["user-1"];
    const user2Duration = userSessions["user-2"];
    console.log("Checking call duration...");
    // Check if both users have exceeded minutes from api time

    const currentTime = Date.now();
    count++;
    console.log(`Count: ${count}, 3-minute countdown in progress...`);
    if (
      currentTime - user1Duration >= timers &&
      currentTime - user2Duration >= timers
    ) {
      // Both users have exceeded  minutes from api time, so cancel the channel
      console.log(
        "Both users have exceeded minutes from api time. Canceling the channel..."
      );
      cancelChannel();
    }
  }
}
// Function to cancel the channel
function cancelChannel() {
  // Implement your logic to cancel the channel here
  console.log("Channel canceled due to 3-minute call duration for both users.");
  leaveAndRemoveLocalStream();
}

let joinAndDisplayLocalStream = async () => {
  client.on("user-published", handleUserJoined);

  client.on("user-left", handleUserLeft);

  let UID = await client.join(APP_ID, CHANNEL, TOKEN, null);
  const useruuid = String(Math.floor(Math.random() * 10000));
  localTracks = await AgoraRTC.createMicrophoneAndCameraTracks();

  remoteUsers[UID] = UID;

  getTimeAvailableFromAPI();

  callStartTime = Date.now();
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
  console.log("Duration");
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
  callEndTime = Date.now();

  // Calculate the call duration
  const callDuration = callEndTime - callStartTime;
  console.log(callDuration);
  const totalSeconds = Math.floor(callDuration / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = (totalSeconds % 60) / 100;
  var totalAmountSpend = minutes + seconds;

  // Send a POST request to your backend with the call duration
  axios
    .post("https://naughty-secret.onrender.com/api/call/record/add", {
      userId: userInfo.result.id,
      timeUsed: totalAmountSpend,
      camgirlId: camGirlInfo.result.id,
    })
    .then((response) => {
      console.log("Call duration recorded on the backend:", response.data);
      axios
        .post(
          `https://naughty-secret.onrender.com/api/camgirl/unmatch/${camGirlInfo.result.userName}`
        )
        .then((response) => {
          console.log("User unmatch successfully:", response.data);
          window.location = "https://naughty-secret.vercel.app/";
        })
        .catch((error) => {
          console.error("Failed to disconnect user from call:", error);
        });
    })
    .catch((error) => {
      console.error("Failed to record call duration on the backend:", error);
    });
};

let leaveAndRemoveLocalStream2 = async () => {
  for (let i = 0; localTracks.length > i; i++) {
    localTracks[i].stop();
    localTracks[i].close();
  }

  callEndTime = Date.now();

  // Calculate the call duration
  const callDuration = callEndTime - callStartTime;
  console.log(callDuration);
  const totalSeconds = Math.floor(callDuration / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = (totalSeconds % 60) / 100;
  var totalAmountSpend = minutes + seconds;

  // Send a POST request to your backend with the call duration
  axios
    .post("https://naughty-secret.onrender.com/api/call/record/add", {
      userId: userInfo.result.id,
      timeUsed: totalAmountSpend,
      camgirlId: camGirlInfo.result.id,
    })
    .then((response) => {
      console.log("Call duration recorded on the backend:", response.data);
      axios
        .post(
          `https://naughty-secret.onrender.com/api/camgirl/unmatch/${camGirlInfo.result.userName}`
        )
        .then((response) => {
          console.log("User unmatch successfully:", response.data);
          window.location = "https://naughty-secret.vercel.app/";
        })
        .catch((error) => {
          console.error("Failed to disconnect user from call:", error);
        });
    })
    .catch((error) => {
      console.error("Failed to record call duration on the backend:", error);
    });
};

let leaveAndRemoveLocalStreamForNextCall = async () => {
  callEndTime = Date.now();

  // Calculate the call duration
  const callDuration = callEndTime - callStartTime;
  console.log(callDuration);
  const totalSeconds = Math.floor(callDuration / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = (totalSeconds % 60) / 100;
  var totalAmountSpend = minutes + seconds;

  // Send a POST request to your backend with the call duration
  try {
    const recordResponse = await axios.post(
      "https://naughty-secret.onrender.com/api/call/record/add",
      {
        userId: userInfo.result.id,
        timeUsed: totalAmountSpend,
        camgirlId: camGirlInfo.result.id,
      }
    );

    console.log("Call duration recorded on the backend:", recordResponse.data);

    const urlfornewmatch = `https://naughty-secret.onrender.com/api/camgirl/available/1`;
    const camFetchResponse = await axios.get(urlfornewmatch);

    console.log("Cam fetch successfully:", camFetchResponse.data);

    if (
      camFetchResponse.status === 200 &&
      camFetchResponse.data.result.user[0] !== null
    ) {
      const camgirl = camFetchResponse.data.result.user[0];

      if (camgirl == null || camgirl === undefined) {
        alert("Camgirls is not available");
        return;
      }

      console.log("Cam for next call", camgirl);
      const usertomatchnextcall = userInfo.result.userName;
      const unmatchResponse = await axios.post(
        `https://naughty-secret.onrender.com/api/camgirl/unmatch/${camGirlInfo.result.userName}`
      );
      console.log("User unmatch successfully:", unmatchResponse.data);
      if (usertomatchnextcall !== null) {
        const newroomLink = `https://vidchat-ten.vercel.app/room.html?room=${camgirl.userName}&&username=${usertomatchnextcall}`;
        const camGrilRoomLink = `https://vidchat-ten.vercel.app/camroom.html?room=${camgirl.userName}&&username=${camgirl.userName}`;

        console.log(newroomLink);

        const newdata = {
          email: camgirl.email,
          roomLink: camGrilRoomLink,
        };

        const matchResponse = await axios.post(
          `https://naughty-secret.onrender.com/api/camgirl/match`,
          newdata
        );
        console.log(
          "User match to the next call successfully:",
          matchResponse.data
        );
        for (let i = 0; localTracks.length > i; i++) {
          localTracks[i].stop();
          localTracks[i].close();
        }
        window.location = newroomLink;
      }
    }
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

let FavButtonLikes = async () => {
  await axios
    .post("https://naughty-secret.onrender.com/api/camgirl/fav/add", {
      userid: userInfo.result.id,
      camGirlUserName: camGirlInfo.result.userName,
    })
    .then((response) => {
      document.getElementById("fav-btn").style.display = "none";
      document.getElementById("unlike-btn").style.display = "block";
      alert("CamGirl added to fav List successfully:", response.data);
      console.log("CamGirl added to fav List successfully:", response.data);
    })
    .catch((error) => {
      console.error("Camgirl not added succefully to fav list", error);
    });
};

let UnFavButtonLikes = async () => {
  try {
    const response = await axios.delete(
      "https://naughty-secret.onrender.com/api/camgirl/fav/remove",
      {
        data: {
          userid: userInfo.result.id,
          camGirlUserName: camGirlInfo.result.userName,
        },
      }
    );

    document.getElementById("unlike-btn").style.display = "none";
    document.getElementById("fav-btn").style.display = "block";

    alert("CamGirl removed from fav List successfully:", response.data);
    console.log("CamGirl removed from fav List successfully:", response.data);
  } catch (error) {
    console.error("Camgirl not removed successfully from fav list", error);
  }
};

joinStream();

setInterval(calculateCallDuration, 1000 * 60 * 1);
document
  .getElementById("leave-btn")
  .addEventListener("click", leaveAndRemoveLocalStream2);

document
  .getElementById("next-btn")
  .addEventListener("click", leaveAndRemoveLocalStreamForNextCall);
document.getElementById("mic-btn").addEventListener("click", toggleMic);
document.getElementById("camera-btn").addEventListener("click", toggleCamera);
document.getElementById("fav-btn").addEventListener("click", FavButtonLikes);
document
  .getElementById("unlike-btn")
  .addEventListener("click", UnFavButtonLikes);
