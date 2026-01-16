// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

// Import storage functions
import { getUserIds, getData, setData } from "./storage.js";
import { sortBookmarksByDate } from "./utils.js";

// DOM elements (MATCH HTML IDS)
const userSelect = document.getElementById("user");
const bookmarkList = document.getElementById("book-mark");
const form = document.getElementById("bookmark-form");
const urlInput = document.getElementById("url");
const titleInput = document.getElementById("title");
const descriptionInput = document.getElementById("description");

let currentUser = null;

// Populate user dropdown
function populateUserDropdown() {
  getUserIds().forEach((id) => {
    const option = document.createElement("option");
    option.value = id;
    option.textContent = `User ${id}`;
    userSelect.appendChild(option);
  });
}

// Display bookmarks for selected user
function showBookmarks(userId) {
  const data = getData(userId) || [];
  bookmarkList.innerHTML = "";

  if (data.length === 0) {
    bookmarkList.innerHTML = "<li>No bookmarks yet</li>";
    return;
  }

  const sorted = sortBookmarksByDate(data);

  sorted.forEach((bookmark) => {
    const li = document.createElement("li");

    const link = document.createElement("a");
    link.href = bookmark.url;
    link.textContent = bookmark.title;
    link.target = "_blank";

    const desc = document.createElement("p");
    desc.textContent = bookmark.description;

    const date = document.createElement("small");
    date.textContent = new Date(bookmark.createdAt).toLocaleString();

    li.append(link, desc, date);
    bookmarkList.appendChild(li);
  });
}

// Handle user selection (ALLOW going back to "Select a user")
userSelect.addEventListener("change", () => {
  const selectedUser = userSelect.value;

  if (selectedUser === "") {
    currentUser = null;
    bookmarkList.innerHTML = "";
    return;
  }

  currentUser = selectedUser;
  showBookmarks(currentUser);
});

// Handle form submit
form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!currentUser) {
    alert("Please select a user first");
    return;
  }

  const newBookmark = {
    url: urlInput.value,
    title: titleInput.value,
    description: descriptionInput.value,
    createdAt: new Date().toISOString(),
  };

  const existing = getData(currentUser) || [];
  existing.push(newBookmark);
  setData(currentUser, existing);

  form.reset();
  showBookmarks(currentUser);
});

// Init
populateUserDropdown();