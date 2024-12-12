export type Document = {
    id: string;
    title: string;
    status: 'in-progress' | 'under-review' | 'completed';
};

export type DocumentState = Document[];

export type Column = {
    id: 'in-progress' | 'under-review' | 'completed';
    title: string;
};