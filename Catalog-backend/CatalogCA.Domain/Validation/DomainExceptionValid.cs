namespace CatalogCA.Domain.Validation
{
    public class DomainExceptionValid : Exception
    {
        public DomainExceptionValid(string error) : base(error) 
        {
        }

        public static void When(bool hasError, string error)
        {
            if (hasError)
            {
                throw new DomainExceptionValid(error);
            }
        }
    }
}
