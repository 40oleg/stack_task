export type Task = {
    uuid: string;
    name: string;
    description: string;
    hidden: boolean;
    createTime: number;
    parentId: string | null;
};
