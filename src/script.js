import {
  compressToEncodedURIComponent as compress,
  decompressFromEncodedURIComponent as decompress,
} from "lz-string";
import { AES, enc } from "crypto-js";

import { formatCreatedAt, setTitle, getWritingSuggestions } from "./utils";

let createdAt;
const $createdAt = document.querySelector("#created_at");
const $title = document.querySelector("#title");
const $note = document.querySelector("#editor");

const $passwordButton = document.querySelector("#password_button");

// Default password
let password = "password";
let hint = "";

const $suggestions = document.querySelector("#suggestions");

let prevNoteState;
const save = () => {
  const title = $title.innerText;
  const content = $note.innerText

  // Only save note if title is not empty
  if (title) {
    // Set createdAt if not set
    if (!createdAt) {
      createdAt = new Date();
      $createdAt.innerText = formatCreatedAt(createdAt);
    }

    console.log("Saving note with password:", password);

    // Create note object
    const note = {
      createdAt: createdAt.toISOString(),
      title,
      content: AES.encrypt(
        JSON.stringify(content),
        password.trim()
      ).toString(),
      hint,
    };

    const compressed = compress(JSON.stringify(note));

    // Create note state to check if anything has changed
    const noteState = { createdAt, title, content, hint, password };
    if (JSON.stringify(noteState) === JSON.stringify(prevNoteState)) return;

    history.replaceState(undefined, undefined, `#${compressed}`);
    setTitle(title);

    prevNoteState = noteState;
  }
};

const load = () => {
  if (!location.hash) return;

  const note = JSON.parse(decompress(location.hash.substring(1)));

  $title.innerText = note.title;
  createdAt = new Date(note.createdAt);
  $createdAt.innerText = formatCreatedAt(createdAt);
  hint = note.hint || "No hint has been provided";

  const contentBytes = AES.decrypt(note.content, password);
  let content;
  try {
    content = JSON.parse(contentBytes.toString(enc.Utf8));
  } catch (e) {
    // Passworrd required
    password = prompt(`${hint}\n\nEnter the password:`);
    return load();
  }

  $note.innerText = content;
};

/* Load note from URL */
window.addEventListener("load", load);

/* Prevent rich text in editor */
$note.addEventListener("paste", (e) => {
  e.preventDefault();
  var text = e.clipboardData.getData("text/plain");
  document.execCommand("insertText", false, text);
});

/* Control S to save, or save on enter, and show suggestions on save */
window.addEventListener("keydown", (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === "s") {
    e.preventDefault();
    save();
  }
  if (e.code == "Enter") {
    save();
  }
});

/* Save every few seconds */
setInterval(() => save(), 2000);

$passwordButton.addEventListener("click", function () {
  password = prompt("Enter a password:", password);
  hint = prompt("Enter a hint (leave blank for no hint):", hint);
});
