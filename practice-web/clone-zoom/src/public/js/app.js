const socket = io();

// FUNCTION : 채팅방 내 기능 구현
const call = document.getElementById('call');

const video = document.getElementById('video');
const muteButton = document.getElementById('mute');
const cameraButton = document.getElementById('camera');
const camerasSelect = document.getElementById('cameras');

call.hidden = true;

// 스트림은 비디오와 오디오를 포함하는 미디어 데이터
let mediaStream;
let isMuted = false;
let isCameraOff = false;
let roomName = null;
let myPeerConnection;

// 유저의 카메라 목록 호출
const getCameras = async () => {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const cameras = devices.filter((device) => device.kind === 'videoinput');

    const currentCamera = mediaStream.getVideoTracks()[0];

    cameras.forEach((camera) => {
      const option = document.createElement('option');
      option.value = camera.deviceId;
      option.innerText = camera.label;

      if (currentCamera.label === camera.label) {
        option.selected = true;
      }

      camerasSelect.appendChild(option);
    });
  } catch (error) {
    console.log(error);
  }
};

// 비동기로 미디어 데이터를 가져오는 함수
const getMedia = async (deviceId) => {
  const initialConstraints = {
    audio: true,
    video: { facingMode: 'user' },
  };

  const cameraConstraints = {
    audio: true,
    video: { deviceId: { exact: deviceId } },
  };

  try {
    // 미디어 데이터를 가져온다.
    mediaStream = await navigator.mediaDevices.getUserMedia(
      deviceId ? cameraConstraints : initialConstraints
    );

    // 비디오 태그에 미디어 데이터를 넣는다.
    // srcObject란 비디오 태그에 미디어 데이터를 넣는 속성
    video.srcObject = mediaStream;

    if (!deviceId) {
      await getCameras();
    }
  } catch (error) {}
};

// 카메라 변경 이벤트
const handleCameraChange = async () => {
  await getMedia(camerasSelect.value);
};

// 음소거 버튼 클릭 이벤트
const handleMuteButton = () => {
  mediaStream.getAudioTracks().forEach((track) => {
    track.enabled = !track.enabled;
  });

  if (!isMuted) {
    muteButton.innerText = 'Unmute';
    isMuted = true;
  } else {
    muteButton.innerText = 'Mute';
    isMuted = false;
  }
};

// 카메라 끄기 버튼 클릭 이벤트
const handleCameraButton = () => {
  mediaStream.getVideoTracks().forEach((track) => {
    track.enabled = !track.enabled;
    console.log(track);
  });

  if (!isCameraOff) {
    cameraButton.innerText = 'Turn off Camera';
    isCameraOff = true;
  } else {
    cameraButton.innerText = 'Turn on Camera';
    isCameraOff = false;
  }
};

muteButton.addEventListener('click', handleMuteButton);
cameraButton.addEventListener('click', handleCameraButton);
camerasSelect.addEventListener('input', handleCameraChange);

// FUNCTION : 채팅방 입장 기능 구현
const welcome = document.getElementById('welcome');
const welcomeForm = welcome.querySelector('form');

// SOCKET Call 송신
socket.on('welcome', async () => {
  console.log('someone joined');

  // 방을 생성한 주체가 offer를 생성
  const offer = await myPeerConnection.createOffer();
  myPeerConnection.setLocalDescription(offer);

  socket.emit('offer', offer, roomName);
  console.log('sent the offer');
});

// SOCKET Answer 수신
socket.on('offer', async (offer) => {
  // 방에 참여한 주체가 offer를 받아서 answer를 생성
  console.log('received the offer');

  myPeerConnection.setRemoteDescription(offer);
  const answer = await myPeerConnection.createAnswer();

  myPeerConnection.setLocalDescription(answer);
  socket.emit('answer', answer, roomName);

  console.log('sent the answer');
});

socket.on('answer', (answer) => {
  // 송신 측에서 answer를 받아서 setRemoteDescription
  console.log('received the answer');
  myPeerConnection.setRemoteDescription(answer);
});

socket.on('ice', (ice) => {
  // 송신 측에서 ice를 받아서 addIceCandidate
  console.log('received candidate');
  myPeerConnection.addIceCandidate(ice);
});

// RTC Peer Connection
const handleIce = (data) => {
  console.log('sent candidate');
  socket.emit('ice', data.candidate, roomName);
};

const handleAddStream = (data) => {
  const peerVideo = document.getElementById('peerVideo');

  console.log('got an stream from my peer');
  peerVideo.srcObject = data.stream;
};

const makeConnection = () => {
  myPeerConnection = new RTCPeerConnection();

  // ICE Candidate (Internet Connectivity Establishment), 인터넷 연결 생성은 webRTC에 필요한 프로토콜을 의미하는데 멀리 떨어진 장치와 소통할 수 있게 하기 위함
  myPeerConnection.addEventListener('icecandidate', handleIce);
  myPeerConnection.addEventListener('addstream', handleAddStream);

  // addTrack의 역할 : 트랙을 Peer Connection에 추가
  // 첫번째 인자 : 추가할 트랙
  // 두번째 인자 : 트랙이 속한 스트림
  mediaStream.getTracks().forEach((track) => {
    myPeerConnection.addTrack(track, mediaStream);
  });
};

const initCall = async () => {
  welcome.hidden = true;
  call.hidden = false;

  await getMedia();
  makeConnection();
};

const handleWelcomeSubmit = async (event) => {
  event.preventDefault();

  const input = welcomeForm.querySelector('input');

  // socket.emit의 각 인자의 의미
  // 첫번째 인자: 이벤트 이름
  // 두번째 인자: 서버로 보낼 데이터
  // 세번째 인자: 서버로 보낼 콜백 함수
  await initCall();
  socket.emit('join_room', input.value);
  roomName = input.value;
  input.value = '';
};

welcomeForm.addEventListener('submit', handleWelcomeSubmit);
