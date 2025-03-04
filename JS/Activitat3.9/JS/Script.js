const inputURL = document.getElementById('url');
const imageContainer = document.getElementById('images');

function addImage(){
    let borderColor = 0;
    let newImageContainer = document.createElement('div');
    newImageContainer.className = 'imageContainer';
    let newImage = document.createElement('img');
    newImage.src = inputURL.value;
    newImageContainer.appendChild(newImage);
    let deleteButton = document.createElement('button');
    deleteButton.innerText = 'X';
    deleteButton.className = 'deleteButton';
    deleteButton.addEventListener('click', function(event){
        let button = event.target;
        let container = button.parentNode;
        container.remove();
    });
    let changeBorder = document.createElement('button');
    changeBorder.innerText = 'Change border';
    changeBorder.className = 'changeBorder';
    changeBorder.addEventListener('click', function(event){
        borderColor++;
        switch(borderColor){
            case 1:
                newImage.style.border = '1px solid red';
                break;
            case 2:
                newImage.style.border = '1px solid green';
                break;
            case 3:
                newImage.style.border = '1px solid blue';
                break;
            case 4:
                newImage.style.border = '1px solid yellow';
                break;
            case 5:
                newImage.style.border = '1px solid black';
                borderColor = 0;
                break;
        }
        if(borderColor == 6){
            borderColor = 0;
        }
    });
    newImageContainer.appendChild(deleteButton);
    newImageContainer.appendChild(changeBorder);
    imageContainer.appendChild(newImageContainer);
}

function deleteAllImages(){
    let allImages = document.getElementsByClassName('imageContainer');
    for(i = allImages.length-1; i>=0; i--){
        let image = allImages[i];
        image.remove();
    }
}