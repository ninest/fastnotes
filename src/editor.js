import { load, save } from "./note";
import { $note } from "./ui";

/* Load note from URL */
window.addEventListener("load", load);

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

/* Prevent rich text in editor */
$note.addEventListener("paste", (e) => {
  e.preventDefault();
  var text = e.clipboardData.getData("text/plain");
  document.execCommand("insertText", false, text);
});
