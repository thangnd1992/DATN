﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Model.eBookData;
using System.Data.Entity;
using PagedList;
using System.Data.SqlClient;

namespace Model.eBookDao
{
    public class BookManagerDao
    {
        eBooks eb = null;
        public BookManagerDao()
        {
            eb = new eBooks();
        }
        public BookManager BorrowBook (BookManager bookManager)
        {
            bookManager.BorrowOn = DateTime.Now;
            eb.BookManager.Add(bookManager);
            //eb.BookManager.Attach(bookManager);
            eb.Entry(bookManager).State = EntityState.Added;
            eb.SaveChanges();
            return bookManager;
        }
        public BookManager PayBook(BookManager bookManager)
        {
            var book = eb.BookManager.Where(o => o.AccountId == bookManager.AccountId && o.BookId == bookManager.BookId).FirstOrDefault();
            book.PayOn = DateTime.Now;
            eb.Entry(book).State = EntityState.Modified;
            eb.SaveChanges();
            return bookManager;
        }
        public bool checkBookBorrow (int accountId, int bookId)
        {
            var check = eb.BookManager.Where(o => o.AccountId == accountId && o.BookId == bookId).FirstOrDefault() != null;
            return check;
        }
        public string massageCheckBookPayed(int accountId, int bookId)
        {
            var book = eb.BookManager.Where(o => o.AccountId == accountId && o.BookId == bookId).FirstOrDefault();
            if(book == null)
                return "Bạn chưa mượn cuốn sách này";
            if (book.PayOn != null)
                return "Bạn đã trả cuốn sách này rồi";
            return "ok";
        }
        public IEnumerable<BookManager> GetBookManagerBorrows (string query, DateTime? borrowOnMin, DateTime? borrowOnMax, int page, int pageSize = 10)
        {
            var bookManager = eb.BookManager.SqlQuery("SELECT bm.*, a.Name, b.BookName FROM dbo.BookManager bm Join Account a On bm.AccountId = a.Id Join Book b On bm.BookId = b.Id Where a.Name like @p0 and @p1 < BorrowOn and @p2 > BorrowOn", new object[] { "%" + query + "%", borrowOnMin, borrowOnMax });
            return bookManager.OrderByDescending(x => x.Id).ToPagedList(page, pageSize); ;
        }
        public IEnumerable<BookManager> GetBookManagerPays(string query, DateTime? payOnMin, DateTime? payOnMax, int page, int pageSize = 10)
        {
            var bookManager = eb.BookManager.SqlQuery("SELECT bm.*, a.Name, b.BookName FROM dbo.BookManager bm Join Account a On bm.AccountId = a.Id Join Book b On bm.BookId = b.Id Where a.Name like @p0 and @p1 < PayOn and @p2 > PayOn", new object[] { "%" + query + "%", payOnMin, payOnMax });
            return bookManager.OrderByDescending(x => x.Id).ToPagedList(page, pageSize); ;
        }
    }
}
