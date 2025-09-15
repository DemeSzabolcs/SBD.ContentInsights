using Microsoft.Extensions.DependencyInjection;
using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Core.DependencyInjection;
using Umbraco.Cms.Core.Notifications;
using Umbraco.ContentInsights.Attributes;
using Umbraco.ContentInsights.Swagger;

namespace Umbraco.ContentInsights;

public class ContentInsightsComposer : IComposer
{
    public void Compose(IUmbracoBuilder builder)
    {
        builder.AddNotificationAsyncHandler<UmbracoApplicationStartingNotification, AddContentInsightsRolesNotificationHandler>();
        builder.Services.ConfigureOptions<ContentInsightsConfigureSwaggerGenOptions>();
    }
}
