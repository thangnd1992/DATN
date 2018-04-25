namespace Model.eBookData
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Account")]
    public partial class Account
    {
        public int Id { get; set; }

        [StringLength(250)]
        public string UserName { get; set; }

        [StringLength(100)]
        public string Password { get; set; }

        [StringLength(100)]
        public string Email { get; set; }

        [StringLength(250)]
        public string Address { get; set; }

        public int? ClassId { get; set; }

        [StringLength(50)]
        public string Role { get; set; }
        [StringLength(250)]
        public string Name { get; set; }
        [StringLength(10)]
        public string Status { get; set; }
    }
}
