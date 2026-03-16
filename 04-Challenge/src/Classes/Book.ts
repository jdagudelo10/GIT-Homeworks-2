class Book{
    name : string;
    author : string;
    editorial : string;
    isbn : string

    constructor(name:string, author:string, editorial:string, isbn:string){
        this.name = name;
        this.author = author;
        this.editorial = editorial;
        this.isbn = isbn;
    }
}

export default Book;