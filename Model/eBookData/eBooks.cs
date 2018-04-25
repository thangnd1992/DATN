namespace Model.eBookData
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class eBooks : DbContext
    {
        public eBooks()
            : base("name=eBooks")
        {
        }

        public virtual DbSet<Account> Account { get; set; }
        public virtual DbSet<Book> Book { get; set; }
        public virtual DbSet<BookManager> BookManager { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
        }
    }
}
