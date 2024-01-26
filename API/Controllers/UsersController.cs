using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

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
    }
}
