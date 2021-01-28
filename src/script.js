import {
  compressToEncodedURIComponent,
  decompressFromEncodedURIComponent,
} from "lz-string";
import { getHours, getMinutes, getSeconds } from "date-fns";

const $title = document.querySelector("#title");
const $note = document.querySelector("#editor");

const setTitle = () => {
  const title = $title.value || "Untitled";
  // Set document title as note name and time
  const date = new Date();

  // prettier-ignore
  document.title = `${title} - ${getHours(date)}:${getMinutes(date)}:${getSeconds(date)}`;
};

let previousCompressedNote;

const save = () => {
  const title = $title.value;
  const note = {
    title,
    content: $note.innerText,
  };

  const compressed = compressToEncodedURIComponent(JSON.stringify(note));

  // Don't save note if it's the same as this will case unnecessary history
  if (compressed === previousCompressedNote) return;

  history.replaceState(undefined, undefined, `#${compressed}`);
  setTitle();

  previousCompressedNote = compressed;
};
const load = () => {
  const note = JSON.parse(
    decompressFromEncodedURIComponent(location.hash.substring(1))
  );
  if (note) {
    $title.value = note.title;
    $note.innerText = note.content;

    setTitle();
  }
};

window.onload = () => {
  // Load note in #URL
  load();
};

// Prevent rich text in editor
$note.addEventListener("paste", (e) => {
  e.preventDefault();
  var text = e.clipboardData.getData("text/plain");
  document.execCommand("insertText", false, text);
});

// Control S to save, or save on enter
window.addEventListener("keydown", (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === "s") {
    save();
    e.preventDefault();
  }
  if (e.code == "Enter") {
    save();
  }
});

// Save every few seconds
setInterval(() => save(), 1500);
