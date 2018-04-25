using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Security.Cryptography;
using System.Text;

namespace eBookManager.Common
{
    public static class Encrypt
    {
        public static string GetMD5(string str)
        {
            string str_md5 = "";
            byte[] arr = System.Text.Encoding.UTF8.GetBytes(str);

            MD5CryptoServiceProvider my_md5 = new MD5CryptoServiceProvider();
            arr = my_md5.ComputeHash(arr);

            foreach (byte b in arr)
            {
                str_md5 += b.ToString("X2");
            }

            return str_md5;
        }
    }
}