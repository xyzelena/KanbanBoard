"use client";

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

import {
    addDocument,
    updateDocumentStatus,
    setDocuments,
    removeDocument,
} from '@/redux/slices/documentsSlice';

import { RootState } from '@/redux/store';

import AddDocumentForm from './AddDocumentForm';
import Column from './Column';

import styles from '@/styles/KanbanBoard.module.css';

const Board: React.FC = () => {
    const dispatch = useDispatch();

    const documents = useSelector((state: RootState) => state.documents);

    const [newDocTitle, setNewDocTitle] = useState<string>('');

    const [searchQuery, setSearchQuery] = useState<string>('');

    useEffect(() => {
        const savedDocuments = localStorage.getItem('documents');

        if (savedDocuments) {
            const parsedSavedDocuments = JSON.parse(savedDocuments);

            dispatch(setDocuments(parsedSavedDocuments));
        }
    }, [dispatch]);

    useEffect(() => {
        const stringifiedDocuments = JSON.stringify(documents);

        localStorage.setItem('documents', stringifiedDocuments);
    }, [documents]);

    const onDragEnd = (result: DropResult) => {
        if (!result.destination) return;

        const { source, destination } = result;

        if (source.droppableId !== destination.droppableId) {
            const validStatuses = ['in-progress', 'under-review', 'completed'] as const;

            if (validStatuses.includes(destination.droppableId as typeof validStatuses[number])) {

                const statusDocument = {
                    id: result.draggableId,
                    status: destination.droppableId as 'in-progress' | 'under-review' | 'completed',
                };

                dispatch(updateDocumentStatus(statusDocument));
            }
        }
    };

    const handleAddDocument = () => {
        if (newDocTitle.trim()) {
            dispatch(addDocument({ title: newDocTitle }));
            setNewDocTitle('');
        }
    };

    const handleDeleteDocument = (id: string) => {
        if (confirm('Вы уверены, что хотите удалить этот документ?')) {
            dispatch(removeDocument(id));
        }
    };

    const handleSearchQuery = (e: {
        target: {
            value: React.SetStateAction<string>;
        };
    }) => setSearchQuery(e.target.value);

    const columns = [
        { id: 'in-progress', title: 'В работе' },
        { id: 'under-review', title: 'На проверке' },
        { id: 'completed', title: 'Завершено' },
    ];


    const filteredDocuments = documents.filter((doc) =>
        doc.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Kanban board</h1>

            <div className={styles.filterSection}>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchQuery}
                    placeholder="Поиск по заголовку"
                    className={styles.filterInput}
                />
            </div>

            <AddDocumentForm
                newDocTitle={newDocTitle}
                onChange={(e) => setNewDocTitle(e.target.value)}
                onAdd={handleAddDocument}
            />

            <DragDropContext onDragEnd={onDragEnd}>
                <div className={styles.board}>
                    {columns.map((column) => (
                        <Column
                            key={column.id}
                            id={column.id}
                            title={column.title}
                            documents={filteredDocuments.filter(
                                (doc) => doc.status === column.id
                            )}
                            onDelete={handleDeleteDocument}
                        />
                    ))}
                </div>
            </DragDropContext>
        </div>
    );
};

export default Board;
