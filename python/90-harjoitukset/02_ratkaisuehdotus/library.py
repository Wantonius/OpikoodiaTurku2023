class Book():

    def __init__(self,name,author,id,genre,loaned):
        self.name = name
        self.author = author
        self.id = id
        self.genre = genre
        self.loaned = loaned

    def __str__(self):
        return ""+self.name+" by "+self.author+" with id "+str(self.id)

class Library():

    def __init__(self):
        self.books = []
        book1 = Book("Harry Potter","J.K.Rowling",100,"Fantasy",False)
        self.books.append(book1)
        book2 = Book("Cyberpunk","William Gibson",101,"Scifi",False)
        self.books.append(book2)
        book3 = Book("Vurt","Jeff Noon",102,"Weird Fiction",False)
        self.books.append(book3)
        
    def loan_book(self,id):
        for book in self.books:
            if(book.id == id):
                if(book.loaned):
                    print("Book is already on loan")
                    return
                book.loaned = True
                print("Your book is loaned.")
	
    def return_book(self,id):
        for book in self.books:
            if(book.id == id):
                if(book.loaned == False):
                    print("Cannot return a book that is not on loan")
                    return
                book.loaned = False
                print("You return your book.")
    
    def list_books(self):
        loaned_books = []
        books = []
        for book in self.books:
            if(book.loaned):
                loaned_books.append(book)
            else:
                books.append(book)
        print("Books on loan:")
        for b in loaned_books:
            print(b)
        print("Books for loan:")
        for b in books:
            print(b)

def main():
    print("Welcome to the library. We have following books.")
    lib = Library()
    choice = ""
    lib.list_books()
    while choice != "q":
        print("What do you want to do")
        print("l. List books")
        print("o. Loan book")
        print("r. Return book")
        print("q. Quit")
        choice = input()
        match choice:
            case "l":
                lib.list_books()
            case "o":
                print("Enter the id of the book you want to loan")
                loan_id = input()
                lib.loan_book(int(loan_id))
            case "r":
                print("Enter the id of the book you want to return")
                loan_id = input() 
                lib.return_book(int(loan_id))               
            case "q":
                break;
            case _:
                print("Make a proper choice")
                
if __name__ == "__main__":
	main()  