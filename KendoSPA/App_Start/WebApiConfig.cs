using System.Web.Http;

namespace KendoSPA
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            config.MapHttpAttributeRoutes();
            
            config.Routes.MapHttpRoute("ModulesRoute", "api/{module}/{controller}/{id}", new { id = RouteParameter.Optional });

            config.Routes.MapHttpRoute("DefaultApi", "api/{controller}/{id}", new {id = RouteParameter.Optional});
        }
    }
}