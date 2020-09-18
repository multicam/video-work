import confetti from 'canvas-confetti';

const log = console.log

// Put variables in global scope to make them available to the browser console.
const video = window.video = document.querySelector('video');
const canvas = window.canvas = document.querySelector('canvas');

canvas.width = 480;
canvas.height = 360;

confetti.create(canvas, {
    resize: true,
    useWorker: true,
})({ particleCount: 200, spread: 200 });

const snapshotButton = document.querySelector('button#snapshot');
const filterSelect = document.querySelector('select#filter');

snapshotButton.onclick = function() {
    canvas.className = filterSelect.value;
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
};

filterSelect.onchange = function() {
    video.className = filterSelect.value;
};

const constraints = {
    audio: false,
    video: true
};

function handleSuccess(stream) {
    window.stream = stream; // make stream available to browser console
    video.srcObject = stream;
}

function handleError(error) {
    console.log('navigator.MediaDevices.getUserMedia error: ', error.message, error.name);
}

navigator.mediaDevices.getUserMedia(constraints).then(handleSuccess).catch(handleError);
