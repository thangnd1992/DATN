﻿using System;
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
    public class AccountController : Controller
    {
        private ApplicationSignInManager _signInManager;
        private ApplicationUserManager _userManager;
        private AccountDao _accDao;
        public Account CurrentAccount;
        public AccountController()
        {
            _accDao = new AccountDao();
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
            var check = _accDao.Login(userName, password);
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
        public ActionResult GetAllAccounts( string search, int page=1, int pageSize = 10)
        {
            var accounts = _accDao.ListAllPaging(search,page,pageSize);
            ViewBag.SearchString = search;
            return View(accounts);
        }
        [AllowAnonymous]
        public ActionResult EditAccount(int accountId)
        {
            var account = _accDao.GetAccountById(accountId);
            return View(account);
        }
        [HttpPost]
        [AllowAnonymous]
        public ActionResult EditAccount(Account acc)
        {
            var account = _accDao.UpdateAccount(acc);
            return View(account);
        }
        [AllowAnonymous]
        public ActionResult Create()
        {
            return View(new Account());
        }
        [HttpPost]
        [AllowAnonymous]
        public ActionResult Create(Account acc)
        {
            var account = _accDao.InsertAccount(acc);
            return View(account);
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
    }
}