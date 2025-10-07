

# SBD Content Insights
[![NuGet](https://img.shields.io/nuget/vpre/SBD.ContentInsights.svg)](https://www.nuget.org/packages/SBD.ContentInsights/) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) ![GitHub last commit](https://img.shields.io/github/last-commit/DemeSzabolcs/SBD.ContentInsights)

## About
This is a package for the [Umbraco CMS](https://umbraco.com/), written and tested in [V16.2.0](https://www.nuget.org/packages/Umbraco.Cms/16.2.0), although it likely works on other versions too :).

SBD stands for the initials of my name.

The package, as the name suggests, aims to help get insights about the content, so about the created documents and document types, with the help of [Chart.js](https://www.chartjs.org/).

## Getting started
### Using the package from NuGet

 1. Add a reference in you web project to the package, like this:
```
 <PackageReference Include="SBD.ContentInsights" Version="1.0.0-beta.1" />
```
2. Continue with the "*Usage*" section.

### Using the package as a submodule (not recommended)
 1. Clone the repository.
 2. Either delete [SBD.ContentInsights.TestSite](https://github.com/DemeSzabolcs/SBD.ContentInsights/tree/main/src/SBD.ContentInsights.TestSite) and place your website there, or copy only [SBD.ContentInsights](https://github.com/DemeSzabolcs/SBD.ContentInsights/tree/main/src/SBD.ContentInsights) and insert it into your project.
 3. Reference the `SBD.ContentInsights` project from your web project.
 6. Since the project is a [Razor Class Library](https://learn.microsoft.com/en-us/aspnet/core/razor-pages/ui-class?view=aspnetcore-9.0&tabs=visual-studio), the contents off `App_Plugins` should be copied over automatically.
 7. Continue with the "*Usage*" section.

## Usage
 - Start your website.
 - There will be a new section called "*Content Insights*".

![Content Insights Section](https://raw.githubusercontent.com/DemeSzabolcs/SBD.ContentInsights/refs/heads/main/Docs/Images/content-insights-section.png)

### Permissions
 - Umbraco by default has an "*Administrators*" user group. The package will grant access to the section for this user group.

![Content Insights Section Access](https://raw.githubusercontent.com/DemeSzabolcs/SBD.ContentInsights/refs/heads/main/Docs/Images/content-insights-section-access.png)
 - There will be    a new user group called "*Content Insights Administrators*". This user group only grants one access: access to the "*Content Insights*"    section. Add users to this group to grant them access to the section.

![Content Insights Administrators User Group](https://raw.githubusercontent.com/DemeSzabolcs/SBD.ContentInsights/refs/heads/main/Docs/Images/content-insights-administrators-user-group.png)
 - Permissions are checked during API calls too, so instead of granting a user group the section access, put the desired user into the "*Content Insights Administrators*" group. (The user needs to be in "*Administrators*" or "*Content Insights Administrators*").
 
### Dashboards
Inside the "*Content Insights*" section there are three dashboards:
 - **Content Overview**
 - **User Contributions**
 - **Content Quality & Lifecycle**

#### Content Overview
This dashboard consists of three parts:
 - **Document count by Document Types**: Bar chart representation of the document counts by doucment types. 
 You can hide different types by clicking on them, and reveal all by clicking on "*Reset*".
 - **Document count by Document Status**: Pie chart representation of the document counts by document statuses.
 By default all document types are taken into account, but you can filter them with the dropdown.
 - **Documents**: A table that lists all the documents and their details like: status, name, type, author and date.
 The table is being filtered by document types by the dropdown above the pie chart.
 You can order them by each column, by clicking on the column name.
 Clicking on the name brings you to the edit page of the document.
 Clicking on the author brings you to the edit page of the user.

![Content Overview](https://raw.githubusercontent.com/DemeSzabolcs/SBD.ContentInsights/refs/heads/main/Docs/Images/content-overview.png)

#### User Contribution
This dashboard consists of two parts:
 - **Document count by Users**: Bar chart representation of the document counts by users.
 You can hide different users by clicking on them, and reveal all by clicking on "*Reset*".
 By default all document types are taken into account, but you can filter them with the dropdown.
 Only users with at least one of the following permissions are listed:
	 - **Umb.Document.Create**
	 - **Umb.Document.Update**
	 - **Umb.Document.Publish**
 - **Documents**: A table that lists all the documents and their details like: status, name, type, author and date.
 The table is being filtered by document types by the dropdown above the bar chart.
 You can order them by each column, by clicking on the column name.
 Clicking on the name brings you to the edit page of the document.
 Clicking on the author brings you to the edit page of the user.

![User Contributions](https://raw.githubusercontent.com/DemeSzabolcs/SBD.ContentInsights/refs/heads/main/Docs/Images/user-contributions.png)
 
#### Content Quality & Lifecycle
This dashboard consists of three parts:
 - **Document Age Distribution**: Bar chart representation of the document counts by age. 
By default all document types are taken into account, but you can filter them with the dropdown.
 - **Drafts  Requiring Attention**: By using the slider you can filter for documents with different ages.
 By default only documents with the draft status (not trashed, not published) are counted. You can override this wit the toggle.
 This part is only displaying a count, but the documents will be listed in the documents table.
 By default all document types are taken into account, but you can filter them with the dropdown above the bar chart.
 - **Documents**: A table that lists all the documents and their details like: status, name, type, author and date.
 The table is being filtered by document types by the dropdown above the bar chart.
 The table is also being filtered for the documents with draft statuses only. You can override this with the toggle.
 The table is also being filtered by the documents age slider.
 This way the user can find the specific documents in the table.
 You can order them by each column, by clicking on the column name.
 Clicking on the name brings you to the edit page of the document.
 Clicking on the author brings you to the edit page of the user.

![Content Quality & Lifecycle](https://raw.githubusercontent.com/DemeSzabolcs/SBD.ContentInsights/refs/heads/main/Docs/Images/content-quality-and-lifecycle.png)
 
## Example content
Example content is only available if you clone the whole repository and run the [SBD.ContentInsights.TestSite](https://github.com/DemeSzabolcs/SBD.ContentInsights/tree/main/src/SBD.ContentInsights.TestSite) web project.

### Users
Since the project is **not** using the paid version of [uSync](https://our.umbraco.com/packages/developer-tools/usync/), only one user is created, the default admin user.
But if you want to test something you can add users, and create documents with those users.

### Documents
There are four documents types:
 - **Test document type A**
	 - Public: 1
	 - Draft: 0
	 - Trashed: 1
 - **Test document type B**
	 - Public: 2
	 - Draft: 1
	 - Trashed: 1
 - **Test document type C**
	 - Public: 3
	 - Draft: 2
	 - Trashed: 0
 - **Test document type D**
	 - Public: 0
	 - Draft: 0
	 - Trashed: 2

![Content](https://raw.githubusercontent.com/DemeSzabolcs/SBD.ContentInsights/refs/heads/main/Docs/Images/content.png)

## Updating TypeScript files
If you update the TypeScript files, you need to re-generate the scripts. Simply run:
``` 
npm run build 
```

## Updating TypeScript API
If you contribute and modify the C# controller, then you also need to reflect the changes in TypeScript.
To do this, simply from the `SBD.ContentInsights\src\SBD.ContentInsights\client` folder use:
```
curl -k https://localhost:44387/umbraco/swagger/content-insights/swagger.json -o swagger.json
```
then  run:
``` 
npm run generate 
```
while the site is running.

## Used packages
- [uSync](https://our.umbraco.com/packages/developer-tools/usync/): For creating the example documents on the test site.
- [Chart.js](https://www.chartjs.org/): For displaying data in charts.
- [.NET-Analyzers](https://github.com/Lombiq/.NET-Analyzers): For static code analysis.

## License
This project is licensed under the [MIT License](./LICENSE).  
Third-party libraries are provided under their own licenses. See [Docs/Third-party notices](./Docs/Third-party%20notices) for details.

## Support me
If you want to support me and my work, consider sponsoring me on GitHub. :)

[![GitHub Sponsors](https://img.shields.io/badge/Sponsor-GitHub-ff69b4?logo=github&style=flat)](https://github.com/sponsors/DemeSzabolcs)

All support is appreciated!

If you would like to work with me, feel free to contact me via email.  
My business email address is available in my [GitHub bio](https://github.com/DemeSzabolcs).
