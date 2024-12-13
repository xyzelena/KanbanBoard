"use client";

import React from 'react';

import styles from '@/styles/KanbanBoard.module.css';

interface AddDocumentFormProps {
    newDocTitle: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onAdd: () => void;
}

const AddDocumentForm: React.FC<AddDocumentFormProps> = ({ newDocTitle, onChange, onAdd }) => (
    <div className={styles.addDocumentSection}>
        <input
            type="text"
            value={newDocTitle}
            onChange={onChange}
            placeholder="Название документа"
            className={styles.input}
        />

        <button onClick={onAdd} className={styles.addButton}>
            Добавить документ
        </button>
    </div>
);

export default AddDocumentForm;
