using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Model.eBookDao;
using Model.eBookData;

namespace eBookManager.Controllers
{
    public class HomeController : Controller
    {
        private BookDao _bookDao;
        private AccountDao _accDao;
        public HomeController()
        {
            _bookDao = new BookDao();
            _accDao = new AccountDao();
        }
        public ActionResult Index()
        {
            if (Session["CurrentAccount"] == null)
            {
                return RedirectToAction("Login", "Account");
            }
            else
            {
                var acc = (Account)Session["CurrentAccount"];
                if(acc.Role == "admin")
                {
                    ViewBag.CountAccount = _accDao.GetAccounts().Count;
                    ViewBag.CountBook = _bookDao.GetBooks().Count;
                    ViewBag.borrowOnMin = DateTime.Now.AddMonths(-1).ToString("dd/MM/yyyy");
                    ViewBag.borrowOnMax = DateTime.Now.ToString("dd/MM/yyyy");
                    return View();
                }
                else
                {
                    return RedirectToAction("GetAllBooks", "Book");
                }
            }
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}