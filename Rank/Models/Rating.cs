using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Rank.Models
{
    [Table("rank")]
    public class RankModel
    {
        [Key]
        public int ID { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public int Apreciere { get; set; }
    }
}