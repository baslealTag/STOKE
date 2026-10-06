//permission category

export const createPermCategoryPermission = [
  "create_permission_categories_as_superadmin",
  "create_permission_categories_as_orgadmin",
];

export const getallPermCategoryPermission = [
  "get_all_permission_categories_as_superadmin",
  "get_permission_categories_as_orgadmin",
];

export const getPermCategoryPermission = [
  "get_all_permission_categories_as_superadmin",
  "get_permission_categories_as_orgadmin",
];

export const getPermCategoryDetailPermission = [
  "get_all_permission_categories_as_superadmin",
  "get_permission_categories_as_orgadmin",
];

export const updatePermCategoryPermission = [
  "update_permission_categories_as_superadmin",
  "update_permission_categories_as_orgadmin",
];

export const deletePermCategoryPermission = [
  "delete_permission_categories_as_superadmin",
  "delete_permission_categories_as_orgadmin",
];
export const getPermCategoryWithPermission = [
  "get_all_permission_categories_as_superadmin",
  "get_permission_categories_as_orgadmin",
];

// permissions

export const getAllPermissions = [
  "get_all_permissions_as_superadmin",
  "get_permissions_as_orgadmin",
  "get_permissions",
];

export const getPermissions = [
  "get_all_permissions_as_superadmin",
  "get_permissions_as_orgadmin",
  "get_permissions",
];

export const getDetailPermissions = [
  "get_all_permissions_as_superadmin",
  "get_permissions_as_orgadmin",
  "get_permissions",
];

//organizations
// NOTE: the structure / structure-level codes below have no server route in
// this repo (no Structure module exists) — they are inert. Only the
// organization codes actually gate anything.
export const sideBarOrgManagementPermission = [
  "get_organizations_as_orgadmin",
  "get_all_organizations_as_superadmin",
  "get_organizations",
  "get_all_structure_levels_as_superadmin",
  "get_structure_levels_as_orgadmin",
  "get_structure_levels",
  "get_all_structures_as_superadmin",
  "get_structures_as_orgadmin",
  "get_structures",
];
export const createOrgPermission = [
  "create_organizations_as_superadmin",
  "create_organizations_as_orgadmin",
];
export const getOrgnaizationsPermissions = [
  "get_organizations_as_orgadmin",
  "get_all_organizations_as_superadmin",
  "get_organizations",
];
export const getOrgDetailPermissions = [
  "get_organizations_as_orgadmin",
  "get_all_organizations_as_superadmin",
  "get_organizations",
  "get_organization",
];

export const updateOrgPermissions = [
  "update_organizations_as_superadmin",
  "update_organizations_as_orgadmin",
];

export const parentOrgFilterPermissions = [
  "create_organizations_as_superadmin",
  "create_organizations_as_orgadmin",
  "update_organizations_as_superadmin",
  "update_organizations_as_orgadmin",
  "get_organizations_as_orgadmin",
  "get_all_organizations_as_superadmin",
  "get_organizations",
  "get_organization",
];

// ⚠ LEGACY / NO SERVER ROUTE: no Structure module exists on the server, so
// none of these codes are ever granted. Unused — delete once confirmed dead.
export const filterStructureByOrgPermission = [
  "create_structures_as_superadmin",
  "create_structures_as_orgadmin",
  "update_structures_as_superadmin",
  "update_structures_as_orgadmin",
  "get_all_structures_as_superadmin",
  "get_structures_as_orgadmin",
  "get_structures",
  "get_structure",
];

// groups

export const createGroupPermission = [
  "create_groups_as_superadmin",
  "create_groups_as_orgadmin",
];

export const getAllGroupsPermission = [
  "get_all_groups_as_superadmin",
  "get_groups_as_orgadmin",
  "get_groups",
];

export const getGroupsPermission = [
  "get_all_groups_as_superadmin",
  "get_groups_as_orgadmin",
  "get_groups",
];

export const getGroupDetailPermission = [
  "get_all_groups_as_superadmin",
  "get_groups_as_orgadmin",
  "get_groups",
  "get_group",
];

export const updateGroupPermission = [
  "update_groups_as_superadmin",
  "update_groups_as_orgadmin",
];

export const getGroupAnalyticsPermission = [
  "get_all_groups_analytics_as_superadmin",
  "get_groups_analytics_as_orgadmin",
  "get_groups_analytics",
];

export const getGroupFiltersPermission = [
  "create_groups_as_superadmin",
  "create_groups_as_orgadmin",
  "update_groups_as_superadmin",
  "update_groups_as_orgadmin",
  "get_all_groups_as_superadmin",
  "get_groups_as_orgadmin",
  "get_groups",
  "get_group",
];

export const getGroupPermCategoryFilterPermission = [
  "create_groups_as_superadmin",
  "create_groups_as_orgadmin",
  "update_groups_as_superadmin",
  "update_groups_as_orgadmin",
  "get_all_groups_as_superadmin",
  "get_groups_as_orgadmin",
  "get_groups",
  "get_group",
];

// external orgs
// ⚠ LEGACY / NO SERVER ROUTE: the "external_orgs" codes below match nothing in
// server/routes. The live module is External Entities (see
// getExternalEntitiesPermission etc. further down). All unused.

export const createExternalOrgPermission = [
  "create_external_orgs_as_superadmin",
  "create_external_orgs_as_orgadmin",
];

export const getExternalOrgPermission = [
  "get_all_external_orgs_as_superadmin",
  "get_external_orgs_as_orgadmin",
  "get_external_orgs",
];

export const getExternalOrgDetailPermission = [
  "get_all_external_orgs_as_superadmin",
  "get_external_orgs_as_orgadmin",
  "get_external_orgs",
  "get_external_org",
];

export const updateExternalOrgPermission = [
  "update_external_orgs_as_superadmin",
  "update_external_orgs_as_orgadmin",
];

export const externalOrgAnalyticsPermission = [
  "get_all_external_orgs_analytics_as_superadmin",
  "get_external_orgs_analytics_as_orgadmin",
  "get_external_orgs_analytics",
];

export const filterExternalOrgPermission = [
  "create_external_orgs_as_superadmin",
  "create_external_orgs_as_orgadmin",
  "update_external_orgs_as_superadmin",
  "update_external_orgs_as_orgadmin",
  "get_all_external_orgs_as_superadmin",
  "get_external_orgs_as_orgadmin",
  "get_external_orgs",
  "get_external_org",
];

// External Entity Users (backend uses exentity prefix — matches ExternalEntityUsersRoutes.js)

// CREATE permissions
export const createExOrgUserPermission = [
  "create_exentity_users_as_superadmin",
  "create_exentity_users_as_orgadmin",
];

// UPDATE permissions
export const updateExOrgUserPermission = [
  "update_all_exentity_users_as_superadmin",
  "update_exentity_users_as_orgadmin",
];

// RESET PASSWORD (by admin) permissions
export const resetExOrgUserPasswordByAdminPermission = [
  "reset_exentity_user_password_as_superadmin",
  "reset_exentity_user_password_as_orgadmin",
];

// GET ALL permissions
export const getAllExOrgUsersPermission = [
  "get_all_exentity_users_as_superadmin",
  "get_exentity_users_as_orgadmin",
  "get_exentity_users",
];

// GET SINGLE permissions (by ID)
export const getExOrgUserByIdPermission = [
  "get_all_exentity_users_as_superadmin",
  "get_exentity_users_as_orgadmin",
  "get_exentity_users",
  "get_exentity_user",
];

// ANALYTICS permissions
export const analyticsExOrgUserPermission = [
  "get_all_exentity_users_analytics_as_superadmin",
  "get_exentity_users_analytics_as_orgadmin",
  "get_exentity_users_analytics",
];

// Reports
// ⚠ LEGACY / NO SERVER ROUTE: none of these 21 codes exist in server/routes —
// they are carried over from the letter/case system. data.js currently uses
// this array as a placeholder on sidebar links (bank accounts, bank batch
// uploads, payments, update requests), which hides those links from every
// non-superadmin. Replace each with the real per-module array before shipping.
export const ReportPermissions = [
  "get_printablecaseanalytics_as_superadmin",
  "get_printablecaseanalytics_as_orgadmin",
  "get_printablecaseanalytics",
  "get_printableoutgoinglettersanalytics_as_superadmin",
  "get_printableoutgoinglettersanalytics_as_orgadmin",
  "get_printableoutgoinglettersanalytics",
  "get_printableincominglettersanalytics_as_superadmin",
  "get_printableincominglettersanalytics_as_orgadmin",
  "get_printableincominglettersanalytics",
  "get_printableminutesanalytics_as_superadmin",
  "get_printableminutesanalytics_as_orgadmin",
  "get_printableminutesanalytics",
  "get_printableinternalmemosanalytics_as_superadmin",
  "get_printableinternalmemosanalytics_as_orgadmin",
  "get_printableinternalmemosanalytics",
  "get_printabledocrepanalytics_as_superadmin",
  "get_printabledocrepanalytics_as_orgadmin",
  "get_printabledocrepanalytics",
  "get_analyticsprintoverviewkpireport_as_superadmin",
  "get_analyticsprintoverviewkpireport_as_orgadmin",
  "get_analyticsprintoverviewkpireport",
];

// ================================
// HADMS MASTER DATA PERMISSIONS
// ================================

// Cities
export const getCitiesPermission = ["get_cities"];
export const getCitiesDetailPermission = ["get_cities", "get_city"];
export const createCityPermission = ["create_city"];
export const updateCityPermission = ["update_city"];
export const deleteCityPermission = ["delete_city"];
export const getCitiesAnalyticsPermission = ["get_cities_analytics"];

// Sub-Cities
export const getSubCitiesPermission = ["get_sub_cities"];
export const getSubCitiesDetailPermission = ["get_sub_cities", "get_sub_city"];
export const createSubCityPermission = ["create_sub_city"];
export const updateSubCityPermission = ["update_sub_city"];
export const deleteSubCityPermission = ["delete_sub_city"];
export const getSubCitiesAnalyticsPermission = ["get_sub_cities_analytics"];

// Woredas
export const getWoredasPermission = ["get_woredas"];
export const getWoredasDetailPermission = ["get_woredas", "get_woreda"];
export const createWoredaPermission = ["create_woreda"];
export const updateWoredaPermission = ["update_woreda"];
export const deleteWoredaPermission = ["delete_woreda"];
export const getWoredasAnalyticsPermission = ["get_woredas_analytics"];

// Program Types
export const getProgramTypesPermission = ["get_program_types"];
export const getProgramTypesDetailPermission = [
  "get_program_types",
  "get_program_type",
];
export const createProgramTypePermission = ["create_program_type"];
export const updateProgramTypePermission = ["update_program_type"];
export const deleteProgramTypePermission = ["delete_program_type"];
export const getProgramTypesAnalyticsPermission = [
  "get_program_types_analytics",
];

// Bedroom Types
export const getBedroomTypesPermission = ["get_bedroom_types"];
export const getBedroomTypesDetailPermission = [
  "get_bedroom_types",
  "get_bedroom_type",
];

export const createBedroomTypePermission = ["create_bedroom_type"];
export const updateBedroomTypePermission = ["update_bedroom_type"];
export const deleteBedroomTypePermission = ["delete_bedroom_type"];
export const getBedroomTypesAnalyticsPermission = [
  "get_bedroom_types_analytics",
];

// Housing Purposes
export const getHousingPurposesPermission = ["get_housing_purposes"];
export const getHousingPurposesDetailPermission = [
  "get_housing_purposes",
  "get_housing_purpose",
];
export const createHousingPurposePermission = ["create_housing_purpose"];
export const updateHousingPurposePermission = ["update_housing_purpose"];
export const deleteHousingPurposePermission = ["delete_housing_purpose"];
export const getHousingPurposesAnalyticsPermission = [
  "get_housing_purposes_analytics",
];

// Marital Statuses
export const getMaritalStatusesPermission = ["get_marital_statuses"];
export const getMartialStatusesDetailPermission = [
  "get_marital_statuses",
  "get_marital_status",
];
export const createMaritalStatusPermission = ["create_marital_status"];
export const updateMaritalStatusPermission = ["update_marital_status"];
export const deleteMaritalStatusPermission = ["delete_marital_status"];
export const getMaritalStatusesAnalyticsPermission = [
  "get_marital_statuses_analytics",
];

// Job Types
export const getJobTypesPermission = ["get_job_types"];
export const getJobTypesDetailPermission = ["get_job_types", "get_job_type"];
export const createJobTypePermission = ["create_job_type"];
export const updateJobTypePermission = ["update_job_type"];
export const deleteJobTypePermission = ["delete_job_type"];
export const getJobTypesAnalyticsPermission = ["get_job_types_analytics"];

// Disability Statuses
export const getDisabilityStatusesPermission = ["get_disability_statuses"];
export const getDisabilityStatusesDetailPermission = [
  "get_disability_statuses",
  "get_disability_status",
];
export const createDisabilityStatusPermission = ["create_disability_status"];
export const updateDisabilityStatusPermission = ["update_disability_status"];
export const deleteDisabilityStatusPermission = ["delete_disability_status"];
export const getDisabilityStatusesAnalyticsPermission = [
  "get_disability_statuses_analytics",
];

// Audit Logs
export const viewAuditLogPermission = [
  "view_audit_log_global",
  "view_audit_log_orgadmin",
];

export const viewAuditLogDetailsPermission = [
  "view_audit_log_global",
  "view_audit_log_orgadmin",
];

export const viewAuditLogAnalyticsPermission = [
  "view_audit_log_global",
  "view_audit_log_orgadmin",
];

// Approval Workflows
// Guards both the list page and /administration/approval-workflows/:id, so it
// carries the detail-only perm too (GET /get_approval_workflows/:id).
export const getApprovalWorkflowsPermission = [
  "get_all_approval_workflows_as_superadmin",
  "get_approval_workflows_as_orgadmin",
  "get_approval_workflows",
  "get_approval_workflow",
];

// DELETE /approval_workflow_api/del_approval_workflows/:id
export const deleteApprovalWorkflowPermission = [
  "delete_approval_workflows_as_superadmin",
  "delete_approval_workflows_as_orgadmin",
];

// GET /approval_workflow_api/get_approval_workflows_analytics
export const getApprovalWorkflowAnalyticsPermission = [
  "get_all_approval_workflows_analytics_as_superadmin",
  "get_approval_workflows_analytics_as_orgadmin",
  "get_approval_workflows_analytics",
];

// GET /filter_organizations_for_approval_workflow and /filter_users_for_approval_workflow
export const approvalWorkflowFiltersPermission = [
  "create_approval_workflows_as_superadmin",
  "create_approval_workflows_as_orgadmin",
  "get_all_approval_workflows_as_superadmin",
  "get_approval_workflows_as_orgadmin",
  "get_approval_workflows",
  "get_approval_workflow",
  "update_approval_workflows_as_superadmin",
  "update_approval_workflows_as_orgadmin",
];

// GET /filter_stamps_for_approval_workflow — write-only, unlike the two above
export const approvalWorkflowStampFiltersPermission = [
  "create_approval_workflows_as_superadmin",
  "create_approval_workflows_as_orgadmin",
  "update_approval_workflows_as_superadmin",
  "update_approval_workflows_as_orgadmin",
];

// 2. Get Single Approval Workflow
export const getSingleApprovalWorkflowPermission = [
  "get_all_approval_workflows_as_superadmin",
  "get_approval_workflows_as_orgadmin",
  "get_approval_workflows",
  "get_approval_workflow",
];

// 3. Create Approval Workflow
export const createApprovalWorkflowPermission = [
  "create_approval_workflows_as_superadmin",
  "create_approval_workflows_as_orgadmin",
];

// 4. Update Approval Workflow
export const updateApprovalWorkflowPermission = [
  "update_approval_workflows_as_superadmin",
  "update_approval_workflows_as_orgadmin",
];

// GET /reg_campaign_api/get_registration_campaigns and /get_registration_campaign/:id
// both accept the same three codes.
export const getRegistrationCampaignsPermission = [
  "get_registration_campaign_as_superadmin",
  "get_registration_campaign_as_orgadmin",
  "get_registration_campaign",
];

export const getApplicantDetailPermission = [
  "get_applicant",
  "get_applicants",
  "get_all_applicants",
];
// applicant
export const getApplicantsPermission = ["get_applicants", "get_all_applicants"];

// GET /applicant_api/get_applicants_analytics
export const getApplicantsAnalyticsPermission = [
  "get_applicant",
  "get_applicants",
  "get_all_applicants",
];

export const getApplicantANalytics = [
  "get_applicant",
  "get_applicants",
  "get_all_applicants",
];

export const getProclamationsPermission = ["get_proclamations"];

// Backend uses checkFullPermission(["get_proclamation"]) — list perm is NOT sufficient
export const getProcalamtionDetailPermission = ["get_proclamation"];

export const createProclamationPermission = ["create_proclamation"];

export const updateProclamationPermission = ["update_proclamation"];

export const deleteProclamationPermission = ["delete_proclamation"];

// The campaign write routes only accept the two scoped codes — no bare
// "create_/update_/delete_registration_campaign" exists on the server.
export const createRegistrationCampaignPermission = [
  "create_registration_campaign_as_superadmin",
  "create_registration_campaign_as_orgadmin",
];

export const updateRegistrationCampaignPermission = [
  "update_registration_campaign_as_superadmin",
  "update_registration_campaign_as_orgadmin",
];

export const deleteRegistrationCampaignPermission = [
  "delete_registration_campaign_as_superadmin",
  "delete_registration_campaign_as_orgadmin",
];

// POST /decide_registration_campaign_collaborator/:id and
// /reapprove_rejected_registration_campaign/:id — both checkFullPermission
export const decideRegistrationCampaignCollaboratorPermission = [
  "decide_registration_campaign_collaborator",
];

// PUT /reg_campaign_api/registration_campaign_update_reqst/:id
export const createRegistrationCampaignUpdateRequestPermission = [
  "create_registration_campaign_update_request_as_superadmin",
  "create_registration_campaign_update_request_as_orgadmin",
];

// POST /reg_campaign_api/close_registration_campaign/:id — server gates this
// with the *create* codes, not delete/update.
export const closeRegistrationCampaignPermission = [
  "create_registration_campaign_as_superadmin",
  "create_registration_campaign_as_orgadmin",
];

// GET /reg_campaign_api/{organization,proclamation,city,subcity,woreda,...}_filters
export const registrationCampaignFiltersPermission = [
  "get_registration_campaign_as_superadmin",
  "get_registration_campaign_as_orgadmin",
  "get_registration_campaign",
  "create_registration_campaign_as_superadmin",
  "create_registration_campaign_as_orgadmin",
  "update_registration_campaign_as_superadmin",
  "update_registration_campaign_as_orgadmin",
];

export const getRegistrationFormsPermission = [
  "get_registered_applicant_as_superadmin",
  "get_registered_applicant_as_orgadmin",
  "get_registered_applicants",
];

// GET /regn_form_api/get_registered_applicant/:id — detail adds the singular code
export const getRegistrationFormDetailPermission = [
  "get_registered_applicant_as_superadmin",
  "get_registered_applicant_as_orgadmin",
  "get_registered_applicants",
  "get_registered_applicant",
];

// POST /regn_form_api/register_station_based_applicants
export const registerApplicantPermission = [
  "register_applicant_as_superadmin",
  "register_applicant_as_orgadmin",
  "register_applicant",
];

// PUT /regn_form_api/update_registered_applicant/:id
export const updateRegistrationFormPermission = [
  "update_registered_applicant_as_superadmin",
  "update_registered_applicant_as_orgadmin",
  "update_registered_applicant",
];

// POST /regn_form_api/initiate_rereview/:id
export const initiateRegistrationFormReReviewPermission = [
  "initiate_registered_applicant_rereview_as_superadmin",
  "initiate_registered_applicant_rereview_as_orgadmin",
  "initiate_registered_applicant_rereview",
];

// DELETE /regn_form_api/delete_registered_applicant/:id
export const deleteRegistrationFormPermission = [
  "delete_registered_applicant_as_superadmin",
  "delete_registered_applicant_as_orgadmin",
  "delete_registered_applicant",
];

// POST /regn_form_api/initiate_transfer/:id
export const transferRegistrationFormPermission = [
  "transfer_registered_applicant",
];

// POST /regn_form_api/assign_station_for_self_registered
export const assignStationForSelfRegisteredPermission = [
  "register_applicant_as_superadmin",
  "register_applicant_as_orgadmin",
  "register_applicant",
  "update_registered_applicant_as_superadmin",
  "update_registered_applicant_as_orgadmin",
  "update_registered_applicant",
];

// GET /regn_form_api/registration_analytics
export const getRegistrationAnalyticsPermission = [
  "get_registered_applicant_as_superadmin",
  "get_registered_applicant_as_orgadmin",
  "get_registered_applicants",
  "get_registered_applicant",
];

// GET /regn_form_api/{organization,campaign,station,program_type,...}_filters
export const registrationFormFiltersPermission = [
  "get_registered_applicant_as_superadmin",
  "get_registered_applicant_as_orgadmin",
  "get_registered_applicants",
  "get_registered_applicant",
  "register_applicant_as_superadmin",
  "register_applicant_as_orgadmin",
  "register_applicant",
  "update_registered_applicant_as_superadmin",
  "update_registered_applicant_as_orgadmin",
  "update_registered_applicant",
];

// ================================
// REGISTRATION CAMPAIGN SUB-PAGES
// Each of these pages hits its own API module, not the campaign endpoints.
// ================================

// /registration/:id/stations -> GET /regn_station_api/get_stations (+ /get_station/:id)
export const getRegistrationStationsPermission = [
  "get_registration_station_as_superadmin",
  "get_registration_station_as_orgadmin",
  "get_registration_station",
];

// /registration/:id/stations/approval-units -> GET /regn_approval_unit_api/get_units (+ /get_unit/:id)
export const getRegistrationApprovalUnitsPermission = [
  "get_registration_approval_unit_as_superadmin",
  "get_registration_approval_unit_as_orgadmin",
  "get_registration_approval_units",
  "get_registration_approval_unit",
];

// /registration/:id/stations/approval-unit-partitions -> GET /regn_unit_partition_api/get_unit_partitions
export const getRegistrationUnitPartitionsPermission = [
  "get_registration_unit_partition_as_superadmin",
  "get_registration_unit_partition_as_orgadmin",
  "get_registration_unit_partitions",
  "get_registration_unit_partition",
];

// /registration/:id/forms/decisions -> GET /regn_form_approval_api/decisions/:formId
export const getRegistrationFormDecisionsPermission = [
  "approve_registered_applicant_as_superadmin",
  "approve_registered_applicant_as_orgadmin",
  "approve_registered_applicant",
  "get_assigned_registered_applicant_for_approval_as_superadmin",
  "get_assigned_registered_applicant_for_approval_as_orgadmin",
  "get_assigned_registered_applicants_for_approval",
  "get_assigned_registered_applicant_for_approval",
];

// /registration/:id/forms/decision-givers -> GET /reg_decision_giver_api/get_decision_givers
export const getRegistrationDecisionGiversPermission = [
  "get_registration_campaign_applicant_decision_giver_as_superadmin",
  "get_registration_campaign_applicant_decision_giver_as_orgadmin",
  "get_registration_campaign_applicant_decision_givers",
  "get_registration_campaign_applicant_decision_giver",
];

// /registration/:id/forms/service-payments -> GET /service_payment_api/get_service_payments
export const getServicePaymentsPermission = [
  "get_all_service_payments_as_superadmin",
  "get_service_payments_as_orgadmin",
  "get_service_payments",
  "get_service_payment",
];

export const getProclamationsAnalyticsPermission = [
  "get_proclamations_analytics",
];

// Form Config Permissions
export const getFormConfigsPermission = [
  "get_all_form_configs",
  "get_form_configs",
  "get_form_config",
];

export const createFormConfigPermission = ["create_form_config"];

export const updateFormConfigPermission = ["update_form_config"];

export const deleteFormConfigPermission = ["delete_form_config"];

export const getFormConfigAnalyticsPermission = ["get_form_configs_analytics"];

// ================================
// HADMS ADMINISTRATION PERMISSIONS
// ================================

// External Entities
export const getExternalEntitiesPermission = [
  "get_all_external_entities_as_superadmin",
  "get_external_entities_as_orgadmin",
  "get_external_entities",
];
export const getExternalEntityDetailPermission = [
  "get_all_external_entities_as_superadmin",
  "get_external_entities_as_orgadmin",
  "get_external_entities",
  "get_external_entity",
];
export const createExternalEntityPermission = [
  "create_external_entities_as_superadmin",
  "create_external_entities_as_orgadmin",
];
export const updateExternalEntityPermission = [
  "update_external_entities_as_superadmin",
  "update_external_entities_as_orgadmin",
];
export const deleteExternalEntityPermission = [
  "delete_external_entities_as_superadmin",
  "delete_external_entities_as_orgadmin",
];
export const getExternalEntitiesAnalyticsPermission = [
  "get_all_external_entities_analytics_as_superadmin",
  "get_external_entities_analytics_as_orgadmin",
  "get_external_entities_analytics",
];

// Groups
// NOTE: GroupRoutes.js exposes no DELETE endpoint, so no server permission
// backs this. Unused — keep only until group deletion exists on the server.
export const deleteGroupPermission = [
  "delete_groups_as_superadmin",
  "delete_groups_as_orgadmin",
];

// Permissions & Categories — "manage" = create OR update (PermissionRoutes.js
// has no DELETE endpoint).
export const managePermissionsPermission = [
  "create_permissions_as_superadmin",
  "create_permissions_as_orgadmin",
  "update_permissions_as_superadmin",
  "update_permissions_as_orgadmin",
];
export const managePermissionCategoriesPermission = [
  "create_permission_categories_as_superadmin",
  "create_permission_categories_as_orgadmin",
  "update_permission_categories_as_superadmin",
  "update_permission_categories_as_orgadmin",
  "delete_permission_categories_as_superadmin",
  "delete_permission_categories_as_orgadmin",
];

// Organizations
export const manageOrganizationsPermission = [
  "create_organizations_as_superadmin",
  "create_organizations_as_orgadmin",
  "update_organizations_as_superadmin",
  "update_organizations_as_orgadmin",
];

// Approval Workflows
export const manageApprovalWorkflowsPermission = [
  "create_approval_workflows_as_superadmin",
  "create_approval_workflows_as_orgadmin",
  "update_approval_workflows_as_superadmin",
  "update_approval_workflows_as_orgadmin",
];

// Form Configs
export const manageFormConfigsPermission = [
  "create_form_config",
  "update_form_config",
];

// ================================
// AAHDAB BATCH UPLOAD PERMISSIONS
// ================================

export const getAahdabBatchUploadsPermission = [
  "get_aahdab_batch_upload_as_superadmin",
  "get_aahdab_batch_upload_as_orgadmin",
  "get_aahdab_batch_uploads",
];

export const createAahdabBatchUploadPermission = [
  "create_aahdab_batch_upload_as_superadmin",
  "create_aahdab_batch_upload_as_orgadmin",
];

export const updateAahdabBatchUploadPermission = [
  "update_aahdab_batch_upload_as_superadmin",
  "update_aahdab_batch_upload_as_orgadmin",
];

export const decideAahdabBatchUploadPermission = [
  "decide_aahdab_batch_upload_as_superadmin",
  "decide_aahdab_batch_upload_as_orgadmin",
  "decide_aahdab_batch_upload",
];

export const deleteAahdabBatchUploadPermission = [
  "delete_aahdab_batch_upload_as_superadmin",
  "delete_aahdab_batch_upload_as_orgadmin",
];
export const deleteAahdabBatchDetailPermission = [
  "get_aahdab_batch_upload_as_superadmin",
  "get_aahdab_batch_upload_as_orgadmin",
  "get_aahdab_batch_upload",
  "get_aahdab_batch_uploads",
];

export const decideAahdabBatchUploadStepPermission = [
  "decide_aahdab_batch_upload_as_superadmin",
  "decide_aahdab_batch_upload_as_orgadmin",
  "decide_aahdab_batch_upload",
];
// Sidebar-level: any AAHDAB batch upload related permission grants access
export const aahdabBatchUploadsSidebarPermission = [
  "get_aahdab_batch_upload_as_superadmin",
  "get_aahdab_batch_upload_as_orgadmin",
  "get_aahdab_batch_uploads",
  "create_aahdab_batch_upload_as_superadmin",
  "create_aahdab_batch_upload_as_orgadmin",
  "update_aahdab_batch_upload_as_superadmin",
  "update_aahdab_batch_upload_as_orgadmin",
  "decide_aahdab_batch_upload_as_superadmin",
  "decide_aahdab_batch_upload_as_orgadmin",
  "decide_aahdab_batch_upload",
  "delete_aahdab_batch_upload_as_superadmin",
  "delete_aahdab_batch_upload_as_orgadmin",
];

// ================================
// APPLICANT APPROVAL PERMISSIONS
// ================================

// POST /regn_form_approval_api/decide_form_registered_applicant/:id
// (and /reapprove_rejected_registration_form/:id, /regn_rereview_api/decide_review/:id)
export const approveApplicantPermission = [
  "approve_registered_applicant_as_superadmin",
  "approve_registered_applicant_as_orgadmin",
  "approve_registered_applicant",
];

// GET /regn_rereview_api/reviewing_applicants and /reviewing_applicant/:id
export const getReviewingApplicantPermission = [
  "get_rereviewing_applicant_as_superadmin",
  "get_rereviewing_applicant_as_orgadmin",
  "get_rereviewing_applicants",
  "get_rereviewing_applicant",
];

// Sidebar-level: any applicant operation grants access to the Applicants sidebar
export const applicantsSidebarPermission = [
  "get_applicants",
  "get_all_applicants",
  "get_applicant",
  "approve_registered_applicant_as_superadmin",
  "approve_registered_applicant_as_orgadmin",
  "approve_registered_applicant",
  "get_rereviewing_applicant_as_superadmin",
  "get_rereviewing_applicant_as_orgadmin",
  "get_rereviewing_applicants",
  "get_rereviewing_applicant",
];

// ================================
// USER ACCESS GRANT PERMISSIONS
// ================================

export const getUserAccessGrantsPermission = [
  "get_user_access_grant_as_superadmin",
  "get_user_access_grant_as_orgadmin",
  "get_user_access_grants",
];

// Single grant detail (GET /get_user_access_grant/:id)
export const getUserAccessGrantPermission = [
  "get_user_access_grant_as_superadmin",
  "get_user_access_grant_as_orgadmin",
  "get_user_access_grant",
  "get_user_access_grants",
];

export const createUserAccessGrantPermission = [
  "create_user_access_grant_as_superadmin",
  "create_user_access_grant_as_orgadmin",
  "create_user_access_grant",
];

export const updateUserAccessGrantPermission = [
  "update_user_access_grant_as_superadmin",
  "update_user_access_grant_as_orgadmin",
  "update_user_access_grant",
];

export const revokeUserAccessGrantPermission = [
  "revoke_user_access_grant_as_superadmin",
  "revoke_user_access_grant_as_orgadmin",
  "revoke_user_access_grant",
];

// Sidebar-level: any user access grant permission grants access
export const userAccessGrantsSidebarPermission = [
  "get_user_access_grant_as_superadmin",
  "get_user_access_grant_as_orgadmin",
  "get_user_access_grant",
  "get_user_access_grants",
  "create_user_access_grant_as_superadmin",
  "create_user_access_grant_as_orgadmin",
  "create_user_access_grant",
  "update_user_access_grant_as_superadmin",
  "update_user_access_grant_as_orgadmin",
  "update_user_access_grant",
  "revoke_user_access_grant_as_superadmin",
  "revoke_user_access_grant_as_orgadmin",
  "revoke_user_access_grant",
];

// CMS About Permissions
export const createCMSAboutPermission = [
  "create_cms_about_as_superadmin",
  "create_cms_about_as_orgadmin",
];

export const updateCMSAboutPermission = [
  "update_cms_about_as_superadmin",
  "update_cms_about_as_orgadmin",
];

export const getAllCMSAboutsPermission = [
  "get_cms_about_as_superadmin",
  "get_cms_about_as_orgadmin",
];

export const getCMSAboutsPermission = [
  "get_cms_about_as_superadmin",
  "get_cms_about_as_orgadmin",
];

export const getCMSAboutDetailPermission = [
  "get_cms_about_as_superadmin",
  "get_cms_about_as_orgadmin",
];
export const deleteCMSAboutPermission = [
  "delete_cms_about_as_superadmin",
  "delete_cms_about_as_orgadmin",
];

// CMS News Permissions
export const createCMSNewsPermission = [
  "create_cms_news_as_superadmin",
  "create_cms_news_as_orgadmin",
];

export const updateCMSNewsPermission = [
  "update_cms_news_as_superadmin",
  "update_cms_news_as_orgadmin",
];

export const deleteCMSNewsPermission = [
  "delete_cms_news_as_superadmin",
  "delete_cms_news_as_orgadmin",
];

export const getAllCMSNewsPermission = [
  "get_cms_news_as_superadmin",
  "get_cms_news_as_orgadmin",
];

export const getCMSNewsListPermission = [
  "get_cms_news_as_superadmin",
  "get_cms_news_as_orgadmin",
];

export const getCMSNewsDetailPermission = [
  "get_cms_news_as_superadmin",
  "get_cms_news_as_orgadmin",
];

// CMS Hero Permissions
export const createCMSHeroPermission = [
  "create_cms_hero_as_superadmin",
  "create_cms_hero_as_orgadmin",
];

export const updateCMSHeroPermission = [
  "update_cms_hero_as_superadmin",
  "update_cms_hero_as_orgadmin",
];

export const deleteCMSHeroPermission = [
  "delete_cms_hero_as_superadmin",
  "delete_cms_hero_as_orgadmin",
];

export const getAllCMSHerosPermission = [
  "get_cms_hero_as_superadmin",
  "get_cms_hero_as_orgadmin",
];

export const getCMSHeroListPermission = [
  "get_cms_hero_as_superadmin",
  "get_cms_hero_as_orgadmin",
];

export const getCMSHeroDetailPermission = [
  "get_cms_hero_as_superadmin",
  "get_cms_hero_as_orgadmin",
];

// CMS Main Director Permissions
export const createCMSMainDirectorPermission = [
  "create_cms_director_as_superadmin",
  "create_cms_director_as_orgadmin",
];

export const updateCMSMainDirectorPermission = [
  "update_cms_director_as_superadmin",
  "update_cms_director_as_orgadmin",
];

export const getAllCMSMainDirectorsPermission = [
  "get_cms_director_as_superadmin",
  "get_cms_director_as_orgadmin",
];

export const getCMSMainDirectorsListPermission = [
  "get_cms_director_as_superadmin",
  "get_cms_director_as_orgadmin",
];

export const getCMSMainDirectorDetailPermission = [
  "get_cms_director_as_superadmin",
  "get_cms_director_as_orgadmin",
];

// User Permissions

// 1. Create User
export const createUserPermission = [
  "create_users_as_orgadmin",
  "create_users_as_superadmin",
  "create_users",
];

// 2. Get All Users
export const getAllUsersPermission = [
  "get_users",
  "get_all_users_as_superadmin",
  "get_users_as_orgadmin",
];

// 3. Get Users (List)
export const getUsersPermission = [
  "get_users",
  "get_all_users_as_superadmin",
  "get_users_as_orgadmin",
];

export const getUsersDetailPermission = [
  "get_users",
  "get_user",
  "get_all_users_as_superadmin",
  "get_users_as_orgadmin",
];

// 4. Get User Analytics
export const getUserAnalyticsPermission = [
  "get_users_analytics_as_orgadmin",
  "get_all_users_analytics_as_superadmin",
  "get_users_analytics",
];

// 5. Admin Reset Password
export const adminResetPasswordPermission = [
  "reset_password_as_superadmin",
  "reset_password_as_orgadmin",
];

// 6. Get Single User
export const getSingleUserPermission = [
  "get_users",
  "get_user",
  "get_all_users_as_superadmin",
  "get_users_as_orgadmin",
];

// 7. Update User
export const updateUserPermission = [
  "update_user",
  "update_users_as_orgadmin",
  "update_all_users_as_superadmin",
];

// payment Permissions

export const getPaymentAnalyticsPermission = [
  "get_all_payments_analytics_as_superadmin",
  "get_payments_analytics_as_orgadmin",
  "get_payments_analytics",
];

// Payment Methods
export const getPaymentMethodsPermission = ["get_payment_methods"];
export const getPaymentMethodDetailPermission = [
  "get_payment_methods",
  "get_payment_method",
];
export const createPaymentMethodPermission = ["create_payment_method"];
export const updatePaymentMethodPermission = ["update_payment_method"];
export const deletePaymentMethodPermission = ["delete_payment_method"];
export const getPaymentMethodsAnalyticsPermission = [
  "get_payment_methods_analytics",
];
// GET /payment_method_api/filter_paymentmethods
export const paymentMethodFiltersPermission = [
  "create_payment_method",
  "update_payment_method",
  "get_payment_methods",
  "get_payment_method",
];

// 8. Group Filters
export const groupFiltersPermission = [
  "create_users_as_orgadmin",
  "create_users_as_superadmin",
  "create_users",
  "update_user",
  "update_all_users_as_superadmin",
  "update_users_as_orgadmin",
  "get_users",
  "get_user",
  "get_all_users_as_superadmin",
  "get_users_as_orgadmin",
];

// 9. Organization Filters
export const organizationFiltersPermission = [
  "create_users_as_orgadmin",
  "create_users_as_superadmin",
  "create_users",
  "update_user",
  "update_all_users_as_superadmin",
  "update_users_as_orgadmin",
  "get_users",
  "get_user",
  "get_all_users_as_superadmin",
  "get_users_as_orgadmin",
];

// 10. Permission Filters
export const permissionFiltersPermission = [
  "create_users_as_orgadmin",
  "create_users_as_superadmin",
  "create_users",
  "update_user",
  "update_all_users_as_superadmin",
  "update_users_as_orgadmin",
  "get_users",
  "get_user",
  "get_all_users_as_superadmin",
  "get_users_as_orgadmin",
];

// 1. Get Payment Configs (List)
export const getPaymentConfigsPermission = [
  "get_all_payment_configs_as_superadmin",
  "get_payment_configs_as_orgadmin",
  "get_payment_configs",
];

// 2. Get Single Payment Config
export const getSinglePaymentConfigPermission = [
  "get_all_payment_configs_as_superadmin",
  "get_payment_configs_as_orgadmin",
  "get_payment_configs",
  "get_payment_config",
];

// 3. Create Payment Config
export const createPaymentConfigPermission = [
  "create_payment_configs_as_superadmin",
  "create_payment_configs_as_orgadmin",
];

// 4. Update Payment Config
export const updatePaymentConfigPermission = [
  "update_payment_configs_as_superadmin",
  "update_payment_configs_as_orgadmin",
];

// 5. Delete Payment Config
export const deletePaymentConfigPermission = [
  "delete_payment_configs_as_superadmin",
  "delete_payment_configs_as_orgadmin",
];

// 6. Analytics
export const getPaymentConfigAnalyticsPermission = [
  "get_all_payment_configs_analytics_as_superadmin",
  "get_payment_configs_analytics_as_orgadmin",
  "get_payment_configs_analytics",
];

// 7. Filters — GET /filter_organizations_for_payment_config and
// /filter_payment_methods_for_payment_config (same list on both)
export const paymentConfigFiltersPermission = [
  "create_payment_configs_as_superadmin",
  "create_payment_configs_as_orgadmin",
  "update_payment_configs_as_superadmin",
  "update_payment_configs_as_orgadmin",
  "get_all_payment_configs_as_superadmin",
  "get_payment_configs_as_orgadmin",
  "get_payment_configs",
];

// ================================
// PAYMENTS (server/routes/Payment/PaymentRoutes.js)
// Distinct from Payment Methods, Payment Configs and Service Payments above.
// ================================

// GET /payment_api/get_payments and /get_all_payments
export const getPaymentsPermission = [
  "get_all_payments_as_superadmin",
  "get_payments_as_orgadmin",
  "get_payments",
];

// GET /payment_api/get_payments/:id
export const getPaymentDetailPermission = [
  "get_all_payments_as_superadmin",
  "get_payments_as_orgadmin",
  "get_payments",
  "get_payment",
];

export const createPaymentPermission = [
  "create_payments_as_superadmin",
  "create_payments_as_orgadmin",
];

export const updatePaymentPermission = [
  "update_payments_as_superadmin",
  "update_payments_as_orgadmin",
];

export const deletePaymentPermission = [
  "delete_payments_as_superadmin",
  "delete_payments_as_orgadmin",
];

export const getPaymentsAnalyticsPermission = [
  "get_all_payments_analytics_as_superadmin",
  "get_payments_analytics_as_orgadmin",
  "get_payments_analytics",
];

export const getPaymentPermission = [
  "get_all_payments_as_superadmin",
  "get_payments_as_orgadmin",
  "get_payments",
  "get_payment",
];

// GET /payment_api/filter_organizations_for_payment
export const paymentFiltersPermission = [
  "create_payments_as_superadmin",
  "create_payments_as_orgadmin",
  "get_all_payments_as_superadmin",
  "get_payments_as_orgadmin",
  "get_payments",
  "get_payment",
  "update_payments_as_superadmin",
  "update_payments_as_orgadmin",
];

// Sidebar-level: any payment permission grants access
export const paymentsSidebarPermission = [
  "get_all_payments_as_superadmin",
  "get_payments_as_orgadmin",
  "get_payments",
  "get_payment",
  "create_payments_as_superadmin",
  "create_payments_as_orgadmin",
  "update_payments_as_superadmin",
  "update_payments_as_orgadmin",
  "delete_payments_as_superadmin",
  "delete_payments_as_orgadmin",
];

// ================================
// BANK ACCOUNTS (server/routes/Bank/BankAccountRoutes.js)
// Flat codes — this module has no _as_superadmin/_as_orgadmin variants,
// and exposes no DELETE endpoint.
// ================================

export const getBankAccountsPermission = ["get_bank_accounts"];

export const getBankAccountDetailPermission = [
  "get_bank_accounts",
  "get_bank_account",
];

export const createBankAccountPermission = ["create_bank_account"];

export const updateBankAccountPermission = ["update_bank_account"];
// Bank Account Permissions
export const getSingleBankAccountPermission = [
  "get_bank_accounts",
  "get_bank_account",
];

// GET /bank_account_api/filter_external_entities and /filter_applicants
export const bankAccountFiltersPermission = [
  "create_bank_account",
  "get_bank_accounts",
  "update_bank_account",
];

// Sidebar-level: any bank account permission grants access
export const bankAccountsSidebarPermission = [
  "get_bank_accounts",
  "get_bank_account",
  "create_bank_account",
  "update_bank_account",
];

// ================================
// STATUSES (server/routes/Status/StatusRoutes.js)
// Flat codes, master-data style.
// ================================

export const getStatusesPermission = ["get_statuses"];
export const getStatusDetailPermission = ["get_statuses", "get_status"];
export const createStatusPermission = ["create_status"];
export const updateStatusPermission = ["update_status"];
export const deleteStatusPermission = ["delete_status"];

// ================================
// MISSING APPLICANT CLAIMS
// (server/routes/Applicant/MissingApplicantClaimRoutes.js)
// The /public_* routes on this module carry no permission middleware.
// ================================

export const getMissingApplicantClaimsPermission = [
  "get_all_missing_applicant_claim",
  "get_missing_applicant_claim",
];

// GET /get_missing_applicant_claim/:id — same list as the collection route
export const getMissingApplicantClaimDetailPermission = [
  "get_all_missing_applicant_claim",
  "get_missing_applicant_claim",
];

// POST /apply_missing_applicant_claim — checkFullPermission
export const applyMissingApplicantClaimPermission = [
  "apply_missing_applicant_claim",
];

// PUT /update_missing_applicant_claim/:id — checkFullPermission
export const updateMissingApplicantClaimPermission = [
  "update_missing_applicant_claim",
];

// POST /decide_missing_applicant_claim/:id (also gates GET /titer_filter)
export const decideMissingApplicantClaimPermission = [
  "decide_missing_applicant_claim",
];

// GET /{organization,proclamation,program_type,city,...}_filters
export const missingApplicantClaimFiltersPermission = [
  "get_all_missing_applicant_claim",
  "get_missing_applicant_claim",
  "apply_missing_applicant_claim",
  "update_missing_applicant_claim",
];

// Sidebar-level: any missing applicant claim permission grants access
export const missingApplicantClaimsSidebarPermission = [
  "get_all_missing_applicant_claim",
  "get_missing_applicant_claim",
  "apply_missing_applicant_claim",
  "update_missing_applicant_claim",
  "decide_missing_applicant_claim",
];

// ================================
// OFFICE FULL BULK UPDATE
// (server/routes/OfficeFullBulkUpdate/OfficeFullBulkUpdateRoutes.js)
// ================================

// 1. Get Office Full Bulk Updates (List)
export const getOfficeFullBulkUpdatesPermission = [
  "get_office_full_bulk_update_as_superadmin",
  "get_office_full_bulk_update_as_orgadmin",
  "get_office_full_bulk_updates",
];

export const getOfficeFullBulkUpdateDetailPermission = [
  "get_office_full_bulk_update_as_superadmin",
  "get_office_full_bulk_update_as_orgadmin",
  "get_office_full_bulk_updates",
  "get_office_full_bulk_update",
];

// 3. Create Office Full Bulk Update
export const createOfficeFullBulkUpdatePermission = [
  "create_office_full_bulk_update_as_superadmin",
  "create_office_full_bulk_update_as_orgadmin",
];

// 4. Update Office Full Bulk Update
export const updateOfficeFullBulkUpdatePermission = [
  "update_office_full_bulk_update_as_superadmin",
  "update_office_full_bulk_update_as_orgadmin",
];

// 5. Delete Office Full Bulk Update
export const deleteOfficeFullBulkUpdatePermission = [
  "delete_office_full_bulk_update_as_superadmin",
  "delete_office_full_bulk_update_as_orgadmin",
];

// 6. Decide Office Full Bulk Update Step
export const decideOfficeFullBulkUpdatePermission = [
  "decide_office_full_bulk_update_as_superadmin",
  "decide_office_full_bulk_update_as_orgadmin",
  "decide_office_full_bulk_update",
];

// GET /filter_organizations and /filter_workflows — note the detail-only
// "get_office_full_bulk_update" is NOT accepted here.
export const officeFullBulkUpdateFiltersPermission = [
  "get_office_full_bulk_update_as_superadmin",
  "get_office_full_bulk_update_as_orgadmin",
  "get_office_full_bulk_updates",
  "create_office_full_bulk_update_as_superadmin",
  "create_office_full_bulk_update_as_orgadmin",
  "update_office_full_bulk_update_as_superadmin",
  "update_office_full_bulk_update_as_orgadmin",
];

// Sidebar-level: any office full bulk update permission grants access
export const officeFullBulkUpdatesSidebarPermission = [
  "get_office_full_bulk_update_as_superadmin",
  "get_office_full_bulk_update_as_orgadmin",
  "get_office_full_bulk_updates",
  "get_office_full_bulk_update",
  "create_office_full_bulk_update_as_superadmin",
  "create_office_full_bulk_update_as_orgadmin",
  "update_office_full_bulk_update_as_superadmin",
  "update_office_full_bulk_update_as_orgadmin",
  "delete_office_full_bulk_update_as_superadmin",
  "delete_office_full_bulk_update_as_orgadmin",
  "decide_office_full_bulk_update_as_superadmin",
  "decide_office_full_bulk_update_as_orgadmin",
  "decide_office_full_bulk_update",
];

// ================================
// EXTERNAL UPDATE REQUESTS
// (server/routes/ExternalEntity/ExternalUpdateRequestRoutes.js)
// ================================

export const getExternalUpdateRequestsPermission = [
  "get_external_update_request_as_superadmin",
  "get_external_update_request_as_orgadmin",
  "get_external_update_request",
];

// GET /external_update_request/:id — same list as the collection route
export const getExternalUpdateRequestDetailPermission = [
  "get_external_update_request_as_superadmin",
  "get_external_update_request_as_orgadmin",
  "get_external_update_request",
];

export const createExternalUpdateRequestPermission = [
  "create_external_update_request_as_superadmin",
  "create_external_update_request_as_orgadmin",
];

export const updateExternalUpdateRequestPermission = [
  "update_external_update_request_as_superadmin",
  "update_external_update_request_as_orgadmin",
];

export const decideExternalUpdateRequestPermission = [
  "decide_external_update_request_as_superadmin",
  "decide_external_update_request_as_orgadmin",
  "decide_external_update_request",
];

// GET /filter_organizations_extreq and /filter_external_entities_extreq —
// the union of every code on the module. Doubles as the sidebar guard.
export const externalUpdateRequestFiltersPermission = [
  "get_external_update_request_as_superadmin",
  "get_external_update_request_as_orgadmin",
  "get_external_update_request",
  "create_external_update_request_as_superadmin",
  "create_external_update_request_as_orgadmin",
  "update_external_update_request_as_superadmin",
  "update_external_update_request_as_orgadmin",
  "decide_external_update_request_as_superadmin",
  "decide_external_update_request_as_orgadmin",
  "decide_external_update_request",
];

// Sidebar-level: any external update request permission grants access
export const externalUpdateRequestsSidebarPermission = [
  "get_external_update_request_as_superadmin",
  "get_external_update_request_as_orgadmin",
  "get_external_update_request",
  "create_external_update_request_as_superadmin",
  "create_external_update_request_as_orgadmin",
  "update_external_update_request_as_superadmin",
  "update_external_update_request_as_orgadmin",
  "decide_external_update_request_as_superadmin",
  "decide_external_update_request_as_orgadmin",
  "decide_external_update_request",
];

// ================================
// EXTERNAL ENTITY PERMISSIONS
// (server/routes/ExternalEntity/ExternalEntityPermissionRoutes.js)
// Which HADMS features a given external entity is allowed to use — flat
// codes, no _as_superadmin/_as_orgadmin variants.
// ================================

export const getExternalEntityPermissionsPermission = [
  "get_external_entity_permissions",
];

export const getExternalEntityPermissionDetailPermission = [
  "get_external_entity_permissions",
  "get_external_entity_permission",
];

export const createExternalEntityPermissionPermission = [
  "create_external_entity_permission",
];

export const updateExternalEntityPermissionPermission = [
  "update_external_entity_permission",
];

export const deleteExternalEntityPermissionPermission = [
  "delete_external_entity_permission",
];

// Sidebar-level: any external entity permission code grants access
export const externalEntityPermissionsSidebarPermission = [
  "get_external_entity_permissions",
  "get_external_entity_permission",
  "create_external_entity_permission",
  "update_external_entity_permission",
  "delete_external_entity_permission",
];
export const getApplicantsPermissions = [
  "get_applicants",
  "get_all_applicants",
];
export const getSingleApplicantPermission = [
  "get_applicant",
  "get_applicants",
  "get_all_applicants",
];

// 2. Get Single Claim
export const getMissingApplicantClaimPermission = [
  "get_all_missing_applicant_claim",
  "get_missing_applicant_claim",
];

// 3. Create Claim
export const createMissingApplicantClaimPermission = [
  "apply_missing_applicant_claim",
];
export const getAppliAnalytics = [
  "get_applicant",
  "get_applicants",
  "get_all_applicants",
];

// Dashboard & Analytics Permissions
export const getApplicantAnalyticsPermission = ["get_applicant", "get_applicants", "get_all_applicants"];
export const getMissingApplicantAnalyticsPermission = ["get_all_missing_applicant_claim", "get_missing_applicant_claim"];
export const getExternalEntityAnalyticsPermission = ["get_all_external_entities_analytics_as_superadmin", "get_external_entities_analytics_as_orgadmin", "get_external_entities_analytics"];
export const getApplicationStatusAnalyticsPermission = ["get_applicant", "get_applicants", "get_all_applicants"];
export const getGeographicAnalyticsPermission = ["get_cities_analytics", "get_sub_cities_analytics", "get_woredas_analytics"];
export const getPaymentAnalyticsDashboardPermission = ["get_all_service_payments_as_superadmin", "get_service_payments_as_orgadmin", "get_service_payments"];
export const getAllPrintableReportsPermission = ["get_all_applicants", "get_applicants"];
export const getAllDashboardAnalyticsPermission = ["get_applicant", "get_applicants", "get_all_applicants"];

