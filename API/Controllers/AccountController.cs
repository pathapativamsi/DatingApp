using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using DTOs;
using Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly ITokenService _tokenService;
        public AccountController(DataContext context, ITokenService tokenService)
        {
            _tokenService = tokenService;
            _context = context;
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerdto){

            if( await UserExists(registerdto.Username)) return BadRequest("Username already taken");
            using var hmac = new HMACSHA512();
            var newuser = new AppUser{
                UserName = registerdto.Username.ToLower(),
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerdto.password)),
                PasswordSalt = hmac.Key
            };

            _context.Users.Add(newuser);
            await _context.SaveChangesAsync();
            //return newuser;
            return new UserDto{
                Username=newuser.UserName,
                Token = _tokenService.CreateToken(newuser)
            };
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto logindto){

            var user = await _context.Users.SingleOrDefaultAsync(x =>  x.UserName == logindto.Username.ToLower());
            if(user == null) return Unauthorized("Invalid UserName");
            using var hmac = new HMACSHA512(user.PasswordSalt);
            var ComputedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(logindto.password));
            for (int i =0; i < ComputedHash.Length;i++){
                if(ComputedHash[i] != user.PasswordHash[i]) return Unauthorized("Invalid password");
            }

            //return user;
            return new UserDto{
                Username=user.UserName,
                Token = _tokenService.CreateToken(user)
            };
        }

        private async Task<bool> UserExists(string username){

            return await _context.Users.AnyAsync(x => x.UserName == username.ToLower());
        }
    }
}