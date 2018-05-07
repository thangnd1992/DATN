using System;
using System.Globalization;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using eBookManager.Models;
using Model.eBookData;
using Model.eBookDao;
using System.Collections.Generic;

namespace eBookManager.Controllers
{
    [Authorize]
    public class BookController : Controller
    {
        private ApplicationSignInManager _signInManager;
        private ApplicationUserManager _userManager;
        private BookDao _bookDao;
        private BookManagerDao _bookManagerDao;
        public BookController()
        {
            _bookDao = new BookDao();
            _bookManagerDao = new BookManagerDao();
        }

        public BookController(ApplicationUserManager userManager, ApplicationSignInManager signInManager)
        {
            UserManager = userManager;
            SignInManager = signInManager;
        }

        public ApplicationSignInManager SignInManager
        {
            get
            {
                return _signInManager ?? HttpContext.GetOwinContext().Get<ApplicationSignInManager>();
            }
            private set
            {
                _signInManager = value;
            }
        }

        public ApplicationUserManager UserManager
        {
            get
            {
                return _userManager ?? HttpContext.GetOwinContext().GetUserManager<ApplicationUserManager>();
            }
            private set
            {
                _userManager = value;
            }
        }
        //

        [AllowAnonymous]
        public ActionResult GetAllBooks(string search, int page = 1, int pageSize = 10)
        {
            if (Session["CurrentAccount"] == null)
            {
                return RedirectToAction("Login", "Account");
            }
            else
            {
                var Books = _bookDao.ListAllPaging(search, page, pageSize);
                ViewBag.SearchString = search;
                return View(Books);
            }

        }
        [AllowAnonymous]
        public ActionResult EditBook(int BookId)
        {
            if (Session["CurrentAccount"] == null)
            {
                return RedirectToAction("Login", "Account");
            }
            else
            {
                var Book = _bookDao.GetBookById(BookId);
                return View(Book);
            }
            
        }
        [HttpPost]
        [AllowAnonymous]
        public ActionResult EditBook(Book acc)
        {
            var Book = _bookDao.UpdateBook(acc);
            return Json("Cập nhật sách thành công", JsonRequestBehavior.AllowGet);
        }
        [AllowAnonymous]
        public ActionResult Create()
        {
            if (Session["CurrentAccount"] == null)
            {
                return RedirectToAction("Login", "Account");
            }
            else
            {
                return View(new Book());
            }
            
        }
        [HttpPost]
        [AllowAnonymous]
        public ActionResult Create(Book acc)
        {
            var Book = _bookDao.InsertBook(acc);
            return Json("Thêm mới sách thành công", JsonRequestBehavior.AllowGet);
        }
        // Mượn sách
        [HttpPost]
        [AllowAnonymous]
        public ActionResult BorrowBook(int bookId)
        {
            var account = (Account)Session["CurrentAccount"];
            var check = _bookManagerDao.checkBookBorrow(account.Id, bookId);
            if (check)
            {
                return Json("Bạn đã từng mượn cuốn sách này");
            }
            var bookManager = new BookManager();
            bookManager.AccountId = account.Id;
            bookManager.BookId = bookId;
            var result = _bookManagerDao.BorrowBook(bookManager);
            return Json("Bạn đã mượn thành công cuốn sách này");
        }

        // Trả sách
        [HttpPost]
        [AllowAnonymous]
        public ActionResult PayBook(int bookId)
        {
            var account = (Account)Session["CurrentAccount"];
            var strPay = _bookManagerDao.massageCheckBookPayed(account.Id, bookId);
            if(strPay != "ok")
            {
                return Json(strPay);
            }
            var bookManager = new BookManager();
            bookManager.AccountId = account.Id;
            bookManager.BookId = bookId;
            var result = _bookManagerDao.PayBook(bookManager);
            return Json("Bạn đã trả thành công cuốn sách này");
        }
    }
}