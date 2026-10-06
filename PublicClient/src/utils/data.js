import { HiMiniDocumentPlus } from "react-icons/hi2";
import {
  TbAccessible,
  TbAlertTriangle,
  TbBed,
  TbBriefcase,
  TbBuilding,
  TbCategory,
  TbCloudUpload,
  TbCreditCard,
  TbEdit,
  TbFileCheck,
  TbFileText,
  TbForms,
  TbHeart,
  TbHome,
  TbInfoCircle,
  TbKey,
  TbLayersDifference,
  TbListCheck,
  TbMapPin,
  TbNews,
  TbPhoto,
  TbPigMoney,
  TbRefresh,
  TbReportSearch,
  TbRoute,
  TbSettings,
  TbTag,
  TbUpload,
  TbUser,
  TbUserExclamation,
  TbUserPlus,
  TbUsers,
  TbUsersGroup,
  TbUserStar,
  TbWallet,
  TbWorld,
} from "react-icons/tb";

import {
  LayoutDashboard,
  Database,
  Settings,
  Briefcase,
  Users,
  CreditCard,
  FileText,
  Monitor,
  User,
  Landmark,
} from "lucide-react";

import { language } from "./language";
import { toEthiopian } from "ethiopian-date";
import {
  ReportPermissions,
  externalUpdateRequestsSidebarPermission,
  externalEntityPermissionsSidebarPermission,
  getCitiesPermission,
  getSubCitiesPermission,
  getWoredasPermission,
  getProgramTypesPermission,
  getBedroomTypesPermission,
  getHousingPurposesPermission,
  getMaritalStatusesPermission,
  getJobTypesPermission,
  getDisabilityStatusesPermission,
  getOrgnaizationsPermissions,
  getUsersPermission,
  getGroupsPermission,
  getPermissions,
  getallPermCategoryPermission,
  getExternalEntitiesPermission,
  getAllExOrgUsersPermission,
  getApprovalWorkflowsPermission,
  getFormConfigsPermission,
  getApplicantsPermission,
  viewAuditLogPermission,
  getRegistrationCampaignsPermission,
  getProclamationsPermission,
  getRegistrationFormsPermission,
  getAahdabBatchUploadsPermission,
  getPaymentMethodsPermission,
  getPaymentConfigsPermission,
  getAllCMSNewsPermission,
  getAllCMSHerosPermission,
  getAllCMSMainDirectorsPermission,
  getAllCMSAboutsPermission,
  getBankAccountsPermission,
} from "./permissions";
import { FaRegCircleQuestion } from "react-icons/fa6";
import { MousePointerClick } from "lucide-react";

export const firstSidebarLinks = [
  {
    title: language.navDashboard,
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: language.masterData,
    url: "/master-data",
    icon: Database,
  },
  {
    title: language.administration,
    url: "/administration",
    icon: Settings,
  },
  {
    title: language.navOperations,
    url: "/operations",
    icon: Briefcase,
  },
  {
    title: language.navRegistrationAndCampaigns,
    url: "/registration",
    icon: Users,
  },
  {
    title: language.navPayments,
    url: "/payments",
    icon: CreditCard,
  },
  {
    title: language.cms,
    url: "/cms",
    icon: FileText,
  },
  {
    title: language.navSystemAndMonitoring,
    url: "/system",
    icon: Monitor,
  },
];

export const sidebarLinks = {
  navMain: [
    // Dashboard
    {
      title: language.dashboard,
      url: "/dashboard",
      category: "dashboard",
      items: [
        {
          title: language.analytics,
          url: "/dashboard/analytics",
          selfView: true,
          icon: TbReportSearch,
          require: "any",
          permissions: [""], // TODO: check and finalize
        },
        {
          title: language.reports,
          url: "/dashboard/reports",
          selfView: true,
          icon: TbReportSearch,
          require: "any",
          permissions: ReportPermissions,
        },
        {
          title: ["buttons", "buttons"],
          url: "/dashboard/buttons",
          selfView: true,
          icon: MousePointerClick,
          require: "any",
          permissions: [""],
        },
      ],
    },

    // Administrative
    {
      title: language.administrative,
      url: "/master-data",
      category: "master-data",
      items: [
        {
          title: language.cities,
          url: "/master-data/cities",
          selfView: true,
          icon: HiMiniDocumentPlus,
          require: "any",
          permissions: getCitiesPermission,
        },
        {
          title: language.subCities,
          url: "/master-data/sub-cities",
          selfView: true,
          icon: TbUserExclamation,
          require: "any",
          permissions: getSubCitiesPermission,
        },
        {
          title: language.woredas,
          url: "/master-data/woredas",
          selfView: true,
          icon: FaRegCircleQuestion,
          require: "any",
          permissions: getWoredasPermission,
        },
      ],
    },

    // Housing
    {
      title: language.housing,
      url: "/master-data",
      category: "master-data",
      items: [
        {
          title: language.programTypes,
          url: "/master-data/program-types",
          selfView: true,
          icon: TbTag,
          require: "any",
          permissions: getProgramTypesPermission,
        },
        {
          title: language.bedroomTypes,
          url: "/master-data/bedroom-types",
          selfView: true,
          icon: TbBed,
          require: "any",
          permissions: getBedroomTypesPermission,
        },
        {
          title: language.housingPurposes,
          url: "/master-data/housing-purposes",
          selfView: true,
          icon: TbHome,
          require: "any",
          permissions: getHousingPurposesPermission,
        },
      ],
    },

    // Demographic
    {
      title: language.demographic,
      url: "/master-data",
      category: "master-data",
      items: [
        {
          title: language.maritalStatuses,
          url: "/master-data/marital-statuses",
          selfView: true,
          icon: TbHeart,
          require: "any",
          permissions: getMaritalStatusesPermission,
        },
        {
          title: language.jobTypes,
          url: "/master-data/job-types",
          selfView: true,
          icon: TbBriefcase,
          require: "any",
          permissions: getJobTypesPermission,
        },
        {
          title: language.disabilityStatuses,
          url: "/master-data/disability-statuses",
          selfView: true,
          icon: TbAccessible,
          require: "any",
          permissions: getDisabilityStatusesPermission,
        },
      ],
    },

    // Proclamations
    {
      title: language.proclamations,
      url: "/master-data",
      category: "master-data",
      items: [
        {
          title: language.proclamations,
          url: "/master-data/proclamations",
          selfView: true,
          icon: TbFileText,
          require: "any",
          permissions: getProclamationsPermission,
        },
      ],
    },

    // Organization
    {
      title: language.organization,
      url: "/administration",
      category: "administration",
      items: [
        {
          title: language.organization,
          url: "/administration/organization",
          selfView: true,
          icon: TbBuilding,
          require: "any",
          permissions: getOrgnaizationsPermissions,
        },
      ],
    },
    {
      title: language.applicants || "Applicants",
      url: "/applicants",
      category: "applicants",
      items: [
        {
          title: language.allApplicants || "All Applicants",
          url: "/applicants/list",
          selfView: true,
          icon: Users,
          require: "any",
          permissions: getApplicantsPermission,
        },
        {
          title: language.applicantDetails || "Applicant Details",
          url: "/applicants/:id",
          selfView: true,
          icon: User,
          require: "any",
          permissions: getApplicantsPermission,
          hidden: true, // Hidden from main navigation, used for routing
        },
      ],
    },

    // User & Access Control
    {
      title: language.userAndAccessControl,
      url: "/administration",
      category: "administration",
      items: [
        {
          title: language.users,
          url: "/administration/users",
          selfView: true,
          icon: TbUsers,
          require: "any",
          permissions: getUsersPermission,
        },
        {
          title: language.groups,
          url: "/administration/groups",
          selfView: true,
          icon: TbUsersGroup,
          require: "any",
          permissions: getGroupsPermission,
        },
        {
          title: language.permissions,
          url: "/administration/permissions",
          selfView: true,
          icon: TbKey,
          require: "any",
          permissions: getPermissions,
        },
        {
          title: language.permissionCategories,
          url: "/administration/permission-categories",
          selfView: true,
          icon: TbCategory,
          require: "any",
          permissions: getallPermCategoryPermission,
        },
      ],
    },

    // External Entity
    {
      title: language.externalEntity,
      url: "/administration",
      category: "administration",
      items: [
        {
          title: language.externalEntities,
          url: "/administration/external-entities",
          selfView: true,
          icon: TbWorld,
          require: "any",
          permissions: getExternalEntitiesPermission,
        },
        {
          title: language.externalEntityUsers,
          url: "/administration/external-entity-users",
          selfView: true,
          icon: TbUser,
          require: "any",
          permissions: getAllExOrgUsersPermission,
        },
        {
          title: language.fieldAccessConfigs,
          url: "/administration/external-entity-permissions",
          selfView: true,
          icon: TbKey,
          require: "any",
          permissions: externalEntityPermissionsSidebarPermission,
        },
        {
          title: language.externalUpdateRequests,
          url: "/administration/external-update-requests",
          selfView: true,
          icon: TbUpload,
          require: "any",
          permissions: viewAuditLogPermission,
        },
      ],
    },

    // Applicant Management
    {
      title: language.applicantManagement,
      url: "/operations",
      category: "operations",
      items: [
        {
          title: language.applicants,
          url: "/operations/applicants",
          selfView: true,
          icon: TbUserPlus,
          require: "any",
          permissions: getApplicantsPermission,
        },
        {
          title: language.missingApplicantClaims,
          url: "/operations/missing-applicant-claims",
          selfView: true,
          icon: TbAlertTriangle,
          require: "any",
          permissions: getRegistrationCampaignsPermission,
        },
        {
          title: language.updateRequests,
          url: "/administration/external-update-requests",
          selfView: true,
          icon: TbEdit,
          require: "any",
          permissions: externalUpdateRequestsSidebarPermission,
        },
        // Data Import & Batch Ops
        {
          title: language.dataImportAndBatchOps,
          url: "/operations",
          category: "system",
          items: [
            {
              title: language.aahdabBatchUploads,
              url: "/operations/aahdab-batch-uploads",
              selfView: true,
              icon: TbCloudUpload,
              require: "any",
              permissions: getAahdabBatchUploadsPermission,
            },
            {
              title: language.aahdabBatchUpdates,
              url: "/operations/aahdab-batch-updates",
              selfView: true,
              icon: TbRefresh,
              require: "any",
              permissions: getAahdabBatchUploadsPermission,
            },
          ],
        },
      ],
    },

    // Workflow
    {
      title: language.workflow,
      url: "/administration",
      category: "administration",
      items: [
        {
          title: language.approvalWorkflows,
          url: "/administration/approval-workflows",
          selfView: true,
          icon: TbRoute,
          require: "any",
          permissions: getApprovalWorkflowsPermission,
        },
        {
          title: language.formConfigs,
          url: "/administration/form-configs",
          selfView: true,
          icon: TbForms,
          require: "any",
          permissions: getFormConfigsPermission,
        },
      ],
    },

    // Banking & Savings
    {
      title: language.bankingAndSavings,
      url: "/payments",
      category: "payments",
      items: [
        {
          title: language.bankAccounts,
          url: "/payments/bank-accounts",
          selfView: true,
          icon: Landmark,
          require: "any",
          permissions: getBankAccountsPermission,
        },
        {
          title: language.bankBatchUploads,
          url: "/payments/bank-batch-uploads",
          selfView: true,
          icon: TbUpload,
          require: "any",
          permissions: ReportPermissions,
        },
      ],
    },

    // Payments & Billing
    {
      title: language.paymentsAndBilling,
      url: "/payments",
      category: "payments",
      items: [
        {
          title: language.payments,
          url: "/payments/list",
          selfView: true,
          icon: TbCreditCard,
          require: "any",
          permissions: ReportPermissions,
        },
        {
          title: language.paymentMethods,
          url: "/payments/payment-methods",
          selfView: true,
          icon: TbWallet,
          require: "any",
          permissions: getPaymentMethodsPermission,
        },
        {
          title: language.paymentConfigs,
          url: "/payments/payment-configs",
          selfView: true,
          icon: TbSettings,
          require: "any",
          permissions: getPaymentConfigsPermission,
        },
      ],
    },
    // Banking & Savings

    // Payments & Billing
    {
      title: language.paymentsAndBilling,
      url: "/payments",
      category: "payments",
      items: [
        {
          title: language.paymentMethods,
          url: "/payments/payment-methods",
          selfView: true,
          icon: TbWallet,
          require: "any",
          permissions: getPaymentMethodsPermission,
        },
        // ...
      ],
    },
    // {
    //   title: language.paymentsAndBilling,
    //   url: "/payments",
    //   category: "payments",
    //   items: [
    //     {
    //       title: language.paymentMethods,
    //       url: "/payments/payment-methods",
    //       selfView: true,
    //       icon: TbWallet,
    //       require: "any",
    //       permissions: ReportPermissions,
    //     },
    //     // ...
    //   ],
    // },
    {
      title: language.registrationAndCampaigns,
      url: "/registration",
      category: "registration",
      items: [
        {
          title: language.registrationForms,
          icon: TbFileText, // You can change the icon
          require: "any",
          permissions: getRegistrationCampaignsPermission,
          items: [
            {
              title: language.registrationForms,
              url: "/registration/forms",
              selfView: true,
              icon: TbForms,
              require: "any",
              permissions: getRegistrationFormsPermission,
            },
            {
              title: language.formDecisions,
              url: "/registration/forms/decisions",
              selfView: true,
              icon: TbFileCheck,
              require: "any",
              permissions: ReportPermissions,
            },
            {
              title: language.decisionGivers,
              url: "/registration/forms/decision-givers",
              selfView: true,
              icon: TbUsers,
              require: "any",
              permissions: ReportPermissions,
            },
            {
              title: language.servicePayments,
              url: "/registration/forms/service-payments",
              selfView: true,
              icon: TbCreditCard,
              require: "any",
              permissions: ReportPermissions,
            },
          ],
        },
        {
          title: language.registrationStations,
          icon: TbMapPin,
          require: "any",
          permissions: ReportPermissions,
          items: [
            {
              title: language.registrationStations,
              url: "/registration/stations",
              selfView: true,
              icon: TbMapPin,
              require: "any",
              permissions: ReportPermissions,
            },
            {
              title: language.approvalUnits,
              url: "/registration/stations/approval-units",
              selfView: true,
              icon: TbBuilding,
              require: "any",
              permissions: ReportPermissions,
            },
            {
              title: language.approvalUnitPartitions,
              url: "/registration/stations/approval-unit-partitions",
              selfView: true,
              icon: TbLayersDifference,
              require: "any",
              permissions: ReportPermissions,
            },
          ],
        },
      ],
    },
    // Content Management
    {
      title: language.contentManagement,
      url: "/cms",
      category: "cms",
      items: [
        {
          title: language.news,
          url: "/cms/news",
          selfView: true,
          icon: TbNews,
          require: "any",
          permissions: getAllCMSNewsPermission,
        },
        {
          title: language.hero,
          url: "/cms/hero",
          selfView: true,
          icon: TbPhoto,
          require: "any",
          permissions: getAllCMSHerosPermission,
        },
        {
          title: language.mainDirector,
          url: "/cms/main-director",
          selfView: true,
          icon: TbUserStar,
          require: "any",
          permissions: getAllCMSMainDirectorsPermission,
        },
        {
          title: language.about,
          url: "/cms/about",
          selfView: true,
          icon: TbInfoCircle,
          require: "any",
          permissions: getAllCMSAboutsPermission,
        },
      ],
    },

    // System & Monitoring
    {
      title: language.systemAndMonitoring,
      url: "/system",
      category: "system",
      items: [
        {
          title: language.auditLogs,
          url: "/system/audit-logs",
          selfView: true,
          icon: TbListCheck,
          require: "any",
          permissions: viewAuditLogPermission,
        },
      ],
    },
  ],
};

export const organizationColumns = (language) => [
  { key: "no", label: t(language, "rollNo", "Roll No."), width: "w-16" },
  {
    key: "name",
    label: t(language, "organizationName", "Organization Name"),
    width: "min-w-[220px]",
    sortable: false,
    sortKey: `name.${language}`,
  },
  {
    key: "location",
    label: t(language, "location", "Location"),
    width: "min-w-[180px]",
    sortable: false,
    sortKey: `location.${language}`,
  },
  {
    key: "type",
    label: t(language, "type", "Type"),
    width: "w-36",
    sortable: false,
    sortKey: "functionsAs",
  },
  {
    key: "status",
    label: t(language, "status", "Status"),
    width: "w-32",
    sortable: false,
    sortKey: "status",
  },
  {
    key: "createdAt",
    label: t(language, "createdAt", "Created At"),
    width: "w-40",
    sortable: true,
    sortKey: "createdAt",
  },
  {
    key: "actions",
    label: t(language, "actions", "Actions"),
    width: "w-28",
  },
];

export const groupColumns = (language) => [
  { key: "no", label: t(language, "rollNo", "Roll No."), width: "w-16" },
  {
    key: "name",
    label: t(language, "groupName", "Group Name"),
    width: "min-w-[220px]",
  },
  {
    key: "organization",
    label: t(language, "organization", "Organization"),
    width: "min-w-[220px]",
  },
  {
    key: "status",
    label: t(language, "status", "Status"),
    width: "w-32",
  },
  {
    key: "actions",
    label: t(language, "actions", "Actions"),
    width: "w-28",
  },
];

export const registrationCampaignColumns = (language) => [
  { key: "no", label: t(language, "rollNo", "Roll No."), width: "w-16" },
  {
    key: "campaignName",
    label: t(language, "campaignName", "Campaign Name"),
    width: "min-w-[250px]",
    sortable: true,
    sortKey: `campaignName.${language}`,
  },
  {
    key: "organization",
    label: t(language, "organization", "Organization"),
    width: "min-w-[200px]",
    sortable: false,
    sortKey: "organization",
  },
  {
    key: "type",
    label: t(language, "type", "Type"),
    width: "w-44",
    sortable: false,
    sortKey: "type",
  },
  {
    key: "isPublic",
    label: t(language, "isPublic", "Is Public"),
    width: "w-32",
    sortable: false,
    sortKey: "isPublic",
  },
  {
    key: "isRegistrationActive",
    label: t(language, "registrationActive", "Reg. Active"),
    width: "w-32",
    sortable: false,
    sortKey: "isRegistrationActive",
  },
  {
    key: "status",
    label: t(language, "status", "Status"),
    width: "w-32",
    sortable: false,
    sortKey: "status",
  },
  {
    key: "createdAt",
    label: t(language, "createdAt", "Created At"),
    width: "w-40",
    sortable: true,
    sortKey: "createdAt",
  },
  {
    key: "actions",
    label: t(language, "actions", "Actions"),
    width: "w-28",
  },
];
export const registrationStationColumns = (language) => [
  { key: "no", label: t(language, "rollNo", "Roll No."), width: "w-16" },
  {
    key: "name",
    label: t(language, "stationName", "Station Name"),
    width: "min-w-[200px]",
    sortable: true,
    sortKey: `name.${language}`,
  },
  {
    key: "organization",
    label: t(language, "organization", "Organization"),
    width: "min-w-[200px]",
  },
  {
    key: "registrationCampaign",
    label: t(language, "campaign", "Campaign"),
    width: "min-w-[200px]",
  },
  {
    key: "status",
    label: t(language, "status", "Status"),
    width: "w-32",
  },
  {
    key: "createdAt",
    label: t(language, "createdAt", "Created At"),
    width: "w-40",
    sortable: true,
    sortKey: "createdAt",
  },
  {
    key: "actions",
    label: t(language, "actions", "Actions"),
    width: "w-28",
  },
];

export const registrationApprovalUnitColumns = (language) => [
  { key: "no", label: t(language, "rollNo", "Roll No."), width: "w-16" },
  {
    key: "name",
    label: t(language, "unitName", "Unit Name"),
    width: "min-w-[200px]",
    sortable: true,
    sortKey: `name.${language}`,
  },
  {
    key: "station",
    label: t(language, "station", "Station"),
    width: "min-w-[180px]",
  },
  {
    key: "levelOrder",
    label: t(language, "level", "Level"),
    width: "w-24",
    sortable: true,
    sortKey: "levelOrder",
  },
  {
    key: "type",
    label: t(language, "finality", "Finality"),
    width: "w-40",
  },
  {
    key: "status",
    label: t(language, "status", "Status"),
    width: "w-32",
  },
  {
    key: "actions",
    label: t(language, "actions", "Actions"),
    width: "w-28",
  },
];

export const registrationUnitPartitionColumns = (language) => [
  { key: "no", label: t(language, "rollNo", "Roll No."), width: "w-16" },
  {
    key: "partitionName",
    label: t(language, "partitionName", "Partition Name"),
    width: "min-w-[200px]",
    sortable: true,
    sortKey: `partitionName.${language}`,
  },
  {
    key: "unit",
    label: t(language, "approvalUnit", "Approval Unit"),
    width: "min-w-[180px]",
  },
  {
    key: "partitionMethod",
    label: t(language, "partitionMethod", "Partition Method"),
    width: "w-40",
  },
  {
    key: "status",
    label: t(language, "status", "Status"),
    width: "w-32",
  },
  {
    key: "actions",
    label: t(language, "actions", "Actions"),
    width: "w-28",
  },
];

export const registrationFormDecisionColumns = (language) => [
  { key: "no", label: t(language, "rollNo", "Roll No."), width: "w-16" },
  {
    key: "formSeqNumber",
    label: t(language, "seqNo", "Seq No."),
    width: "w-28",
    sortable: true,
    sortKey: "seqNumber",
  },
  {
    key: "fullName",
    label: t(language, "applicantName", "Applicant Name"),
    width: "min-w-[220px]",
    sortable: true,
    sortKey: `fullName.${language}`,
  },
  {
    key: "faydaId",
    label: t(language, "faydaId", "Fayda ID"),
    width: "w-44",
  },
  {
    key: "currentUnit",
    label: t(language, "currentUnit", "Current Unit"),
    width: "min-w-[180px]",
  },
  {
    key: "overallStatus",
    label: t(language, "overallStatus", "Overall Status"),
    width: "w-32",
  },
  {
    key: "lastActionAt",
    label: t(language, "lastAction", "Last Action"),
    width: "w-40",
    sortable: true,
    sortKey: "lastActionAt",
  },
  {
    key: "actions",
    label: t(language, "actions", "Actions"),
    width: "w-28",
  },
];

export const registrationDecisionGiverColumns = (language) => [
  { key: "no", label: t(language, "rollNo", "Roll No."), width: "w-16" },
  {
    key: "user",
    label: t(language, "user", "User"),
    width: "min-w-[220px]",
  },
  {
    key: "role",
    label: t(language, "role", "Role"),
    width: "w-44",
  },
  {
    key: "status",
    label: t(language, "status", "Status"),
    width: "w-32",
  },
  {
    key: "actions",
    label: t(language, "actions", "Actions"),
    width: "w-28",
  },
];

export const servicePaymentColumns = (language) => [
  { key: "no", label: t(language, "rollNo", "Roll No."), width: "w-16" },
  {
    key: "paymentName",
    label: t(language, "paymentName", "Payment Name"),
    width: "min-w-[220px]",
    sortable: true,
    sortKey: `name.${language}`,
  },
  {
    key: "amount",
    label: t(language, "amount", "Amount"),
    width: "w-32",
    sortable: true,
    sortKey: "amount",
  },
  {
    key: "status",
    label: t(language, "status", "Status"),
    width: "w-32",
  },
  {
    key: "actions",
    label: t(language, "actions", "Actions"),
    width: "w-28",
  },
];

export const permissionColumns = (language) => [
  { key: "no", label: t(language, "rollNo", "Roll No."), width: "w-16" },
  {
    key: "name",
    label: t(language, "name", "Name"),
    width: "min-w-[200px]",
  },
  {
    key: "code_name",
    label: t(language, "codeNameLabel", "Code Name"),
    width: "min-w-[200px]",
  },
  {
    key: "category",
    label: languageTranslate(language, "category"),
    width: "min-w-[150px]",
  },
  {
    key: "sensitive",
    label: languageTranslate(language, "sensitive"),
    width: "w-28",
  },
  {
    key: "status",
    label: languageTranslate(language, "status"),
    width: "w-28",
  },
  {
    key: "actions",
    label: languageTranslate(language, "actions"),
    width: "w-28",
  },
];

export const permissionCategoriesColumns = (language) => [
  { key: "no", label: languageTranslate(language, "rollNo"), width: "w-16" },
  {
    key: "name",
    label: languageTranslate(language, "name"),
    width: "min-w-[300px]",
  },
  {
    key: "status",
    label: languageTranslate(language, "status"),
    width: "w-32",
  },
  {
    key: "createdAt",
    label: languageTranslate(language, "createdAt"),
    width: "w-40",
  },
  {
    key: "actions",
    label: languageTranslate(language, "actions"),
    width: "w-28",
  },
];

export const externalEntitiesColumns = (language) => [
  { key: "no", label: languageTranslate(language, "rollNo"), width: "w-16" },
  {
    key: "name",
    label: languageTranslate(language, "name"),
    width: "min-w-[220px]",
  },
  {
    key: "entityType",
    label: languageTranslate(language, "type"),
    width: "min-w-[160px]",
  },
  {
    key: "organization",
    label: languageTranslate(language, "organization"),
    width: "min-w-[180px]",
  },
  {
    key: "status",
    label: languageTranslate(language, "status"),
    width: "w-28",
  },
  {
    key: "createdAt",
    label: languageTranslate(language, "createdAt"),
    width: "w-36",
  },
  {
    key: "actions",
    label: languageTranslate(language, "actions"),
    width: "w-28",
  },
];

export const externalEntitiesStaticColumns = [
  { key: "no", label: "rollNo", width: "w-16" },
  { key: "name", label: "name", width: "min-w-[220px]" },
  { key: "entityType", label: "type", width: "min-w-[160px]" },
  { key: "organization", label: "organization", width: "min-w-[180px]" },
  { key: "status", label: "status", width: "w-28" },
  { key: "createdAt", label: "createdAt", width: "w-36" },
  { key: "actions", label: "actions", width: "w-28" },
];

export const approvalWorkflowColumns = (language) => [
  { key: "no", label: t(language, "rollNo", "Roll No."), width: "w-16" },
  {
    key: "name",
    label: t(language, "workflowName", "Workflow Name"),
    width: "min-w-[220px]",
    sortable: false,
    sortKey: "name.en",
  },
  {
    key: "organization",
    label: t(language, "organization", "Organization"),
    width: "min-w-[180px]",
    sortable: false,
    sortKey: "organization",
  },
  {
    key: "requestType",
    label: t(language, "requestType", "Request Type"),
    width: "min-w-[180px]",
    sortable: false,
    sortKey: "requestType",
  },
  {
    key: "steps",
    label: t(language, "steps", "Steps"),
    width: "min-w-[220px]",
    sortable: false,
    sortKey: "steps",
  },
  {
    key: "status",
    label: t(language, "status", "Status"),
    width: "w-32",
    sortable: false,
    sortKey: "status",
  },
  {
    key: "createdAt",
    label: t(language, "createdAt", "Created At"),
    width: "w-40",
    sortable: true,
    sortKey: "createdAt",
  },
  {
    key: "actions",
    label: t(language, "actions", "Actions"),
    width: "w-28",
  },
];

export const approvalWorkflowDetailStepTableColumns = [
  { key: "no", label: "rollNo", width: "w-16" },
  { key: "user", label: "user", width: "min-w-[240px]" },
  { key: "stepOrder", label: "stepOrder", width: "w-28" },
  {
    key: "documentRequirement",
    label: "documentRequirement",
    width: "min-w-[220px]",
  },
  { key: "documentLabel", label: "documentLabel", width: "min-w-[180px]" },
];

export const getEthiopianDate = (dateInput) => {
  if (!dateInput) return null;

  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
  if (isNaN(date.getTime())) return null;

  try {
    const [year, month, day] = toEthiopian(
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate(),
    );

    const ethiopianMonths = [
      "መስከረም",
      "ጥቅምት",
      "ኅዳር",
      "ታኅሣሥ",
      "ጥር",
      "የካቲት",
      "መጋቢት",
      "ሚያዝያ",
      "ግንቦት",
      "ሰኔ",
      "ሐምሌ",
      "ነሐሴ",
      "ጳጉሜ",
    ];

    return {
      year,
      month,
      monthName: ethiopianMonths[month - 1],
      day,
      formatted: `${day} ${ethiopianMonths[month - 1]} ${year}`,
    };
  } catch {
    return null;
  }
};
export const customFormatNumber = (number) => {
  if (!number || isNaN(number)) return "";
  let numStr = number.toString();
  let [integerPart, decimalPart = ""] = numStr.split(".");
  let formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return decimalPart ? `${formattedInteger}.${decimalPart}` : formattedInteger;
};

export const formatFileSize = (bytes, decimals = 1) => {
  if (bytes === 0) return "0 Bytes";
  if (!bytes || bytes < 0) return "—";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

export function languageTranslate(lang, key) {
  if (!key || !language[key]) return undefined;

  switch (lang) {
    case "en":
      return language[key][0];
    case "am":
      return language[key][1];
    default:
      return undefined;
  }
}

export function t(language, key, fallback) {
  const translated = languageTranslate(language, key);
  return translated || fallback;
}

export const languages = ["en", "am"];
export const languageNames = {
  en: {
    en: "English",
    am: "እንግሊዝኛ",
  },
  am: {
    en: "Amharic",
    am: "አማርኛ",
  },
};

export const formatTimeAgo = (dateString) => {
  if (!dateString) return "Never";
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 60) return "Just now";
  if (diffInSeconds < 3600)
    return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400)
    return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 2592000)
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  if (diffInSeconds < 31536000)
    return `${Math.floor(diffInSeconds / 2592000)} months ago`;
  return `${Math.floor(diffInSeconds / 31536000)} years ago`;
};

export const loadFilters = (path, key) => {
  if (location?.pathname !== path) return null;
  const stored = localStorage.getItem(key);
  if (!stored) return null;
  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
};

export const parseSort = (v) => {
  const s = String(v ?? "");
  return s === "1" || s === "-1" ? s : "-1";
};

export const STRUCT_LEVEL_FILTER_SPEC = {
  name: {
    key: "name",
    default: "",
  },
  level: {
    key: "level",
    default: "",
    parse: (v) => String(v || "").trim(),
  },
  org: {
    key: "org",
    default: "",
    parse: (v) => String(v || "").trim(),
    serialize: (v) => String(v || "").trim(),
    omit: (v) => !String(v || "").trim(),
  },
  page: {
    key: "page",
    default: 1,
    parse: (v) => {
      const n = parseInt(v || "", 10);
      return !isNaN(n) && n > 0 ? n : 1;
    },
    serialize: (v) => String(v || 1),
    omit: (v) => Number(v) <= 1,
  },
  sort: {
    key: "sort",
    default: "-1",
    parse: parseSort,
    serialize: parseSort,
    omit: () => false,
  },
};

export const normalizeDelegationStatus = (v) =>
  ["pending", "active", "rejected", "revoked"].includes(v) ? v : "";

const parsePage = (v) => {
  const n = parseInt(String(v ?? ""), 10);
  return Number.isFinite(n) && n > 0 ? n : 1;
};

export const PERM_CATEGORY_FILTER_SPEC = {
  page: {
    key: "page",
    default: 1,
    parse: parsePage,
    serialize: (v) => String(parsePage(v)),
    omit: (v) => parsePage(v) <= 1,
  },
  sort: {
    key: "sort",
    default: "-1",
    parse: parseSort,
    serialize: parseSort,
    omit: (v) => parseSort(v) === "-1",
  },
  name: {
    key: "name",
    default: "",
  },
};

const darkMode = localStorage.getItem("darkMode");

export const isDarkMode = darkMode === "true" || darkMode === "1";

export const formatTime = (ms) => {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
};

export const languagesForInputs = [
  { code: "en", label: "ENGLISH", placeholder: "Enter text in English" },
  { code: "am", label: "AMHARIC", placeholder: "Enter text in Amharic" },
];

export function normalizeApiArray(data) {
  if (Array.isArray(data)) return data;
  if (data && typeof data === "object") {
    const firstArray = Object.values(data).find((v) => Array.isArray(v));
    if (firstArray) return firstArray;
  }
  return [];
}

export function getDisplayName(item, lang) {
  if (!item) return "-";
  const raw = item.name || item.letterName || item.fullname || "-";
  if (typeof raw === "object") return raw[lang] || raw.en || raw.am || "-";
  return raw;
}

export const cityTableColumns = [
  { key: "sno", label: "#", width: "w-16" },
  {
    key: "cityName",
    label: "cityName",
    width: "min-w-[180px]",
  },
  {
    key: "status",
    label: "status",
    width: "w-32",
  },
  {
    key: "createdBy",
    label: "createdBy",
    width: "w-44",
  },
  {
    key: "createdAt",
    label: "createdAt",
    width: "w-36",
  },
];

export const SubCityColumns = [
  { key: "no", label: "#", width: "w-16" },
  {
    key: "subCityName",
    label: "subCityName",
    width: "min-w-[220px]",
  },
  {
    key: "city",
    label: "city",
    width: "min-w-[180px]",
  },
  {
    key: "status",
    label: "status",
    width: "w-32",
  },
  {
    key: "actions",
    label: "actions",
    width: "w-28",
  },
];

export const woredaTablecolumns = [
  { key: "no", label: "#", width: "w-16" },
  {
    key: "woredaName",
    label: "woredaName",
    width: "min-w-[220px]",
  },
  {
    key: "subCity",
    label: "subCity",
    width: "min-w-[180px]",
  },
  {
    key: "status",
    label: "status",
    width: "w-32",
  },
  {
    key: "actions",
    label: "actions",
    width: "w-28",
  },
];

export const programTypesTablecolumns = [
  { key: "no", label: "#", width: "w-16" },
  { key: "name", label: "name", width: "min-w-[220px]" },
  { key: "codeName", label: "codeName", width: "w-40" },
  { key: "status", label: "status", width: "w-32" },
  { key: "actions", label: "actions", width: "w-28" },
];

export const bedRoomTableColumns = [
  { key: "no", label: "#", width: "w-16" },
  {
    key: "name",
    label: "bedroomTypeName",
    width: "min-w-[220px]",
  },
  {
    key: "codeName",
    label: "codeNameLabel",
    width: "w-40",
  },
  {
    key: "status",
    label: "status",
    width: "w-32",
  },
  {
    key: "actions",
    label: "actions",
    width: "w-28",
  },
];

export const housingPurposesColumns = [
  { key: "no", label: "#", width: "w-16" },
  {
    key: "name",
    label: "housingPurposeLabel",
    width: "min-w-[220px]",
  },
  {
    key: "code",
    label: "codeNameLabel",
    width: "w-40",
  },
  {
    key: "status",
    label: "status",
    width: "w-32",
  },
  {
    key: "actions",
    label: "actions",
    width: "w-28",
  },
];

export const martialStatusColumns = [
  { key: "no", label: "#", width: "w-16" },
  {
    key: "name",
    label: "maritalStatusLabel",
    width: "min-w-[220px]",
  },
  {
    key: "codeName",
    label: "codeNameLabel",
    width: "w-40",
  },
  {
    key: "evidence",
    label: "evidenceRequirement",
    width: "w-40",
  },
  {
    key: "status",
    label: "status",
    width: "w-32",
  },
  {
    key: "actions",
    label: "actions",
    width: "w-28",
  },
];

export const jobTypesTableColumns = [
  { key: "no", label: "#", width: "w-16" },
  {
    key: "jobType",
    label: "jobTypeName",
    width: "min-w-[220px]",
  },
  {
    key: "evidence",
    label: "evidenceRequirement",
    width: "w-40",
  },
  {
    key: "status",
    label: "status",
    width: "w-32",
  },
  {
    key: "actions",
    label: "actions",
    width: "w-28",
  },
];

export const disabilityTableColumns = [
  { key: "no", label: "#", width: "w-16" },
  {
    key: "name",
    label: "disabilityStatuses",
    width: "min-w-[220px]",
  },
  {
    key: "evidence",
    label: "evidenceRequirement",
    width: "w-40",
  },
  {
    key: "status",
    label: "status",
    width: "w-32",
  },
  {
    key: "actions",
    label: "actions",
    width: "w-28",
  },
];

export const proclamationsTableColumns = [
  { key: "no", label: "#", width: "w-16" },
  {
    key: "title",
    label: "proclamationTitle",
    width: "min-w-[260px]",
  },
  {
    key: "programTypes",
    label: "programTypes",
    width: "min-w-[260px]",
  },
  {
    key: "status",
    label: "status",
    width: "w-32",
  },
  {
    key: "actions",
    label: "actions",
    width: "w-28",
  },
];

export const cityDetailSubcityTableColumns = [
  { key: "no", label: "#", width: "w-16" },
  {
    key: "subCityName",
    label: "subCityName",
    width: "min-w-[180px]",
  },
  {
    key: "status",
    label: "status",
    width: "w-32",
  },
  {
    key: "createdBy",
    label: "createdBy",
    width: "w-44",
  },
  {
    key: "createdAt",
    label: "createdAt",
    width: "w-36",
  },
  {
    key: "actions",
    label: "actions",
    width: "w-28",
  },
];

export const subcityDetailWoredasTablecolumns = [
  { key: "no", label: "#", width: "w-16" },
  {
    key: "woredaName",
    label: "woredaName",
    width: "min-w-[180px]",
  },
  {
    key: "status",
    label: "status",
    width: "w-32",
  },
  {
    key: "createdBy",
    label: "createdBy",
    width: "w-44",
  },
  {
    key: "createdAt",
    label: "createdAt",
    width: "w-36",
  },
  {
    key: "actions",
    label: "actions",
    width: "w-28",
  },
];

export const formConfigTablecolumns = [
  { key: "no", label: "#", width: "w-16" },
  {
    key: "context",
    label: "context",
    width: "min-w-[180px]",
  },
  {
    key: "fields",
    label: "fields",
    width: "min-w-[250px]",
  },
  {
    key: "approvalStatus",
    label: "approvalStatus",
    width: "w-32",
  },
  {
    key: "createdBy",
    label: "createdBy",
    width: "w-44",
  },
  {
    key: "createdAt",
    label: "createdAt",
    width: "w-36",
  },
  {
    key: "actions",
    label: "actions",
    width: "w-28",
  },
];
export const ExternalEntityUserscolumns = [
  { key: "no", label: "#", width: "w-16" },
  {
    key: "username",
    label: "username",
    width: "min-w-[150px]",
  },
  {
    key: "phone",
    label: "phone",
    width: "w-32",
  },
  {
    key: "externalEntity",
    label: "externalEntity",
    width: "min-w-[180px]",
  },
  {
    key: "location",
    label: "location",
    width: "min-w-[180px]",
  },
  {
    key: "status",
    label: "status",
    width: "w-32",
  },
  {
    key: "actions",
    label: "actions",
    width: "w-28",
  },
];

export const registrationFormColumns = (language) => [
  { key: "no", label: t(language, "rollNo", "Roll No."), width: "w-16" },
  {
    key: "applicantName",
    label: t(language, "fullname", "Full Name"),
    width: "min-w-[220px]",
    sortable: true,
    sortKey: `fullName.${language}`,
  },
  {
    key: "faydaId",
    label: t(language, "fayda", "Fayda"),
    width: "w-40",
    sortable: true,
    sortKey: "faydaId",
  },
  {
    key: "phone",
    label: t(language, "phone", "Phone"),
    width: "w-36",
    sortable: true,
    sortKey: "phone",
  },
  {
    key: "registrationCampaign",
    label: t(language, "campaign", "Campaign"),
    width: "min-w-[200px]",
  },
  {
    key: "registrationStation",
    label: t(language, "station", "Station"),
    width: "min-w-[180px]",
  },
  {
    key: "registrationMode",
    label: t(language, "registrationMode", "Reg. Mode"),
    width: "w-40",
  },
  {
    key: "overallStatus",
    label: t(language, "overallStatus", "Overall Status"),
    width: "w-32",
    sortable: true,
    sortKey: "overallStatus",
  },
  {
    key: "createdAt",
    label: t(language, "createdAt", "Created At"),
    width: "w-44",
    sortable: true,
    sortKey: "createdAt",
  },
  {
    key: "actions",
    label: t(language, "actions", "Actions"),
    width: "w-28",
  },
];

export const usersTableColumns = [
  { key: "sno", label: "#", width: "w-16" },
  { key: "fullname", label: "fullName", width: "min-w-45" },
  { key: "email", label: "email", width: "min-w-50" },
  { key: "phone", label: "phone", width: "w-32" },
  { key: "gender", label: "gender", width: "w-24" },
  { key: "organization", label: "organization", width: "min-w-40" },
  { key: "status", label: "status", width: "w-24" },
  { key: "actions", label: "actions", width: "w-20" },
];

export const paymentConfigTableColumns = [
  { key: "sno", label: "#", width: "w-16" },
  { key: "organization", label: "organization", width: "min-w-45" },
  { key: "paymentMethods", label: "paymentMethods", width: "min-w-50" },
  { key: "status", label: "status", width: "w-28" },
  { key: "createdAt", label: "createdAt", width: "w-40" },
  { key: "actions", label: "actions", width: "w-28" },
];
export const applicantTableColumns = [
  { key: "no", label: "#", width: "w-12" },
  { key: "applicantId", label: "applicantId", width: "w-32" },
  { key: "fullName", label: "fullName", width: "w-40" },
  { key: "gender", label: "gender", width: "w-24" },
  { key: "phone", label: "phone", width: "w-32" },
  { key: "registrationStatus", label: "registrationStatus", width: "w-36" },
  { key: "status", label: "status", width: "w-24" },
  { key: "createdAt", label: "createdAt", width: "w-36" },
  { key: "actions", label: "actions", width: "w-24" },
];
export const customStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: "transparent",
    border: "1px solid #3d3d3d",
    borderRadius: "0.375rem",
    padding: "0.25rem 0.5rem",
    fontSize: "0.75rem",
    lineHeight: "1.25rem",
    width: "100%",
    minHeight: "38px",
    boxShadow: "none",
    "&:hover": {
      borderColor: "#0A74B9",
    },
    "@media (min-width: 1536px)": {
      fontSize: "14px",
    },
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#6B7280",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#4B5563",
  }),
  menu: (provided) => ({
    ...provided,
    zIndex: 9999,
    fontSize: "0.75rem",
    "@media (min-width: 1536px)": {
      fontSize: "14px",
    },
  }),

  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "#0A74B9"
      : state.isFocused
        ? "#E5F3FB"
        : "white",
    color: "black",
    padding: "0.5rem 1rem",
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: "#9CA3AF",
    "&:hover": { color: "#374151" },
  }),
  clearIndicator: (provided) => ({
    ...provided,
    color: "#9CA3AF",
    "&:hover": { color: "#EF4444" },
  }),
};

export function getMLText(obj, lang) {
  if (!obj) return "—";
  if (typeof obj === "string") return obj;
  return obj[lang] || obj.en || obj.am || "—";
}

export function getInitials(name) {
  if (!name || typeof name !== "string") return "NA";
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0] || ""}${parts[1][0] || ""}`.toUpperCase();
}

export function normalizeUserName(user, language) {
  if (!user) return "—";
  return getMLText(user.fullname, language);
}

export function normalizeOrgName(org, language) {
  if (!org) return "—";
  return getMLText(org.name, language);
}
export const paymentMethodsTableColumns = [
  { key: "no", label: "#", width: "w-16" },
  { key: "name", label: "name", width: "min-w-[200px]" },
  { key: "codeName", label: "codeName", width: "min-w-[180px]" },
  { key: "status", label: "status", width: "w-32" },
  { key: "createdAt", label: "createdAt", width: "w-40" },
  { key: "actions", label: "actions", width: "w-28" },
];

export const paymentConfigsTableColumns = [
  { key: "no", label: "#", width: "w-16" },
  { key: "organization", label: "organization", width: "min-w-[220px]" },
  { key: "getways", label: "paymentMethods", width: "min-w-[250px]" },
  { key: "status", label: "status", width: "w-32" },
  { key: "createdAt", label: "createdAt", width: "w-40" },
  { key: "actions", label: "actions", width: "w-28" },
];

export const officeFullBulkTableColumns = [
  { key: "sno", label: "#", width: "w-16" },
  { key: "organization", label: "organization", width: "min-w-45" },
  { key: "workflow", label: "workflow", width: "min-w-40" },
  { key: "totalRecords", label: "totalRecords", width: "w-24" },
  { key: "processingStatus", label: "processingStatus", width: "w-32" },
  { key: "overallStatus", label: "overallStatus", width: "w-32" },
  { key: "createdAt", label: "createdAt", width: "w-40" },
  { key: "actions", label: "actions", width: "w-28" },
];

export const missingApplicantClaimTableColumns = [
  { key: "sno", label: "#", width: "w-16" },
  { key: "searchedApplicantId", label: "applicantId", width: "min-w-40" },
  { key: "fullName", label: "claimantName", width: "min-w-45" },
  { key: "phone", label: "phone", width: "w-32" },
  { key: "bankAccountNumber", label: "bankAccount", width: "min-w-40" },
  { key: "searchOutcome", label: "searchOutcome", width: "w-28" },
  { key: "overallStatus", label: "overallStatus", width: "w-32" },
  { key: "createdAt", label: "createdAt", width: "w-40" },
  { key: "actions", label: "actions", width: "w-28" },
];
export const bankAccountTableColumns = [
  { key: "no", label: "#", width: "w-12" },
  { key: "bank", label: "bankName", width: "w-40" },
  { key: "accountNumber", label: "accountNumber", width: "w-36" },
  { key: "branchName", label: "branchName", width: "w-40" },
  { key: "applicant", label: "applicantName", width: "w-48" },
  { key: "savingAmount", label: "savingAmount", width: "w-32" },
  { key: "status", label: "status", width: "w-28" },
  { key: "createdAt", label: "createdAt", width: "w-36" },
  { key: "actions", label: "actions", width: "w-28" },
];

export const paymentTableColumns = [
  { key: "no", label: "#", width: "w-12" },
  { key: "applicant", label: "applicant", width: "w-40" },
  { key: "requestType", label: "requestType", width: "w-32" },
  { key: "amount", label: "amount", width: "w-28" },
  { key: "paymentStatus", label: "paymentStatus", width: "w-28" },
  { key: "paymentMethod", label: "paymentMethod", width: "w-32" },
  { key: "paidAccountNumber", label: "paidAccountNumber", width: "w-36" },
  // { key: "transactionRef", label: "transactionRef", width: "w-36" },
  { key: "createdAt", label: "createdAt", width: "w-36" },
  { key: "actions", label: "actions", width: "w-28" },
];
