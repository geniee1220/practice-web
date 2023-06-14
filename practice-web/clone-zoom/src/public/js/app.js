const socket = io();

const video = document.getElementById('video');
const muteButton = document.getElementById('mute');
const cameraButton = document.getElementById('camera');
const camerasSelect = document.getElementById('cameras');

// 스트림은 비디오와 오디오를 포함하는 미디어 데이터
let mediaStream;
let isMuted = false;
let isCameraOff = false;

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

getMedia();
