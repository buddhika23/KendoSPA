using System.Web.Mvc;
using System.Web.Routing;

namespace KendoSPA
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");
            routes.MapMvcAttributeRoutes();

            routes.MapRoute("Default", "{controller}/{action}/{token}",
                new {controller = "Home", action = "Index", token = UrlParameter.Optional}
                );
        }
    }
}