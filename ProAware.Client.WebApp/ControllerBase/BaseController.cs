using System.Globalization;
using System.Linq;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Controllers;
using KendoSPA.Resources;

namespace KendoSPA.ControllerBase
{
    public class BaseController : ApiController
    {
        public BaseController()
        {
            CultureSettings.UserCulture = new CultureInfo(UserCultureName);
        }


        protected string UserCultureName
        {
            get
            {
                //if (userSession != null)
                //    return userSession.Culture;
                //else
                return Thread.CurrentThread.CurrentUICulture.Name;
            }
        }



        public override Task<HttpResponseMessage> ExecuteAsync(HttpControllerContext controllerContext, CancellationToken cancellationToken)
        {
            if (controllerContext.Request.Headers.AcceptLanguage != null && controllerContext.Request.Headers.AcceptLanguage.Count > 0)
            {
                string language = controllerContext.Request.Headers.AcceptLanguage.First().Value;
                var culture = CultureInfo.CreateSpecificCulture(language);

                Thread.CurrentThread.CurrentCulture = culture;
                Thread.CurrentThread.CurrentUICulture = culture;
                CultureSettings.UserCulture = culture;

            }

            return base.ExecuteAsync(controllerContext, cancellationToken);
        }
    }
}