using System;
using System.Linq;
using API.Entities;
using AutoMapper;
using DTOs;

namespace Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles(){
            CreateMap<AppUser, MemberDto>()
                .ForMember(dest => dest.PhotoUrl,opt => opt.MapFrom(src =>
                    src.Photos.FirstOrDefault(X => X.IsMain).Url));
            CreateMap<Photo, PhotoDto>();
        }

        private void ForMember()
        {
            throw new NotImplementedException();
        }
    }
}