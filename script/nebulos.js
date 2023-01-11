'use strict'

import * as lib from '../model/picture-library-browser.js';   

let picsFromNebulosAlbum = document.getElementById("pics-from-nebulos-album-div");

window.onload = function () {


    console.log("picsFromNebulosAlbum: " + picsFromNebulosAlbum);

    fetch("../app-data/library/picture-library.json")
        .then(function (resp) {
            return resp.json();
        })
        .then(function (data) {
            for (let i = 0; i < data.albums[1].pictures.length; i++) {
                picsFromNebulosAlbum.innerHTML += (`<img src="` + data.albums[1].path + `/` + data.albums[1].pictures[i].imgLoRes + `" id='imgId` + i + `' class='jsGeneratedAlbumImages'` + '>');
            }
        
        }
        )}

         /****************************   SLIDESHOW  ******************************/
         let index = 0;
         let interval;
         const copies = [];
 
         window.onload = function () {
             const picsFromNebulosAlbum = document.querySelector('#picsFromNebulosAlbum');
             
             fetch("../app-data/library/picture-library.json")
               .then((resp) => resp.json())
               .then((data) => {
                 for (let i = 0; i < data.albums[1].pictures.length; i++) {
                   const src = data.albums[1].path + '/' + data.albums[1].pictures[i].imgHiRes;
             
                   // Create image-element
                   const image = document.createElement('img');
                   image.src = src;
                   image.classList.add('jsGeneratedAlbumImages');
           
                 image.addEventListener('click', () => {
                  image.classList.toggle('selected');
               });
             
               // Insert the image in picsFromNebulosAlbum
               picsFromNebulosAlbum.appendChild(image);
             }
           });
           const startSlideshowButton = document.querySelector('#startSlideshow');
           
           startSlideshowButton.addEventListener('click', () => {
 
             // Get the pictures with selected-class 
             const selectedImages = document.querySelectorAll('.jsGeneratedAlbumImages.selected');
             
             console.log(selectedImages);
             
             const modalWrapper = document.querySelector('.modal-wrapper');
             const modalContent = document.querySelector('.modal-content');
             
             // Copy of the selected images
             selectedImages.forEach((image) => {
             const copy = image.cloneNode(true);
             copies.push(copy);
             }); 
 
             modalContent.innerHTML = '';
 
             copies.forEach((copy) => {
             modalContent.appendChild(copy);
             });
 
             interval = setInterval(() => {
 
               // Insert images in modal
               copies.forEach((copy) => {
                 modalContent.appendChild(copy);
                 modalWrapper.style.display = "block";
             });
 
             // Display the image that matches the index, hide the others
             copies.forEach((copy,i)=> {
                 if(i == index){
                     copy.style.display = 'block';
                 } else {
                     copy.style.display = 'none';
 
                 }
             });
                // Change image
                index++;
       
           // Restart sliedeshow when all image been shown
           if (index === copies.length) {
             index = 0;
           }
         }, 2500);

            // When window click, slideshow stops
        window.onclick = function(event) {
          if (event.target == modalWrapper) {
             modalWrapper.style.display = "none";
             clearInterval(interval);
       
           }
          }
       });
     };