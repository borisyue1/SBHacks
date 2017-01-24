
// Get all variables
var bannerImage = document.getElementById('bannerImg');
var img = document.getElementById('tableBanner');
//optimizaing spin loading icon
var opts = {
    length: 4,
    radius: 4,
    lines: 10,
    width: 2,
    position: 'relative',
    color: '#ffe69e'
};
var spinner = new Spinner(opts).spin()

$('#loading').hide();
$('h1').hide();

if(bannerImage) {
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
}

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
if(img) {
    fetchimage();
}


function imageToText() {
    document.getElementById('spin-icon').appendChild(spinner.el)//loading spinner
    $('#loading').show();
    //ocr
    Tesseract.recognize(localStorage.getItem('imgData'))
        .then(function(result){
            // var googleUrl = "https://www.googleapis.com/customsearch/v1?key=AIzaSyBrqwW2p8gI9QOmGCaOEOe680WP81_yRtU&cx=013715220301686714570:ci6pjtmohjy&q=" 
            //     + result.text + "&callback=hndlr";
            // var s = document.createElement("script");
            // s.src = googleUrl;
            // document.body.appendChild(s);
            bingSearch(result.text)
    });
}
function bingSearch(text) {
    var params = {
        // Request parameters
        "q": text.substring(0, 1300),
        "count": "7",
        "offset": "0",
        "mkt": "en-us",
    };
    $.ajax({
        url: "https://api.cognitive.microsoft.com/bing/v5.0/search?" + $.param(params),
        beforeSend: function(xhrObj){
            // Request headers
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","ec0442b726ad46a09481e2668a54c647");
        },
        type: "GET",
        // Request body
    })
    .done(function(data) {
        console.log(data);
        $('#loading').hide();//hiding load caption
        document.getElementById('spin-icon').removeChild(spinner.el);//remove spinner
        bingCallback(data);
        animateCourseList();
    })
    .fail(function(e) {
        $('#loading').hide();
        document.getElementById('spin-icon').removeChild(spinner.el);//remove spinner
        alert("error");
        console.log(e);
    });
}

function bingCallback(response) {
    document.getElementById("searches").innerHTML = "";
    for (var i = 0; i < response.webPages.value.length; i++) {
        var item = response.webPages.value[i];
        item.snippet = item.snippet.substring(0, 160) + "...";
        //html to contain searches
        document.getElementById("searches").innerHTML += "<li class='search-row'> <div class='search-title'><a href=" + item.url + " target=_blank>" + item.name + "</a></div> <div class='search-caption'><div class='search-url'>" + item.displayUrl + "</div><p>" + item.snippet + "<a href='#' class='star'><span class='glyphicon glyphicon-star'></span></a></p></div></li>";
    }
    $('.star').click(function(){
        // Get the modal
        var modal = document.getElementById('save-form');
        modal.style.display='block';
        modal.style.width='auto';
        var p = $(this).parent().parent().parent();
        var url = p[0].children[0].children[0].href;
        document.getElementById('link-field').value = url;//getting link
        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    }); 
}




function animateCourseList(){
    var track = 0;
    $('h1').addClass('list-fade-in');
    $('h1').show();
    $('ol li').each(function(i){
        var $t = $(this);
        setTimeout(function(){
            $t.addClass('list-fade-in');
            $t.append("<hr>");
        }, (i+1) * 150);
    });
}


