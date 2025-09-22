using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.DependencyInjection;
using OpenIddict.Validation.AspNetCore;
using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Core.DependencyInjection;
using static SBD.ContentInsights.Constants.ContentInsights;

namespace SBD.ContentInsights.Attributes;

public class AuthorizeContentInsightsAdministratorsPolicyComposer : IComposer
{
    public void Compose(IUmbracoBuilder builder) =>
        builder.Services.AddAuthorizationBuilder()
            .AddPolicy(Roles.ContentInsightsAdministratorsGroup, policy =>
            {
                policy.RequireRole(
                    Umbraco.Cms.Core.Constants.Security.AdminGroupAlias,
                    Roles.ContentInsightsAdministratorsGroup
                );
                policy.AuthenticationSchemes.Add(OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme);
                policy.RequireAuthenticatedUser();
            });
}

[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, Inherited = true, AllowMultiple = true)]
public sealed class AuthorizeContentInsightsAdministratorsAttribute : AuthorizeAttribute
{
    public AuthorizeContentInsightsAdministratorsAttribute() =>
        Policy = Constants.ContentInsights.Roles.ContentInsightsAdministratorsGroup;
}
