using System.Web.Optimization;

namespace KendoSPA
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                "~/Scripts/jquery-{version}.js"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                "~/Scripts/modernizr-*"));

            bundles.IgnoreList.Clear();

            bundles.Add(
                new ScriptBundle("~/scripts/vendor")
                    .Include("~/scripts/jquery-{version}.js")
                    .Include("~/scripts/pubsub.js")
                    .Include("~/scripts/bootstrap.js")
                    .Include("~/scripts/debug.js")
                );

            bundles.Add(
                new StyleBundle("~/Content/css")
                    .Include("~/Content/kendo/2014.1.416/kendo.common-bootstrap.min.css")
                    .Include("~/Content/kendo/2014.1.416/kendo.bootstrap.min.css")
                    .Include("~/Content/kendo/2014.1.416/kendo.bootstrap.mobile.min.css")
                    .Include("~/Content/bootstrap.css")
                    .Include("~/Content/font-awesome.css")
                    .Include("~/Content/animate.css")
                );
        }
    }
}