using OnlineLearningPortal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace OnlineLearningPortal.Controllers
{
    public class AuthController : Controller
    {
        // GET: Auth
        public ActionResult SignUp(UserDetails userDetails)
        {
            return View();
        }
        public ActionResult SignIn()
        {
            return View();
        }
        public ActionResult LogOut()
        {
            return View();
        }
    }
}