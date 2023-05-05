using System.ComponentModel.DataAnnotations;

namespace CotucaClickerAPI.Models
{
    public class Player
    {

        [Key]
        public string? username { get; set; } //this id the key
        public string? senha { get; set; }
        public long clicks { get; set; }
        public long moneyThisRun { get; set; }
        public long moneyLifetime { get; set; }
        public DateTime initialDate { get; set; }
        public int sword { get; set; }
        public int shield { get; set; }
        public int armor { get; set; }
        public int boot { get; set; }
        public int bow { get; set; }
        public int staff { get; set; }
        public int elf { get; set; }
        public int orc { get; set; }
        public int sergio { get; set; }
        public int simone { get; set; }
        public int patricia { get; set; }
        public int sampaio { get; set; }
        public int maligno { get; set; }
        public int boletim { get; set; }
        public int upgrade0 { get; set; }
        public int upgrade1 { get; set; }
        public int upgrade2 { get; set; }
    }
}


/*username varchar(30) primary key,
	senha varchar(15) not null,
	clicks bigint not null,
	moneyPerSecond bigint not null,
	moneyThisRun bigint not null,
	moneyLifetime bigint not null,
	initialDate datetime not null,
	quantEquip int not null,
	sword int not null,
	shield int not null,
	armor int not null,
	boot int not null,
	staff int not null,
	elf int not null,
	orc int not null,
	sergio int not null,
	simone int not null,
	patricia int not null,
	sampaio int not null,
	maligno int not null,
	boletim int not null,
	upgrade0 int not null,
	upgrade1 int not null,
	upgrade2 int not null,*/