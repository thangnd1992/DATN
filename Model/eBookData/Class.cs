namespace Model.eBookData
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Class")]
    public partial class Class
    {
        public int Id { get; set; }

        [StringLength(50)]
        [Required(ErrorMessage = "Mã lớp không được để trống!")]
        public string ClassCode { get; set; }

        [StringLength(250)]
        [Required(ErrorMessage = "Tên lớp không được để trống!")]
        public string ClassName { get; set; }

        [StringLength(10)]
        public string ClassStatus { get; set; }
    }
}
