namespace Model.eBookData
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Book")]
    public partial class Book
    {
        public int Id { get; set; }

        [StringLength(50)]
        public string BookCode { get; set; }

        [StringLength(250)]
        public string BookName { get; set; }

        [StringLength(250)]
        public string BookType { get; set; }

        [StringLength(50)]
        public string BookAuthor { get; set; }
        [StringLength(250)]
        public string BookNote { get; set; }

        [StringLength(250)]
        public string BookPublisher { get; set; }
    }
}
