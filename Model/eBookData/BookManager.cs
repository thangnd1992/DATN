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

        public DateTime BorrowOn { get; set; }

        public DateTime? PayOn { get; set; }
        [StringLength(250)]
        public string Name { get; set; }
        [StringLength(250)]
        public string BookName { get; set; }
        public int? BorrowOnKey { get; set; }
        public int? PayOnKey { get; set; }

    }
}
