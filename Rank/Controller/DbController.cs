using Microsoft.AspNetCore.Mvc;
using Rank.Models;

namespace Rank.Controllers  // ← lipsea namespace-ul!
{
    public class HomeController : Controller
    {
        private readonly AppDbContext _db;

        public HomeController(AppDbContext db)
        {
            _db = db;
        }

        public IActionResult Index()
        {
            var ranks = _db.Ranks.ToList();
            return View(ranks);
        }

        public IActionResult Auth()
        {
            return View();
        }
    }
}