

using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly ITokenService _tservice;

        public AccountController(DataContext context , ITokenService tservice)
        {
            _context=context;
            _tservice=tservice;
        }
        private async Task<bool> IsUserinUse(string username)
        {
            return await _context.Users.AnyAsync(x => x.Username == username);
        }


        [HttpPost("register")] 

        public async Task<ActionResult<UserDto>> Register (RegisterDto registerDto)
        {
            if(await IsUserinUse(registerDto.username))
            {
                return BadRequest("Username is taken");
            }

            using var hmac = new HMACSHA512();
            var user = new AppUser
            {
                Username=registerDto.username,
                PasswordHash=hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.password)),
                PasswordSalt=hmac.Key
            };

            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            return new UserDto
            {
                username=user.Username,
                token=_tservice.CreateToken(user)
            };

        }
        [HttpPost("login")]

        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _context.Users.SingleOrDefaultAsync(u =>
            u.Username==loginDto.username);

            if(user==null)
            {
                return Unauthorized("Invalid Credentials");
            }

            using var hmac = new HMACSHA512();
            var computedhash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.password));
            for(int i=0; i<computedhash.Length; i++)
            {
                if (computedhash[i]!=user.PasswordHash[i]) return Unauthorized("Invalid Credentials");
            }

            return new UserDto
            {
                username=user.Username,
                token=_tservice.CreateToken(user)
            };

        }
    }
}
