const model = new mi.ArbitraryStyleTransferNetwork();
const canvas = document.getElementById('finalMasterpiece');
const ctx = canvas.getContext('2d');
const contentImg = document.getElementById('myphoto');
var styleImg = document.getElementById('filter');
const loading = document.getElementById('loading');
const btnAct = document.getElementById('btnAction');
const btnDL = document.getElementById('btnDownload');
const artTitle = document.getElementById('artpiece-title');

if (getUrlVars().hasOwnProperty("filter")) {
  loadFilter();
}
start();

function start() {
  btnAct.hidden = true;
  btnDL.hidden = true;
  loading.hidden = true;
}

function loadFilter() {
    $("#artpiece-image").empty().append("<img src='"+getUrlVars()["filter"]+"' crossorigin='anonymous' id='filter' class='image' />");
    var title = getUrlVars()["title"];
    var artist = getUrlVars()["artist"];
    title = decodeURIComponent(title)+" by "+decodeURIComponent(artist);
    $("#artpiece-title").empty().append(title);
    
    styleImg = document.getElementById("filter");
    console.log(styleImg);
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
  console.log(contentImg.src);
  console.log(styleImg.src);
  // This does all the work!
  model.stylize(contentImg, styleImg).then((imageData) => {
    stopLoading();
    ctx.putImageData(imageData, 0, 0);
  });

  btnAct.hidden = false;
  btnDL.hidden = false;
}

function loadImage(event, imgElement) {
  const reader = new FileReader();
  reader.onload = (e) => {
    imgElement.src = e.target.result;
    //imgElement.src = imagezeroimgur;
    console.log(imgElement.src);
  };
  reader.readAsDataURL(event.target.files[0]);
}

function loadContent(event) {
  loadImage(event, contentImg);
}

function loadStyle(event) {
  loadImage(event, styleImg);
  console.log(styleImg);
}

function startLoading() {
  loading.hidden = false;
}

function stopLoading() {
  loading.hidden = true;
}

function chooseFilter(event) {
    styleImg.src = event.target.src;
    artTitle.innerHTML = event.target.alt;
}

function downloadArt() {
    let link = document.getElementById('masterpiece');
    link.setAttribute('download', 'masterpiece.png');
    link.setAttribute('href', canvas.toDataURL("image/png"));
    link.click();
}

function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }

    return vars;
}