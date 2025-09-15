using Microsoft.Extensions.Logging;
using Umbraco.Cms.Core.Events;
using Umbraco.Cms.Core.Models.Membership;
using Umbraco.Cms.Core.Notifications;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Core.Strings;
using static Umbraco.ContentInsights.Constants.ContentInsights;

namespace Umbraco.ContentInsights.Attributes;

public class AddContentInsightsRolesNotificationHandler(
    IUserGroupService userGroupService,
    ILogger<AddContentInsightsRolesNotificationHandler> logger,
    IShortStringHelper shortStringHelper)
    : INotificationAsyncHandler<UmbracoApplicationStartingNotification>
{
    private readonly IUserGroupService _userGroupService = userGroupService;
    private readonly ILogger<AddContentInsightsRolesNotificationHandler> _logger = logger;
    private readonly IShortStringHelper _shortStringHelper = shortStringHelper;

    private readonly Guid SuperUserKey = Cms.Core.Constants.Security.SuperUserKey;

    public async Task HandleAsync(UmbracoApplicationStartingNotification notification, CancellationToken cancellationToken)
    {
        var userGroup = await _userGroupService.GetAsync(Roles.ContentInsightsAdministratorsGroup);

        if (userGroup != null)
        {
            _logger.LogInformation($"Umbraco.ContentInsights - User group " +
                $"{Roles.ContentInsightsAdministratorsGroup} already exists, skipping creation. If you are " +
                $"having issues, try deleting the group and restarting the web app.");
            return;
        }

        var contentInsightsAdministratorsGroup = new UserGroup(_shortStringHelper)
        {
            Alias = Roles.ContentInsightsAdministratorsGroup,
            Name = "Content Insights Administrators",
            Icon = "icon-dashboard",
            Permissions = new HashSet<string> { Roles.ContentInsightsAdministratorsGroup },
        };

        var attempt = await _userGroupService.CreateAsync(contentInsightsAdministratorsGroup, SuperUserKey);

        if (attempt.Success)
        {
            _logger.LogInformation($"Umbraco.ContentInsights - Created user group " +
                $"{Roles.ContentInsightsAdministratorsGroup}.");

            var createdContentInsightsAdministratorsGroup = attempt.Result;
            createdContentInsightsAdministratorsGroup.AddAllowedSection(Sections.ContentInsights);

            var updateAttempt = await _userGroupService.UpdateAsync(createdContentInsightsAdministratorsGroup, SuperUserKey);

            if (updateAttempt.Success)
            {
                var adminGroup = await _userGroupService.GetAsync("admin");

                if (adminGroup == null)
                {
                    _logger.LogWarning("Umbraco.ContentInsights - There is no \"admin\" group, the " +
                        "Content Insights section was not added to the group's allowed sections. Please add it " +
                        $"manually, or add the specified users to the {Roles.ContentInsightsAdministratorsGroup}");
                }
                else
                {
                    adminGroup.AddAllowedSection(Sections.ContentInsights);
                    await _userGroupService.UpdateAsync(adminGroup, SuperUserKey);
                }
            }
            else
            {
                _logger.LogError(
                    updateAttempt.Exception,
                    $"Umbraco.ContentInsights - Failed to update user group {Roles.ContentInsightsAdministratorsGroup}.");
            }
        }
        else
        {
            _logger.LogError(
                attempt.Exception,
                $"Umbraco.ContentInsights - Failed to create user group {Roles.ContentInsightsAdministratorsGroup}.");
        }
    }
}
