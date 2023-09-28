'use strict';

import { picturesTemplate } from '../model/picture-album-templates.js';
import { pictureLibraryBrowser } from '../model/picture-library-browser.js';

const libraryJSON = "picture-library.json";
let library;
let currentImgId;

window.addEventListener('DOMContentLoaded', async () => {
  library = await pictureLibraryBrowser.fetch();
  let globalIndex = 0;
  for (const [albumIndex, album] of library.albums.entries()) {
      for (const [pictureIndex, picture] of album.pictures.entries()) {
        const uniqueId = `album-${albumIndex}-picture-${pictureIndex}`;
        picture.id = uniqueId;
        renderImage(`${album.path}/${picture.imgHiRes}`, picture.id, picture.title, picture.comment);
      }
    }
  });


function setLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

function addEditListeners(imgId, element) {
  element.addEventListener('input', function () {
    setLocalStorage(element.className + '_' + imgId, this.innerHTML);
  });
}

function renderImage(src, tag, Title, Comment) {
  const div = document.createElement('div');
  div.className = `FlexItem`;
  div.dataset.albumId = tag;

  const img = document.createElement('img');
  img.src = src;
  div.appendChild(img);

  const title = document.createElement('h2');
  title.className = 'title';
  title.innerHTML = Title || getLocalStorage('title_' + tag) || 'Default Title';
  title.contentEditable = true;
  div.appendChild(title);

  const comment = document.createElement('p');
  comment.className = 'comment';
  comment.innerHTML = Comment || getLocalStorage('comment_' + tag) || 'Default Comment';
  div.appendChild(comment);

  const imgFlex = document.querySelector('.FlexWrap');
  imgFlex.appendChild(div);

  const submitBtn = document.getElementById('submitBtn');

  addEditListeners(tag, title);
  addEditListeners(tag, comment);

  const modal = document.getElementById("modal-wrapper");
  const span = document.getElementsByClassName("close")[0];
  const modalImg = document.getElementById("modalImg");
  const imgTitle = document.getElementById("imgTitle");
  const imgComment = document.getElementById("imgComment");

  let clickedTitle, clickedComment;

  img.addEventListener('click', function () {
    modal.style.display = "block";
    modalImg.src = this.src;
    imgTitle.innerHTML = title.innerHTML;
    imgComment.innerHTML =  comment.innerHTML;
    currentImgId = tag;
  });

  submitBtn.addEventListener('click', () => {

   const clickedTitle = document.querySelector(`[data-album-id="${currentImgId}"] .title`);
   const clickedComment = document.querySelector(`[data-album-id="${currentImgId}"] .comment`);

    console.log(clickedTitle, clickedComment);

      clickedTitle.innerHTML = imgTitle.innerText;
      clickedComment.innerHTML = imgComment.innerText;

      setLocalStorage('title_' + currentImgId, imgTitle.innerText);
      setLocalStorage('comment_' + currentImgId, imgComment.innerText);
      updateLibrary(currentImgId, imgTitle.innerText, imgComment.innerText);
      pictureLibraryBrowser.save(library);

      modal.style.display = "none";
  });

  span.onclick = function () {
    modal.style.display = "none";
  };

  function updateLibrary(id, newTitle, newComment) {
    for (const album of library.albums) {
      for (const picture of album.pictures) {
        if (picture.id === id) {
          picture.title = newTitle;
          picture.comment = newComment;
          return;
        }
      }
    }
  }

}
