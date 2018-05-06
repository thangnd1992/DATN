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
using eBookManager.Common;

namespace eBookManager.Controllers
{
    [Authorize]
    public class AccountController : Controller
    {
        private ApplicationSignInManager _signInManager;
        private ApplicationUserManager _userManager;
        private AccountDao _accDao;
        private ClassDao _classDao;
        public Account CurrentAccount;
        public AccountController()
        {
            _accDao = new AccountDao();
            _classDao = new ClassDao();
        }

        public AccountController(ApplicationUserManager userManager, ApplicationSignInManager signInManager)
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
        // GET: /Account/Login
        [AllowAnonymous]
        public ActionResult Login()
        {
            Account acc = new Account();
            return View(acc);
        }

        //
        // POST: /Account/Login
        [HttpPost]
        [AllowAnonymous]
        public ActionResult Login(string userName, string password)
        {

            Account acc = new Account();
            var passwordSalt = Encrypt.GetMD5(password);
            var check = _accDao.Login(userName, passwordSalt);
            if (check)
            {

                Session["CurrentAccount"] = _accDao.GetAccountByUserName(userName);
                return RedirectToAction("Index", "Home");
            }
            else
            {
                ModelState.AddModelError("", "Bạn cần kiểm tra lại username hoặc password hoặc tài khoản của bạn đã bị khóa");
                return View("Index", acc);
            }
        }
        [AllowAnonymous]
        public ActionResult GetAllAccounts(string search, int page = 1, int pageSize = 10)
        {
            if (Session["CurrentAccount"] == null)
            {
                return RedirectToAction("Login", "Account");
            }
            else
            {
                var accounts = _accDao.ListAllPaging(search, page, pageSize);
                ViewBag.SearchString = search;
                ViewBag.Class = _classDao.GetAllClass();
                return View(accounts);
            }

        }
        [AllowAnonymous]
        public ActionResult EditAccount(int accountId)
        {
            if (Session["CurrentAccount"] == null)
            {
                return RedirectToAction("Login", "Account");
            }
            else
            {
                var account = _accDao.GetAccountById(accountId);
                var model = new AccountModel();
                model.Id = account.Id;
                model.Email = account.Email;
                model.Address = account.Address;
                model.ClassId = account.ClassId;
                model.Name = account.Name;
                model.Password = account.Password;
                model.Role = account.Role;
                model.Status = account.Status;
                model.UserName = account.UserName;
                model.Classes = _classDao.GetAllClass();
                return View(model);
            }
            
        }
        [HttpPost]
        [AllowAnonymous]
        public ActionResult EditAccount(Account acc)
        {
            var ac = _accDao.GetAccountById(acc.Id);
            //acc.Password = ac.Password;
            ac.Status = acc.Status;
            ac.Email = acc.Email;
            ac.Name = acc.Name;
            ac.Address = acc.Address;
            ac.Role = acc.Role;
            ac.ClassId = acc.ClassId;
            var str = "";
            try
            {
                var result = _accDao.UpdateAccount(ac);
                str = "Tài khoản đã được cập nhật thành công";
            }
            catch (Exception e)
            {
                str = "Có lỗi xảy ra";
            }
            return Json(str, JsonRequestBehavior.AllowGet);
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
                var account = new AccountModel();
                account.Classes = _classDao.GetAllClass();
                return View(account);
            }
            
        }
        [HttpPost]
        [AllowAnonymous]
        public ActionResult Create(Account acc)
        {
            acc.Password = Common.Encrypt.GetMD5(acc.Password);
            var str = "";
            try
            {
                var result = _accDao.InsertAccount(acc);
                str = "Tài khoản đã được tạo thành công";
            }
            catch(Exception e)
            {
                str = "Có lỗi xảy ra";
            }
            return Json(str, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [AllowAnonymous]
        public ActionResult DisableAccount(int accountId)
        {
            var acc = _accDao.GetAccountById(accountId);
            acc.Status = "disable";
            var account = _accDao.UpdateAccount(acc);
            return Json(account);
        }

        [AllowAnonymous]
        public ActionResult ChangePassword()
        {

            if (Session["CurrentAccount"] == null)
            {
                return RedirectToAction("Login", "Account");
            }
            else
            {
                var account = (Account)Session["CurrentAccount"];                
                return View(account);
            }
            
        }
        [HttpPost]
        [AllowAnonymous]
        public ActionResult ChangePassword(string Password)
        {
            var acc = (Account)Session["CurrentAccount"];
            acc.Password = Encrypt.GetMD5(Password);
            var account = _accDao.UpdateAccount(acc);
            return Json("Bạn đã thay đổi thành công", JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [AllowAnonymous]
        public ActionResult Logout()
        {
            Session["CurrentAccount"] = null;
            return Json("Bạn đã đăng xuất thành công!");
        }

        [AllowAnonymous]
        public ActionResult AccountInfo()
        {
            if (Session["CurrentAccount"] == null)
            {
                return RedirectToAction("Login", "Account");
            }
            else
            {
                ViewBag.Class = _classDao.GetAllClass();
                var account = (Account)Session["CurrentAccount"];
                var info = _accDao.GetAccountById(account.Id);
                return View(info);
            }

        }
    }
}