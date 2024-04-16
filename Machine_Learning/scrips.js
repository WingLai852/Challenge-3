document.addEventListener('DOMContentLoaded', function () {
    const webcamElement = document.getElementById('webcam');
    const canvasElement = document.createElement('canvas');
    const webcam = new Webcam(webcamElement, 'user', canvasElement);
    const predictElement = document.getElementById('prediction');
    let net;

    //Start de webcam op
    webcam.start()
        .then(result => {
            console.log("Webcam gestart");
        })
        .catch(err => {
            console.log(err);
        });

        // Laad het model
    async function loadModel() {
        net = await ml5.imageClassifier('MobileNet');
        console.log("Model geladen");
    }

    // Wanneer de knop wordt ingedrukt, maak een foto en classificeer deze
    document.getElementById('capture').addEventListener('click', function () {
        const picture = webcam.snap();

        // Creëer een Image element
        const imageElement = new Image();
        imageElement.src = picture;
        imageElement.onload = () => {
            
            // Classificeer de afbeelding nadat deze geladen is
            net.classify(imageElement, function (error, results) {
                if (error) {
                    console.error(error);
                } else {
                    predictElement.innerText = `Voorspelling: ${results[0].label} met een zekerheid van ${Math.floor(results[0].confidence * 100)}%`;
                }
            });
        };
    });

    loadModel();
});

