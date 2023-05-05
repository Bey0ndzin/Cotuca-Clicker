using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using CotucaClickerAPI.Data;
using CotucaClickerAPI.Models;

namespace CotucaClickerAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PlayerController : ControllerBase
    {
        private GameContext _context;
        public PlayerController(GameContext context)
        {
            _context = context;
        }

        [HttpGet("{PlayerName}")]
        public ActionResult<Player> Get(string PlayerName)
        {
            try{
                var result = _context.Player.Find(PlayerName);
                if(result == null)
                {
                    return NotFound();
                }
                return Ok(result);
            }catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha ao acessar banco de dados");
            }
        }

        [HttpPost]
        public async Task<ActionResult> Post(Player model)
        {
            try{
                _context.Player.Add(model);
                if(await _context.SaveChangesAsync() == 1)
                {
                    return Created($"/api/player/{model.username}", model);
                }
            }catch{
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha ao acessar banco de dados");
            }
            return BadRequest();
        }

        [HttpPut("{PlayerName}")]
        public async Task<IActionResult> Put(string PlayerName, Player dadosPlayerAlt)
        {
            try{
                var result = await _context.Player.FindAsync(PlayerName);
                if(PlayerName != result.username)
                {
                    return BadRequest();
                }

                result.clicks = dadosPlayerAlt.clicks;
                result.moneyLifetime = dadosPlayerAlt.moneyLifetime;
                result.moneyThisRun = dadosPlayerAlt.moneyThisRun;

                result.sword = dadosPlayerAlt.sword;
                result.shield = dadosPlayerAlt.shield;
                result.armor = dadosPlayerAlt.armor;
                result.boot = dadosPlayerAlt.boot;
                result.bow = dadosPlayerAlt.bow;
                result.staff = dadosPlayerAlt.staff;
                result.elf = dadosPlayerAlt.elf;
                result.orc = dadosPlayerAlt.orc;
                result.sergio = dadosPlayerAlt.sergio;
                result.simone = dadosPlayerAlt.simone;
                result.patricia = dadosPlayerAlt.patricia;
                result.sampaio = dadosPlayerAlt.sampaio;
                result.maligno = dadosPlayerAlt.maligno;
                result.boletim = dadosPlayerAlt.boletim;

                result.upgrade0 = dadosPlayerAlt.upgrade0;
                result.upgrade1 = dadosPlayerAlt.upgrade1;
                result.upgrade2 = dadosPlayerAlt.upgrade2;

                await _context.SaveChangesAsync();
                return Created($"api/player/{dadosPlayerAlt.username}", dadosPlayerAlt);

            }catch{
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha ao acessar banco de dados");
            }
        }
    }
}