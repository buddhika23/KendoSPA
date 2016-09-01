using System;
using System.Globalization;
using System.Threading;
using Microsoft.ApplicationInsights;

namespace KendoSPA.Resources
{
    public class CultureSettings
    {
        public static CultureInfo UserCulture { get; set; }

        public static string ShortDateFormat
        {
            get
            {
                return UserCulture.DateTimeFormat.ShortDatePattern;
            }
        }

        public static DateTime ParseDate(string dateString)
        {
            DateTime targetDate;

            if (!DateTime.TryParse(dateString.Trim(), UserCulture, DateTimeStyles.None, out targetDate))
            {
                targetDate = DateTime.ParseExact(dateString.Trim(), ShortDateFormat,
                    UserCulture);
            }

            return targetDate;
        }
        public static string LongTimeFormat
        {
            get
            {
                return UserCulture.DateTimeFormat.LongTimePattern;
            }
        }

        public static DateTime ParseDateTime(string dateString)
        {
            DateTime targetDate;
            TelemetryClient telemetryClient = new TelemetryClient();

            telemetryClient.TrackTrace($"Culture issue : {dateString} to {Thread.CurrentThread.CurrentUICulture}");

            try
            {
                if (!DateTime.TryParse(dateString.Trim(), UserCulture, DateTimeStyles.None, out targetDate))
                {
                    targetDate = DateTime.ParseExact(dateString.Trim(), ShortDateFormat + " " + LongTimeFormat,
                        UserCulture);
                }

                return targetDate;
            }
            catch (Exception ex)
            {
                telemetryClient.TrackException(new Exception(ex.Message, ex));

                try
                {
                    var stringDate = dateString.Replace(",", "").Split(' ')[0];
                    var stringTime = dateString.Replace(",", "").Split(' ')[1];
                    telemetryClient.TrackTrace("Last hope: "+ dateString);
                    targetDate = DateTime.Parse(stringDate + " " + stringTime, UserCulture);
                    telemetryClient.TrackTrace("Last hope: " + targetDate);
                    return targetDate;
                }
                catch (Exception)
                {
                    telemetryClient.TrackException(ex);
                    throw;
                }
                throw;
            }
        }
    }
}