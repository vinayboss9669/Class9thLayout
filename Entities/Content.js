{
  "name": "Content",
  "type": "object",
  "properties": {
    "subject": {
      "type": "string",
      "description": "Subject name this content belongs to"
    },
    "topic": {
      "type": "string",
      "enum": [
        "e-books",
        "notes",
        "questions",
        "pyqs",
        "mock-tests"
      ],
      "description": "Content topic type"
    },
    "title": {
      "type": "string",
      "description": "Content title"
    },
    "author": {
      "type": "string",
      "description": "Author name (for books)"
    },
    "image_url": {
      "type": "string",
      "description": "Image URL for the content"
    },
    "file_url": {
      "type": "string",
      "description": "File URL for downloadable content"
    },
    "description": {
      "type": "string",
      "description": "Brief description"
    },
    "chapter": {
      "type": "string",
      "description": "Chapter or section name"
    }
  },
  "required": [
    "subject",
    "topic",
    "title"
  ]
}
