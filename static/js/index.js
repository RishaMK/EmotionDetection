const video = document.getElementById('video');

// const emotionsdict = {
//   "angry":"https://www.imdb.com/title/tt1985949/",
//   "disgusted":"https://www.imdb.com/title/tt0114369/",
//   "fearful":"https://www.imdb.com/title/tt1457767/",
//   "happy":"https://www.imdb.com/title/tt0114369/",
//   "neutral":"https://www.imdb.com/title/tt11464826/",
//   "sad":"https://www.imdb.com/title/tt2380307/",
//   "surprised":"https://www.imdb.com/title/tt0167404/"
//   }

  emotionsdict = {
    "neutral": [
       "https://www.imdb.com/title/tt0109830/",
       "https://www.imdb.com/title/tt0359950/",
       "https://www.imdb.com/title/tt0338013/",
       "https://www.imdb.com/title/tt0335266/",
       "https://www.imdb.com/title/tt0120382/",
       "https://www.imdb.com/title/tt1605783/",
       "https://www.imdb.com/title/tt0449059/",
       "https://www.imdb.com/title/tt1045658/",
       "https://www.imdb.com/title/tt1675434/",
       "https://www.imdb.com/title/tt2883512/",
       "https://www.imdb.com/title/tt2194499/"
    ],
    "fearful": [
       "https://www.imdb.com/title/tt0114709/",
       "https://www.imdb.com/title/tt0266543/",
       "https://www.imdb.com/title/tt0114709/",
       "https://www.imdb.com/title/tt0245429/",
       "https://www.imdb.com/title/tt0892769/",
       "https://www.imdb.com/title/tt0382932/",
       "https://www.imdb.com/title/tt0780521/",
       "https://www.imdb.com/title/tt1109624/",
       "https://www.imdb.com/title/tt2096673/",
       "https://www.imdb.com/title/tt1049413/",
       "https://www.imdb.com/title/tt0317705/"
    ],
    "disgust": [
       "https://www.imdb.com/title/tt0454921/",
       "https://www.imdb.com/title/tt0119217/",
       "https://www.imdb.com/title/tt0109830/",
       "https://www.imdb.com/title/tt1454029/",
       "https://www.imdb.com/title/tt2584384/",
       "https://www.imdb.com/title/tt2245084/",
       "https://www.imdb.com/title/tt2543472/",
       "https://www.imdb.com/title/tt0878804/",
       "https://www.imdb.com/title/tt3224458/",
       "https://www.imdb.com/title/tt0059742/",
       "https://www.imdb.com/title/tt1504320/"
    ],
    "happy": [
       "https://www.imdb.com/title/tt2278388/",
      "https://www.imdb.com/title/tt0211915/",
      "https://www.imdb.com/title/tt3783958/",
      "https://www.imdb.com/title/tt0045152/",
      "https://www.imdb.com/title/tt4468740/",
      "https://www.imdb.com/title/tt3521164/",
      "https://www.imdb.com/title/tt3104988/",
      "https://www.imdb.com/title/tt1485796/",
      "https://www.imdb.com/title/tt0091042/",
      "https://www.imdb.com/title/tt3281548/",
      "https://www.imdb.com/title/tt0211915/"
    ],
    "sad": [
       "https://www.imdb.com/title/tt2096673/",
       "https://www.imdb.com/title/tt0110357/",
       "https://www.imdb.com/title/tt0120689/",
       "https://www.imdb.com/title/tt0268978/",
       "https://www.imdb.com/title/tt0119217/",
       "https://www.imdb.com/title/tt0388795/",
       "https://www.imdb.com/title/tt0332280/",
       "https://www.imdb.com/title/tt0783233/",
       "https://www.imdb.com/title/tt4034228/",
       "https://www.imdb.com/title/tt5726616/",
       "https://www.imdb.com/title/tt3170832/",
       "https://www.imdb.com/title/tt0338013/"
    ],
    "surprised": [
      "https://www.imdb.com/title/tt1375666/",
       "https://www.imdb.com/title/tt0482571/",
       "https://www.imdb.com/title/tt0133093/",
       "https://www.imdb.com/title/tt2543164/",
       "https://www.imdb.com/title/tt0167404/",
       "https://www.imdb.com/title/tt1130884/",
       "https://www.imdb.com/title/tt5052448/",
       "https://www.imdb.com/title/tt8946378/",
       "https://www.imdb.com/title/tt6857112/",
       "https://www.imdb.com/title/tt6751668/"
    ],
    "angry": [
      "https://www.imdb.com/title/tt1109624/",
      "https://www.imdb.com/title/tt0382932/",
      "https://www.imdb.com/title/tt0075148/",
      "https://www.imdb.com/title/tt0112573/",
      "https://www.imdb.com/title/tt0468569/",
      "https://www.imdb.com/title/tt0266697/"  ]
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

      function getRandomMovieLink(emotion) {
        let movies = emotionsdict[emotion];
        return movies[Math.floor(Math.random() * movies.length)];
      }

      if (maxEmotion) {
        let randomMovieLink = getRandomMovieLink(maxEmotion);
        window.location.href = randomMovieLink;
      }

    }

  }, 3000)
})

