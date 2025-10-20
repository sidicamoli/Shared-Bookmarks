// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

// Import storage functions
import { getUserIds, getData, setData } from './storage.js';

// Get DOM elements
const userSelect = document.getElementById('user-select');
const bookmarkList = document.getElementById('bookmark-list');
const form = document.getElementById('bookmark-form');
const urlInput = document.getElementById('url');
const titleInput = document.getElementById('title');
const descriptionInput = document.getElementById('description');

let currentUser = null;

// Populate dropdown with users
function populateUserDropdown() {
  const users = getUserIds();
  users.forEach((id) => {
    const option = document.createElement('option');
    option.value = id;
    option.textContent = `User ${id}`;
    userSelect.appendChild(option);
  });
}

// Sort and render bookmarks (exported for testing)
export function showBookmarks(userId) {
  const bookmarks = getData(userId) || []; // FIX: Handle null data
  bookmarkList.innerHTML = '';

  if (bookmarks.length === 0) {
    // IMPROVED: Better empty state message
    bookmarkList.innerHTML = '<p><strong>No bookmarks yet.</strong> Add your first bookmark using the form below!</p>';
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
      link.rel = 'noopener noreferrer'; // ADDED: Security improvement

      // IMPROVED: Better date formatting
      const time = document.createElement('small');
      const date = new Date(bookmark.createdAt);
      time.textContent = ` (${date.toLocaleDateString()} at ${date.toLocaleTimeString()})`;

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
  
  // IMPROVED: Check if user is selected
  if (!currentUser) {
    alert('Please select a user first');
    return;
  }

  // IMPROVED: Disable button during submission
  const submitBtn = form.querySelector('button[type="submit"]');
  submitBtn.disabled = true;

  const newBookmark = {
    url: urlInput.value,
    title: titleInput.value,
    description: descriptionInput.value,
    createdAt: new Date().toISOString(),
  };

  const existing = getData(currentUser) || []; // FIX: Handle null data
  existing.push(newBookmark);
  setData(currentUser, existing);

  form.reset();
  showBookmarks(currentUser);
  
  // Re-enable button
  submitBtn.disabled = false;
}

// Handle user selection
userSelect.addEventListener('change', () => {
  currentUser = userSelect.value;
  showBookmarks(currentUser);
});

// Listen for form submission
form.addEventListener('submit', handleFormSubmit);

// Initialize the app
populateUserDropdown();

// NEW: Auto-select first user on page load
if (userSelect.options.length > 1) {
  userSelect.selectedIndex = 1; // Select first user (skip the disabled option)
  currentUser = userSelect.value;
  showBookmarks(currentUser);
}