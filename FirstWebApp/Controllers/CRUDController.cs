using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using FirstWebApp.Models;
using FirstWebApp.Repository;
namespace FirstWebApp.Controllers
{
    public class CRUDController : Controller
    {
        CRUDOperation co;
        public CRUDController()
        {
            co = new CRUDOperation();
        }
        // GET: CRUD
        public ActionResult RegisterView(string message)
        {
            ViewBag.result = message;
            return View();
        }
        [HttpPost]
        public ActionResult CreateUser(CRUD cd)
        {
            CRUDOperation co = new CRUDOperation();

            ViewBag.result = co.InsertOperation(cd);
            return Redirect($"RegisterView?message={ViewBag.result}");
        }
        [HttpGet]
        public ActionResult ShowAllUser(CRUD cd) {
            List<CRUD> allUser = co.ReadAllUser(cd);
            return View(allUser);
        }

        public ActionResult UpdateUserView(CRUD cd)
        {
            List<CRUD> singleUser =co.ReadSingleUser(cd);
            return View(singleUser);
        }
        //upate signle user
        public ActionResult UpdateUser(CRUD cd)
        {
            string updateStatus = co.UpdateUser(cd);
            if (updateStatus == "Success")
            {
                return Redirect("ShowAllUser");
            }
            else
            {
                TempData["msg"] = updateStatus;
                return Redirect($"UpdateUserView?id={cd.Id}");
            }
        }

        public ActionResult DeleteUser(CRUD cd) {
            co.DeleteUser(cd);          
            return Redirect("ShowAllUser");
            
        }
    }
}