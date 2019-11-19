using System;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using theme_system_journal.Models;
using theme_system_journal.Services;

namespace theme_system_journal.Controllers
{
	[ApiController]
	[Route("account")]
	public class AccountController : ControllerBase
	{
		private readonly AccountService _as;
		public AccountController(AccountService accountService)
		{
			_as = accountService;
		}

		[HttpPost("Register")]
		public async Task<ActionResult<User>> Register([FromBody] UserRegistration creds)
		{
			try
			{
				User user = _as.Register(creds);
				if (user == null) { Unauthorized("Invalid Credentials"); }
				user.SetClaims();
				await HttpContext.SignInAsync(user._principal);
				return Ok(user);
			}
			catch (Exception e)
			{
				return Unauthorized(e.Message);
			}

		}
	}
}