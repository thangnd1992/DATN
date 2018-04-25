using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Model.eBookData;
using PagedList;

namespace Model.eBookDao
{
    public class ClassDao
    {
        eBooks eb = null;
        public ClassDao()
        {
            eb = new eBooks();
        }
        public Class InsertClass(Class cl)
        {
            cl.ClassStatus = "active";
            eb.Class.Add(cl);
            eb.SaveChanges();
            return cl;
        }

        public Class UpdateClass(Class cl)
        {
            var Class = GetClassById(cl.Id);
            Class.ClassCode = cl.ClassCode;
            Class.ClassName = cl.ClassName;
            Class.ClassStatus = "active";
            eb.SaveChanges();

            return cl;
        }

        public Class GetClassById(int Id)
        {
            var Class = eb.Class.Where(o => o.Id == Id).FirstOrDefault();
            if (Class != null)
                return Class;
            return new Class();
        }
        public Class GetClassByUserName(string classCode)
        {
            var Class = eb.Class.Where(o => o.ClassCode == classCode).FirstOrDefault();
            if (Class != null)
                return Class;
            return null;
        }
        public List<Class> GetClasss()
        {
            return eb.Class.ToList();
        }
        public IEnumerable<Class> ListAllPaging(string searchString, int page, int pageSize)
        {
            IQueryable<Class> model = eb.Class;
            if (!string.IsNullOrEmpty(searchString))
            {
                model = model.Where(x => x.ClassCode.Contains(searchString) || x.ClassName.Contains(searchString));
            }

            return model.OrderByDescending(x => x.Id).ToPagedList(page, pageSize);
        }
    }
    
}
