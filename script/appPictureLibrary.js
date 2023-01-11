//Just to ensure we force js into strict mode in HTML scrips - we don't want any sloppy code
'use strict';  // Try without strict mode

import { picturesTemplate } from '../model/picture-album-templates.js';
//import * as proto from './picture-album-prototypes.js';
import * as lib from  '../model/picture-library-browser.js';


const libraryJSON = "picture-library.json";
let library;  //Global varibale, Loaded async from the current server in window.load event


//use the DOMContentLoaded, or window load event to read the library async and render the images
window.addEventListener('DOMContentLoaded', async () => {

   library = await lib.pictureLibraryBrowser.fetchJSON(libraryJSON);  //reading library from JSON on local server 
  //library = lib.pictureLibraryBrowser.createFromTemplate();  //generating a library template instead of reading JSON

  // Shows only pictures in heigh resolution
  for (const album of library.albums) {
    for (const picture of album.pictures) {
      renderImage(`${album.path}/${picture.imgHiRes}`, picture.id, picture.title, picture.comment);
      renderImage(`${album.path}/${picture.imgLoRes}`, picture.id, picture.title, picture.comment);
  

    }
  }
})

window.addEventListener('click', () => {

  //just to confirm that the library is accessible as a global variable read async
  console.log(`library has ${library.albums.length} albums`);
});

//Render the images
function renderImage(src, tag, Title, Comment) {


    const div = document.createElement('div');
    div.className = `FlexItem`;
    div.dataset.albumId = tag;
  
    const img = document.createElement('img');
    img.src = src;
    div.appendChild(img);

    const title = document.createElement('h2');
    title.className = 'title';
    title.innerHTML = Title;
    div.appendChild(title);

    const comment = document.createElement('p');
    comment.className = 'comment';
    comment.innerHTML = Comment;
    div.appendChild(comment)

    const imgFlex = document.querySelector('.FlexWrap');
    imgFlex.appendChild(div);

  // Get the modal
  const modal = document.getElementById("modal-wrapper");
  // Get the <span> element that closes the modal
  const span = document.getElementsByClassName("close")[0];
  // Get the image and insert it inside the modal 
  const modalImg = document.getElementById("modalImg");
   // Get the Title
   const imgTitle = document.getElementById("imgTitle");
   // Get the Comment
   const imgComment = document.getElementById("imgComment");


  // Add event listener to the img, displays title and comment
  img.addEventListener('click', function() {
      modal.style.display = "block";
      modalImg.src = this.src;
      imgTitle.innerHTML = Title;
      imgComment.innerHTML = Comment;
  


    // Submit changes to title
    let newTitle = document.getElementById("imgTitle");
    
    window.onclick = function(event) {
      if (event.target == modalImg) {
        title.innerHTML = newTitle.value;
        Title = newTitle.value;
        lib.pictureLibraryBrowser.window.localStorage.setItem('Title', JSON.stringify(title).fetchJSON);
        console.log(localStorage.getItem);
     
       }
      }
    });


  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
      modal.style.display = "none";
  }
} 