using API.DTOs;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace API.Controllers
{
    [Authorize]
    public class UsersController : BaseApiController
    {
        private readonly IUserRepository _userrepo;
        private readonly IMapper _mapper;

        public UsersController(IUserRepository userrepo , IMapper mapper)
        {
            _userrepo=userrepo;
            _mapper=mapper;
        }


        [HttpGet]

        public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()
        {
           var users = await _userrepo.GetMembersAsync();
           var userstoreturn = _mapper.Map<IEnumerable<MemberDto>>(users);

           return Ok(userstoreturn);
        }

        [HttpGet("{username}")]

        public async Task<ActionResult<MemberDto>> GetUser(string username)
        {
            var user = await _userrepo.GetMemberAsync(username);

            return _mapper.Map<MemberDto>(user);
        }


        [HttpPut]

        public async Task<ActionResult> UpdateUserProfile (MemberProfileUpdateDto updateDto)
        {
            var username = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var user = await _userrepo.GetByUsernameAsync(username);

            if(user == null)
            {
                return NotFound();
            }

            _mapper.Map(updateDto, user);
            

            if(await _userrepo.SaveAllAsync()) { return NoContent(); }

            return BadRequest("Failed to update profile"); 
        }


    }
}
