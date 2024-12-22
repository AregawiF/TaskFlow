export interface TaskType {
    _id: string;
    title: string;
    description?: string;
    completed: boolean;
    dueDate?: Date;
    priority?: 'low' | 'medium' | 'high';
}