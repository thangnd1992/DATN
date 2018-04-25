using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Model.eBookData;
using PagedList;

namespace Model.eBookDao
{
    public class BookDao
    {
        eBooks eb = null;
        public BookDao()
        {
            eb = new eBooks();
        }
        public Book InsertBook(Book bo)
        {

            eb.Book.Add(bo);
            eb.SaveChanges();
            return bo;
        }

        public Book UpdateBook(Book bo)
        {
            var Book = GetBookById(bo.Id);
            Book.BookAuthor = bo.BookAuthor;
            Book.BookCode = bo.BookCode;
            Book.BookName = bo.BookName;
            Book.BookNote = bo.BookNote;
            Book.BookPublisher = bo.BookPublisher;
            Book.BookType = bo.BookType;

            eb.SaveChanges();

            return bo;
        }

        public Book GetBookById(int Id)
        {
            var Book = eb.Book.Where(o => o.Id == Id).FirstOrDefault();
            if (Book != null)
                return Book;
            return new Book();
        }
        public Book GetBookByUserName(string bookCode)
        {
            var Book = eb.Book.Where(o => o.BookCode == bookCode).FirstOrDefault();
            if (Book != null)
                return Book;
            return null;
        }
        public List<Book> GetBooks()
        {
            return eb.Book.ToList();
        }
        public IEnumerable<Book> ListAllPaging(string searchString, int page, int pageSize)
        {
            IQueryable<Book> model = eb.Book;
            if (!string.IsNullOrEmpty(searchString))
            {
                model = model.Where(x => x.BookCode.Contains(searchString) || x.BookName.Contains(searchString));
            }

            return model.OrderByDescending(x => x.Id).ToPagedList(page, pageSize);
        }
    }
    
}
