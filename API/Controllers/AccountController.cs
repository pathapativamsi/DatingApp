using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using API.DTOs;
using Data;
using Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly DataContext _context;
        public AccountController(DataContext context)
        {
            _context = context;
        }
        [HttpPost("register")]

        public async Task<ActionResult<AppUser>> Register(RegisterDto registerDto){
            using var hmac = new HMACSHA512();

            if(await UserExists(registerDto.Username)){
                return BadRequest("UserName already exists");
            }

            var user = new AppUser
            {
                UserName = registerDto.Username.ToLower(),
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
                PasswordSalt = hmac.Key

            };
        _context.Users.Add(user);
        await _context.SaveChangesAsync();
        return user;
        }

        [HttpPost("login")]
        public async Task<ActionResult<AppUser>> Login(LoginDto logindto){
                var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == logindto.Username);
                
                if(user == null) return Unauthorized("Invalid UserName");

                using var hmac = new HMACSHA512(user.PasswordSalt);  

                var ComputedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(logindto.Password));

                for(int i=0; i<ComputedHash.Length;i++){
                    if(ComputedHash[i] != user.PasswordHash[i]) return Unauthorized("Invalid Password");
                }

                return user;
        }

        private async Task<bool> UserExists(string username){
            return await _context.Users.AnyAsync(x => x.UserName == username.ToLower());
        }

    }
}