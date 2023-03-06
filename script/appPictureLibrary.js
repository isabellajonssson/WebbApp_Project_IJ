//Just to ensure we force js into strict mode in HTML scrips - we don't want any sloppy code
'use strict';  // Try without strict mode

import { picturesTemplate } from '../model/picture-album-templates.js';
//import * as proto from './picture-album-prototypes.js';
//import * as lib from  '../model/picture-library-browser.js';
import {pictureLibraryBrowser} from '../model/picture-library-browser.js';


//import {pictureLibraryBrowser} from '../model/picture-library-browser.js';

const libraryJSON = "picture-library.json";
let library;  //Global varibale, Loaded async from the current server in window.load event


//use the DOMContentLoaded, or window load event to read the library async and render the images
window.addEventListener('DOMContentLoaded', async () => {

   //library = await lib.pictureLibraryBrowser.fetchJSON(libraryJSON);  //reading library from JSON on local server 
  //library = lib.pictureLibraryBrowser.createFromTemplate();  //generating a library template instead of reading JSON
  library = await pictureLibraryBrowser.fetch();
  // Shows only pictures in heigh resolution
  for (const album of library.albums) {
    for (const picture of album.pictures) {
      renderImage(`${album.path}/${picture.imgHiRes}`, picture.id, picture.title, picture.comment);
      renderImage(`${album.path}/${picture.imgLoRes}`, picture.id, picture.title, picture.comment);
  

    }
  }
})
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
  title.contentEditable = true;
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
 
 
 let clickedTitle, clickedComment;
 
 
 // Add event listener to the img, displays title and comment
 img.addEventListener('click', function() {
    modal.style.display = "block";
    modalImg.src = this.src;
    imgTitle.innerHTML = Title;
    imgComment.innerHTML = Comment;
    clickedTitle = title;
    clickedComment = comment;
    console.log("img ael used now");
 })
 
 
 // Create button for edit title and comment
 const btndiv = document.createElement('div');
 btndiv.className = "btndiv";
 
 
 const editBtn = document.createElement('button');
 editBtn.className = "editBtn"
 editBtn.id = tag;
 editBtn.innerHTML = "Edit";
 btndiv.appendChild(editBtn);
 
 
 // Edit title and comment
 const newTitle = document.getElementById("newTitle");
 const newComment = document.getElementById("newComment");
 const modalContent = document.getElementById("modal-content")
 
 
 editBtn.addEventListener('click', () => {
  modal.style.display = "block";
  newTitle.value = Title;
  newComment.value = Comment;
 })
 
 
  submitBtn.addEventListener('click', () => {
    clickedTitle.innerHTML= newTitle.value;
    clickedComment.innerHTML= newComment.value;
    title.innerHTML = newTitle.value;
    Title = newTitle.value;
    comment.innerHTML = newComment.value;
    Comment = newComment.value;
    pictureLibraryBrowser.save(library)
  })
 
  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
 }}
 