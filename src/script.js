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

const $passwordForm = document.querySelector("#password_form");

// Default password
let password = "SECRET_KEY";

// Password required to open note?
let requirePassword = false;

const $suggestions = document.querySelector("#suggestions");

let previousCompressedNote;
const save = () => {
  const title = $title.innerText;

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
        JSON.stringify($note.innerText),
        password.trim()
      ).toString(),
    };

    const compressed = compress(JSON.stringify(note));

    // Don't save note if it's the same as this will case unnecessary history
    if (compressed === previousCompressedNote) return;

    history.replaceState(undefined, undefined, `#${compressed}`);
    setTitle(title);

    previousCompressedNote = compressed;
  }
};

const load = () => {
  const note = JSON.parse(decompress(location.hash.substring(1)));
  if (note) {
    $title.innerText = note.title;

    console.log("Unlocking note with password:", password.trim());

    // Decrypt notes
    try {
      const bytes = AES.decrypt(note.content, password);
      console.log(bytes.toString(enc.Utf8));
      $note.innerText = JSON.parse(bytes.toString(enc.Utf8)); // Throws error if password incorrect
      createdAt = new Date(note.createdAt);
      setTitle(note.title);

      $createdAt.innerText = formatCreatedAt(createdAt);
    } catch (e) {
      console.log("need to enter password!");
      $note.setAttribute(
        "data-placeholder",
        "Please enter the password to view the note"
      );
      requirePassword = true;
    }
  }
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
    save();

    // Show write good suggestions
    $suggestions.innerHTML = "";
    const suggestions = getWritingSuggestions($note.innerText);
    suggestions.forEach((suggestion) => {
      $suggestions.innerHTML += `<li>${suggestion.explanation}</li>`;
    });

    e.preventDefault();
  }
  if (e.code == "Enter") {
    save();
  }
});

/* Save every few seconds */
setInterval(() => save(), 2000);

$passwordForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const data = new FormData($passwordForm);
  password = data.get("password");

  if (requirePassword) load();
});
