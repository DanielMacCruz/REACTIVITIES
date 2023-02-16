using Application.Activities;
using Application.Core;
using Application.Interfaces;
using Application.Profiles;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles
{
    public class ProfileActivitiesList
    {
        public class Query : IRequest<Result<PagedList<UserActivityDto>>>
        {
            public ActivityParams Params { get; set; }
            public string Username { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<PagedList<UserActivityDto>>>
        {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
       
            public Handler(DataContext context, IMapper mapper )
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<PagedList<UserActivityDto>>> Handle(Query request, CancellationToken cancellationToken)
            {      


                IQueryable<UserActivityDto> query = _context.Activities
                    .Where(x => x.Attendees.Any(a => a.AppUser.UserName == request.Username))
                    .OrderBy(d=>d.Date)
                    .ProjectTo<UserActivityDto>(_mapper.ConfigurationProvider)
                    .AsQueryable();
                
                if (request.Params.Predicate == "future") {
                    query = query.Where(d=>d.Date >= request.Params.StartDate);
                }
                else if (request.Params.Predicate == "past"){ 
                    query = query.Where(d=>d.Date < request.Params.StartDate);
                } else if(request.Params.Predicate == "hosting"){ 
                    query = query.Where(d=>d.HostUsername == request.Username);
                } else {
                return Result<PagedList<UserActivityDto>>.Failure("Failed to retrieve activities");
                }
                
                return Result<PagedList<UserActivityDto>>.Success(
                    await PagedList<UserActivityDto>.CreateAsync(query, request.Params.PageNumber, request.Params.PageSize)
                );
            }
        }
    }
}