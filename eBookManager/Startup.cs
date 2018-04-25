using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(eBookManager.Startup))]
namespace eBookManager
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
