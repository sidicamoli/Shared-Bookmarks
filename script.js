// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { getUserIds, getData, setData } from './storage.js';

const userSelect = document.getElementById('user-select');
const bookmarkList = document.getElementById('bookmark-list');
const form = document.getElementById('bookmark-form');
const urlInput = document.getElementById('url');
const titleInput = document.getElementById('title');
const descriptionInput = document.getElementById('description');

let currentUser = null;

// Populate dropdown
function populateUserDropdown() {
  const users = getUserIds();
  users.forEach((id) => {
    const option = document.createElement('option');
    option.value = id;
    option.textContent = `User ${id}`;
    userSelect.appendChild(option);
  });
}

// Sort and render bookmarks
export function showBookmarks(userId) {
  const bookmarks = getData(userId);
  bookmarkList.innerHTML = '';

  if (bookmarks.length === 0) {
    bookmarkList.textContent = 'No bookmarks found.';
    return;
  }

  const list = document.createElement('ul');

  bookmarks
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .forEach((bookmark) => {
      const li = document.createElement('li');

      const link = document.createElement('a');
      link.href = bookmark.url;
      link.textContent = bookmark.title;
      link.target = '_blank';

      const time = document.createElement('small');
      time.textContent = ` (${new Date(bookmark.createdAt).toLocaleString()})`;

      const desc = document.createElement('p');
      desc.textContent = bookmark.description;

      li.append(link, time, desc);
      list.appendChild(li);
    });

  bookmarkList.appendChild(list);
}

// Handle form submission
function handleFormSubmit(event) {
  event.preventDefault();
  if (!currentUser) return;

  const newBookmark = {
    url: urlInput.value,
    title: titleInput.value,
    description: descriptionInput.value,
    createdAt: new Date().toISOString(),
  };

  const existing = getData(currentUser);
  existing.push(newBookmark);
  setData(currentUser, existing);

  form.reset();
  showBookmarks(currentUser);
}

// Handle user selection
userSelect.addEventListener('change', () => {
  currentUser = userSelect.value;
  showBookmarks(currentUser);
});

form.addEventListener('submit', handleFormSubmit);

populateUserDropdown();
