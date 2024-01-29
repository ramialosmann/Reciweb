﻿using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public UserRepository(DataContext context, IMapper mapper)
        {
            _context=context;
            _mapper=mapper;
        }
        public async Task<AppUser> GetByIdAsync(int id)
        {
            return await _context.Users.FindAsync(id);
        }

        public async Task<AppUser> GetByUsernameAsync(string username)
        {
            return await _context.Users.Include(r => r.Recipes).ThenInclude(i => i.ingredients)
                                       .Include(r => r.Recipes).ThenInclude(p => p.photos)
                                       .SingleOrDefaultAsync(u => u.Username == username);
        }

        public async Task<IEnumerable<AppUser>> GetUsersAsync( )
        {
            return await _context.Users.Include(r => r.Recipes).ToListAsync();
            
        }

        public async Task<MemberDto> GetMemberAsync(string username)
        {
            return await _context.Users.Include(r => r.Recipes).ThenInclude(i => i.ingredients)
                                       .Include(r => r.Recipes).ThenInclude(p => p.photos)
                                       .ProjectTo<MemberDto>(_mapper.ConfigurationProvider)
                                       .SingleOrDefaultAsync(u => u.Username==username);
        }

        public async Task<IEnumerable<MemberDto>> GetMembersAsync( )
        {
            return await _context.Users.Include(r => r.Recipes).ThenInclude(i => i.ingredients)
                                       .Include(r => r.Recipes).ThenInclude(p => p.photos)
                                       .ProjectTo<MemberDto>(_mapper.ConfigurationProvider)
                                       .ToListAsync();

        }




        public async Task<bool> SaveAllAsync( )
        {
           return await _context.SaveChangesAsync() > 0;
        }

        public void Update(AppUser user)
        {
            _context.Entry(user).State = EntityState.Modified;
        }

        public void Delete(AppUser user)
        {
            _context.Remove(user);
        }
    }
}
