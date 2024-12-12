import React from 'react';
import { Droppable } from 'react-beautiful-dnd';

import DocumentCard from './DocumentCard';

import styles from '@/styles/KanbanBoard.module.css';

interface ColumnProps {
    id: string;
    title: string;
    documents: { id: string; title: string }[];
    onDelete: (id: string) => void;
}

const Column: React.FC<ColumnProps> = ({ id, title, documents, onDelete }) => (
    <Droppable droppableId={id}>
        {
            (provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={styles.column}
                >
                    <h2 className={styles.columnTitle}>{title}</h2>

                    {documents.map((doc, index) => (
                        <DocumentCard
                            key={doc.id}
                            doc={doc}
                            index={index}
                            onDelete={onDelete}
                        />
                    ))}

                    {provided.placeholder}

                </div>
            )
        }
    </Droppable>
);

export default Column;
