using Application.Activities;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles
{
    public class ListActivities
    {
        public class Query : IRequest<Result<List<UserActivityDto>>>
         {
            public string Predicate { get; set; }
            public string Username { get; set; }
         }

         public class Handler : IRequestHandler<Query, Result<List<UserActivityDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
        
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;

            }

            public async Task<Result<List<UserActivityDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = _context.ActivityAttendees
                .OrderBy(a => a.Activity.Date)
                .Where(a => a.AppUser.UserName == request.Username);

            if (request.Predicate == "future")
            {
                query = query.Where(a => a.Activity.Date >= DateTime.UtcNow);
            }
            else if (request.Predicate == "past")
            {
                query = query.Where(a => a.Activity.Date < DateTime.UtcNow);
            }
            else if (request.Predicate == "hosting")
            {
                query = query.Where(a => a.IsHost && a.AppUser.UserName == request.Username);
            }
            else
            {
                return Result<List<UserActivityDto>>.Failure("Failed to return profile activities list");
            }

                        
                return Result<List<UserActivityDto>>.Success(await query
                .ProjectTo<UserActivityDto>(_mapper.ConfigurationProvider)
                .ToListAsync());
            }
        }
    }
}
    