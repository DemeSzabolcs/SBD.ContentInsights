using Microsoft.Extensions.Logging;
using Umbraco.Cms.Core;
using Umbraco.Cms.Core.Events;
using Umbraco.Cms.Core.Notifications;
using Umbraco.Cms.Core.Services;

namespace Umbraco.ContentInsights.NotificationHandlers;

public class AuthorizeAdminRoleNotificationHandler(
    IUserGroupService userGroupService,
    ILogger<AuthorizeAdminRoleNotificationHandler> logger)
    : INotificationAsyncHandler<UmbracoApplicationStartingNotification>
{
    private readonly IUserGroupService _userGroupService = userGroupService;
    private readonly ILogger<AuthorizeAdminRoleNotificationHandler> _logger = logger;

    public async Task HandleAsync(UmbracoApplicationStartingNotification notification, CancellationToken cancellationToken)
    {
        var adminGroup = await _userGroupService.GetAsync("admin");

        if (adminGroup == null)
        {
            _logger.LogWarning("There is no \"admin\" group, the section was not added to the group. Please add it " +
                "manually!");
            return;
        }

        adminGroup.AddAllowedSection("Umbraco.ContentInsights");
        await _userGroupService.UpdateAsync(adminGroup, Constants.Security.SuperUserKey);
    }
}
