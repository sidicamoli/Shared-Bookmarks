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

  it('handles empty bookmark array', () => {
    const bookmarks = [];
    const sorted = bookmarks.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    expect(sorted).toHaveLength(0);
  });
});

describe('bookmark structure', () => {
  it('creates bookmark with correct properties', () => {
    const bookmark = {
      url: 'https://example.com',
      title: 'Test Bookmark',
      description: 'A test bookmark',
      createdAt: new Date().toISOString()
    };
    
    expect(bookmark).toHaveProperty('url');
    expect(bookmark).toHaveProperty('title');
    expect(bookmark).toHaveProperty('description');
    expect(bookmark).toHaveProperty('createdAt');
  });

  it('validates URL format', () => {
    const validUrls = [
      'https://example.com',
      'http://example.com',
      'https://example.com/path',
      'https://example.com?query=test'
    ];
    
    const urlPattern = /^https?:\/\//;
    
    validUrls.forEach(url => {
      expect(url).toMatch(urlPattern);
    });
  });

  it('rejects invalid URLs', () => {
    const invalidUrls = [
      'not-a-url',
      'example.com',
      'ftp://example.com'
    ];
    
    const urlPattern = /^https?:\/\//;
    
    invalidUrls.forEach(url => {
      expect(url).not.toMatch(urlPattern);
    });
  });
});

describe('date handling', () => {
  it('creates valid ISO timestamp', () => {
    const timestamp = new Date().toISOString();
    expect(timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
  });

  it('parses timestamp correctly', () => {
    const timestamp = '2024-01-15T12:30:00.000Z';
    const date = new Date(timestamp);
    expect(date.getFullYear()).toBe(2024);
    expect(date.getMonth()).toBe(0); // January is 0
    expect(date.getDate()).toBe(15);
  });
});