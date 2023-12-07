document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    const thumbnailsContainer = document.querySelector('.thumbnail-container');
    const mainImage = document.getElementById('main-image');
    const zoomSlider = document.getElementById('zoom-slider');

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const formData = new FormData(form);

        fetch('/upload', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            thumbnailsContainer.innerHTML = ''; // Clear existing thumbnails
            data.forEach(item => {
                const img = document.createElement('img');
                img.src = `data:image/png;base64,${item.thumbnail}`;
                img.classList.add('thumbnail');
                img.onclick = () => mainImage.src = `data:image/png;base64,${item.image}`;
                thumbnailsContainer.appendChild(img);
            });
        })
        .catch(error => console.error('Error:', error));
    });

    // Handle zoom slider
    zoomSlider.addEventListener('input', function () {
        mainImage.style.transform = `scale(${this.value})`;
    });
});

async function process_roi() {
    let image = await IJS.Image.load(document.getElementById('color').src);
    
    let gaussian=image.grey().gaussianFilter({radius:4});
    document.getElementById('gaussian').src = gaussian.toDataURL();
    
    let mask=gaussian.mask({threshold: 0.55});
    document.getElementById('mask').src = mask.toDataURL();
    
    let roiManager = image.getRoiManager();
    roiManager.fromMask(mask);

    let painted = roiManager.paint({
        distinctColor: true,
        positive: false,
        alpha: 127,
        labelProperty: 'surface',
        labelColor: 'white',
        
    });
    document.getElementById('painted').src = painted.toDataURL();
    
    let rois=roiManager.getRois({positive:false, minSurface:10})
    console.log(rois[0]);
    // we can create a table containing information about the ROIs
    let result=`
        <table>
            <tr>
                <th>ID</th>
                <th>Position</td>
                <th>Surface</th>
            </tr>
            ${rois.map( (roi) => `
                <tr>
                    <td>${roi.id}</td>
                    <td>${Math.round(roi.meanX)+" - "+Math.round(roi.meanY)}</td>
                    <td>${roi.surface}</td>
                </tr>
            `).join('')}
        </table>
    `;
    document.getElementById('result').innerHTML=result;

    
    
}