import type { Model, RawModel } from "./Model";

export interface RawMemo extends RawModel {
    tag: string | null;
    title: string;
    content: string;
}

const memo: RawMemo = {} as RawMemo;

export class RawMemo {
    public transform(): Memo {
        return {
            id: this.id,
            tag: this.tag,
            title: this.title,
            content: this.content,
            createdAt: this.created_at,
            updatedAt: this.updated_at
        }
    }
}

export interface Memo extends Model {
    tag: string | null;
    title: string;
    content: string;
}
