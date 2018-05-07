using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using eBookManager.Models;
using Model.eBookData;
using Model.eBookDao;

namespace eBookManager.Controllers
{
    [Authorize]
    public class ClassController : Controller
    {
        private ApplicationSignInManager _signInManager;
        private ApplicationUserManager _userManager;
        private ClassDao _classDao;
        public ClassController()
        {
            _classDao = new ClassDao();
        }

        public ClassController(ApplicationUserManager userManager, ApplicationSignInManager signInManager)
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
        public ActionResult GetAllClasss(string search, int page = 1, int pageSize = 10)
        {
            if (Session["CurrentAccount"] == null)
            {
                return RedirectToAction("Login", "Account");
            }
            else
            {
                var Classs = _classDao.ListAllPaging(search, page, pageSize);
                ViewBag.SearchString = search;
                return View(Classs);
            }

        }
        [AllowAnonymous]
        public ActionResult EditClass(int ClassId)
        {
            if (Session["CurrentAccount"] == null)
            {
                return RedirectToAction("Login", "Account");
            }
            else
            {
                var Class = _classDao.GetClassById(ClassId);
                return View(Class);
            }

        }
        [HttpPost]
        [AllowAnonymous]
        public ActionResult EditClass(Class acc)
        {
            var Class = _classDao.UpdateClass(acc);
            return Json("Cập nhật thành công!", JsonRequestBehavior.AllowGet);
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
                return View(new Class());
            }

        }
        [HttpPost]
        [AllowAnonymous]
        public ActionResult Create(Class acc)
        {
            var Class = _classDao.InsertClass(acc);
            return Json("Thêm mới thành công!", JsonRequestBehavior.AllowGet);
        }
    }
}