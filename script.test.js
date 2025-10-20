// script.test.js
import { describe, it, expect } from 'vitest';

describe('bookmark sorting', () => {
  it('sorts bookmarks in reverse chronological order', () => {
    const bookmarks = [
      { createdAt: '2023-01-01T00:00:00Z' },
      { createdAt: '2024-01-01T00:00:00Z' },
      { createdAt: '2022-01-01T00:00:00Z' }
    ];

    const sorted = bookmarks.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    expect(sorted[0].createdAt).toBe('2024-01-01T00:00:00Z');
    expect(sorted[2].createdAt).toBe('2022-01-01T00:00:00Z');
  });
});