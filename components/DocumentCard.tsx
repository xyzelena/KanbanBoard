import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

import styles from '@/styles/KanbanBoard.module.css';

interface DocumentCardProps {
    doc: { id: string; title: string };
    index: number;
    onDelete: (id: string) => void;
}

const DocumentCard: React.FC<DocumentCardProps> = ({ doc, index, onDelete }) => (
    <Draggable draggableId={doc.id} index={index}>
        {
            (provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={styles.document}
                >

                    {doc.title}

                    <button
                        className={styles.deleteButton}
                        onClick={() => onDelete(doc.id)}>
                        Удалить
                    </button>
                </div>
            )
        }
    </Draggable>
);

export default DocumentCard;
