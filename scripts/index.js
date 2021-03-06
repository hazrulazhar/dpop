const model = new mi.ArbitraryStyleTransferNetwork();
const canvas = document.getElementById('finalMasterpiece');
const ctx = canvas.getContext('2d');
const contentImg = document.getElementById('myphoto');
const styleImg = document.getElementById('filter');
const loading = document.getElementById('loading');
const btnDL = document.getElementById('btnDownload');

start();

function start() {
  btnDL.hidden = true;
  loading.hidden = true;
}

function paint() {
    model.initialize().then(() => {
        startLoading();
        stylize();
    });
}

async function clearCanvas() {
  // Don't block painting until we've reset the state.
  await mi.tf.nextFrame();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  await mi.tf.nextFrame();
}
  
async function stylize() {
  await clearCanvas();
  
  // Resize the canvas to be the same size as the source image.
  canvas.width = contentImg.width;
  canvas.height = contentImg.height;
  
  // This does all the work!
  model.stylize(contentImg, styleImg).then((imageData) => {
    stopLoading();
    ctx.putImageData(imageData, 0, 0);
  });

  btnDL.hidden = false;
}

function loadImage(event, imgElement) {
  const reader = new FileReader();
  var imagezeroimgur = "";

  var $files = $('#imagezero').get(0).files;

        // Begin file upload
        console.log('Uploading file to Imgur..');

        // Replace ctrlq with your own API key
        var apiUrl = 'https://api.imgur.com/3/image';
        var apiKey = '995953512ddf3bf';

        var settings = {
            async: false,
            crossDomain: true,
            processData: false,
            contentType: false,
            type: 'POST',
            url: apiUrl,
            headers: {
            Authorization: 'Client-ID ' + apiKey,
            Accept: 'application/json',
            },
            mimeType: 'multipart/form-data',
        };

        var formData = new FormData();
        formData.append('image', $files[0]);
        settings.data = formData;

        // Response contains stringified JSON
        // Image URL available at response.data.link
        $.ajax(settings).done(function (response) {
            console.log(response);
            r = JSON.parse(response);
            imagezeroimgur = r.data.link;
        });
    

  reader.onload = (e) => {
    //imgElement.src = e.target.result;
    imgElement.src = imagezeroimgur;
    console.log(imgElement.src);
  };
  reader.readAsDataURL(event.target.files[0]);
}

function loadContent(event) {
  loadImage(event, contentImg);
}

function loadStyle(event) {
  loadImage(event, styleImg);
}

function startLoading() {
  loading.hidden = false;
}

function stopLoading() {
  loading.hidden = true;
}

function chooseFilter(event) {
    styleImg.src = event.target.src;
}

function downloadArt() {
    let link = document.getElementById('masterpiece');
    link.setAttribute('download', 'masterpiece.png');
    link.setAttribute('href', canvas.toDataURL("image/png"));
    link.click();
}