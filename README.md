# Kanban board

This is a **Next.js** app that is a kanban board for managing documents. 

The user can create and delete documents, filter by title, and drag and drop documents between columns to change their status. 

**Redux Toolkit** was used for state management. The **react-beautiful-dnd** library was used to create an interactive drag-and-drop interface.

## Functionality:

1. Board with three columns:
- In progress
- Under review
- Completed
  
Documents are displayed in the corresponding column.

2. Drag and drop: the ability to drag documents between columns.
3. Add document: the ability to add a new document to the "In progress" column.

### Additional features:

1. Saving data to local storage (LocalStorage).
2. Added animation when moving documents.
3. Added filtering of documents by title from one field across all columns at once.

## Getting Started: 

* Git clone this repository to your computer;
* Make sure that you have node.js and npm installed;
* Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

<img width="1160" alt="image" src="https://github.com/user-attachments/assets/7527a67b-3367-488a-992f-074e476d4201" />



