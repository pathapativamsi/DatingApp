namespace Controllers.Errors
{
    public class APISException
    {

        public APISException(int statusCode, string message = null, string details = null)
        {
            Details = details;
            Message = message;
            StatusCode = statusCode;
        }

        public int StatusCode { get; set; }

        public string Message { get; set; }

        public string Details { get; set; }
    }



}