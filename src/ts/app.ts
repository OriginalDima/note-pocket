import { Note } from './note';
export class App {
    notes: Note[] = [];
    noteBackground: string;
    constructor() {
        this.start();
    }
    start(): void {
        document.querySelector('#add-new-note').addEventListener('click', () => {
            this.addNewNote();
        });
        this.loadNotes();

        const noteBackground: HTMLCollection = document.querySelector('.color-wrapper').children;
        for (const items of noteBackground) {
            items.addEventListener('click', () => {
                this.noteBackground = items.className;
            });
        }
    }
    loadNotes(): void {
        const noteList = localStorage.getItem('note-list');

        if (noteList === null) {
            return;
        }

        const notes: Note[] = JSON.parse(noteList);
        this.notes = notes;

        this.renderNotes();
    }
    renderNotes(): void {
        document.querySelector('#notes').innerHTML = '';

        for (let i = 0; i < this.notes.length; i++) {
            this.createHTMLNote(this.notes[i].title, this.notes[i].content, this.notes[i].bgColor, this.notes[i].isPinned, i);
        }

        // for ( const note of this.notes) {
        //     this.createHTMLNote(note.title, note.content, note.isPinned);
        // }
    }
    addNewNote(): void {
        const newNoteTitle: string = document.querySelector<HTMLInputElement>('#title').value;
        const newNoteContent: string = document.querySelector<HTMLTextAreaElement>('#content').value;
        const newNoteIsPinned: boolean = document.querySelector<HTMLInputElement>('#is-pinned').checked;
        // this.createHTMLNote(newNoteTitle, newNoteContent);

        const note = new Note(newNoteTitle, newNoteContent, this.noteBackground, newNoteIsPinned);
        if (newNoteIsPinned) {
            this.notes.unshift(note);
        } else {
            this.notes.push(note);
        }
        this.updateLocalStorage();
        this.renderNotes();
        this.cleareInputs();
    }
    cleareInputs(): void {
        document.querySelector<HTMLInputElement>('#title').value = '';
        document.querySelector<HTMLTextAreaElement>('#content').value = '';
    }
    updateLocalStorage(): void {
        const notes = JSON.stringify(this.notes);
        localStorage.setItem('note-list', notes);
    }
    deleteNote(index: number): void {
        this.notes.splice(index, 1);
        this.renderNotes();
        this.updateLocalStorage();
    }
    editNote(index: number): void {
        // const noteTitleElement = document.querySelector('.title');
        // const noteContentElement = document.querySelector('.content');
        const noteTitleElement = this.notes[index].title;
        const noteContentElement = this.notes[index].content;

        this.notes[index].title = prompt('edit title', noteTitleElement);
        this.notes[index].content = prompt('edit content', noteContentElement);
        
        this.updateLocalStorage();
        this.renderNotes();

        // console.log(noteTitleElement);
        // console.log(noteContentElement);
    }
    createHTMLNote(title: string, content: string, bgColor: string, isPinned: boolean, index: number): void {
        const notes = document.querySelector('#notes');
        const note = document.createElement('div');
        const noteDeleteBtn = document.createElement('div');
        const noteEditBtn = document.createElement('div');
        const noteTitleElement = document.createElement('h2');
        const noteContentElement = document.createElement('div');
        
        noteTitleElement.classList.add('title');
        noteTitleElement.innerText = title;
        noteContentElement.classList.add('content');
        noteContentElement.innerText = content;

        note.style.backgroundColor = bgColor;
    
        note.classList.add('note');
        if (isPinned) {
            note.classList.add('is-pinned');
        }

        noteDeleteBtn.innerText = 'Delete';
        noteDeleteBtn.classList.add('delete-btn');
        noteDeleteBtn.addEventListener('click', () => { this.deleteNote(index); });
        
        note.addEventListener('mousemove', () => {
            noteDeleteBtn.classList.add('delete-btn__active');
        });
        note.addEventListener('mouseleave', () => {
            noteDeleteBtn.classList.remove('delete-btn__active');
        });

        noteEditBtn.innerText = 'Edit';
        noteEditBtn.classList.add('edit-btn');
        noteEditBtn.addEventListener('click', () => { this.editNote(index); });

        note.addEventListener('mousemove', () => {
            noteEditBtn.classList.add('edit-btn__active');
        });
        note.addEventListener('mouseleave', () => {
            noteEditBtn.classList.remove('edit-btn__active');
        });

        note.appendChild(noteTitleElement);
        note.appendChild(noteContentElement);
        note.appendChild(noteDeleteBtn);
        note.appendChild(noteEditBtn);

        notes.appendChild(note);
    }
}
