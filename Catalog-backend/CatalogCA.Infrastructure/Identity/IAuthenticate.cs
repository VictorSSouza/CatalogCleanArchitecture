using System.Threading.Tasks;
namespace CatalogCA.Application.Interfaces
{
    public interface IAuthenticate
    {
        Task<bool> Authenticate(string email, string password);
	    Task<bool> RegisterUser(string email, string password);
	    Task Logout();
    }
}
