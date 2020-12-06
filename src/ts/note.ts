export class Note {
    title: string;
    content: string;
    bgColor: string;
    isPinned: boolean;

    constructor(title: string, content: string, bgColor: string, isPinned = false) {
        this.title = title;
        this.content = content;
        this.bgColor = bgColor;
        this.isPinned = isPinned;
    }
}
