import db from './js/db.js';
import utils from './js/utils.js';

const bookmarkListEl = document.getElementById('bookmark-list');
let iconMap = {};

const bookmarkClickCallback = function(event){
  chrome.runtime.sendMessage(chrome.runtime.id, {type: 'openBookmark', data: event.currentTarget.dataset.url })
};

function createBookmarkElement(bookmark) {
  const template = document.createElement('template');
  template.innerHTML = `<div class="bookmark-item" data-url="${bookmark.url}">
<img class="favicon">
<span class="title">${bookmark.title}</span>
</div>`
  const iconSrc = iconMap[new URL(bookmark.url).hostname];
  if (iconSrc) {
    template.content.querySelector('.favicon').src = iconSrc;
  }
  template.content.firstChild.addEventListener('click', bookmarkClickCallback );
  return template.content.firstChild;
}

function filterBookmark(bookmark, filter) {
  if (! filter) return true;
  return bookmark.title.toLowerCase().indexOf(filter) !== -1;
}

function initBookmarkList(bookmarkList, filter) {
  let fragment = document.createDocumentFragment();

  bookmarkList.forEach((bookmark)=>{
    if (filterBookmark(bookmark, filter)) {
      fragment.appendChild(createBookmarkElement(bookmark));
    }
  })  
  while (bookmarkListEl.firstChild) {
    bookmarkListEl.firstChild.remove();
  }
  bookmarkListEl.appendChild(fragment);
}

db.loadAllBookmark().then((bookmarks)=>{
  initBookmarkList(bookmarks);
  db.loadAllIcons(bookmarks).then((result)=>{
    console.log('pop-loadAllIcon:', result);
    iconMap = result;
    initBookmarkList(bookmarks);
  });
  document.querySelector('#search-input').addEventListener('input', utils.debounce(function(event){
    db.loadAllBookmark().then((bookmarks)=>{
      initBookmarkList(bookmarks, event.srcElement.value);
    });
  }, 50));
}) 

document.getElementById('btn-add').addEventListener('click', (event)=>{
  chrome.runtime.sendMessage(chrome.runtime.id, {type: 'saveBookmark'}, {}, function(resp) {
    console.log('pop-msg-callback:', resp);
    if (resp && resp.data) {
      switch (resp.data.type) {
        case 'create':
          bookmarkListEl.prepend(createBookmarkElement(resp.data.data));
          break;
        case 'update':
          bookmarkListEl.insertBefore(bookmarkListEl.querySelector(`[data-url="${resp.data.data.url}"]`) , bookmarkListEl.firstChild);
          break;
      }
    }
  });
})