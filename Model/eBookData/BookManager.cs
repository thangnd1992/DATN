using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.Spatial;

namespace Model.eBookData
{
    [Table("BookManager")]
    public partial class BookManager
    {
        public int Id { get; set; }

        public int AccountId { get; set; }

        public int BookId { get; set; }

        public DateTime? BorrowOn { get; set; }

        public DateTime? PayOn { get; set; }
        public string Name { get; set; }
        public string BookName { get; set; }
    }
}
