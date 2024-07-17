const video = document.getElementById('video');

const emotionsdict = {
  "angry":"https://www.imdb.com/title/tt1985949/",
  "disgusted":"https://www.imdb.com/title/tt0114369/",
  "fearful":"https://www.imdb.com/title/tt1457767/",
  "happy":"https://www.imdb.com/title/tt0114369/",
  "neutral":"https://www.imdb.com/title/tt11464826/",
  "sad":"https://www.imdb.com/title/tt2380307/",
  "surprised":"https://www.imdb.com/title/tt0167404/"
  }

var socket = io.connect('http://127.0.0.1:5000');
socket.on( 'connect', function() {
  // console.log("SOCKET CONNECTED")
})

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
Promise.all([
  faceapi.loadFaceLandmarkModel("http://127.0.0.1:5000/static/models/"),
  faceapi.loadFaceRecognitionModel("http://127.0.0.1:5000/static/models/"),
  faceapi.loadTinyFaceDetectorModel("http://127.0.0.1:5000/static/models/"),
  faceapi.loadFaceLandmarkModel("http://127.0.0.1:5000/static/models/"),
  faceapi.loadFaceLandmarkTinyModel("http://127.0.0.1:5000/static/models/"),
  faceapi.loadFaceRecognitionModel("http://127.0.0.1:5000/static/models/"),
  faceapi.loadFaceExpressionModel("http://127.0.0.1:5000/static/models/"),
])
  .then(startVideo)
  .catch(err => console.error(err));

function startVideo() {
  // console.log("access");
  navigator.getUserMedia(
    {
      video: {}
    },
    stream => video.srcObject = stream,
    err => console.error(err)
  )
}

video.addEventListener('play', () => {
  // console.log('thiru');

  const canvas = faceapi.createCanvasFromMedia(video);
  document.body.append(canvas);
  const displaySize = { width: video.width, height: video.height };
  faceapi.matchDimensions(canvas, displaySize);


  setInterval(async () => {
    const detections = await faceapi
      .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceExpressions();
    // console.log(detections)
    socket.emit( 'my event', {
      data: detections
    })
    


    const resizedDetections = faceapi.resizeResults(detections, displaySize);
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    faceapi.draw.drawDetections(canvas, resizedDetections);
    faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
    faceapi.draw.drawFaceExpressions(canvas, resizedDetections);

    const emotions = detections[0].expressions; 
    // console.log(detections);

    if (detections.length > 0) {
      const emotions = detections[0].expressions;
      // console.log("Emotions:", emotions);

      let maxEmotion = "";
      let maxConfidence = -Infinity;

      // Iterate through emotions object keys
      Object.keys(emotions).forEach(emotion => {
        if (emotions[emotion] > maxConfidence) {
          maxConfidence = emotions[emotion];
          maxEmotion = emotion;
        }
      });

      // Log the emotion with the highest confidence
      // console.log(`Highest Emotion: ${maxEmotion} (${maxConfidence})`);

      if(maxEmotion  === "happy"){
        window.location.href = emotionsdict["happy"];
      }
      else if(maxEmotion  === "fearful"){
        window.location.href = emotionsdict["fearful"];
      }
      else if(maxEmotion  === "disgusted"){
        window.location.href = emotionsdict["disgusted"];
      }
      else if(maxEmotion  === "angry"){
        window.location.href = emotionsdict["angry"];
      }
      else if(maxEmotion  === "neutral"){
        window.location.href = emotionsdict["neutral"];
      }
      else if(maxEmotion  === "surprised"){
        window.location.href = emotionsdict["surprised"];
      }
      else if(maxEmotion  === "sad"){
        window.location.href = emotionsdict["sad"];
      }


    }

  }, 3000)
})

