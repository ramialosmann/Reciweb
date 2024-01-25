namespace API.Errors
{
    public class ApiException
    {
        public ApiException(int statuscode, string message, string detail)
        {
            this.statuscode=statuscode;
            this.message=message;
            this.detail=detail;
        }

        public int statuscode {  get; set; }
        public string message { get; set; }

        public string detail { get; set; }


    }
}
