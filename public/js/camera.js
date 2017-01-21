// // Grab elements, create settings, etc.
// var video = document.getElementById('video');
// navigator.getUserMedia = navigator.webkitGetUserMedia || navigator.getUserMedia; 
// // Get access to the camera!
// if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
//     // Not adding `{ audio: true }` since we only want video now
//     navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
//         video.src = window.URL.createObjectURL(stream);
//         video.play();
//     });
// }

// // Elements for taking the snapshot
// var canvas = document.getElementById('canvas');
// var context = canvas.getContext('2d');
// var video = document.getElementById('video');
// var image = document.getElementById('mirror');

// // Trigger photo take
// document.getElementById("snap").addEventListener("click", function() {
//     context.drawImage(video, 0, 0, 640, 480);
//     var imageURL = canvas.toDataURL();//generating image url from the canvas
    // Tesseract.recognize(canvas)
    //     .then(function(result){
    //         console.log(result)
    //     });
//     // imageToText(imageURL);

// });

// //converting image to text
// function imageToText(url) {
//     var base64 = url.replace(/^data:image\/(png|jpg);base64,/, "");
//     var binaryUrl = binEncode(base64);
//     console.log(binaryUrl);
//     var params = {
//             // Request parameters
//             "language": "unk",
//             "detectOrientation ": "true",
//     };
      
//     $.ajax({
//         url: "https://westus.api.cognitive.microsoft.com/vision/v1.0/ocr?" + $.param(params),
//         beforeSend: function(xhrObj){
//             // Request headers
//             xhrObj.setRequestHeader("Content-Type","application/octet-stream");
//             xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","8e4e5171bf344c9db8eff364d3dc7b02");
//         },
//         type: "POST",
//         // Request body
//         data: binaryUrl,
//     })
//     .done(function(data) {
//         console.log(data);
//     })
//     .fail(function(data) {
//         console.log(data);
//     });
// }

// function binEncode(data) {
//     var binArray = []
//     var datEncode = "";

//     for (i=0; i < data.length; i++) {
//         binArray.push(data[i].charCodeAt(0).toString(2)); 
//     } 
//     for (j=0; j < binArray.length; j++) {
//         var pad = padding_left(binArray[j], '0', 8);
//         datEncode += pad + ' '; 
//     }
//     function padding_left(s, c, n) { if (! s || ! c || s.length >= n) {
//         return s;
//     }
//     var max = (n - s.length)/c.length;
//     for (var i = 0; i < max; i++) {
//         s = c + s; } return s;
//     }
//     console.log(binArray);
// }


// Get all variables
var bannerImage = document.getElementById('bannerImg');
var img = document.getElementById('tableBanner');

// Add a change listener to the file input to inspect the uploaded file.
bannerImage.addEventListener('change', function() {
    var file = this.files[0];
    // Create a file reader
    var fReader = new FileReader();

    // Add complete behavior
    fReader.onload = function() {
        // Show the uploaded image to banner.
        img.src = fReader.result;

        // Save it when data complete.
        // Use your function will ensure the format is png.
        localStorage.setItem("imgData", fReader.result);
        // You can just use as its already a string.
        // localStorage.setItem("imgData", fReader.result);
    };

    // Read the file to DataURL format.
    fReader.readAsDataURL(file);
});
//not using this right now
function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    var dataURL = canvas.toDataURL();

    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}

function fetchimage () {
    var dataImage = localStorage.getItem('imgData');
    img.src = dataImage;
    // If you don't process the url with getBase64Image, you can just use
    // img.src = dataImage;
}
// Call fetch to get image from localStorage.
// So each time you reload the page, the image in localstorage will be 
// put on tableBanner
fetchimage();

function imageToText(pic) {
    // image.src = file.src;
    Tesseract.recognize(localStorage.getItem('imgData'))
        .then(function(result){
            console.log(result)
    });
}

