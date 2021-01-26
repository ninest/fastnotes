import {
  compressToEncodedURIComponent,
  decompressFromEncodedURIComponent,
} from "lz-string";

const $title = document.querySelector("#title");
const $note = document.querySelector("#editor");

const save = () => {
  const note = {
    title: $title.value,
    content: $note.innerText,
  };

  const compressed = compressToEncodedURIComponent(JSON.stringify(note));
  history.replaceState(undefined, undefined, `#${compressed}`);
};
const load = () => {
  const note = JSON.parse(
    decompressFromEncodedURIComponent(location.hash.substring(1))
  );
  if (note) {
    $title.value = note.title;
    $note.innerText = note.content;
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

// Control S to save
window.addEventListener("keydown", (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === "s") {
    save();
    e.preventDefault();
  }
});
