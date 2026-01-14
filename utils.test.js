import { describe, test, expect } from "vitest";
import { sortBookmarksByDate } from "./utils.js";

describe("sortBookmarksByDate", () => {
  test("sorts newest bookmarks first", () => {
    const bookmarks = [
      { title: "Old", createdAt: "2023-01-01T10:00:00Z" },
      { title: "New", createdAt: "2024-01-01T10:00:00Z" },
    ];

    const sorted = sortBookmarksByDate(bookmarks);

    expect(sorted[0].title).toBe("New");
    expect(sorted[1].title).toBe("Old");
  });

  test("does not mutate original array", () => {
    const bookmarks = [{ createdAt: "2023-01-01T00:00:00Z" }];
    const copy = [...bookmarks];

    sortBookmarksByDate(bookmarks);

    expect(bookmarks).toEqual(copy);
  });

  test("handles same-day different times", () => {
    const bookmarks = [
      { createdAt: "2024-01-01T10:00:00Z" },
      { createdAt: "2024-01-01T12:00:00Z" },
    ];

    const sorted = sortBookmarksByDate(bookmarks);

    expect(sorted[0].createdAt).toBe("2024-01-01T12:00:00Z");
  });

  test("handles empty array", () => {
    expect(sortBookmarksByDate([])).toEqual([]);
  });
});