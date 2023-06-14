const socket = io();

const video = document.getElementById('video');
const muteButton = document.getElementById('mute');
const cameraButton = document.getElementById('camera');

// 스트림은 비디오와 오디오를 포함하는 미디어 데이터
let mediaStream;
let isMuted = false;
let isCameraOff = false;

// 비동기로 미디어 데이터를 가져오는 함수
const getMedia = async () => {
  try {
    // 미디어 데이터를 가져온다.
    mediaStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });

    console.log(mediaStream);

    // 비디오 태그에 미디어 데이터를 넣는다.
    // srcObject란 비디오 태그에 미디어 데이터를 넣는 속성
    video.srcObject = mediaStream;

    // 비디오를 재생한다.
    video.play();
  } catch (error) {}
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

getMedia();
