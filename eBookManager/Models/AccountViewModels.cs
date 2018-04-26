using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Model.eBookData;

namespace eBookManager.Models
{
    public class AccountModel
    {
        public int Id { get; set; }

        [StringLength(250)]
        [Required(ErrorMessage = "Tên đăng nhập không được để trống!")]
        public string UserName { get; set; }

        [StringLength(100)]
        [Required(ErrorMessage = "Mật khẩu không được để trống!")]
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

        public List<Class> Classes { get; set; }
    }
}
