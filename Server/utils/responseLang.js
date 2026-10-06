const responselanguage = {
  invalid_input_main: {
    Message_am: "አግባብ ያልሆነ ግብዓት።",
    Message_en: "Invalid input.",
  },
  invalid_request: {
    Message_am: "የተሳሳተ ጥያቄ",
    Message_en: "Invalid request",
  },
  no_content: {
    Message_am: "ምንም የዘመኑ መስኮች የሉም።",
    Message_en: "There are no updated fields.",
  },
  excess_request: {
    Message_am: "ከመጠን በላይ የበዙ ሪክዌስቶችን (ጥያቄዎችን) ስላስገቡ ሲስተሙን ከመጠቀም ለጊዜው ታግደዋል።",
    Message_en: "You are banned from using this system due to excess requests.",
  },
  maximum_request_limit: {
    Message_am:
      "መጠን በላይ የበዙ ሪክዌስቶችን (ጥያቄዎችን) ስላስገቡ ሲስተሙን ከመጠቀም ለጊዜው ታግደዋል ፤ እባክዎን ከጥቂት ደቂቃዎች በኋላ ይሞክሩ።",
    Message_en:
      "You have exceeded your maximum request limit, please try again after few minutes.",
  },
  error_requesting: {
    Message_am: "የጥያቄ ሂደት ላይ ስህተት አጋጥሟል ፤ እባክዎ እንደገና ይሞክሩ።",
    Message_en: "An error occurred while processing your request.",
  },
  error_requesting_permission: {
    Message_am: "የፍቃድ ጥያቄ ሂደት ላይ ስህተት አጋጥሟል ፤ እባክዎ እንደገና ይሞክሩ።",
    Message_en: "An error occurred while requesting permission.",
  },
  authorization_not_provided: {
    Message_am: "ፍቃድ አልተሰጠም ፤ እባክዎ ወደ የግል መረጃዎትን በማስገባት መተግበሪያው ይግቡ።",
    Message_en: "Authorization not provided. Please log in.",
  },
  authorization_expired: {
    Message_am: "ፍቃድዎ ጊዜው አልፎበታል ፤ እባክዎ እንደገና ይግቡ።",
    Message_en: "Authorization expired. Please log in again.",
  },
  not_authorized: {
    Message_am: "ይህንን መረጃ ማግኘት አልተፈቀደሎትም።",
    Message_en: "Not authorized to access this data.",
  },
  user_not_authorized: {
    Message_am: "ይህንን ተግባር ለመፍጸም የሚያስችል ፍቃድ የሎትም።",
    Message_en: "You do not have permission to perform this action.",
  },
  user_login_inactive: (fullname) => {
    return {
      Message_am: `የዚህ ተጠቃሚ (${fullname}) መለያ በአሁኑ ወቅት ከሲስተም ታግዷል።`,
      Message_en: `This user (${fullname}) is currently inactive.`,
    };
  },
  user_login_deactivate: {
    Message_am: `የዚህ ተጠቃሚ መለያ በአሁኑ ወቅት ከሲስተም ታግዷል።`,
    Message_en: `This user is currently inactive.`,
  },
  user_group_not_found: {
    Message_am: "የዚህ ተጠቃሚ መደብ አልተገኘም።",
    Message_en: "The user group is not found.",
  },
  user_group_inactive: {
    Message_am:
      "የዚህ ተጠቃሚ መደብ በአሁኑ ወቅት ከሲስተም ታግዷል ፤ ሰለዚህ ተጠቃሚው ወደ ሲስተም መግባት አይችልም።",
    Message_en:
      "This user's group is currently inactive and restricts the user from logging into the system.",
  },
  user_organization_not_found: {
    Message_am: "የዚህ ተጠቃሚ ተቋም አልተገኘም።",
    Message_en: "The user organization is not found.",
  },
  user_organization_inactive: {
    Message_am:
      "የዚህ ተጠቃሚ ተቋም በአሁኑ ወቅት ከሲስተም ታግዷል ፤ ሰለዚህ ተጠቃሚው ወደ ሲስተም መግባት አይችልም።",
    Message_en:
      "This user's organization is currently inactive and restricts the user from logging into the system.",
  },
  user_account_not_found: {
    Message_am: "የዚህ ተጠቃሚ መለያ አልተገኘም።",
    Message_en: "The user's account not found.",
  },
  user_must_change_password: {
    Message_am: "ተጠቃሚው ምንም አይነት ነገሮችን ከመፈጸሙ በፊት ፤ የይለፍ ቃል ማሻሻያ ማድረግ አለበት።",
    Message_en: "User must change password before performing any activities.",
  },
  user_password_change_issue: {
    Message_am: "የይለፍ ቃል ለውጥ አድርገዋል ፤ እባክዎ ደግመው ይግቡ።",
    Message_en: "Your password was changed recently. Please log in again.",
  },
  user_fullname_required: {
    Message_am: "የተጠቃሚው ሙሉ ስም ያስፈልጋል።",
    Message_en: "The fullname of the user is required.",
  },
  user_email_required: {
    Message_am: "የተጠቃሚው ኢሜይል ያስፈልጋል።",
    Message_en: "The email of the user is required.",
  },
  invalid_email_password: {
    Message_am: "የተሳሳተ ኢሜይል ወይም የይለፍ ቃል እየተጠቀሙ ነው። እባክዎ እንደገና ይሞክሩ።",
    Message_en: "Invalid email or password. Please try again.",
  },
  user_password_required: {
    Message_am: "የተጠቃሚው የይለፍ ቃል ያስፈልጋል።",
    Message_en: "The user's password is required.",
  },
  user_phone_required: {
    Message_am: "የተጠቃሚው ስልክ ቁጥር ያስፈልጋል።",
    Message_en: "The phone of the user is required.",
  },
  user_gender_required: {
    Message_am: "የተጠቃሚው ጾታ ያስፈልጋል።",
    Message_en: "The gender of the user is required.",
  },
  user_superadmin_required: {
    Message_am: "ተጠቃሚው የሲስተም ዋና ተቆጣጣሪ ነው?",
    Message_en: "Is the user a super admin?",
  },
  user_position_required: {
    Message_am: "የተጠቃሚው የስራ ድርሻ ያስፈልጋል።",
    Message_en: "The position of the user is required.",
  },
  user_group_required: {
    Message_am: "የተጠቃሚው የመደብ ምደባ ያስፈልጋል።",
    Message_en: "The user's group is required.",
  },
  user_association_required: {
    Message_am: "ተጠቃሚው የሚመደብበት ማህበር በተስተካከለ መልኩ መቅረብ አለበት።",
    Message_en: "The user's association needs to be provided in a proper way.",
  },
  user_association_notfound: {
    Message_am: "ተጠቃሚው የተመደበበት ማህበር አልተገኘም።",
    Message_en: "The user's association is not found.",
  },
  user_association_inactive: {
    Message_am: "ተጠቃሚው የተመደበበት ማህበር አክቲቭ አይደለም።",
    Message_en: "The user's association is currently inactive.",
  },
  user_email_duplicate: (email) => {
    return {
      Message_am: `በዚህ ኢሜይል ${email} አድራሻ አካውንት ተከፍቷል ፤ እባክዎን በሌላ የኢሜይል አድራሻ ይሞክሩ።`,
      Message_en: `An account with this email address (${email}) already exists.`,
    };
  },
  user_emailspace_format: (email) => {
    return {
      Message_am: `የተጠቃሚዎች ኢሜይል ${email} አድራሻ በመካከሉ ምንም አይነት ክፍተት (Space) ሊኖረው አይገባም።`,
      Message_en: `The email field ${email} cannot contain any spaces.`,
    };
  },
  user_email_format: (email) => {
    return {
      Message_am: `የተጠቃሚው ኢሜይል ${email} አድራሻ አግባብ ያልሆነ ቅርጸት አለው።`,
      Message_en: `The user's email field ${email} has an invalid format.`,
    };
  },
  user_email_format_invalid: {
    Message_am: "የኢሜይል አድራሻው ልክ ያልሆነ ነው።",
    Message_en: "The email address is invalid.",
  },
  user_phone_duplicate: (phone) => {
    return {
      Message_am: `በዚህ ስልክ ቁጥር ${phone} አድራሻ አካውንት ተከፍቷል ፤ እባክዎን በሌላ የስልክ ቁጥር ይሞክሩ።`,
      Message_en: `An account with this phone number (${phone}) already exists.`,
    };
  },
  user_phone_format: (phone) => {
    return {
      Message_am: `የተጠቃሚው ስልክ ቁጥር ${phone} የተሳሳተ ነው። እባክዎ በትክክል የስልክ ቁጥሩን ያስገቡ።`,
      Message_en: `Invalid phone number ${phone}. Please enter a valid Ethiopian number.`,
    };
  },
  user_emailpassword_required: {
    Message_am: "ወደ ሲስተሙ ለመግባት ኢሜይል እና የይለፍ ቃል ያስገቡ።",
    Message_en: "The email and password fields are required to login.",
  },
  user_invalid_gender: {
    Message_am: "ወንድ ወይም ሴት ብለው ትክክለኛውን ጾታ ይምረጡ።",
    Message_en: "Please enter a valid gender type. Either male or female.",
  },
  user_invalid_supadmin: {
    Message_am: "እባክዎ ተጠቃሚው ዋና ተቆጣጣሪ ነው / አይደለም ለሚለው ጥያቄ ትክክለኛውን መልስ ያስገቡ።",
    Message_en:
      "Please enter a valid response on whether or not the user is a super admin?",
  },
  user_invalid_id: {
    Message_am: "የተሳሳተ ተጠቃሚ",
    Message_en: "Invalid User",
  },
  user_additionalprms_notfound: {
    Message_am: "እባክዎ ለተጠቃሚው የሚሰጡ ተጨማሪ ፍቃዶችን ይዘርዝሩ።",
    Message_en:
      "Please select list of additionally assigned permission for the user.",
  },
  user_additionalprms_invalid: {
    Message_am: "እባክዎ ለሚጨመሩ ፍቃዶች ትክክለኛውን ቅርጸት ተከትለው ያስገቡ።",
    Message_en: "Please enter a valid additional permissions list.",
  },
  user_restrictedprms_invalid: {
    Message_am: "እባክዎ ለሚታገዱ ፍቃዶች ትክክለኛውን ቅርጸት ተከትለው ያስገቡ።",
    Message_en: "Please enter a valid restricted permissions list.",
  },
  user_strong_password: {
    Message_am:
      "ያስገቡት የይለፍ ቃል ከስምንት (8) ፊደላት የሚበልጥ ፣ አንድ small letter ፣ አንድ capital letter  ፣ አንድ ቁጥር እና አንድ ልዩ ቁምፊ ያስገቡ። በዚህ መልኩ ጠንካራ የይለፍ ቃል ይፍጠሩ።",
    Message_en:
      "Password must be at least 8 characters long, contain at least one lowercase letter, one uppercase letter, one number, and one special character.",
  },
  user_created_success: (fullname) => {
    return {
      Message_am: `የተጠቃሚዎች መለያ ለ ${fullname} በተሳካ ሁኔታ ተከፍቷል።`,
      Message_en: `The user account for ${fullname} is created successfully.`,
    };
  },
  user_updated_success: (fullname) => {
    return {
      Message_am: `የተጠቃሚዎች መለያ ለ ${fullname} በተሳካ ሁኔታ ዘምኗል።`,
      Message_en: `The user account for ${fullname} is updated successfully.`,
    };
  },
  user_login_failed: {
    Message_am: "ልክ ያልሆነ መረጃ አስገብተዋል። በድጋሚ ትክክለኛውን መረጃ አስገብተው ይሞክሩ።",
    Message_en: "Invalid credential. Please try again.",
  },
  user_login_success: {
    Message_am: "በተሳካ ሁኔታ ገብተዋል።",
    Message_en: "Successfully logged in",
  },
  user_logout_success: {
    Message_am: "በተሳካ ሁኔታ ወጥተዋል።",
    Message_en: "Logged out successfully",
  },
  user_lockout_time: (remainingTime) => {
    return {
      Message_am: `ከሲስተም ለጥቂት ደቂቃዎች ታግድዋል። ከ ${remainingTime} ሰከንዶች ቡኃላ ይሞክሩ።`,
      Message_en: `You are temporarily locked out. Try again in ${remainingTime} seconds.`,
    };
  },
  user_passwordchange_failure: (fullname) => {
    return {
      Message_am: `ተጠቃሚ ${fullname} የይለፍ ቃል ቀይረዋል ወይም ገና ወደ መተግበሪያው አልገቡም።`,
      Message_en: `${fullname} has already changed their password or is still expected to login.`,
    };
  },
  user_passwordsuccess_changed: (fullname) => {
    return {
      Message_am: `ውድ ተጠቃሚያችን ${fullname} ፤ የይለፍ ቃሎትን በተሳካ ሁኔታ ቀይረዋል።`,
      Message_en: `Dear ${fullname}, you have successfully changed your password.`,
    };
  },
  user_password_reset_failed: (fullname) => {
    return {
      Message_am: `የተጠቃሚውን ${fullname} ይለፍ ቃል ለመቀየር የተደረገው ሙከራ አልተሳካም።`,
      Message_en: `The attempt to change user's ${fullname} password was unsuccessful.`,
    };
  },
  user_password_reset: {
    Message_am: "የይለፍ ቃሉ በተሳካ ሁኔታ ተቀይሯል።",
    Message_en: "The password has been reset successfully.",
  },
  user_haschanged_password: {
    Message_am: `አንድ ተጠቃሚ የይለፍ ቃል መርሳት ጥያቄ ከማቅረቡ በፊት በመተግበሪያው መታወቅ አለበት።`,
    Message_en: `A user must be recognized by the system before submitting a forget password request.`,
  },
  user_provide_password: (fullname) => {
    return {
      Message_am: `እባክዎ ${fullname} ፤ አዲሱን የይለፍ ቃሎትን ያስገቡ።`,
      Message_en: `Please ${fullname}, insert your new password.`,
    };
  },
  invalid_name_search: {
    Message_am: "አግባብ ያልሆነ ፍለጋ",
    Message_en: "Invalid search",
  },
  data_parsing_error: {
    Message_am: "የመረጃ/ዳታ ማግኘት ሂደት ላይ ስህተት አጋጥሟል።",
    Message_en: "Error parsing data.",
  },
  file_validation_error: {
    Message_am: "የገባው የፋይል ዓይነት አልተገኘም ወይም የቅርጸት ስህተት አለበት።",
    Message_en: "File is missing or invalid file type.",
  },
  allowed_file_type_error: (allowedMimeTypes, maxSizeMB) => {
    return {
      Message_am: `የተፈቀደው የፋይል ዓይነት እንደ ${allowedMimeTypes.join(
        ", ",
      )} እና የተፈቀደው ትልቁ የፋይል መጠን እንደ ${maxSizeMB}MB ነው።`,
      Message_en: `File type not allowed or file size exceeds limit. Allowed types are: ${allowedMimeTypes.join(
        ", ",
      )} and max size is ${maxSizeMB}MB.`,
    };
  },
  permissionforuser_not_found: (fullname) => {
    return {
      Message_am: `ለተጠቃሚው ${fullname} የተሰጡ ተጨማሪ ፍቃዶች በተጠቃሚ ፍቃድ ዝርዝር ውስጥ አልተገኙም።`,
      Message_en: `There is an unknown permission found in the list of new assigned permission for user ${fullname}.`,
    };
  },
  permission_ingroup_duplicate: (permissionName, groupName) => {
    return {
      Message_am: `ፍቃድ ${permissionName} በተጠቃሚው የመደብ ${groupName} ፍቃድ ዝርዝር ውስጥ ይገኛል ፤ እባክዎ ድግግሞሹን ያስወግዱ።`,
      Message_en: `The permission ${permissionName} already exists in the user group ${groupName}, the permission is already assigned for the user.`,
    };
  },
  list_ofUsers_notfound: {
    Message_am: "የተጠቃሚዎች ዝርዝር አልተገኙም።",
    Message_en: "List of users are not found.",
  },
  enter_email: {
    Message_am: "እባክዎ ኢሜልዎን ያስገቡ",
    Message_en: "Please enter your email",
  },
  system_emailsend_failed: {
    Message_am:
      "መተግበሪያው የይለፍ ቃል መቀየሪያ ኢሜይል መልዕክት መላክ አልቻለም ፤ እባክዎ ትንሽ ቆይተው እንደገና ይሞክሩ።",
    Message_en: `The system failed to send a reset password email; please try again later.`,
  },
  system_emailsend_success: {
    Message_am: "የይለፍ ቃል መቀየሪያ ኢሜይል በተሳካ ሁኔታ ተልኳል።",
    Message_en: "The password reset email is send successfully.",
  },
  audit_log_not_found: {
    Message_am: "የኦዲት መዝገቡ አልተገኘም።",
    Message_en: "The audit log is not found.",
  },
  audit_logs_not_found: {
    Message_am: "የኦዲት መዝገብ ዝርዝር አልተገኘም።",
    Message_en: "The list of audit logs is not found.",
  },
  category_name_required: {
    Message_am: "የፍቃድ ዝርዝር ምድብ ስም ያስፈልጋል።",
    Message_en: "The name of the permission category is required.",
  },
  category_name_duplicate: (name) => {
    return {
      Message_am: `የፍቃድ ዝርዝር ${name} ቀድሞም በዝርዝር ውስጥ ይገኛል። እባክዎ ሌላ ስም ይጠቀሙ።ዝ`,
      Message_en: `The permission category ${name} already exists. Please use an optional name.`,
    };
  },
  permission_category_created: (name) => {
    return {
      Message_am: `የፍቃድ ዝርዝር ${name} በተሳካ ሁኔታ ተፈጥሯል።`,
      Message_en: `The permission category ${name} is created sucessfully.`,
    };
  },
  category_list_notfound: {
    Message_am: "የፍቃድ መደብ ዝርዝሮች አልተገኙም።",
    Message_en: "The permission category lists are not found.",
  },
  category_singlelist_notfound: {
    Message_am: "የፍቃድ መደቡ አልተገኘም።",
    Message_en: "The permission category is not found.",
  },
  category_name_exists: (name) => {
    return {
      Message_am: `የፍቃድ መደብ (${name}) ከዚህ ቀደም ተመዝግቧል። እባክዎ በሌላ መደብ ስም ይሞክሩ።`,
      Message_en: `The permission category (${name}) already exists. Please again with another category name.`,
    };
  },
  category_updated_successfully: (name) => {
    return {
      Message_am: `የፍቃድ ዝርዝር ${name} በተሳካ ሁኔታ ዘምኗል።`,
      Message_en: `The permission category ${name} is update sucessfully.`,
    };
  },
  category_inactive: (name) => {
    return {
      Message_am: `ይህ የፍቃድ ዝርዝር ${name} አሁን ላይ እንቅስቃሴ-አልባ (inactive) ነው።`,
      Message_en: `The permission category ${name} is inactive, and cannot place any permission inside of it.`,
    };
  },
  category_conflict: (name, categoryName) => {
    return {
      Message_am: `የፍቃድ መደብ "${categoryName}" በስሩ "${name}" የሚባል ፍቃድ ተመዝግቧል። እባክዎን ከማጥፋትዎ በፊት ይህንን ፍቃድ ከምድቡ ያውጡ።`,
      Message_en: `The permission category "${categoryName}" has a permission "${name}" assigned to it. Please remove the permission inorder to delete the permission category.`,
    };
  },
  category_deleted: (name) => {
    return {
      Message_am: `የፍቃድ መድብ ${name} በተሳካ ሁኔታ ከሲስተም ተሰርዟል።`,
      Message_en: `The permission category ${name} is deleted successfully.`,
    };
  },
  permission_name_required: {
    Message_am: "የፍቃድ ስም ያስፈልጋል።",
    Message_en: "The name of the permission is required.",
  },
  permission_codename_required: {
    Message_am: "የፍቃድ ልዩ ስም ያስፈልጋል።",
    Message_en: "The code name of the permission is required.",
  },
  permission_category_required: {
    Message_am: "እባክዎ የፍቃድ መድብ ያስገቡ።",
    Message_en: "The permission category is required.",
  },
  permission_already_exists: (name) => {
    return {
      Message_am: `የቀረበው ፈቃድ ${name} አስቀድሞ አለ። እባክዎ አዲስ ለመፍጠር ሌላ ስም ይጠቀሙ።`,
      Message_en: `The permission ${name} already exists. Please use another name to create a new one.`,
    };
  },
  permission_codename_exists: (name) => {
    return {
      Message_am: `የቀረበው ፈቃድ ልዩ ስም ${name} አስቀድሞ አለ።`,
      Message_en: `The permission code name ${name} already exists.`,
    };
  },
  permission_created_successfully: (name) => {
    return {
      Message_am: `የቀረበው ፍቃድ ${name} በተሳካ ሁኔታ ተፈጥሯል።`,
      Message_en: `The permission ${name} is created successfully.`,
    };
  },
  permission_updated_successfully: (name) => {
    return {
      Message_am: `የቀረበው ፍቃድ ${name} በተሳካ ሁኔታ ዘምኗል።`,
      Message_en: `The permission ${name} is updated successfully.`,
    };
  },
  permission_list_notfound: {
    Message_am: "የፍቃድ ዝርዝሮች አልተገኙም።",
    Message_en: "The permission lists are not found.",
  },
  permission_singlelist_notfound: {
    Message_am: "የተፈለገው ፍቃዱ አልተገኘም።",
    Message_en: "The permission is not found.",
  },
  permission_toupdate_notfound: {
    Message_am: "እንዲዘምን የተፈለገው ፍቃድ አልተገኘም።",
    Message_en: "The permission to be updated is not found..",
  },
  group_name_required: {
    Message_am: "እባክዎ የቡድኑን ስም ያስገቡ።",
    Message_en: "The group name is required.",
  },
  group_name_exists: (name) => {
    return {
      Message_am: `የቡድኑ ስም ${name} አስቀድሞ አለ። እባክዎን ሌላ የቡድን ስም ያስገቡ።`,
      Message_en: `The group name ${name} already exists. Please you another group name.`,
    };
  },
  list_ofPrms_required: {
    Message_am: "ቡድን ለመመዝገብ የፍቃድ ዝርዝሮች ያስፋልጋሉ።",
    Message_en: "List of permissions are required to create a group.",
  },
  group_created_successfully: (name) => {
    return {
      Message_am: `ቡድን ${name} በተሳካ ሁኔታ ተፈጥሯል።`,
      Message_en: `Group ${name} created successfully.`,
    };
  },
  group_updated_successfully: (name) => {
    return {
      Message_am: `ቡድን ${name} በተሳካ ሁኔታ ዘምኗል።`,
      Message_en: `Group ${name} updated successfully.`,
    };
  },
  invalid_listor_prms: {
    Message_am: "አግባብ ያልሆነ የፍቃድ ዝርዝሮች አሉ።",
    Message_en: "There are invalid list of permissions.",
  },
  group_list_notfound: {
    Message_am: "የቡድን ዝርዝሮች አልተገኙም።",
    Message_en: "The group lists are not found.",
  },
  group_singlelist_notfound: {
    Message_am: "ቡድኑ አልተገኘም።",
    Message_en: "The group is not found.",
  },
  inactive_active_type: {
    Message_am: "እባክዎ ትክክለኛ የኩነት አይነት ያስገቡ።",
    Message_en: "Please enter a valid status type.",
  },
  city_name_required: {
    Message_am: "እባክዎ የከተማውን ስም ያስገቡ።",
    Message_en: "Please provide the city name.",
  },
  city_name_exists: (name) => {
    return {
      Message_am: `የከተማው ስም ${name} በሲስተሙ ተመዝግቧል። እባክዎ ሌላ ስም በማስገባት ይሞክሩ።`,
      Message_en: `The city name ${name} already exists. Please use another name to create city.`,
    };
  },
  city_created_successfully: (name) => {
    return {
      Message_am: `ከተማው ${name} በተሳካ ሁኔታ ተመዝግቧል።`,
      Message_en: `The city ${name} is registered successfully.`,
    };
  },
  city_list_notfound: {
    Message_am: "የከተማዎች ዝርዝር አልተገኘም።",
    Message_en: "List of cities are not found.",
  },
  city_singlelist_notfound: {
    Message_am: "ከተማው አልተገኘም።",
    Message_en: "The city is not found.",
  },
  city_updated_successfully: (name) => {
    return {
      Message_am: `ከተማው ${name} በተሳካ ሁኔታ ዘምኗል።`,
      Message_en: `The city ${name} is updated successfully`,
    };
  },
  city_delete_conflict: (name, subcityName) => {
    return {
      Message_am: `ከተማው ${name} በስሩ የተመዘገቡ ${subcityName} ክፍለ ከተማ/ሞች አሉ። ስለዚህም ከዚህ ከተማ ጋር ተያያዥነት ያላቸው ክፍለ ከተሞች እስካልሰረዙ ድረስ ከተማውን ከሲስተም ማጥፋት አይቻልም።`,
      Message_en: `The city ${name} has ${subcityName} subcity/subcities registered under it. Therefore, it cannot be deleted until all subcities associated with it are removed.`,
    };
  },
  city_deleted_successfully: (name) => {
    return {
      Message_am: `${name} የሚባለው ከተማ በተሳካ ሁኔታ ከሲስተሙ ተሰርዟል።`,
      Message_en: `The city ${name} is deleted successfully.`,
    };
  },
  subcity_name_required: {
    Message_am: "እባክዎ የክፍለ ከተማውን ስም ያስገቡ።",
    Message_en: "Please provide the subcity name.",
  },
  subcity_name_exists: (name) => {
    return {
      Message_am: `የክፍለ ከተማው ስም ${name} በሲስተሙ ተመዝግቧል። እባክዎ ሌላ ስም በማስገባት ይሞክሩ።`,
      Message_en: `The subcity name ${name} already exists. Please use another name to create city.`,
    };
  },
  subcity_list_notfound: {
    Message_am: "የክፍለ ከተማዎች ዝርዝር አልተገኘም።",
    Message_en: "List of sub-cities are not found.",
  },
  subcity_singlelist_notfound: {
    Message_am: "ክፍለ ከተማው አልተገኘም።",
    Message_en: "The subcity is not found.",
  },
  subcity_updated_successfully: (name) => {
    return {
      Message_am: `ክፍለ ከተማው ${name} በተሳካ ሁኔታ ዘምኗል።`,
      Message_en: `The subcity ${name} is updated successfully`,
    };
  },
  subcity_created_successfully: (name) => {
    return {
      Message_am: `ክፍለ ከተማው ${name} በተሳካ ሁኔታ ተመዝግቧል።`,
      Message_en: `The subcity ${name} is registered successfully.`,
    };
  },
  subcity_delete_conflict: (name) => {
    return {
      Message_am: `ክፍለ ከተማው ${name} በስሩ የተመዘገቡ ወረዳዎች ፣ ቤቶች ወይም ሌሎች ነገሮች አሉ። ስለዚህም ከዚህ ክፍለ ከተማ ጋር ተያያዥነት ያላቸው ነገሮች እስካልሰረዙ ድረስ ክፍለ ከተማውን ከሲስተም ማጥፋት አይቻልም።`,
      Message_en: `The subcity ${name} has some woredas, houses or other entity registered under it. Therefore, it cannot be deleted until all entities associated with it are removed.`,
    };
  },
  subcity_deleted_successfully: (name) => {
    return {
      Message_am: `${name} የሚባለው ክፍለ ከተማ በተሳካ ሁኔታ ከሲስተሙ ተሰርዟል።`,
      Message_en: `The subcity ${name} is deleted successfully.`,
    };
  },
  city_deactivate: (name) => {
    return {
      Message_am: `ከተማው ${name} ኢን-አክቲቭ ነው ፤ ምንም አይነት ክፍለ ከተማ በስሩ መመደብ አይቻልም።`,
      Message_en: `The city ${name} is currently deactivated and no subcity can be placed under it.`,
    };
  },
  site_name_required: {
    Message_am: "እባክዎ የሳይቱን ስም ያስገቡ።",
    Message_en: "Please provide the site name.",
  },
  site_name_exists: (name) => {
    return {
      Message_am: `የሳይቱ ስም ${name} በሲስተሙ ተመዝግቧል። እባክዎ ሌላ ስም በማስገባት ይሞክሩ።`,
      Message_en: `The site name ${name} already exists. Please use another name to create city.`,
    };
  },
  site_list_notfound: {
    Message_am: "የሳይቶች ዝርዝር አልተገኘም።",
    Message_en: "List of sites are not found.",
  },
  site_singlelist_notfound: {
    Message_am: "ሳይቱ አልተገኘም።",
    Message_en: "The site is not found.",
  },
  site_updated_successfully: (name) => {
    return {
      Message_am: `ሳይቱ ${name} በተሳካ ሁኔታ ዘምኗል።`,
      Message_en: `The site ${name} is updated successfully`,
    };
  },
  subcity_deactivate: (name) => {
    return {
      Message_am: `ክፍለ ከተማው ${name} ኢን-አክቲቭ ነው ፤ ምንም አይነት ነገሮች በስሩ መመደብ አይቻልም።`,
      Message_en: `The subcity ${name} is currently deactivated and no entity can be placed under it.`,
    };
  },
  site_created_successfully: (name) => {
    return {
      Message_am: `ሳይቱ ${name} በተሳካ ሁኔታ ተመዝግቧል።`,
      Message_en: `The site ${name} is registered successfully.`,
    };
  },
  site_delete_conflict: (name) => {
    return {
      Message_am: `ሳይቱ ${name} በስሩ የተመዘገቡ ብሎኮች ወይም ቤቶች አሉ። ስለዚህም ከዚህ ሳይት ጋር ተያያዥነት ያላቸው ነገሮች እስካልሰረዙ ድረስ ሳይቱን ከሲስተም ማጥፋት አይቻልም።`,
      Message_en: `The site ${name} has some blocks or houses are registered under it. Therefore, it cannot be deleted until all entities associated with it are removed.`,
    };
  },
  site_deleted_successfully: (name) => {
    return {
      Message_am: `${name} የሚባለው ሳይት በተሳካ ሁኔታ ከሲስተሙ ተሰርዟል።`,
      Message_en: `The site ${name} is deleted successfully.`,
    };
  },
  block_num_required: {
    Message_am: "እባክዎ የብሎክ ቁጥር ያስገቡ።",
    Message_en: "Please provide the block number.",
  },
  block_num_exists: (name) => {
    return {
      Message_am: `የብሎኩ ቁጥር ${name} በሲስተሙ ተመዝግቧል። እባክዎ ሌላ ቁጥር በማስገባት ይሞክሩ።`,
      Message_en: `The block number ${name} already exists. Please use another number to create block.`,
    };
  },
  block_list_notfound: {
    Message_am: "የብሎኮች ዝርዝር አልተገኘም።",
    Message_en: "List of blocks are not found.",
  },
  block_singlelist_notfound: {
    Message_am: "ብሎኩ አልተገኘም።",
    Message_en: "The block is not found.",
  },
  block_updated_successfully: (name) => {
    return {
      Message_am: `ብሎኩ ${name} በተሳካ ሁኔታ ዘምኗል።`,
      Message_en: `The block ${name} is updated successfully`,
    };
  },
  block_created_successfully: (name) => {
    return {
      Message_am: `ብሎኩ ${name} በተሳካ ሁኔታ ተመዝግቧል።`,
      Message_en: `The block ${name} is registered successfully.`,
    };
  },
  block_delete_conflict: (name) => {
    return {
      Message_am: `ብሎኩ ${name} በስሩ የተመዘገቡ ቤቶች አሉ። ስለዚህም ከዚህ ብሎክ ጋር ተያያዥነት ያላቸው ነገሮች እስካልሰረዙ ድረስ ብሎኩን ከሲስተም ማጥፋት አይቻልም።`,
      Message_en: `The block ${name} has some houses registered under it. Therefore, it cannot be deleted until all entities associated with it are removed.`,
    };
  },
  block_deleted_successfully: (name) => {
    return {
      Message_am: `${name} የሚባለው ብሎክ በተሳካ ሁኔታ ከሲስተሙ ተሰርዟል።`,
      Message_en: `The block ${name} is deleted successfully.`,
    };
  },

  association_name_required: {
    Message_am: "እባክዎ የማህበሩን ስም ያስገቡ።",
    Message_en: "Please provide the association name.",
  },
  association_name_exists: (name) => {
    return {
      Message_am: `የማህበሩ ስም ${name} በሲስተሙ ተመዝግቧል። እባክዎ ሌላ ስም በማስገባት ይሞክሩ።`,
      Message_en: `The association name ${name} already exists. Please use another name to create association.`,
    };
  },
  association_list_notfound: {
    Message_am: "የማህበሮች ዝርዝር አልተገኘም።",
    Message_en: "List of associations are not found.",
  },
  association_singlelist_notfound: {
    Message_am: "ማህበሩ አልተገኘም።",
    Message_en: "The association is not found.",
  },
  association_updated_successfully: (name) => {
    return {
      Message_am: `ማህበሩ ${name} በተሳካ ሁኔታ ዘምኗል።`,
      Message_en: `The association ${name} is updated successfully`,
    };
  },
  association_created_successfully: (name) => {
    return {
      Message_am: `ማህበሩ ${name} በተሳካ ሁኔታ ተመዝግቧል።`,
      Message_en: `The association ${name} is registered successfully.`,
    };
  },
  association_delete_conflict: (name) => {
    return {
      Message_am: `ማህበሩ ${name} በስሩ የተመዘገቡ ተጠቃሚዎች አሉ። ስለዚህም ከዚህ ማህበር ጋር ተያያዥነት ያላቸው ነገሮች እስካልሰረዙ ድረስ ማህበሩን ከሲስተም ማጥፋት አይቻልም።`,
      Message_en: `The association ${name} has some users registered under it. Therefore, it cannot be deleted until all entities associated with it are removed.`,
    };
  },
  association_deleted_successfully: (name) => {
    return {
      Message_am: `${name} የሚባለው ማህበር በተሳካ ሁኔታ ከሲስተሙ ተሰርዟል።`,
      Message_en: `The association ${name} is deleted successfully.`,
    };
  },
  block_deactivate: (name) => {
    return {
      Message_am: `ብሎኩ ${name} ኢን-አክቲቭ ነው ፤ ምንም አይነት ነገሮች በስሩ መመደብ አይቻልም።`,
      Message_en: `The block ${name} is currently deactivated and no entity can be placed under it.`,
    };
  },
  list_of_blocks_required: {
    Message_am: "የብሎኮች ዝርዝር ያስፈልጋል።",
    Message_en: "List of blocks are required.",
  },

  woreda_name_required: {
    Message_am: "እባክዎ የወረዳውን ስም ያስገቡ።",
    Message_en: "Please provide the woreda name.",
  },
  woreda_name_exists: (name) => {
    return {
      Message_am: `የወረዳው ስም ${name} በሲስተሙ ተመዝግቧል። እባክዎ ሌላ ስም በማስገባት ይሞክሩ።`,
      Message_en: `The woreda name ${name} already exists. Please use another name to create woreda.`,
    };
  },
  woreda_list_notfound: {
    Message_am: "የወረዳዎች ዝርዝር አልተገኘም።",
    Message_en: "List of woredas are not found.",
  },
  woreda_singlelist_notfound: {
    Message_am: "ወረዳው አልተገኘም።",
    Message_en: "The woreda is not found.",
  },
  woreda_updated_successfully: (name) => {
    return {
      Message_am: `ወረዳው ${name} በተሳካ ሁኔታ ዘምኗል።`,
      Message_en: `The woreda ${name} is updated successfully`,
    };
  },
  site_deactivate: (name) => {
    return {
      Message_am: `ሳይቱ ${name} ኢን-አክቲቭ ነው ፤ ምንም አይነት ነገሮች በስሩ መመደብ አይቻልም።`,
      Message_en: `The site ${name} is currently deactivated and no entity can be placed under it.`,
    };
  },
  woreda_created_successfully: (name) => {
    return {
      Message_am: `ወረዳው ${name} በተሳካ ሁኔታ ተመዝግቧል።`,
      Message_en: `The woreda ${name} is registered successfully.`,
    };
  },
  woreda_delete_conflict: (name) => {
    return {
      Message_am: `ወረዳው ${name} በስሩ የተመዘገቡ ቤቶች አሉ። ስለዚህም ከዚህ ወረዳ ጋር ተያያዥነት ያላቸው ነገሮች እስካልሰረዙ ድረስ ወረዳውን ከሲስተም ማጥፋት አይቻልም።`,
      Message_en: `The woreda ${name} has some houses registered under it. Therefore, it cannot be deleted until all entities associated with it are removed.`,
    };
  },
  woreda_deleted_successfully: (name) => {
    return {
      Message_am: `${name} የሚባለው ወረዳ በተሳካ ሁኔታ ከሲስተሙ ተሰርዟል።`,
      Message_en: `The woreda ${name} is deleted successfully.`,
    };
  },

  transfer_type_required: {
    Message_am: "እባክዎ የማስተላለፊያ መንገዱን ያስገቡ።",
    Message_en: "Please provide the transfer type.",
  },
  transfer_type_duplicate: (name) => {
    return {
      Message_am: `የማስተላለፊያ መንገዱ ${name} በሲስተሙ ተመዝግቧል። እባክዎ ሌላ ስም በማስገባት ይሞክሩ።`,
      Message_en: `The transfer type ${name} already exists. Please use another name to create transfer type.`,
    };
  },
  transfer_type_created: (name) => {
    return {
      Message_am: `የማስተላለፊያ መንገዱ ${name} በተሳካ ሁኔታ ተመዝግቧል።`,
      Message_en: `The transfer type ${name} is registered successfully.`,
    };
  },
  transfer_type_list_notfound: {
    Message_am: "የማስተላለፊያ መንገዶች ዝርዝር አልተገኘም።",
    Message_en: "List of transfer types are not found.",
  },
  transfer_type_singlelist_notfound: {
    Message_am: "የማስተላለፊያው መንገድ አልተገኘም።",
    Message_en: "The transfer type is not found.",
  },
  transfer_type_updated_successfully: (name) => {
    return {
      Message_am: `የማስተላለፊያ መንገዱ ${name} በተሳካ ሁኔታ ዘምኗል።`,
      Message_en: `The transfer type ${name} is updated successfully.`,
    };
  },
  transfer_type_document_required: (i) => {
    return {
      Message_am: `እያንዳንዱ የሚፈለጉ ሰነዶች ሁሉም 'የሰነዱ ስም' እና 'የሰነድ አስፈላጊነት' ("አዎን" ወይም "አይ") መኖር አለባቸው። በዚህ መሠረት ረድፍ ${i} መሠረት ስህተት አጋጥሟል።`,
      Message_en:
        `Each required document must include both 'document name' ` +
        `and 'required document' ("yes" or "no"). Error at row ${i}.`,
    };
  },
  transfer_type_document_required_create: {
    Message_am: `እያንዳንዱ የሚፈለጉ ሰነዶች ሁሉም 'የሰነዱ ስም' እና 'የሰነድ አስፈላጊነት' ("አዎን" ወይም "አይ") መኖር አለባቸው።`,
    Message_en:
      `Each required document must include both 'document name' ` +
      `and 'required document' ("yes" or "no").`,
  },
  transfer_type_document_invalid_reqtype: (name) => {
    return {
      Message_am: `የሰነድ ግዴታ አስፈላጊነት ምርጫ ላይ ${name} የሚባለው ሰነድ ላይ ስህተት አለ። እባክዎ "አዎ" ወይም "አይ" በማለት ይምረጡ።`,
      Message_en: `The document requirement option for the document name ${name} is an invalid choice. Please select "yes" or "no" as an option.`,
    };
  },
  transfer_type_delete_conflict: (name) => {
    return {
      Message_am: `የማስተላለፊያ መንገዱ ${name} በስሩ የተመዘገቡ ባለቤቶች አሉ። ስለዚህም ከዚህ የማስተላለፊያ መንገድ ጋር ተያያዥነት ያላቸው ነገሮች እስካልሰረዙ ድረስ ብሎኩን ከሲስተም ማጥፋት አይቻልም።`,
      Message_en: `The transfer type ${name} has some owners registered under it. Therefore, it cannot be deleted until all entities associated with it are removed.`,
    };
  },
  transfer_type_deleted_successfully: (name) => {
    return {
      Message_am: `${name} የሚባለው የማስተላለፊያ መንገድ በተሳካ ሁኔታ ከሲስተሙ ተሰርዟል።`,
      Message_en: `The transfer type ${name} is deleted successfully.`,
    };
  },

  program_type_required: {
    Message_am: "እባክዎ የቤት ፕሮግራሙን ያስገቡ።",
    Message_en: "Please provide the house program type.",
  },
  program_type_duplicate: (name) => {
    return {
      Message_am: `የቤት ፕሮግራሙ ${name} በሲስተሙ ተመዝግቧል። እባክዎ ሌላ ስም በማስገባት ይሞክሩ።`,
      Message_en: `The program type ${name} already exists. Please use another name to create program type.`,
    };
  },
  program_type_created: (name) => {
    return {
      Message_am: `የቤት ፕሮግራሙ ${name} በተሳካ ሁኔታ ተመዝግቧል።`,
      Message_en: `The program type ${name} is registered successfully.`,
    };
  },
  program_type_list_notfound: {
    Message_am: "የቤት ፕሮግራም አይነቶች ዝርዝር አልተገኘም።",
    Message_en: "List of program types are not found.",
  },
  program_type_singlelist_notfound: {
    Message_am: "የቤት ፕሮግራም አይነቱ አልተገኘም።",
    Message_en: "The program type is not found.",
  },
  program_type_updated_successfully: (name) => {
    return {
      Message_am: `የቤት ፕሮግራሙ ${name} በተሳካ ሁኔታ ዘምኗል።`,
      Message_en: `The program type ${name} is updated successfully.`,
    };
  },
  program_type_delete_conflict: (name) => {
    return {
      Message_am: `የቤት ፕሮግራሙ ${name} በስሩ የተመዘገቡ ቤቶች አሉ። ስለዚህም ከዚህ የቤት ፕሮግራም ጋር ተያያዥነት ያላቸው ነገሮች እስካልሰረዙ ድረስ ብሎኩን ከሲስተም ማጥፋት አይቻልም።`,
      Message_en: `The program type ${name} has some houses registered under it. Therefore, it cannot be deleted until all entities associated with it are removed.`,
    };
  },
  program_type_deleted_successfully: (name) => {
    return {
      Message_am: `${name} የሚባለው የቤት ፕሮግራም በተሳካ ሁኔታ ከሲስተሙ ተሰርዟል።`,
      Message_en: `The program type ${name} is deleted successfully.`,
    };
  },

  city_not_found: {
    Message_am: "ከተማው አልተገኘም ወይም አክቲቭ አይደለም።",
    Message_en: "The city is not found or is not active.",
  },
  city_id_required: {
    Message_am: "የከተማ ስም ማስገባት ያስፈልጋል።",
    Message_en: "Choosing a city is required.",
  },
  subcity_not_found: {
    Message_am: "ክፍለ ከተማው አልተገኘም ወይም አክቲቭ አይደለም።",
    Message_en: "The subcity is not found or is not active.",
  },
  subcity_id_required: {
    Message_am: "የክፍለ ከተማ ስም ማስገባት ያስፈልጋል።",
    Message_en: "Choosing a subcity is required.",
  },
  site_not_found: {
    Message_am: "ሳይቱ አልተገኘም ወይም አክቲቭ አይደለም።",
    Message_en: "The site is not found or is not active.",
  },
  site_id_required: {
    Message_am: "የሳይት ስም ማስገባት ያስፈልጋል።",
    Message_en: "Choosing a site is required.",
  },
  block_id_required: {
    Message_am: "የብሎክ ስም ማስገባት ያስፈልጋል።",
    Message_en: "Choosing a block is required.",
  },
  house_id_required: {
    Message_am: "የቤት ስም ማስገባት ያስፈልጋል።",
    Message_en: "Choosing a house is required.",
  },
  house_not_found: {
    Message_am: "ቤቱ አልተገኘም ወይም ለባለቤቱ የተላለፈ ነው።",
    Message_en: "The house is not found or is occupied.",
  },
  excel_file_required: {
    Message_am: "የExcel ፋይል መስቀል አስፈላጊ ነው።",
    Message_en: "Uploading an Excel file is required",
  },
  excel_extension_invalid: {
    Message_am: "የተፈቀደው ፋይል አይነት ኤክሴል (.xlsx, .xls, .xlsm ወዘተ) ብቻ ነው።",
    Message_en: "The allowed file type is Excel only (.xlsx, .xls, .xlsm etc).",
  },
  excel_columns_missing: (missing) => {
    return {
      Message_am: `የሚከተሉት ኮለኖች ጎድለዋል: ${missing.join(", ")}`,
      Message_en: `The following columns are missing: ${missing}.`,
    };
  },
  excel_worksheet_missing: {
    Message_am: "የተፈለገው የExcel 'Sheet1' አልተገኘም።",
    Message_en: "The required Excel worksheet 'Sheet1' is missing.",
  },
  excel_duplicate_house_number: (duplicateRowsInExcel) => {
    return {
      Message_am: `ተመሳሳይ የቤት ቁጥር በExcel ፋይል ውስጥ ተገኝቷል (ረድፎች: ${duplicateRowsInExcel.join(
        ", ",
      )})`,
      Message_en: `Duplicate house number is found in the Excel file (Rows: ${duplicateRowsInExcel.join(
        ", ",
      )}.)`,
    };
  },
  excel_house_data_not_found: {
    Message_am: "በExcel ፋይል ውስጥ የቤት መረጃ አልተገኘም።",
    Message_en: "No house data found in the Excel file.",
  },
  excel_block_data_not_found: {
    Message_am: "በExcel ፋይል ውስጥ ቢያንስ አንድ ብሎክ ቁጥር መኖር አለበት።",
    Message_en: "There should at least be one block number in the Excel file.",
  },
  excel_subcity_name_missing: (rowNum) => {
    return {
      Message_am: `ረድፍ ${rowNum}: የክፍለ ከተማ ስም ጎድሏል።`,
      Message_en: `Row: ${rowNum}: Subcity name is missing.`,
    };
  },
  excel_block_number_missing: (rowNum) => {
    return {
      Message_am: `ረድፍ ${rowNum}: ብሎክ ቁጥር ጎድሏል።`,
      Message_en: `Row: ${rowNum}: Block number is missing.`,
    };
  },
  excel_house_number_missing: (rowNum) => {
    return {
      Message_am: `ረድፍ ${rowNum}: የቤት ቁጥር ጎድሏል።`,
      Message_en: `Row: ${rowNum}: House number is missing.`,
    };
  },
  house_number_missing: {
    Message_am: `የቤት ቁጥር ጎድሏል።`,
    Message_en: `House number is missing.`,
  },
  excel_house_kind_missing: (rowNum) => {
    return {
      Message_am: `ረድፍ ${rowNum}: የቤት አይነት ጎድሏል።`,
      Message_en: `Row: ${rowNum}: House kind is missing.`,
    };
  },
  house_kind_missing: {
    Message_am: `የቤት አይነት ጎድሏል።`,
    Message_en: `House kind is missing.`,
  },
  excel_house_kind_invalid: (rowNum, HOUSE_KIND_ENUM) => {
    return {
      Message_am: `ረድፍ ${rowNum}: የቤት አይነት ከሚከተሉት ውጪ መሆን አይችልም ${HOUSE_KIND_ENUM.join(
        ", ",
      )}።`,
      Message_en: `Row: ${rowNum}: House kind cannot be other than the following ${HOUSE_KIND_ENUM.join(
        ", ",
      )}.`,
    };
  },
  excel_total_area_invalid: (rowNum) => {
    return {
      Message_am: `ረድፍ ${rowNum}: ጠቅላላ ስፋት ትክክለኛ እና ከዜሮ በላይ መሆን አለበት።`,
      Message_en: `Row: ${rowNum}: Total area should be valid and positive.`,
    };
  },
  excel_bedroom_number_invalid: (rowNum) => {
    return {
      Message_am: `ረድፍ ${rowNum}:  የመኝታ ክፍል ቁጥር ትክክለኛ እና ከዜሮ በላይ መሆን አለበት።`,
      Message_en: `Row: ${rowNum}: Bedroom number should be valid and positive.`,
    };
  },
  excel_floor_number_invalid: (rowNum) => {
    return {
      Message_am: `ረድፍ ${rowNum}:  የፎቅ ቁጥር ትክክለኛ መሆን አለበት።`,
      Message_en: `Row: ${rowNum}: Floor number should be valid.`,
    };
  },
  excel_unit_price_invalid: (rowNum) => {
    return {
      Message_am: `ረድፍ ${rowNum}:  የክፍያ ዋጋ ትክክለኛ እና ከዜሮ በላይ መሆን አለበት።`,
      Message_en: `Row: ${rowNum}: Unit price should be valid and positive.`,
    };
  },
  excel_woreda_not_found: (rowNum, wname) => {
    return {
      Message_am: `ረድፍ ${rowNum}: ወረዳ '${wname}' አልተገኘም፣ አክቲቭ አይደለም ወይም ከክፍለ ከተማው ጋር አይዛመድም።`,
      Message_en: `Row: ${rowNum}: Woreda '${wname}' is not found, inactive, or does not belong to the subcity.`,
    };
  },
  excel_house_program_not_found: (rowNum, pname) => {
    return {
      Message_am: `ረድፍ ${rowNum}: የቤት ፕሮግራም '${pname}' አልተገኘም ወይም አክቲቭ አይደለም።`,
      Message_en: `Row: ${rowNum}: House Program '${pname}' is not found, inactive.`,
    };
  },
  excel_db_duplicate_house_number: (conflictRows) => {
    return {
      Message_am: `የሚከተሉት የቤት ቁጥሮች ቀድሞ በሲስተሙ ውስጥ ተመዝግበዋል (ረድፎች: ${conflictRows.join(
        ", ",
      )})`,
      Message_en: `The following house numbers are already registered in the system (Rows: ${conflictRows.join(
        ", ",
      )}.)`,
    };
  },
  excel_houses_registered_successfully: (housesToInsertLength) => {
    return {
      Message_am: `${housesToInsertLength} ቤቶች በተሳካ ሁኔታ ተመዝግበዋል።`,
      Message_en: `${housesToInsertLength} houses registered successfully.`,
    };
  },
  house_bulk_delete_success: (deletedCount) => {
    return {
      Message_am: `${deletedCount} ቤቶች በተሳካ ሁኔታ ተሰርዟል።`,
      Message_en: `${deletedCount} houses deleted successfully.`,
    };
  },
  house_single_delete_success: {
    Message_am: "ቤቱ በተሳካ ሁኔታ ተሰርዟል።",
    Message_en: "The house is deleted successfully.",
  },
  invalid_delete_scope: (DELETE_SCOPE_ENUM) => {
    return {
      Message_am: `የማስወገድ አቅጣጫ ከሚከተሉት ውጪ መሆን አይችልም: ${DELETE_SCOPE_ENUM.join(
        ", ",
      )}።`,
      Message_en: `Delete scope cannot be other than the following: ${DELETE_SCOPE_ENUM.join(
        ", ",
      )}.`,
    };
  },
  excel_no_worksheet: {
    Message_am: "Excel ፋይል ውስጥ የስራ ሉህ አልተገኘም።",
    Message_en: "No worksheet found in Excel file.",
  },
  excel_no_rows: {
    Message_am: "Excel ፋይል ውስጥ የውሂብ ረድፎች አልተገኙም።",
    Message_en: "No data rows found in Excel file.",
  },
  excel_woreda_name_missing: (rowNum) => ({
    Message_am: `ረድፍ ${rowNum}: የወረዳ ስም ጎድሏል።`,
    Message_en: `Row ${rowNum}: Woreda name is missing.`,
  }),
  excel_subcity_not_found: (subcityName, rowNum) => ({
    Message_am: `ረድፍ ${rowNum}: ክፍለ ከተማ '${subcityName}' አልተገኘም፣ ንቁ አይደለም ወይም ከተማው ጋር አይዛመድም።`,
    Message_en: `Row ${rowNum}: Subcity '${subcityName}' not found, inactive, or not under the city.`,
  }),
  woreda_bulk_import_success: (created, skipped) => ({
    Message_am: `ተመዝግበዋል: ${created} ወረዳዎች። የተዘለሉ: ${skipped} ወረዳዎች (ቀድሞ ነበሩ)።`,
    Message_en: `Created: ${created} woredas. Skipped: ${skipped} woredas (already existed).`,
  }),
  excel_association_name_missing: (row) => ({
    Message_am: `ረድፍ ${row}: የማህበር ስም ጎድሏል።`,
    Message_en: `Row ${row}: Association name is missing.`,
  }),
  excel_site_name_missing: (row) => ({
    Message_am: `ረድፍ ${row}: የሳይት ስም ጎድሏል።`,
    Message_en: `Row ${row}: Site name is missing.`,
  }),
  excel_blocks_missing: (row) => ({
    Message_am: `ረድፍ ${row}: የብሎክ ዝርዝር ጎድሏል።`,
    Message_en: `Row ${row}: Blocks list is missing.`,
  }),
  excel_site_not_found: (name, row) => ({
    Message_am: `ረድፍ ${row}: ሳይት '${name}' አልተገኘም ወይም ንቁ አይደለም።`,
    Message_en: `Row ${row}: Site '${name}' not found or not active.`,
  }),
  excel_block_invalid_range: (range, row) => ({
    Message_am: `ረድፍ ${row}: የብሎክ ክልል '${range}' ትክክለኛ አይደለም።`,
    Message_en: `Row ${row}: Block range '${range}' is invalid.`,
  }),
  excel_block_number_invalid: (num, row) => ({
    Message_am: `ረድፍ ${row}: የብሎክ ቁጥር '${num}' ትክክለኛ አይደለም።`,
    Message_en: `Row ${row}: Block number '${num}' is invalid.`,
  }),
  excel_association_already_exists: (name, row) => ({
    Message_am: `ረድፍ ${row}: ማህበር '${name}' ቀድሞ በዚህ ሳይት ስር ተፈጥሯል።`,
    Message_en: `Row ${row}: Association '${name}' already exists under this site.`,
  }),
  association_bulk_import_success: (created, skipped) => ({
    Message_am: `ተመዝግበዋል: ${created} ማህበራት። የተዘለሉ: ${skipped} (ቀድሞ ነበሩ)።`,
    Message_en: `Created: ${created} associations. Skipped: ${skipped} (already existed).`,
  }),
  excel_block_conflict_in_file: (
    blockNum,
    siteName,
    prevRow,
    prevAssoc,
    currRow,
    currAssoc,
  ) => ({
    Message_am: `ረድፍ ${currRow}: ብሎክ '${blockNum}' በሳይት '${siteName}' ስር ቀድሞ በረድፍ ${prevRow} ለማህበር '${prevAssoc}' ተመድቧል። አንድ ብሎክ ለአንድ ማህበር ብቻ ነው መመደብ የሚችለው።`,
    Message_en: `Row ${currRow}: Block '${blockNum}' under site '${siteName}' already assigned in row ${prevRow} to association '${prevAssoc}'. A block can belong to only one association.`,
  }),
  excel_block_already_assigned: (blockNum, siteName, assocName, rowNum) => ({
    Message_am: `ረድፍ ${rowNum}: ብሎክ '${blockNum}' በሳይት '${siteName}' ስር ቀድሞ ለማህበር '${assocName}' ተመድቧል።`,
    Message_en: `Row ${rowNum}: Block '${blockNum}' under site '${siteName}' is already assigned to association '${assocName}'.`,
  }),
  house_number_exists: (houseNumber) => ({
    Message_am: `የቤት ቁጥር '${houseNumber}' ቀድሞ በሲስተሙ ውስጥ ተመዝግቦአል።`,
    Message_en: `House number '${houseNumber}' already exists in the system.`,
  }),
  house_registered_successfully: (houseNumber) => ({
    Message_am: `የቤት ቁጥር '${houseNumber}' ያለው ቤት በተሳካ ሁኔታ ተመዝግቦአል።`,
    Message_en: `House with house number '${houseNumber}' registered successfully.`,
  }),
  house_kind_invalid: (HOUSE_KIND_ENUM) => {
    return {
      Message_am: `የቤት አይነት ከሚከተሉት ውጪ መሆን አይችልም ${HOUSE_KIND_ENUM.join(", ")}።`,
      Message_en: `House kind cannot be other than the following ${HOUSE_KIND_ENUM.join(
        ", ",
      )}.`,
    };
  },
  total_area_invalid: {
    Message_am: `ጠቅላላ ስፋት ትክክለኛ እና ከዜሮ በላይ መሆን አለበት።`,
    Message_en: `Total area should be valid and positive.`,
  },
  bedroom_number_invalid: {
    Message_am: `የመኝታ ክፍል ቁጥር ትክክለኛ እና ከዜሮ በላይ መሆን አለበት።`,
    Message_en: `Bedroom number should be valid and positive.`,
  },
  floor_number_invalid: {
    Message_am: `የፎቅ ቁጥር ትክክለኛ መሆን አለበት።`,
    Message_en: `Floor number should be valid.`,
  },
  unit_price_invalid: {
    Message_am: `የክፍያ ዋጋ ትክክለኛ እና ከዜሮ በላይ መሆን አለበት።`,
    Message_en: `Unit price should be valid and positive.`,
  },
  woreda_not_found: (wname) => {
    return {
      Message_am: `ወረዳ '${wname}' አልተገኘም፣ አክቲቭ አይደለም ወይም ከክፍለ ከተማው ጋር አይዛመድም።`,
      Message_en: `Woreda '${wname}' is not found, inactive, or does not belong to the subcity.`,
    };
  },
  house_program_not_found: (pname) => {
    return {
      Message_am: `የቤት ፕሮግራም '${pname}' አልተገኘም ወይም አክቲቭ አይደለም።`,
      Message_en: `House Program '${pname}' is not found, inactive.`,
    };
  },

  no_subcities_for_city: {
    Message_am: "ለተጠቀሰው ከተማ ምንም ክፍለ ከተሞች አልተገኙም።",
    Message_en: "No subcities found for the specified city.",
  },
  invalid_subcity: {
    Message_am: "ያስገቡት ክፍለ ከተማ ትክክል አይደለም። እባክዎ ትክክለኛውን ክፍለ ከተማ ያስገቡ።",
    Message_en:
      "The Sub-City you entered is Incorrect. please enter correct Sub-City.",
  },
  city_report_not_found: {
    Message_am: "በዚ ከተማ ስር የተመዘገበ ምንም አይነት ቤት የለም።",
    Message_en: "There are no houses registered under this city.",
  },
  association_report_not_found: {
    Message_am: "በዚ ማህበር ስር የተመዘገበ ምንም አይነት ቤት የለም።",
    Message_en: "There are no houses registered under this association.",
  },
  invalid_site: {
    Message_am: "ያስገቡት ሳይት ትክክል አይደለም። እባክዎ ትክክለኛውን ሳይት ያስገቡ።",
    Message_en: "The Site you entered is Incorrect. please enter correct Site.",
  },
  subcity_city_mismatch: {
    Message_am: "ክፍለ ከተማው ከተጠቀሰው ከተማ ጋር አይመጥንም።",
    Message_en: "Subcity doesn't belong to the specified city.",
  },
  site_subcity_mismatch: {
    Message_am: "ሳይቱ ከተጠቀሰው ክፍለ ከተማ ጋር አይመጥንም።",
    Message_en: "Site doesn't belong to the specified subcity.",
  },
  invalid_block: {
    Message_am: "ያስገቡት ብሎክ ትክክል አይደለም። እባክዎ ትክክለኛውን ብሎክ ያስገቡ።",
    Message_en:
      "The Block you entered is Incorrect. please enter correct Block.",
  },
  block_not_found: {
    Message_am: "ብሎኩ የለም።",
    Message_en: "Block doesn't exist.",
  },
  invalid_city: {
    Message_am: "ያስገቡት ከተማ ትክክል አይደለም። እባክዎ ትክክለኛውን ከተማ ያስገቡ።",
    Message_en: "The city you entered is incorrect. please enter correct city.",
  },
  block_site_mismatch: {
    Message_am: "ብሎኩ ከተጠቀሰው ሳይት ጋር አይመጥንም።",
    Message_en: "Block doesn't belong to the specified site.",
  },
  invalid_status_options: {
    Message_am: "ሁኔታው 'ነፃ' ወይም 'ተይዟል' መሆን አለበት።",
    Message_en: "Status must be 'free' or 'occupied'.",
  },
  no_houses_matching_criteria: {
    Message_am: "ከተቀመጠው መስፈርት ጋር የሚዛመድ ቤት አልተገኘም።",
    Message_en: "No houses found matching the specified criteria.",
  },
  invalid_property_type_options: {
    Message_am: "የንብረት አይነት 'ሱቅ' ወይም 'መኖሪያ' መሆን አለበት።",
    Message_en: "Property type must be 'shop' or 'residence'.",
  },
  invalid_manner_of_transfer_id: {
    Message_am: "ትክክለኛ ያልሆነ የማስተላለፊያ መንገድ።",
    Message_en: "Invalid manner of transfer format.",
  },
  manner_of_transfer_not_found: {
    Message_am: "የማስተላለፊያ መንገድ አልተገኘም ወይም ስራ ላይ አይደለም።",
    Message_en: "Manner of Transfer not found or is inactive.",
  },
  invalid_association: {
    Message_am: "ያስገቡት ማህበር ትክክል አይደለም። እባክዎ ትክክለኛውን ማህበር ይምረጡ።",
    Message_en:
      "The association you entered is incorrect. Please select the correct association.",
  },
  no_blocks_in_association: {
    Message_am: "በአስገቡት ማህበር ውስጥ ብሎኮች የሉም።",
    Message_en: "No blocks are found within the current association.",
  },
  association_not_found: {
    Message_am: "ያስገቡት ማህበር አልተገኘም። እባክዎ ትክክለኛውን ማህበር ይመርጡ።",
    Message_en:
      "The required association could not be found. Please enter or select the correct association.",
  },
  invalid_woreda: {
    Message_am: "ያስገቡት ወረዳ ትክክል አይደለም። እባክዎ ትክክለኛውን ወረዳ ያስገቡ።",
    Message_en:
      "The Woreda you entered is incorrect. Please enter the correct Woreda.",
  },
  woreda_not_found_second: {
    Message_am: "ወረዳው አልተገኘም።",
    Message_en: "The woreda is not found.",
  },
  incorrect_data_format: {
    Message_am: "ትክክለኛ ያልሆነ የመረጃ ቅርጸት።",
    Message_en: "Incorrect data format.",
  },
  house_program_not_found_second: {
    Message_am: "የቤት ፕሮግራም አልተገኘም።",
    Message_en: "House program not found.",
  },
  invalid_house_program_id: {
    Message_am: "ትክክለኛ ያልሆነ የቤት ፕሮግራም።",
    Message_en: "Invalid house program.",
  },
  bedroom_not_found: {
    Message_am:
      "ያስገቡት የመኝታ ክፍል ምንም ቤት አልተገኘም። እባክዎ አረጋግጠው ትክክለኛውን የመኝታ ክፍል ያስገቡ።",
    Message_en:
      "There is no house having this bedroom. Please check and enter the correct bedroom.",
  },
  invalid_bedroom: {
    Message_am:
      "ያስገቡት የመኝታ ክፍል ቁጥር ትክክል አይደለም። እባክዎ ትክክለኛውን የመኝታ ክፍል ቁጥር ያስገቡ።",
    Message_en:
      "The Bedroom you entered is Incorrect. please enter correct Bedroom.",
  },
  invalid_house: {
    Message_am: "የመረጡት ቤት ትክክል አይደለም። እባክዎ ትክክለኛውን ቤት ይምረጡ።",
    Message_en:
      "The House you select is not correct. Please select the correct house.",
  },
  export_properties_required: {
    Message_am: "እባክዎ ወጪ ማድረጊያ መንገድ ይምረጡ።",
    Message_en: "Please define export properties.",
  },
  house_list_notfound: {
    Message_am: "የቤቶች ዝርዝር አልተገኘም።",
    Message_en: "List of houses are not found.",
  },
  house_singlelist_notfound: {
    Message_am: "ቤቱ አልተገኘም።",
    Message_en: "The house is not found.",
  },
  house_updated_successfully: (name) => {
    return {
      Message_am: `ቤቱ ${name} በተሳካ ሁኔታ ዘምኗል።`,
      Message_en: `The house ${name} is updated successfully`,
    };
  },
  organization_owner_required: {
    Message_am: "እባክዎ የድርጅቱን ስም ያስገቡ።",
    Message_en: "Please provide the organization name.",
  },
  organization_owner_duplicate: (name) => {
    return {
      Message_am: `የድርጅቱ ስም ${name} አስቀድሞ ተመዝግቦ አለ።`,
      Message_en: `Organization name ${name} already exists.`,
    };
  },
  organization_owner_created: (name) => {
    return {
      Message_am: `የድርጅቱ ስም ${name} በተሳካ ሁኔታ ተመዝግቦአል።`,
      Message_en: `Organization name ${name} created successfully.`,
    };
  },
  organization_owner_list_notfound: {
    Message_am: "የድርጅቱ ስም ዝርዝር አልተገኘም።",
    Message_en: "Organization name list not found.",
  },
  organization_owner_singlelist_notfound: {
    Message_am: "ድርጅቱ አልተገኘም።",
    Message_en: "Organization is not found.",
  },
  organization_owner_active_inactive: {
    Message_am: "ድርጅቱ አክቲቭ አይደለም።",
    Message_en: "Organization is currently inactive.",
  },
  organization_owner_updated_successfully: (name) => {
    return {
      Message_am: `የድርጅቱ ${name} በተሳካ ሁኔታ ዘምኗል።`,
      Message_en: `Organization ${name} is updated successfully.`,
    };
  },
  organization_owner_deleted_successfully: (name) => {
    return {
      Message_am: `የድርጅቱ ${name} በተሳካ ሁኔታ ተሰርዟል።`,
      Message_en: `Organization ${name} is deleted successfully.`,
    };
  },
  organization_owner_delete_conflict: (name) => {
    return {
      Message_am: `የድርጅቱ ${name} ከቤቶች ጋር ተያይዞ ስለሚኖር መሰረዝ አይቻልም።`,
      Message_en: `Organization ${name} cannot be deleted due to existing house associations.`,
    };
  },
  house_tobe_assigned: {
    Message_am: "ለቤቱ ባለቤት ለመመደብ እባክዎ በቅድሚያ ቤቱን ይምረጡ።",
    Message_en: "To assign owner to a house, first please provide a house.",
  },
  owner_type_invalid: {
    Message_am: "የባለቤት አይነት ከሚከተሉት ውጪ መሆን አይችልም: 'ግለሰብ', 'ድርጅት'።",
    Message_en:
      "Owner type cannot be other than the following: 'individual', 'organization'.",
  },
  direct_handover_status_required: {
    Message_am: "የቤቱ ባለቤት ቤቱን ከማን እንዳገኘው ያስገቡ።",
    Message_en: "Please provide the handover status of the house.",
  },
  delegation_procurement_document_required: {
    Message_am: "እባክዎ የግዢ/የውክልና የሰነድ ማስረጃዎቾን ያስገቡ።",
    Message_en: "Please provide procurement/delegation document information.",
  },
  house_already_have_owner: {
    Message_am: "ቤቱ ለባለቤት ተመድቧል።",
    Message_en: "The house is already assigned to an owner.",
  },
  user_fayda_required: {
    Message_am: "የቤት ባለቤቱን ለመመዝገብ እባክዎ የባለቤቱን የፋይዳ መረጃ ያስገቡ።",
    Message_en:
      "To assign the user to the house, please make sure to include the user fayda and all related informations.",
  },
  manner_of_transfer_req: {
    Message_am: "ቤቱ የተላለፈበትን መንገድ ይምረጡ።",
    Message_en: "Please choose the manner of transfer.",
  },
  pdf_file_required: (name) => {
    return {
      Message_am: `${name} የሚባለው ፋይል በ ".pdf" ቅርጸት መግባት አለበት።`,
      Message_en: `File named ${name} should be provided with a ".pdf" format.`,
    };
  },
  pdf_file_size: (name, size) => {
    return {
      Message_am: `${name} የሚባለው ፋይል ከ ${size} MB በታች መሆን አለበት።`,
      Message_en: `File named ${name} should be provided with less than ${size} MB file size.`,
    };
  },
  pdf_failed: {
    Message_am: "የተሰቀሉትን ሰነዶች ማስቀመጥ አልተቻለም። እባክዎ እንደገና ይሞክሩ።",
    Message_en: "Failed to store uploaded documents. Please try again.",
  },
  single_house_created: (otp) => {
    return {
      Message_am: `የቤት ቁጥር ${otp} ባለቤት ተመዝግቦለታል።`,
      Message_en: `The house number ${otp} is assigned with an owner.`,
    };
  },
  provide_fayda_fin: {
    Message_am: "እባክዎ የፋይዳ FIN ቁጥሮን ያስገቡ።",
    Message_en: "Please provide your fayda FIN number.",
  },
  fayda_authentication_failed: {
    Message_am: "የፋይዳ ማንነት ማረጋገጫዎን በድጋሚ ይሞክሩ።",
    Message_en: "Please try again with the fayda verification.",
  },
  system_failed_togenerate_otp: {
    Message_am: "መተግበሪያው ልዩ የምዝገባ ቁጥር ማመንጨት አልቻለም። እባክዎ በድጋሜ ይሞክሩ።",
    Message_en:
      "System failed to generate a registeration number. Please try again.",
  },
  owner_not_found: {
    Message_am: "ባለቤቱ አልተገኘም።",
    Message_en: "Owner not found.",
  },
  lstOfDocs_required_mot: {
    Message_am: "ለመተላለፊያ መንገዱ የሚያስፈልጉ የሰንድ ዝርዝሮችን ያስገቡ።",
    Message_en:
      "A list of the documents needed for the transfer method should be provided.",
  },
  owner_history_not_found: {
    Message_am: "የባለቤቶች ዝርዝር ታሪክ አልተገኘም።",
    Message_en: "Owners history not found.",
  },

  server_error: {
    Message_am: "የሲስተም ችግር ተፈጥሯል እባክዎ እንደገና ይሞክሩ።",
    Message_en: "Something went wrong please try again.",
  },
  system_failed_to_accept_request: {
    Message_am: "ሲስተሙ ይህንን ሪክዌስት/ጥያቄ መቀበል አልቻለም ፤ እባክዎ እንደገና ይሞክሩ።",
    Message_en: "System failed to accept this request.",
  },
  contructor_num_required: {
    Message_en: "Contractor number is required.",
    Message_am: "የኮንትራክተር ቁጥር ያስፈልጋል።",
  },
  companyname_required: {
    Message_en: "Invalid contractor level ID.",
    Message_am: "ልክ ያልሆነ የኮንትራክተር ደረጃ መታወቂያ።",
  },
};

module.exports = responselanguage;
