using System.Collections.Generic;
using System.Web.Mvc;
using Rogrand.Common;

namespace Demo.Controllers
{
    public class User
    {
        public int UserId { get; set; }
        public string UserName { get; set; }
    }

    public class DemoController : Controller
    {
        private static readonly List<User> Users = new List<User>
        {
            new User {UserId = 1, UserName = "zhangsan"},
            new User {UserName = "lisi", UserId = 2},
            new User {UserName = "wangwu", UserId = 3},
            new User {UserName = "zhaoliu", UserId = 4},
            new User {UserName = "bson", UserId = 5},
            new User {UserName = "jack", UserId = 6},
            new User {UserName = "lily", UserId = 7},
            new User {UserName = "mary", UserId = 8},
            new User {UserName = "lilei", UserId = 9},
            new User {UserName = "wanglei", UserId = 10},
            new User {UserName = "huli", UserId = 11},
            new User {UserName = "yuanda", UserId = 12},
            new User {UserName = "hanmeimei", UserId = 13},
        };

        public ActionResult Grid()
        {
            return View();
        }

        public ActionResult List()
        {
            return View();
        }

        public ActionResult Form()
        {
            ViewData["model"] = new
            {
                text = "123",
                textarea = "456\r\n123",
                select_one = 2,
                select_muli = new[] { 2, 3 },
                checkbox = new[] { 1, 3 },
                radio = 2
            };
            return View();
        }

        public JsonResult GetList()
        {
            var pageindx = Request.QueryString["pageindex"];
            var sort = Request.QueryString["sort"];
            var desc = Request.QueryString["desc"];
            var p = new PageParameter
            {
                IsAsc = desc == "0",
                OrderBy = sort,
                PageSize = int.Parse(Request.QueryString["pagesize"]),
                PageIndex = int.Parse(pageindx)
            };
            var list = Users.GetPageList(p);
            return Json(new
            {
                count = p.RecordCount,
                list
            }, JsonRequestBehavior.AllowGet);
        }
    }
}
