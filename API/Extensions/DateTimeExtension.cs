using System;

namespace API.Extensions
{
    public static class DateTimeExtension
    {
        public static int CalculateAge(this DateTime date){

            var Today = DateTime.Today;
            var age = Today.Year-date.Year;

            if(date.Date > Today.AddYears(-age)){
                age --;
            }
            return age;
        }
    }
}