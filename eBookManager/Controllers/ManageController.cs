using System;
using System.Linq;
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
    public class ManageController : Controller
    {
        private ApplicationSignInManager _signInManager;
        private ApplicationUserManager _userManager;
        private BookManagerDao _bookManagerDao;
        public ManageController()
        {
            _bookManagerDao = new BookManagerDao();
        }

        public ManageController(ApplicationUserManager userManager, ApplicationSignInManager signInManager)
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
        // GET: /Manage/Index
        [AllowAnonymous]
        public ActionResult GetBookBorrows(string query, string borrowOnMin, string borrowOnMax, int page = 1)
        {
            var account = (Account)Session["CurrentAccount"];
            var borrowMin = borrowOnMin == null ? DateTime.Now.AddMonths(-1) : DateTime.ParseExact(borrowOnMin,"dd/MM/yyyy",null);
            var borrowMax = borrowOnMax == null ? DateTime.Now : DateTime.ParseExact(borrowOnMax, "dd/MM/yyyy", null).AddHours(23);
            if (account.Role != "admin")
            {
                query = account.Name;
            }
            var bookManager = _bookManagerDao.GetBookManagerBorrows(query, borrowMin, borrowMax, page);
            ViewBag.SearchString = query;
            ViewBag.borrowOnMin = borrowMin.ToString("dd/MM/yyyy");
            ViewBag.borrowOnMax = borrowMax.ToString("dd/MM/yyyy");
            return View(bookManager);
        }
        [AllowAnonymous]
        public ActionResult GetBookReturns(string query, string payOnMin, string payOnMax, int page = 1)
        {
            var account = (Account)Session["CurrentAccount"];
            var payMin = payOnMin == null ? DateTime.Now.AddMonths(-1) : DateTime.ParseExact(payOnMin, "dd/MM/yyyy", null);
            var payMax = payOnMax == null ? DateTime.Now : DateTime.ParseExact(payOnMax, "dd/MM/yyyy", null).AddHours(23);
            if (account.Role != "admin")
            {
                query = account.Name;
            }
            var bookManager = _bookManagerDao.GetBookManagerPays(query, payMin, payMax, page);
            ViewBag.SearchString = query;
            ViewBag.payOnMin = payMin.ToString("dd/MM/yyyy");
            ViewBag.payOnMax = payMax.ToString("dd/MM/yyyy");
            return View(bookManager);
        }
        [AllowAnonymous]
        public ActionResult GetBookBorrowsById(string borrowOnMin, string borrowOnMax)
        {
            var account = (Account)Session["CurrentAccount"];
            var borrowMin = borrowOnMin == null ? DateTime.Now.AddMonths(-1) : DateTime.ParseExact(borrowOnMin, "dd/MM/yyyy", null);
            var borrowMax = borrowOnMax == null ? DateTime.Now : DateTime.ParseExact(borrowOnMax, "dd/MM/yyyy", null).AddHours(23);
            //var bookManager = _bookManagerDao.GetBookManagerById( borrowMin, borrowMax, 1);
            ViewBag.borrowOnMin = borrowMin.ToString("dd/MM/yyyy");
            ViewBag.borrowOnMax = borrowMax.ToString("dd/MM/yyyy");
            return View();
        }
        [HttpPost]
        [AllowAnonymous]
        public ActionResult GetBookBorrowsByIdData(string borrowOnMin, string borrowOnMax)
        {
            var account = (Account)Session["CurrentAccount"];
            var borrowMin = borrowOnMin == null ? DateTime.Now.AddMonths(-1) : DateTime.ParseExact(borrowOnMin, "dd/MM/yyyy", null);
            var borrowMax = borrowOnMax == null ? DateTime.Now : DateTime.ParseExact(borrowOnMax, "dd/MM/yyyy", null).AddHours(23);
            var bookManager = _bookManagerDao.GetBookManagerById(borrowMin, borrowMax, 1).ToList();
            return Json(bookManager, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        [AllowAnonymous]
        public ActionResult GetBookBorrowsByTimeData(string borrowOnMin, string borrowOnMax)
        {
            var account = (Account)Session["CurrentAccount"];
            var borrowMin = borrowOnMin == null ? DateTime.Now.AddMonths(-1) : DateTime.ParseExact(borrowOnMin, "dd/MM/yyyy", null);
            var borrowMax = borrowOnMax == null ? DateTime.Now : DateTime.ParseExact(borrowOnMax, "dd/MM/yyyy", null).AddHours(23);
            var bookManager = _bookManagerDao.GetBookManagerByTime(borrowMin, borrowMax);
            foreach(var item in bookManager)
            {
                item.BorrowOnKeyString = DateTime.ParseExact(item.BorrowOnKey.Value.ToString(), "yyyyMMdd", null).ToString("yyyy'-'MM'-'dd'T'HH':'mm':'ss'Z'");
            }
            return Json(bookManager, JsonRequestBehavior.AllowGet);
        }
    }
}