import { getHours, getMinutes, getSeconds } from "date-fns";
import { formatRelative, parseISO } from "date-fns";
import writeGood from "write-good";

export const setTitle = (noteTitle) => {
  const title = noteTitle.trim() || "Untitled";

  const date = new Date();

  const h = padTime(getHours(date));
  const m = padTime(getMinutes(date));
  const s = padTime(getSeconds(date));

  document.title = `${title} - ${h}:${m}:${s}`;
};

const padTime = (num) => num.toString().padStart(2, "0");

export const formatCreatedAt = (createdAt) => {
  if (createdAt instanceof String || typeof createdAt == "string") {
    return formatRelative(parseISO(createdAt), new Date());
  } else {
    return formatRelative(createdAt, new Date());
  }
};

export const getWritingSuggestions = (text) => {
  const suggestions = writeGood(text).map((wgSuggetion) => ({
    explanation: wgSuggetion.reason,
    position: wgSuggetion.index,
  }));
  return suggestions;
};
