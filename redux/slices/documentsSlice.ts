import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

import { Document, DocumentState } from '@/types/types';

export const initialDocuments: DocumentState = [
    { id: '1', title: 'Документ 1', status: 'in-progress' },
    { id: '2', title: 'Документ 2', status: 'in-progress' },
    { id: '3', title: 'Документ 3', status: 'under-review' },
];

const documentsSlice = createSlice({
    name: 'documents',
    initialState: initialDocuments,

    reducers: {
        addDocument: (state, action: PayloadAction<{ title: string }>) => {
            const newDoc: Document = {
                id: nanoid(),
                title: action.payload.title,
                status: 'in-progress',
            };

            state.push(newDoc);
        },

        updateDocumentStatus: (
            state,
            action: PayloadAction<{
                id: string;
                status: 'in-progress' | 'under-review' | 'completed'
            }>
        ) => {
            const { id, status } = action.payload;
            const doc = state.find((doc) => doc.id === id);

            if (doc) doc.status = status;
        },

        setDocuments: (state, action: PayloadAction<Document[]>) => {
            return action.payload;
        },

        removeDocument: (state, action: PayloadAction<string>) => {
            const result = state.filter((doc) => doc.id !== action.payload);

            return result;
        },
    },
});

export const {
    addDocument,
    updateDocumentStatus,
    setDocuments,
    removeDocument
} = documentsSlice.actions;

export default documentsSlice.reducer;