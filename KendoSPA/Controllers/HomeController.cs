#region

using System.Web.Mvc;

#endregion

namespace KendoSPA.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Title = "Kendo SPA";
            return View();
        }

    }
}