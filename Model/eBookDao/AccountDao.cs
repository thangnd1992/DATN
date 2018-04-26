using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Model.eBookData;
using PagedList;
using System.Data.Entity;
using System.Data.Entity.Validation;

namespace Model.eBookDao
{
    public class AccountDao
    {
        eBooks eb = null;
        public AccountDao()
        {
            eb = new eBooks();
        }
        public Account InsertAccount(Account acc)
        {
            acc.Status = "active";
            eb.Account.Add(acc);
            eb.SaveChanges();
            return acc;
        }
        public bool Login (string userName, string password)
        {
            var account = eb.Account.Where(o => o.UserName == userName && o.Password == password && o.Status == "active").FirstOrDefault();
            if (account != null)
                return true;
            return false;
        }

        public Account UpdateAccount(Account acc)
        {
            var account = GetAccountById(acc.Id);
            account.Id = acc.Id;
            account.Address = acc.Address;
            account.ClassId = acc.ClassId;
            account.Email = acc.Email;
            account.Password = acc.Password;
            account.Role = acc.Role;
            account.UserName = acc.UserName;
            account.Name = acc.Name;
            account.Status = acc.Status;
            eb.Entry(account).State = EntityState.Modified;
            try
            {
                eb.SaveChanges();
            }
            catch(DbEntityValidationException e)
            {
                foreach (var eve in e.EntityValidationErrors)
                {
                    Console.WriteLine("Entity of type \"{0}\" in state \"{1}\" has the following validation errors:",
                        eve.Entry.Entity.GetType().Name, eve.Entry.State);
                    foreach (var ve in eve.ValidationErrors)
                    {
                        Console.WriteLine("- Property: \"{0}\", Error: \"{1}\"",
                            ve.PropertyName, ve.ErrorMessage);
                    }
                }
                throw;

            }
            return acc;
        }

        public Account GetAccountById(int Id)
        {
            var account = eb.Account.Where(o => o.Id == Id).FirstOrDefault();
            if (account != null)
                return account;
            return new Account();
        }
        public Account GetAccountByUserName(string userName)
        {
            var account = eb.Account.Where(o => o.UserName == userName).FirstOrDefault();
            if (account != null)
                return account;
            return null;
        }
        public List<Account> GetAccounts()
        {
            return eb.Account.ToList();
        }
        public IEnumerable<Account> ListAllPaging(string searchString, int page, int pageSize)
        {
            IQueryable<Account> model = eb.Account;
            if (!string.IsNullOrEmpty(searchString))
            {
                model = model.Where(x => x.Name.Contains(searchString) || x.UserName.Contains(searchString));
            }

            return model.OrderByDescending(x => x.Id).ToPagedList(page, pageSize);
        }
    }
    
}
