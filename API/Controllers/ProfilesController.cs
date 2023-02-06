using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Profiles;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ProfilesController : BaseApiController
    {
        [HttpGet("{username}")]
        public async Task<IActionResult> GetProfile(string username)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Username = username}));
        }

        [HttpGet("{username}/activities")]
        public async Task<IActionResult> GetProfileActivities(string username, [FromQuery] Application.Activities.ActivityParams param)
        {
            return HandleResult(await Mediator.Send(new ProfileActivitiesList.Query{Username = username, Params = param}));
        }

        //[Authorize(Policy ="IsCurrentUser")] TO DO
        [HttpPut]
        public async Task<IActionResult> Edit(Edit.Command command)
        {
            return HandleResult(await Mediator.Send(command));
        }

    }
}