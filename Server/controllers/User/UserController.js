const User = require("../../models/User/UserModel");
const Group = require("../../models/Group/GroupModel");
const Permission = require("../../models/Permission/PermissionModel");
const ActiveSessionModel = require("../../models/ActiveSession/ActiveSessionModel");
const PermissionCategory = require("../../models/PermissionCategory/PermissionCategoryModel");

const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { isValidObjectId } = mongoose;
var nodemailer = require("nodemailer");
const { v4: uuidv4 } = require("uuid");
const validator = require("validator");
const { StatusCodes } = require("http-status-codes");
const {
  user_account_not_found,
  server_error,
  user_fullname_required,
  user_email_required,
  user_phone_required,
  user_password_required,
  user_gender_required,
  user_superadmin_required,
  user_position_required,
  user_group_required,
  user_email_duplicate,
  user_phone_duplicate,
  user_invalid_gender,
  user_invalid_supadmin,
  user_group_not_found,
  user_group_inactive,
  user_additionalprms_notfound,
  invalid_request,
  permissionforuser_not_found,
  permission_ingroup_duplicate,
  user_strong_password,
  user_created_success,
  user_email_format,
  user_emailpassword_required,
  user_emailspace_format,
  user_login_inactive,
  user_login_deactivate,
  user_login_failed,
  user_login_success,
  user_lockout_time,
  user_not_authorized,
  user_logout_success,
  not_authorized,
  user_passwordsuccess_changed,
  user_passwordchange_failure,
  list_ofUsers_notfound,
  user_invalid_id,
  user_password_reset,
  user_password_reset_failed,
  enter_email,
  user_email_format_invalid,
  user_haschanged_password,
  system_emailsend_failed,
  system_emailsend_success,
  user_provide_password,
  invalid_name_search,
  user_additionalprms_invalid,
  user_restrictedprms_invalid,
  inactive_active_type,
  user_updated_success,
  invalid_email_password,
  no_content,
  data_parsing_error,
} = require("../../utils/responseLang");

const { validateAndSaveFile } = require("../../utils/fileValidator");
const {
  validateAndNormalizeEthiopianPhone,
} = require("../../utils/phoneValidator");
const { pictureSize } = require("../../utils/fileSize");
const { getPrmsLstOfUsrs } = require("../../utils/getUsersPrms");

const {
  sessionHashes,
  labelDevice,
  fingerprintUA,
} = require("../../utils/sessionHelpers");
const {
  find,
} = require("../../models/ConstructionLevel/ConstructionLeveModel");

const handleFailedLogin = async (userId) => {
  const user = await User.findByIdAndUpdate(
    userId,
    { $inc: { failed_login_attempts: 1 } },
    { new: true },
  );

  if (!user) {
    throw new Error(user_account_not_found);
  }

  if (user.failed_login_attempts >= 5) {
    user.lockout_until = new Date(Date.now() + 2 * 60 * 1000);
    await user.save();
  }
};

function escapeRegex(input) {
  return input.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function extractString(value) {
  if (value == null) return null;
  if (typeof value === "string") return value.trim();
  if (typeof value === "object" && value.text) return String(value.text).trim();
  return String(value).trim();
}

const LANGUAGES = ["en", "am"];
const isValidString = (str) => typeof str === "string" && str.trim().length > 0;
const CREATE_USER_GLOBAL_CODE = "user_admin";
const CREATE_USER_ORGADMIN_CODE = "create_users_as_orgadmin";
const CREATE_USER_STANDARD_CODE = "create_users";

const GET_USERS_GLOBAL_CODE = "user_admin";
const GET_USERS_ORGADMIN_CODE = "get_users_as_orgadmin";
const GET_USERS_CODE = "get_users";
const GET_USER_CODE = "get_user";

const UPDATE_USER_GLOBAL_CODE = "update_all_users_as_superadmin";
const UPDATE_USER_ORGADMIN_CODE = "update_users_as_orgadmin";
const UPDATE_USER_CODE = "update_user";

const RESET_PASSWORD_GLOBAL_CODE = "reset_password_as_superadmin";
const RESET_PASSWORD_ORGADMIN_CODE = "reset_password_as_orgadmin";

const GET_USERS_ANALYTICS_GLOBAL_CODE = "get_all_users_analytics_as_superadmin";
const GET_USERS_ANALYTICS_ORGADMIN_CODE = "get_users_analytics_as_orgadmin";
const GET_USERS_ANALYTICS_CODE = "get_users_analytics";

const USER_MEDIA_FILE_FOLDER = path.join("./", "Media");

const groupFilters = async (req, res) => {
  try {
    const requesterId = req?.user?.id;
    if (!requesterId || !mongoose.isValidObjectId(requesterId)) {
      return res.status(StatusCodes.OK).json([]);
    }

    const authContext = req?.authContext || {};
    const requester = await User.findOne({ _id: requesterId })
      .select(
        "isSuperAdmin status fullname addPrms orgIds restrictedPrms group",
      )
      .lean();

    if (!requester) {
      return res.status(StatusCodes.OK).json([]);
    }

    if (requester.status !== "active") {
      return res.status(StatusCodes.OK).json([]);
    }

    const isSuperAdmin = requester.isSuperAdmin === "yes";

    // Effective permission codes: either from middleware or from delegation scope
    let effectiveCodes = Array.isArray(req.effectivePermissions)
      ? req.effectivePermissions
      : [];

    const hasGlobal =
      isSuperAdmin ||
      effectiveCodes.includes(CREATE_USER_GLOBAL_CODE) ||
      effectiveCodes.includes(GET_USERS_GLOBAL_CODE) ||
      effectiveCodes.includes(UPDATE_USER_GLOBAL_CODE) ||
      effectiveCodes.includes(RESET_PASSWORD_GLOBAL_CODE);

    const hasOrgAdmin =
      !hasGlobal &&
      (effectiveCodes.includes(CREATE_USER_ORGADMIN_CODE) ||
        effectiveCodes.includes(GET_USERS_ORGADMIN_CODE) ||
        effectiveCodes.includes(UPDATE_USER_ORGADMIN_CODE) ||
        effectiveCodes.includes(RESET_PASSWORD_ORGADMIN_CODE));

    const hasStandard =
      !hasGlobal &&
      !hasOrgAdmin &&
      (effectiveCodes.includes(GET_USERS_CODE) ||
        effectiveCodes.includes(GET_USER_CODE) ||
        effectiveCodes.includes(CREATE_USER_STANDARD_CODE) ||
        effectiveCodes.includes(UPDATE_USER_CODE));

    if (!hasGlobal && !hasOrgAdmin && !hasStandard) {
      return res.status(StatusCodes.OK).json([]);
    }

    const ctxOrgs = await getEffectiveUserContext({ requesterId, authContext });

    if (!ctxOrgs || ctxOrgs.valid === false) {
      return res.status(StatusCodes.OK).json([]);
    }

    const requesterOrgIds =
      (ctxOrgs.organization || []).map((id) => id.toString()) || [];
    const currentOrgId = ctxOrgs?.currentOrgId || null;

    let permissionFilter = {};

    if (hasGlobal) {
      // Global: can see groups from all organizations
      permissionFilter = {};
    } else if (hasOrgAdmin) {
      // Org-admin in self/position context:
      //   - union allowed orgs across ALL relevant org-admin user codes
      //   - then expand with children
      if (!requesterOrgIds.length) {
        return res.status(StatusCodes.OK).json([]);
      }
      if (!currentOrgId || !mongoose.isValidObjectId(currentOrgId)) {
        return res.status(StatusCodes.OK).json([]);
      }
      const orgAdminCodesToCheck = [
        GET_USERS_ORGADMIN_CODE,
        CREATE_USER_ORGADMIN_CODE,
        UPDATE_USER_ORGADMIN_CODE,
        RESET_PASSWORD_ORGADMIN_CODE,
      ].filter((code) => effectiveCodes.includes(code));

      if (!orgAdminCodesToCheck.length) {
        return res.status(StatusCodes.OK).json([]);
      }

      const allowedOrgIdsMap = new Map();
      let anyOk = false;

      for (const code of orgAdminCodesToCheck) {
        const { ok, orgLists } =
          await ensureOrgScopedPermissionNotFullyRestrictedPlusValidOrgs({
            requester,
            requesterOrgIds: [currentOrgId],
            targetPermissionCode: code,
          });

        if (ok && Array.isArray(orgLists) && orgLists.length) {
          anyOk = true;
          for (const orgId of orgLists) {
            const key = orgId.toString();
            if (!allowedOrgIdsMap.has(key)) {
              allowedOrgIdsMap.set(key, orgId);
            }
          }
        }
      }

      if (!anyOk || allowedOrgIdsMap.size === 0) {
        return res.status(StatusCodes.OK).json([]);
      }

      const baseOrgIds = Array.from(allowedOrgIdsMap.values()).map((id) =>
        id.toString(),
      );
      const scopedOrgIds = await expandOrgScopeWithChildren(baseOrgIds);

      permissionFilter = {
        organization: { $in: scopedOrgIds },
      };
    } else if (hasStandard && !hasOrgAdmin && !hasGlobal) {
      // Standard users in self/position context:
      //   - union allowed orgs across standard codes
      //   - no children expansion
      if (!requesterOrgIds.length) {
        return res.status(StatusCodes.OK).json([]);
      }
      if (!currentOrgId || !mongoose.isValidObjectId(currentOrgId)) {
        return res.status(StatusCodes.OK).json([]);
      }

      const standardCodesToCheck = [
        GET_USERS_CODE,
        GET_USER_CODE,
        CREATE_USER_STANDARD_CODE,
        UPDATE_USER_CODE,
      ].filter((code) => effectiveCodes.includes(code));

      if (!standardCodesToCheck.length) {
        return res.status(StatusCodes.OK).json([]);
      }

      const allowedOrgIdsMap = new Map();
      let anyOk = false;

      for (const code of standardCodesToCheck) {
        const { ok, orgLists } =
          await ensureOrgScopedPermissionNotFullyRestrictedPlusValidOrgs({
            requester,
            requesterOrgIds: [currentOrgId],
            targetPermissionCode: code,
          });

        if (ok && Array.isArray(orgLists) && orgLists.length) {
          anyOk = true;
          for (const orgId of orgLists) {
            const key = orgId.toString();
            if (!allowedOrgIdsMap.has(key)) {
              allowedOrgIdsMap.set(key, orgId);
            }
          }
        }
      }

      if (!anyOk || allowedOrgIdsMap.size === 0) {
        return res.status(StatusCodes.OK).json([]);
      }

      const allowedOrgIds = Array.from(allowedOrgIdsMap.values());

      permissionFilter = {
        organization: { $in: allowedOrgIds },
      };
    } else {
      return res.status(StatusCodes.OK).json([]);
    }
    const groups = await Group.find(permissionFilter)
      .select("name organization lstOfPrms")
      .populate({
        path: "lstOfPrms",
        select: "name code_name ",
      })
      .lean();

    return res.status(StatusCodes.OK).json(groups || []);
  } catch (error) {
    return res.status(StatusCodes.OK).json([]);
  }
};

const createUser = async (req, res) => {
  let session = null;

  try {
    const requesterId = req?.user?.id;
    if (!requesterId || !mongoose.isValidObjectId(requesterId)) {
      return res.status(StatusCodes.UNAUTHORIZED).json(not_authorized);
    }

    console.log("Hello");
    console.log("effectivePermissions:", req.effectivePermissions);
    console.log("CREATE_USER_GLOBAL_CODE:", CREATE_USER_GLOBAL_CODE);

    // Load requester to check status and superadmin status
    const requester = await User.findById(requesterId)
      .select("isSuperAdmin status fullname addPrms restrictedPrms group")
      .lean();

    if (!requester) {
      return res.status(StatusCodes.UNAUTHORIZED).json(not_authorized);
    }

    if (requester.status !== "active") {
      return res
        .status(StatusCodes.FORBIDDEN)
        .json(user_login_inactive(requester?.fullname || {}));
    }

    const isSuperAdminUnrestricted = requester.isSuperAdmin === "yes";

    const effectiveCodes = Array.isArray(req.effectivePermissions)
      ? req.effectivePermissions
      : [];

    const hasGlobalUserCreate =
      isSuperAdminUnrestricted ||
      effectiveCodes.includes(CREATE_USER_GLOBAL_CODE);

    if (!hasGlobalUserCreate) {
      return res.status(StatusCodes.FORBIDDEN).json(not_authorized);
    }

    // ------- Parse multipart form fields -------
    const fields = req.formFields || {};
    const files = req.formFiles || {};

    let fullname = fields?.fullname?.[0];
    let email = fields?.email?.[0];
    let password = fields?.password?.[0];
    let phone = fields?.phone?.[0];
    let gender = fields?.gender?.[0];
    let isSuperAdminInput = fields?.isSuperAdmin?.[0];
    const group = fields?.group?.[0] || [];
    const isAdditionalPrmReq = fields?.isAdditionalPrmReq?.[0] || "no";
    const assignedNewPrms = fields?.assignedNewPrms?.[0] || "";
    const restrictedPrmsInput = fields?.restrictedPrms?.[0] || "";
    const picture = files?.picture?.[0];
    const signature = files?.signature?.[0];
    const position = fields?.position?.[0];

    // ------- Multilingual Fullname Validation -------
    if (!fullname) {
      return res.status(StatusCodes.BAD_REQUEST).json(user_fullname_required);
    }
    console.log(fullname);

    let parsedFullname;
    try {
      parsedFullname = typeof fullname === "string" ? fullname : null;
    } catch (error) {
      return res.status(StatusCodes.BAD_REQUEST).json(user_fullname_required);
    }

    if (!parsedFullname || typeof parsedFullname !== "string") {
      return res.status(StatusCodes.BAD_REQUEST).json(user_fullname_required);
    }

    if (position === undefined || !isValidString(position) || !position) {
      return res.status(StatusCodes.BAD_REQUEST).json(user_position_required);
    }

    if (position) {
      if (typeof position !== "string" || position.trim() === 0) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json("invalid input for position");
      }
    }

    const normalizedFullname = {};

    if (email)
      if (!isValidString(email)) {
        // ------- Basic field validation -------
        return res.status(StatusCodes.BAD_REQUEST).json(user_email_required);
      }
    if (!isValidString(password)) {
      return res.status(StatusCodes.BAD_REQUEST).json(user_password_required);
    }
    if (!isValidString(phone)) {
      return res.status(StatusCodes.BAD_REQUEST).json(user_phone_required);
    }
    if (!gender) {
      return res.status(StatusCodes.BAD_REQUEST).json(user_gender_required);
    }

    // Superadmin input handling
    if (isSuperAdminUnrestricted) {
      if (!isSuperAdminInput || !["yes", "no"].includes(isSuperAdminInput)) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json(user_superadmin_required);
      }
    } else {
      // Non-superadmin creators cannot create superadmin users
      isSuperAdminInput = "no";
    }

    email = email?.trim()?.toLowerCase();
    phone = phone.trim();

    // Email validation & uniqueness
    if (email.includes(" ")) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json(user_emailspace_format(email));
    }

    if (!validator.isEmail(email)) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json(user_email_format_invalid);
    }

    const existingEmail = await User.findOne({ email }).lean();
    if (existingEmail) {
      return res.status(StatusCodes.CONFLICT).json(user_email_duplicate(email));
    }

    // Phone normalization & uniqueness

    const phoneNumberResult = validateAndNormalizeEthiopianPhone(phone);
    if (phoneNumberResult.status === "error") {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json(phoneNumberResult.wrongPhoneMsg);
    }
    const normalizedPhone = phoneNumberResult.normalized;

    const existingPhone = await User.findOne({ phone: normalizedPhone }).lean();
    if (existingPhone) {
      return res
        .status(StatusCodes.CONFLICT)
        .json(user_phone_duplicate(normalizedPhone));
    }

    // Gender validation
    if (!["Male", "Female"].includes(gender)) {
      return res.status(StatusCodes.BAD_REQUEST).json(user_invalid_gender);
    }

    // ------- Group assignment -------
    let userGroups = [];
    if (group) {
      try {
        userGroups = Array.isArray(group) ? group : JSON.parse(group);
      } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json(data_parsing_error);
      }
    }

    if (isSuperAdminInput === "no") {
      if (!Array.isArray(userGroups) || userGroups.length === 0) {
        return res.status(StatusCodes.BAD_REQUEST).json(user_group_required);
      }
    } else {
      userGroups = [];
    }

    const finalUserGroup = [];
    let groupDocs = [];

    if (isSuperAdminInput === "no" && userGroups.length > 0) {
      const validGroupIds = [];
      for (const gid of userGroups) {
        if (!mongoose.isValidObjectId(gid)) {
          return res.status(StatusCodes.BAD_REQUEST).json(user_group_not_found);
        }
        validGroupIds.push(gid);
      }

      groupDocs = await Group.find({ _id: { $in: validGroupIds } })
        .populate({
          path: "lstOfPrms",
          select: "name code_name isSensitivePermission",
        })
        .select("_id name status lstOfPrms")
        .lean();

      if (groupDocs.length !== validGroupIds.length) {
        return res.status(StatusCodes.BAD_REQUEST).json(user_group_not_found);
      }

      for (const g of groupDocs) {
        const gid = g._id.toString();

        if (g.status === "inactive") {
          return res.status(StatusCodes.BAD_REQUEST).json(user_group_inactive);
        }

        // Sensitive permission check for non-global creators
        const isGcontainSensitivePrm = (g.lstOfPrms || []).some(
          (item) => item?.isSensitivePermission === "yes",
        );
        if (!hasGlobalUserCreate && isGcontainSensitivePrm) {
          return res.status(StatusCodes.FORBIDDEN).json(not_authorized);
        }

        finalUserGroup.push(gid);
      }
    }

    // Pre-build set of group permission ids (used by addPrms & restrictedPrms)
    const groupPermissionIds = new Set();
    for (const g of groupDocs) {
      for (const p of g.lstOfPrms || []) {
        groupPermissionIds.add(p._id.toString());
      }
    }

    // ------- Additional permissions (addPrms) -------
    let addPrmsFinal = [];
    if (
      isSuperAdminInput === "no" &&
      isAdditionalPrmReq === "yes" &&
      assignedNewPrms
    ) {
      let rawAddPrms;
      try {
        rawAddPrms = Array.isArray(assignedNewPrms)
          ? assignedNewPrms
          : JSON.parse(assignedNewPrms);
      } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json(data_parsing_error);
      }

      if (!Array.isArray(rawAddPrms) || rawAddPrms.length === 0) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json(user_additionalprms_notfound);
      }

      const addPrmsSet = new Set();

      for (const prmId of rawAddPrms) {
        if (!mongoose.isValidObjectId(prmId)) {
          return res.status(StatusCodes.BAD_REQUEST).json(invalid_request);
        }

        const prmIdStr = prmId.toString();

        const permDoc = await Permission.findOne({ _id: prmId })
          .select("name code_name isSensitivePermission")
          .lean();

        if (!permDoc) {
          return res
            .status(StatusCodes.NOT_FOUND)
            .json(permissionforuser_not_found(fullname || ""));
        }

        // Cannot duplicate a permission that already comes from a group
        if (groupPermissionIds.has(prmIdStr)) {
          return res
            .status(StatusCodes.CONFLICT)
            .json(permission_ingroup_duplicate(permDoc.name || ""));
        }

        // Non-global creators cannot assign sensitive permissions
        if (!hasGlobalUserCreate && permDoc.isSensitivePermission === "yes") {
          return res.status(StatusCodes.FORBIDDEN).json(not_authorized);
        }

        addPrmsSet.add(prmIdStr);
      }

      addPrmsFinal = Array.from(addPrmsSet);
    }

    // ------- Restricted permissions (restrictedPrms) -------
    let restrictedPrmsFinal = [];
    if (isSuperAdminInput === "no" && restrictedPrmsInput) {
      let rawRestricted;
      try {
        rawRestricted = Array.isArray(restrictedPrmsInput)
          ? restrictedPrmsInput
          : JSON.parse(restrictedPrmsInput);
      } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json(data_parsing_error);
      }

      if (!Array.isArray(rawRestricted)) {
        return res.status(StatusCodes.BAD_REQUEST).json(data_parsing_error);
      }

      const restrictedSet = new Set();

      for (const prmId of rawRestricted) {
        if (!mongoose.isValidObjectId(prmId)) {
          return res.status(StatusCodes.BAD_REQUEST).json(invalid_request);
        }

        const prmIdStr = prmId.toString();

        const permDoc = await Permission.findOne({ _id: prmId })
          .select("name code_name isSensitivePermission")
          .lean();

        if (!permDoc) {
          return res
            .status(StatusCodes.NOT_FOUND)
            .json(res_permissionforuser_not_found(fullname || ""));
        }

        // Non-global creators cannot restrict sensitive permissions
        if (!hasGlobalUserCreate && permDoc.isSensitivePermission === "yes") {
          return res.status(StatusCodes.FORBIDDEN).json(not_authorized);
        }

        // Restricted permission must belong to one of the user's groups
        if (!groupPermissionIds.has(prmIdStr)) {
          return res
            .status(StatusCodes.BAD_REQUEST)
            .json(res_permissionforuser_not_found(fullname || ""));
        }

        // Cannot be in addPrms
        if (addPrmsFinal.some((id) => id.toString() === prmIdStr)) {
          return res.status(StatusCodes.BAD_REQUEST).json(invalid_request);
        }

        restrictedSet.add(prmIdStr);
      }

      restrictedPrmsFinal = Array.from(restrictedSet);
    }

    // ------- Password validation -------
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[ !"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~])[A-Za-z\d !"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]{8,}$/;

    if (!passwordRegex.test(password)) {
      return res.status(StatusCodes.BAD_REQUEST).json(user_strong_password);
    }

    const hashedPwd = await bcrypt.hash(password, 10);

    // ------- Picture upload -------
    let savedFilePath = "";
    if (picture) {
      try {
        savedFilePath = await validateAndSaveFile(picture, {
          folder: "UserPictures",
          allowedMimeTypes: [
            "image/jpeg",
            "image/JPEG",
            "image/jpg",
            "image/JPG",
            "image/png",
            "image/PNG",
          ],
          maxSizeMB: pictureSize,
        });
      } catch (err) {
        const payload = err?.payload || {
          Message_am: `ልክ ያልሆነ የተጠቃሚ ምስል ቅርጸት እባክዎ እንደገና ይሞክሩ። መተግበሪያው '.jpeg'፣ '.jpg' ወይም '.png' ብቻ ይቀበላል። መተግበሪያው ከ ${pictureSize} የሚበልጡ ምስሎችን አይቀበልም።`,
          Message_en:
            err?.message ||
            `The uploaded picture is invalid. Please upload a picture in .jpeg, .jpg, or .png format and with a size not exceeding ${pictureSize}MB.`,
        };
        return res.status(StatusCodes.BAD_REQUEST).json(payload);
      }
    }

    // ------- Signature validation & upload -------

    // ------- Build user payload -------
    const newUserPayload = {
      fullname,
      email,
      password: hashedPwd,
      phone: normalizedPhone,
      gender,
      position: position.trim(),
      isSuperAdmin: isSuperAdminInput,
      group: isSuperAdminInput === "yes" ? [] : finalUserGroup,
      addPrms: isSuperAdminInput === "yes" ? [] : addPrmsFinal,
      restrictedPrms: isSuperAdminInput === "yes" ? [] : restrictedPrmsFinal,
      picture: savedFilePath,
      signature: signature,
      createdBy: requesterId,
    };

    // ------- Transaction: create user -------
    session = await mongoose.startSession();
    await session.withTransaction(async () => {
      await User.create([newUserPayload], { session });
    });

    return res.status(StatusCodes.CREATED).json(user_created_success(fullname));
  } catch (error) {
    console.log("Error in creating user:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(server_error);
  } finally {
    if (session) {
      await session.endSession();
    }
  }
};

const loginUser = async (req, res) => {
  try {
    const {
      ACCESS_TOKEN_SECRET,
      ACCESS_TOKEN_TTL_HOURS = "8",
      MAX_ACTIVE_SESSIONS_PER_USER = "10",
      JWT_ISS,
      JWT_AUD_CMS_API,
    } = process.env;

    const ACCESS_TTL_HOURS = parseInt(ACCESS_TOKEN_TTL_HOURS, 10);
    const MAX_SESSIONS = parseInt(MAX_ACTIVE_SESSIONS_PER_USER, 10);

    const email = req.body?.email?.trim();
    const password = req.body?.password;

    res.clearCookie("jwt");

    if (!email || !password) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json(user_emailpassword_required);
    }

    if (!validator.isEmail(email)) {
      return res.status(StatusCodes.BAD_REQUEST).json(invalid_email_password);
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json(invalid_email_password);
    }

    if (user?.status === "inactive") {
      return res.status(StatusCodes.FORBIDDEN).json(user_login_deactivate);
    }

    if (user?.group) {
      const findUserGrp = await Group.findById(user.group);
      if (!findUserGrp || findUserGrp.status === "inactive") {
        return res.status(StatusCodes.FORBIDDEN).json(user_group_inactive);
      }
    }

    if (user?.lockout_until && new Date() < user?.lockout_until) {
      const remainingTime = Math.ceil(
        (new Date(user?.lockout_until) - new Date()) / 1000,
      );
      return res.status(StatusCodes.FORBIDDEN).json(remainingTime);
    }

    if (user?.lockout_until && new Date() > user?.lockout_until) {
      user.failed_login_attempts = 0;
      user.lockout_until = null;
      await user.save();
    }

    if (!user?.password || !user?.password?.startsWith("$2b$")) {
      return res.status(StatusCodes.BAD_REQUEST).json(invalid_email_password);
    }

    const isPasswordCorrect = await bcrypt.compare(password, user?.password);
    if (!isPasswordCorrect) {
      await handleFailedLogin(user._id);
      res.clearCookie("jwt");
      return res.status(StatusCodes.UNAUTHORIZED).json(invalid_email_password);
    }

    if (user?.haslogged === "no") {
      user.haslogged = "yes";
    }

    user.last_logged_in = new Date();
    user.failed_login_attempts = 0;
    user.lockout_until = null;
    await user.save();

    const sid = uuidv4();
    const now = new Date();
    const exp = new Date(now.getTime() + ACCESS_TTL_HOURS * 60 * 60 * 1000);

    const existingCount = await ActiveSessionModel.countDocuments({
      user: user._id,
      revokedAt: null,
      expiresAt: { $gt: now },
    });
    if (existingCount >= MAX_SESSIONS) {
      const oldest = await ActiveSessionModel.find({
        user: user._id,
        revokedAt: null,
        expiresAt: { $gt: now },
      })
        .sort({ lastSeenAt: 1 })
        .limit(1);
      if (oldest[0]) {
        oldest[0].revokedAt = new Date();
        await oldest[0].save();
      }
    }

    const { uaRaw, uaHash, ipHash } = sessionHashes(req);
    await ActiveSessionModel.create({
      user: user._id,
      sid,
      uaHash,
      ipHash,
      deviceLabel: labelDevice(uaRaw),
      createdAt: now,
      lastSeenAt: now,
      expiresAt: exp,
    });

    const tokenPayload = {
      user: { id: user._id, email: user.email },
      sid,
      jti: sid,
      iss: JWT_ISS,
      aud: JWT_AUD_CMS_API,
    };

    const token = jwt.sign(tokenPayload, ACCESS_TOKEN_SECRET, {
      expiresIn: `${ACCESS_TTL_HOURS}h`,
    });

    const userData = await User.findOne({ email }).select(
      "hasChangedPwd -_id fullname",
    );

    return res
      .cookie("jwt", token, {
        httpOnly: true,
        sameSite: "None",
        secure: true,
        maxAge: ACCESS_TTL_HOURS * 3600 * 1000,
      })
      .status(StatusCodes.OK)
      .json({
        token,
        user: userData,
      });
  } catch (error) {
    console.log("Error in login", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(server_error);
  }
};

const logoutUser = async (req, res) => {
  try {
    const requesterId = req?.user?.id;
    if (!requesterId || !mongoose.isValidObjectId(requesterId)) {
      return res.status(StatusCodes.UNAUTHORIZED).json(not_authorized);
    }

    await ActiveSessionModel.updateOne(
      { sid: req.user.sid, user: requesterId, revokedAt: null },
      { $set: { revokedAt: new Date() } },
    );

    return res
      .clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true })
      .status(StatusCodes.OK)
      .json(user_logout_success);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(server_error);
  }
};

const changeUsrPwd = async (req, res) => {
  try {
    const requesterId = req?.user?.id;
    if (!requesterId || !mongoose.isValidObjectId(requesterId)) {
      return res.status(StatusCodes.UNAUTHORIZED).json(not_authorized);
    }

    const findUser = await User.findOne({ _id: requesterId });

    if (!findUser) {
      return res.status(StatusCodes.UNAUTHORIZED).json(not_authorized);
    }

    const password = req?.formFields?.password?.[0] || req?.body?.password;

    if (findUser?.haslogged === "yes" && findUser?.hasChangedPwd === "no") {
      if (!password) {
        return res.status(StatusCodes.BAD_REQUEST).json(user_password_required);
      }

      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[ !"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~])[A-Za-z\d !"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]{8,}$/;

      if (!passwordRegex.test(password)) {
        return res.status(StatusCodes.BAD_REQUEST).json(user_strong_password);
      }

      const hashedPwd = await bcrypt.hash(password, 10);

      const updatedFields = {};

      updatedFields.password = hashedPwd;
      updatedFields.hasChangedPwd = "yes";
      updatedFields.passwordChangedAt = new Date();

      const updateAccount = await User.findOneAndUpdate(
        { _id: requesterId },
        updatedFields,
        { new: true },
      );

      if (!updateAccount) {
        return res.status(StatusCodes.UNAUTHORIZED).json(not_authorized);
      }

      return res
        .status(StatusCodes.OK)
        .json(
          user_passwordsuccess_changed(findUser?.fullname?.toLocaleUpperCase()),
        );
    } else {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json(
          user_passwordchange_failure(findUser?.fullname?.toLocaleUpperCase()),
        );
    }
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(server_error);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const requesterId = req?.user?.id;
    if (!requesterId || !mongoose.isValidObjectId(requesterId)) {
      return res.status(StatusCodes.UNAUTHORIZED).json(not_authorized);
    }

    const findUsers = await User.find()
      .select("-password")
      .populate({ path: "group", select: "name" })
      .populate({
        path: "createdBy",
        select: "fullname email position",
      })
      .populate({
        path: "addPrms",
        select: "name",
      })
      .populate({
        path: "restrictedPrms",
        select: "name",
      });

    if (!findUsers) {
      return res.status(StatusCodes.NOT_FOUND).json(list_ofUsers_notfound);
    }

    return res.status(StatusCodes.OK).json(findUsers);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(server_error);
  }
};

const getAllUsersWithOutPrm = async (req, res) => {
  try {
    const requesterId = req?.user?.id;
    if (!requesterId || !mongoose.isValidObjectId(requesterId)) {
      return res.status(StatusCodes.UNAUTHORIZED).json(not_authorized);
    }

    const findAllUsrs = await User.find()
      .select("-password")
      .populate({ path: "group", select: "name" })
      .populate({
        path: "createdBy",
        select: "fullname email position",
      })
      .populate({
        path: "addPrms",
        select: "name",
      })
      .populate({
        path: "restrictedPrms",
        select: "name",
      });

    if (!findAllUsrs) {
      return res.status(StatusCodes.NOT_FOUND).json(list_ofUsers_notfound);
    }

    return res.status(StatusCodes.OK).json(findAllUsrs);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(server_error);
  }
};

const getUsers = async (req, res) => {
  try {
    const requesterId = req?.user?.id;
    if (!requesterId || !mongoose.isValidObjectId(requesterId)) {
      return res.status(StatusCodes.UNAUTHORIZED).json(not_authorized);
    }

    let page = parseInt(req?.query?.page) || 1;
    let limit = parseInt(req?.query?.limit) || 5;
    let sortBy = parseInt(req?.query?.sort) || -1;

    let userIds = req?.query?.userIds || [];
    let fullname = req?.query?.fullname?.trim() || "";
    let email = req?.query?.email?.trim() || "";
    let status = req?.query?.status || "";
    let phone = req?.query?.phone?.trim() || "";
    let gender = req?.query?.gender || "";
    let isSuperAdmin = req?.query?.isSuperAdmin || "";
    let group = req?.query?.group || null;

    if (page <= 0) page = 1;
    if (limit <= 0) limit = 5;
    if (sortBy !== 1 && sortBy !== -1) sortBy = -1;
    if (status === "" || status === null) status = "";
    if (gender === "" || gender === null) gender = "";
    if (isSuperAdmin === "" || isSuperAdmin === null) isSuperAdmin = "";
    if (!userIds || userIds?.length === 0) userIds = [];

    let lstOfUsrIdsArray = [];
    if (userIds) {
      let lstOfUsrIds = [];

      try {
        lstOfUsrIds = Array.isArray(userIds) ? userIds : JSON.parse(userIds);
      } catch (error) {
        lstOfUsrIds = [];
      }

      if (lstOfUsrIds?.length > 0) {
        for (const item of lstOfUsrIds) {
          if (!item || !mongoose.isValidObjectId(item)) {
            return res.status(StatusCodes.NOT_ACCEPTABLE).json(invalid_request);
          }
          const findUsrs = await User.findOne({ _id: item });
          if (findUsrs) lstOfUsrIdsArray.push(findUsrs);
        }
      }
    }

    if (!group) group = null;
    if (group && !mongoose.isValidObjectId(group)) group = null;
    const findGroup = group ? await Group.findOne({ _id: group }) : null;
    if (!findGroup) group = null;

    const query = {};

    if (lstOfUsrIdsArray?.length > 0) {
      query._id = { $in: lstOfUsrIdsArray.map((u) => u._id) };
    }

    if (fullname) {
      fullname = fullname?.trim();
      try {
        const sanitizedName = escapeRegex(fullname);
        query.fullname = { $regex: sanitizedName, $options: "i" };
      } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json(invalid_name_search);
      }
    }

    if (email) {
      email = email?.trim();
      try {
        const sanitizedEmail = escapeRegex(email);
        query.email = { $regex: sanitizedEmail, $options: "i" };
      } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json(invalid_name_search);
      }
    }

    if (group) {
      query.group = group;
    }

    if (status) {
      query.status = status;
    }

    if (phone) {
      query.phone = { $regex: new RegExp(phone, "i") };
    }

    if (gender) {
      query.gender = gender;
    }

    if (isSuperAdmin) {
      query.isSuperAdmin = isSuperAdmin;
    }

    const totalUsers = await User.countDocuments(query);
    const totalPages = Math.ceil(totalUsers / limit);
    if (page > totalPages) page = 1;
    const skip = (page - 1) * limit;

    const findUser = await User.find(query)
      .sort({ createdAt: sortBy, _id: sortBy })
      .skip(skip)
      .limit(limit)
      .select("-password")
      .populate({ path: "group", select: "name" })
      .populate({ path: "createdBy", select: "fullname email position" })
      .populate({ path: "addPrms", select: "name" })
      .populate({ path: "restrictedPrms", select: "name" });

    if (!findUser) {
      return res.status(StatusCodes.NOT_FOUND).json(list_ofUsers_notfound);
    }

    return res.status(StatusCodes.OK).json({
      users: findUser,
      totalUsers,
      currentPage: page,
      totalPages: totalPages,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(server_error);
  }
};

const getUser = async (req, res) => {
  try {
    const requesterId = req?.user?.id;
    if (!requesterId || !mongoose.isValidObjectId(requesterId)) {
      return res.status(StatusCodes.UNAUTHORIZED).json(not_authorized);
    }

    const id = req?.params?.id;
    if (!id || !mongoose.isValidObjectId(id)) {
      return res.status(StatusCodes.BAD_REQUEST).json(invalid_request); // Changed from NOT_ACCEPTABLE
    }

    // 1. ALWAYS allow users to view their own profile
    if (requesterId.toString() === id.toString()) {
      const findUser = await User.findOne({ _id: id })
        .select("-password")
        .populate({ path: "group", select: "name" })
        .populate({
          path: "createdBy",
          select: "fullname email position picture",
        })
        .populate({ path: "addPrms", select: "name" })
        .populate({ path: "restrictedPrms", select: "name" });

      if (!findUser) {
        return res.status(StatusCodes.NOT_FOUND).json(user_account_not_found);
      }
      return res.status(StatusCodes.OK).json(findUser);
    }

    // 2. If they are trying to view SOMEONE ELSE'S profile, enforce strict permissions
    const findRequestingUsr = await User.findOne({ _id: requesterId });
    if (!findRequestingUsr) {
      return res.status(StatusCodes.UNAUTHORIZED).json(not_authorized);
    }

    const userRole = findRequestingUsr.isSuperAdmin; // Should be a boolean, not "yes"/"no"

    // (Assuming getPrmsLstOfUsrs returns an array of permission IDs or objects)
    const userPermissions = await getPrmsLstOfUsrs(requesterId);
    const userPermissionStrings = userPermissions?.map((perm) =>
      perm?.toString(),
    );

    const permissions = await Permission.find({
      code_name: { $in: ["get_users", "get_user"] },
    });

    const getAllUsersPrms = permissions?.find(
      (item) => item?.code_name === "get_users",
    );
    const getSingleUsersPrms = permissions?.find(
      (item) => item?.code_name === "get_user",
    );

    const hasAllPrms = userPermissionStrings?.includes(
      getAllUsersPrms?._id?.toString(),
    );
    const hasSinglePrm = userPermissionStrings?.includes(
      getSingleUsersPrms?._id?.toString(),
    );

    // Block if not super admin and lacks both permissions
    if (userRole !== true && !hasAllPrms && !hasSinglePrm) {
      return res.status(StatusCodes.FORBIDDEN).json(not_authorized);
    }

    // 3. Fetch the target user (we already know id !== requesterId here)
    const findUser = await User.findOne({ _id: id })
      .select("-password")
      .populate({ path: "group", select: "Name" }) // Note: capitalize 'Name' if that's your schema
      .populate({
        path: "createdBy",
        select: "fullname email position picture",
      })
      .populate({ path: "addPrms", select: "name" })
      .populate({ path: "restrictedPrms", select: "name" });

    if (!findUser) {
      return res.status(StatusCodes.NOT_FOUND).json(user_account_not_found);
    }

    return res.status(StatusCodes.OK).json(findUser);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(server_error);
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req?.body;
    if (!email) {
      return res.status(StatusCodes.BAD_REQUEST).json(enter_email);
    }

    if (!validator.isEmail(email))
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json(user_email_format_invalid);

    const user = await User.findOne({ email });
    if (!user)
      return res.status(StatusCodes.NOT_FOUND).json(user_email_format_invalid);

    if (user?.status === "inactive")
      return res
        .status(StatusCodes.FORBIDDEN)
        .json(user_login_inactive(user?.fullname?.toLocaleUpperCase()));

    if (user?.hasChangedPwd === "no") {
      return res.status(StatusCodes.FORBIDDEN).json(user_haschanged_password);
    }

    if (user?.group) {
      const findUserGrp = await Group.findOne({ _id: user?.group });

      if (!findUserGrp) {
        return res.status(StatusCodes.FORBIDDEN).json(user_group_not_found);
      }

      if (findUserGrp?.status === "inactive") {
        return res.status(StatusCodes.FORBIDDEN).json(user_group_inactive);
      }
    }

    const secret = process.env.ACCESS_TOKEN_SECRET + user?.password;

    const token = jwt.sign({ email: user?.email, id: user?._id }, secret, {
      expiresIn: "10m",
    });

    const link = `${process.env.FRONT_END_HOST}/reset_password/${user?._id}/${token}`;

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_FROM,
        pass: process.env.MAIL_PASS,
      },
    });

    var mailOptions = {
      from: process.env.MAIL_FROM,
      to: `${email}`,
      subject: "Do not reply. Reset Password.",
      html: `<div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
      <h1 style="color: #1C3F79; margin-bottom: 20px;">Addis Ababa Housing Development And Administration Bureau</h1>
      <div style="background-color: #ffffff; padding: 20px; border-radius: 10px;">
          <h2 style="color: #1C3F79; margin-bottom: 20px;">Reset Password</h2>
          <p style="color: #333; margin-bottom: 20px;">Dear ${user?.fullname},</p>
          <p style="color: #333; margin-bottom: 20px;">You have requested to reset your password. Please click the link below to reset your password:</p>
          <a href="${link}" style="color: #ffffff; text-decoration: none; font-weight: bold; display: inline-block; padding: 10px 20px; background-color: #1C3F79; border-radius: 5px;">Reset Password</a>
      </div>
      </div>
      `,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return res
          .status(StatusCodes.EXPECTATION_FAILED)
          .json(system_emailsend_failed);
      } else {
        return res.status(StatusCodes.OK).json(system_emailsend_success);
      }
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(server_error);
  }
};

const resetPassword = async (req, res) => {
  try {
    const { id, token } = req?.params;
    const { password } = req?.body;

    if (!id || !mongoose.isValidObjectId(id)) {
      return res.status(StatusCodes.NOT_FOUND).json(user_invalid_id);
    }

    const findUser = await User.findOne({ _id: id });

    if (!findUser) {
      return res.status(StatusCodes.NOT_FOUND).json(user_account_not_found);
    }

    if (!password) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json(user_provide_password(findUser?.fullname?.toLocaleUpperCase()));
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[ !"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~])[A-Za-z\d !"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]{8,}$/;

    if (!passwordRegex.test(password)) {
      return res.status(StatusCodes.BAD_REQUEST).json(user_strong_password);
    }

    const secret = process.env.ACCESS_TOKEN_SECRET + findUser?.password;

    try {
      const verify = jwt.verify(token, secret);

      if (verify) {
        const hashedPwd = await bcrypt.hash(password, 10);
        await User.findOneAndUpdate(
          { _id: id },
          { password: hashedPwd, passwordChangedAt: new Date() },
        );

        return res.status(StatusCodes.OK).json(user_password_reset);
      } else {
        return res
          .status(StatusCodes.UNAUTHORIZED)
          .json(
            user_password_reset_failed(findUser?.fullname?.toLocaleUpperCase()),
          );
      }
    } catch (error) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json(
          user_password_reset_failed(findUser?.fullname?.toLocaleUpperCase()),
        );
    }
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(server_error);
  }
};

const adminPswReset = async (req, res) => {
  try {
    const requesterId = req?.user?.id;
    if (!requesterId || !mongoose.isValidObjectId(requesterId)) {
      return res.status(StatusCodes.UNAUTHORIZED).json(not_authorized);
    }

    const id = req?.params?.id;

    if (!id || !mongoose.isValidObjectId(id)) {
      return res.status(StatusCodes.NOT_FOUND).json(user_invalid_id);
    }

    const findUser = await User.findOne({ _id: id });

    if (!findUser) {
      return res.status(StatusCodes.NOT_FOUND).json(user_account_not_found);
    }

    const password = req?.body?.password;

    if (!password) {
      return res.status(StatusCodes.BAD_REQUEST).json(user_password_required);
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[ !"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~])[A-Za-z\d !"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]{8,}$/;

    if (!passwordRegex.test(password)) {
      return res.status(StatusCodes.BAD_REQUEST).json(user_strong_password);
    }

    try {
      const hashedPwd = await bcrypt.hash(password, 10);
      await User.findOneAndUpdate(
        { _id: id },
        {
          password: hashedPwd,
          passwordChangedAt: new Date(),
          hasChangedPwd: "no",
        },
      );

      return res.status(StatusCodes.OK).json(user_password_reset);
    } catch (error) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json(
          user_password_reset_failed(findUser?.fullname?.toLocaleUpperCase()),
        );
    }
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(server_error);
  }
};

const updateUsers = async (req, res) => {
  try {
    const requesterId = req?.user?.id;
    if (!requesterId || !mongoose.isValidObjectId(requesterId)) {
      return res.status(StatusCodes.UNAUTHORIZED).json(not_authorized);
    }

    const id = req?.params?.id;

    if (!id || !mongoose.isValidObjectId(id)) {
      return res.status(StatusCodes.NOT_ACCEPTABLE).json(invalid_request);
    }

    const findUser = await User.findOne({ _id: id }).select("-password");

    if (!findUser) {
      return res.status(StatusCodes.NOT_FOUND).json(user_account_not_found);
    }

    const fields = req.formFields;
    const files = req.formFiles;

    let fullname = fields?.fullname?.[0];
    let email = fields?.email?.[0];
    let phone = fields?.phone?.[0];
    let gender = fields?.gender?.[0];
    const isSuperAdmin = fields?.isSuperAdmin?.[0];
    let position = fields?.position?.[0];
    let group = fields?.group?.[0];
    const additionalPermissions = fields?.addPrms?.[0];
    const restrictedPermissions = fields?.restrictedPrms?.[0];
    const status = fields?.status?.[0];
    const picture = files?.picture?.[0];

    const updatedFields = {};

    if (fullname) {
      fullname = fullname?.trim();
      updatedFields.fullname = fullname;
    }

    if (email) {
      email = email?.trim();

      if (email.includes(" ")) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json(user_emailspace_format(email));
      }

      if (!validator.isEmail(email)) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json(user_email_format(email));
      }

      const findExistingEmail = await User.findOne({
        email: email,
        _id: { $ne: id },
      });

      if (findExistingEmail) {
        return res
          .status(StatusCodes.CONFLICT)
          .json(user_email_duplicate(email));
      }

      updatedFields.email = email;
    }

    if (phone) {
      phone = phone?.trim();

      const phoneNumberResult = validateAndNormalizeEthiopianPhone(phone);

      if (phoneNumberResult.status === "error") {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json(phoneNumberResult.wrongPhoneMsg);
      }

      const normalizedPhone = phoneNumberResult.normalized;

      const findExistingPhone = await User.findOne({
        phone: normalizedPhone,
        _id: { $ne: id },
      });

      if (findExistingPhone) {
        return res
          .status(StatusCodes.CONFLICT)
          .json(user_phone_duplicate(normalizedPhone));
      }

      updatedFields.phone = normalizedPhone;
    }

    if (gender) {
      if (gender !== "Male" && gender !== "Female") {
        return res.status(StatusCodes.FORBIDDEN).json(user_invalid_gender);
      }

      updatedFields.gender = gender;
    }

    if (position) {
      position = position?.trim();
      updatedFields.position = position;
    }

    if (group) {
      if (!mongoose.isValidObjectId(group)) {
        return res.status(StatusCodes.NOT_ACCEPTABLE).json(user_group_required);
      } else userGroup = [];

      console.log("Grooup inputs", userGroup);

      const findGroup = await Group.findOne({ _id: group });

      if (!findGroup) {
        return res.status(StatusCodes.NOT_FOUND).json(user_group_not_found);
      }

      if (findGroup?.status === "inactive") {
        return res.status(StatusCodes.BAD_REQUEST).json(user_group_inactive);
      }

      updatedFields.group = group;
    }

    if (isSuperAdmin) {
      if (isSuperAdmin !== "yes" && isSuperAdmin !== "no") {
        return res.status(StatusCodes.FORBIDDEN).json(user_invalid_supadmin);
      }

      updatedFields.isSuperAdmin = isSuperAdmin;

      if (isSuperAdmin === "yes") {
        updatedFields.addPrms = [];
        updatedFields.restrictedPrms = [];
        updatedFields.group = null;
      }

      if (isSuperAdmin === "no") {
        const finalGroupId = group || findUser?.group;
        if (!finalGroupId || !mongoose.isValidObjectId(finalGroupId)) {
          return res.status(StatusCodes.BAD_REQUEST).json(user_group_required);
        }

        const grp = await Group.findById(finalGroupId).select("status");
        if (!grp)
          return res.status(StatusCodes.NOT_FOUND).json(user_group_not_found);
        if (grp.status === "inactive") {
          return res.status(StatusCodes.BAD_REQUEST).json(user_group_inactive);
        }

        updatedFields.group = finalGroupId;
      }
    }

    // Fetch the target group (new if updating, current otherwise)
    const targetGroupId =
      updatedFields.group !== undefined ? updatedFields.group : findUser?.group;
    let targetGroupPermsSet = new Set();
    if (targetGroupId) {
      const targetGrpWithPerms = await Group.findById(targetGroupId)
        .populate({ path: "lstOfPrms", select: "_id" })
        .lean();
      if (targetGrpWithPerms?.lstOfPrms?.length) {
        targetGroupPermsSet = new Set(
          targetGrpWithPerms.lstOfPrms.map((p) => p._id.toString()),
        );
      }
    }

    if (restrictedPermissions) {
      let restrictedPermissionsArray = Array.isArray(restrictedPermissions)
        ? restrictedPermissions
        : (() => {
            try {
              return JSON.parse(restrictedPermissions);
            } catch {
              return "PARSE_ERROR";
            }
          })();

      if (restrictedPermissionsArray === "PARSE_ERROR") {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json(user_restrictedprms_invalid);
      }

      const isUserRole = isSuperAdmin ? isSuperAdmin : findUser?.isSuperAdmin;
      if (isUserRole === "yes") {
        restrictedPermissionsArray = [];
      }

      if (restrictedPermissionsArray?.length === 0) {
        updatedFields.restrictedPrms = [];
      } else if (restrictedPermissionsArray?.length > 0) {
        const candidateRestrict = restrictedPermissionsArray
          .filter(Boolean)
          .filter((id) => mongoose.isValidObjectId(id))
          .map((id) => id?.toString());

        if (candidateRestrict.length === 0) {
          updatedFields.restrictedPrms = [];
        } else {
          const existingRestrict = await Permission.find({
            _id: { $in: candidateRestrict },
          }).select("_id");

          const existingRestrictSet = new Set(
            existingRestrict.map((p) => p._id.toString()),
          );

          const filteredRestrict = candidateRestrict.filter(
            (pid) =>
              existingRestrictSet.has(pid) && targetGroupPermsSet.has(pid),
          );

          updatedFields.restrictedPrms = Array.from(new Set(filteredRestrict));
        }
      } else {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json(user_restrictedprms_invalid);
      }
    }

    if (additionalPermissions) {
      let additionalPermissionsArray = Array.isArray(additionalPermissions)
        ? additionalPermissions
        : (() => {
            try {
              return JSON.parse(additionalPermissions);
            } catch {
              return "PARSE_ERROR";
            }
          })();

      if (additionalPermissionsArray === "PARSE_ERROR") {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json(user_additionalprms_invalid);
      }

      const isUserRole = isSuperAdmin ? isSuperAdmin : findUser?.isSuperAdmin;
      if (isUserRole === "yes") {
        additionalPermissionsArray = [];
      }

      if (additionalPermissionsArray?.length === 0) {
        updatedFields.addPrms = [];
      } else if (additionalPermissionsArray?.length > 0) {
        const candidateAdd = additionalPermissionsArray
          .filter(Boolean)
          .filter((id) => mongoose.isValidObjectId(id))
          .map((id) => id.toString());

        if (candidateAdd.length === 0) {
          updatedFields.addPrms = [];
        } else {
          const existingAdd = await Permission.find({
            _id: { $in: candidateAdd },
          }).select("_id name");
          const existingAddSet = new Set(
            existingAdd.map((p) => p?._id?.toString()),
          );

          const filteredAdd = candidateAdd.filter(
            (pid) => existingAddSet.has(pid) && !targetGroupPermsSet.has(pid),
          );

          updatedFields.addPrms = Array.from(new Set(filteredAdd));
        }
      } else {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json(user_additionalprms_invalid);
      }
    }

    const hasGroupUpdate = Object.prototype.hasOwnProperty.call(
      updatedFields,
      "group",
    );
    const hasRoleToNonSuper =
      isSuperAdmin === "no" && findUser.isSuperAdmin === "yes";
    if ((hasGroupUpdate || hasRoleToNonSuper) && targetGroupId) {
      if (!Object.prototype.hasOwnProperty.call(updatedFields, "addPrms")) {
        const existingAdd = (
          Array.isArray(findUser.addPrms) ? findUser.addPrms : []
        ).map((p) => p.toString());
        const filteredExistingAdd = existingAdd.filter(
          (pid) => !targetGroupPermsSet.has(pid),
        );
        updatedFields.addPrms = Array.from(new Set(filteredExistingAdd));
      }

      if (
        !Object.prototype.hasOwnProperty.call(updatedFields, "restrictedPrms")
      ) {
        const existingRestrict = (
          Array.isArray(findUser.restrictedPrms) ? findUser.restrictedPrms : []
        ).map((p) => p.toString());

        const filteredExistingRestrict = existingRestrict.filter((pid) =>
          targetGroupPermsSet.has(pid),
        );
        updatedFields.restrictedPrms = Array.from(
          new Set(filteredExistingRestrict),
        );
      }
    }

    const hasAdd = Object.prototype.hasOwnProperty.call(
      updatedFields,
      "addPrms",
    );
    const hasRestr = Object.prototype.hasOwnProperty.call(
      updatedFields,
      "restrictedPrms",
    );

    if (hasAdd || hasRestr) {
      const finalRestricted = (
        hasRestr ? updatedFields.restrictedPrms : findUser?.restrictedPrms || []
      ).map((x) => x.toString());

      const finalAdditional = (
        hasAdd ? updatedFields.addPrms : findUser?.addPrms || []
      ).map((x) => x.toString());

      const restrictedSet = new Set(finalRestricted);
      const cleanedAdditional = finalAdditional.filter(
        (pid) => !restrictedSet.has(pid),
      );

      const cleanedRestricted = Array.from(new Set(finalRestricted));

      if (hasRestr) updatedFields.restrictedPrms = cleanedRestricted;
      if (hasAdd) updatedFields.addPrms = cleanedAdditional;
    }

    const finalRole = updatedFields.isSuperAdmin || findUser.isSuperAdmin;
    const finalGroup = Object.prototype.hasOwnProperty.call(
      updatedFields,
      "group",
    )
      ? updatedFields.group
      : findUser.group;

    if (finalRole === "no" && !finalGroup) {
      return res.status(StatusCodes.BAD_REQUEST).json(user_group_required);
    }

    if (finalRole === "yes") {
      updatedFields.group = null;
      updatedFields.addPrms = [];
      updatedFields.restrictedPrms = [];
    }

    if (status) {
      if (status !== "active" && status !== "inactive") {
        return res.status(StatusCodes.FORBIDDEN).json(inactive_active_type);
      }

      updatedFields.status = status;
    }

    if (picture) {
      let savedFilePath = "";

      try {
        savedFilePath = await validateAndSaveFile(picture, {
          folder: "UserPictures",
          allowedMimeTypes: [
            "image/jpeg",
            "image/JPEG",
            "image/jpg",
            "image/JPG",
            "image/png",
            "image/PNG",
          ],
          maxSizeMB: pictureSize,
        });
      } catch (err) {
        return res.status(StatusCodes.BAD_REQUEST).json(err?.message);
      }

      updatedFields.picture = savedFilePath;
    }

    if (Object.keys(updatedFields).length === 0) {
      return res.status(StatusCodes.OK).json(no_content);
    }

    const updUser = await User.findOneAndUpdate({ _id: id }, updatedFields, {
      new: true,
    });

    if (!updUser) {
      return res.status(StatusCodes.NOT_FOUND).json(user_account_not_found);
    }

    return res
      .status(StatusCodes.OK)
      .json(user_updated_success(updUser?.fullname?.toLocaleUpperCase()));
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(server_error);
  }
};

const getUserAnalytics = async (req, res) => {
  try {
    const requesterId = req?.user?.id;
    if (!requesterId || !mongoose.isValidObjectId(requesterId)) {
      return res.status(StatusCodes.UNAUTHORIZED).json(not_authorized);
    }

    const analytics = {
      totalUsers: await User.countDocuments(),
      activeUsers: await User.countDocuments({ status: "active" }),
      inactiveUsers: await User.countDocuments({ status: "inactive" }),
      maleUsers: await User.countDocuments({ gender: "Male" }),
      femaleUsers: await User.countDocuments({ gender: "Female" }),
      isSuperAdmin: await User.countDocuments({ isSuperAdmin: "yes" }),
    };

    return res.status(StatusCodes.OK).json(analytics);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(server_error);
  }
};

const changeSelfPassword = async (req, res) => {
  try {
    const requesterId = req?.user?.id;
    if (!requesterId || !mongoose.isValidObjectId(requesterId)) {
      return res.status(StatusCodes.UNAUTHORIZED).json(not_authorized);
    }

    const findUser = await User.findOne({ _id: requesterId });

    if (!findUser) {
      return res.status(StatusCodes.NOT_FOUND).json(user_account_not_found);
    }

    const password = req?.formFields?.password?.[0] || req?.body?.password;

    if (!password) {
      return res.status(StatusCodes.BAD_REQUEST).json(user_password_required);
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[ !"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~])[A-Za-z\d !"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]{8,}$/;

    if (!passwordRegex.test(password)) {
      return res.status(StatusCodes.BAD_REQUEST).json(user_strong_password);
    }

    try {
      const hashedPwd = await bcrypt.hash(password, 10);
      await User.findOneAndUpdate(
        { _id: requesterId },
        {
          password: hashedPwd,
          passwordChangedAt: new Date(),
          hasChangedPwd: "yes",
        },
      );

      return res.status(StatusCodes.OK).json(user_password_reset);
    } catch (error) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json(
          user_password_reset_failed(findUser?.fullname?.toLocaleUpperCase()),
        );
    }
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(server_error);
  }
};

const filterPermissionCategoriesWithPermissionsForUsers = async (req, res) => {
  try {
    const requesterId = req?.user?.id;
    if (!requesterId || !mongoose.isValidObjectId(requesterId)) {
      return res.status(StatusCodes.OK).json([]);
    }

    const categories = await PermissionCategory.find({})
      .sort({ createdAt: 1, _id: 1 })
      .lean();

    if (!categories || !categories.length) {
      return res.status(StatusCodes.OK).json([]);
    }

    const categoryIds = categories.map((cat) => cat._id);

    const permFilter = {
      category: { $in: categoryIds },
    };

    const perms = await Permission.find(permFilter)
      .select("_id name code_name category")
      .sort({ createdAt: 1, _id: 1 })
      .lean();

    const permMap = {};
    for (const p of perms) {
      const key = p.category.toString();
      if (!permMap[key]) permMap[key] = [];
      permMap[key].push({
        _id: p?._id,
        name: p?.name,
        code_name: p?.code_name,
      });
    }

    const result = categories
      .map((cat) => ({
        perm_category_id: cat?._id?.toString(),
        perm_category: cat.name,
        perms: permMap[cat._id.toString()] || [],
      }))
      .filter((cat) => Array.isArray(cat.perms) && cat.perms.length > 0);

    return res.status(StatusCodes.OK).json(result);
  } catch (error) {
    return res.status(StatusCodes.OK).json([]);
  }
};

const deleteUser = async (req, res) => {
  try {
    const requesterId = req?.user?.id;
    const id = req?.params?.id;
    if (!requesterId || !mongoose.isValidObjectId(requesterId)) {
      return res.status(StatusCodes.UNAUTHORIZED).json(not_authorized);
    }

    const findUser = await User.findOne({ _id: id });

    if (!findUser) {
      return res.status(StatusCodes.NOT_FOUND).json(user_account_not_found);
    }

    await findUser.deleteOne();

    return res
      .status(StatusCodes.OK)
      .json(user_deleted_success(findUser?.fullname?.toLocaleUpperCase()));
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(server_error);
  }
};

module.exports = {
  deleteUser,
  createUser,
  loginUser,
  logoutUser,
  changeUsrPwd,
  getAllUsersWithOutPrm,
  getAllUsers,
  getUsers,
  groupFilters,
  getUser,
  forgotPassword,
  resetPassword,
  adminPswReset,
  updateUsers,
  getUserAnalytics,
  changeSelfPassword,
  filterPermissionCategoriesWithPermissionsForUsers,
};
