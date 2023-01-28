using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;


namespace Domain
{
    public class AppUser : IdentityUser
    {
        public string DisplayName { get; set; }
        [StringLength(280)]
        public string Bio { get; set; }
        public ICollection<ActivityAttendee> Activities { get; set; }
        public ICollection<Photo> Photos {get;set;}
        public ICollection<UserFollowing> Followings { get; set; }
        public ICollection<UserFollowing> Followers { get; set; }
    }
}