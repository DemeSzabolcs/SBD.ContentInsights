using Microsoft.Extensions.DependencyInjection;
using SBD.ContentInsights.Attributes;
using SBD.ContentInsights.Swagger;
using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Core.DependencyInjection;
using Umbraco.Cms.Core.Notifications;

namespace SBD.ContentInsights;

public class ContentInsightsComposer : IComposer
{
    public void Compose(IUmbracoBuilder builder)
    {
        builder.AddNotificationAsyncHandler<UmbracoApplicationStartingNotification, AddContentInsightsRolesNotificationHandler>();
        builder.Services.ConfigureOptions<ContentInsightsConfigureSwaggerGenOptions>();
    }
}
