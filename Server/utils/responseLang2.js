const responseLang2 = {
  excel_file_required: {
    Message_en: "To proceed, please select and upload the required Excel file.",
    Message_am: "እባክዎን ለመቀጠል የሚያስፈልገውን የኤክሴል (Excel) ፋይል መርጠው ይጫኑ።",
  },
  invalid_excel_file_format: {
    Message_en:
      "The file format provided is not supported. Please upload a valid Excel file to continue.",
    Message_am:
      "ያስገቡት የፋይል ዓይነት ትክክል አይደለም፤ እባክዎን ትክክለኛ የኤክሴል (Excel) ፋይል በመምረጥ ድጋሚ ይሞክሩ።",
  },
  invalid_excel_file_extension: {
    Message_en:
      "For large uploads, only .xlsx is supported. Please re-save your file as .xlsx and try again.",
    Message_am:
      "ለትልቅ ዳታ ጭነት የሚደገፈው .xlsx ብቻ ነው። እባክዎ ፋይሉን .xlsx ሆኖ እንደገና ያስቀምጡና ይሞክሩ።",
  },
  excel_no_data_found: {
    Message_en: "No data rows found in the Excel file.",
    Message_am: "በExcel ፋይሉ ውስጥ የመረጃ ረድፎች (data rows) አልተገኙም፤ እባክዎ ፋይሉን ያረጋግጡ።",
  },
  excel_uploaded_successfully: (
    TotalRowsSeen,
    DataRowsProcessed,
    Inserted,
    Skipped,
  ) => {
    return {
      Message_en: `Total rows seen: ${TotalRowsSeen}, Data Rows Processed: ${DataRowsProcessed}, Inserted: ${Inserted}, Skipped: ${Skipped}`,
      Message_am: `በአጠቃላይ የታዩ ረድፎች: ${TotalRowsSeen}፣ የተሰሩ የመረጃ ረድፎች: ${DataRowsProcessed}፣ የገቡ: ${Inserted}፣ የታለፉ: ${Skipped}`,
    };
  },
  applicant_id_required: {
    Message_en: "Applicant ID is required.",
    Message_am: "የምዝገባ ቁጥር አስፈላጊ በመሆኑ እባክዎ ያስገቡ።",
  },
  applicant_id_invalid_chars: {
    Message_en:
      "Applicant ID contains invalid characters. Allowed: A–Z, 0–9, '_', or '-'.",
    Message_am:
      "የምዝገባ ቁጥር የማይፈቀዱ ምልክቶችን ይዟል፤ የሚፈቀዱት ፊደላት (A–Z)፣ ቁጥሮች (0–9)፣ '_' ወይም '-' ብቻ ናቸው።",
  },

  applicant_id_exists: {
    Message_en:
      "This Applicant ID is already registered. Please provide a unique ID.",
    Message_am: "ይህ የምዝገባ ቁጥር ቀደም ብሎ ተመዝግቧል፤ እባክዎ ሌላ የተለየ መለያ ይጠቀሙ።",
  },

  bank_account_required: {
    Message_en: "Bank account number is required.",
    Message_am: "የባንክ ሒሳብ ቁጥር አስፈላጊ በመሆኑ እባክዎ ያስገቡ።",
  },

  fullname_required: {
    Message_en: "Full name is required.",
    Message_am: "ሙሉ ስም አስፈላጊ በመሆኑ እባክዎ ያስገቡ።",
  },

  gender_required: {
    Message_en: "Gender is required.",
    Message_am: "ጾታ መገለጽ ስላለበት እባክዎ ይምረጡ።",
  },

  program_type_required: {
    Message_en: "Program type is required.",
    Message_am: "የፕሮግራም ዓይነት አስፈላጊ በመሆኑ እባክዎ ያስገቡ።",
  },

  bedroom_required: {
    Message_en: "Bedroom information is required.",
    Message_am: "የመኝታ ቤት መረጃ አስፈላጊ በመሆኑ እባክዎ ያስገቡ።",
  },

  disability_required: {
    Message_en: "Disability status is required.",
    Message_am: "የአካል ጉዳተኝነት ሁኔታ አስፈላጊ መረጃ በመሆኑ እባክዎ ያስገቡ።",
  },

  phone_number_required: {
    Message_en:
      "Phone number is required. Please provide a valid phone number.",
    Message_am: "የስልክ ቁጥር አስፈላጊ መረጃ በመሆኑ እባክዎ በትክክል ያስገቡ።",
  },

  jobstatus_required: {
    Message_en: "Job status is required.",
    Message_am: "የስራ ሁኔታ አስፈላጊ መረጃ በመሆኑ እባክዎ ያስገቡ።",
  },
  applicationstatus_required: {
    Message_en: "Application status is required.",
    Message_am: "የምዝገባ ሁኔታ አስፈላጊ መረጃ በመሆኑ እባክዎ ያስገቡ።",
  },

  // Enum helpers
  buildEnumInvalid: (fieldLabelEn, fieldLabelAm, allowed) => ({
    Message_en: `The provided ${fieldLabelEn} is invalid. Allowed values: ${allowed.join(" | ")}.`,
    Message_am: `የመረጡት የ${fieldLabelAm} ዓይነት ትክክል አይደለም፤ እባክዎ ከነዚህ ውስጥ ይምረጡ፦ ${allowed.join(" | ")}።`,
  }),

  savingverification_created_successfully: (fullname) => {
    return {
      Message_en: `The registration status for ${fullname} is done successfully.`,
      Message_am: `የ ${fullname} ምዝገባ በተሳካ ሁኔታ ተጠናቋል።`,
    };
  },

  applicantid_required_for_public: {
    Message_en: "Please provide your Applicant ID.",
    Message_am: "እባክዎ የምዝገባ ቁጥሮን ያስገቡ።",
  },
  applicant_id_notfound: {
    Message_en:
      "The applicant number number provided could not be found. Please ensure you have entered the correct registered applicant number number and try again.",
    Message_am:
      "ያስገቡት የምዝገባ ቁጥር አልተገኘም። እባክዎን ትክክለኛውን የምዝገባ ቁጥር አስገብተው በድጋሚ ይሞክሩ።",
  },

  invalid_savingverification_id: {
    Message_en:
      "Invalid saving verification (registration status). Please provide a valid saving verification (registration status).",
    Message_am: "የተላከው የምዝገባ መለያ ቁጥር ትክክል አይደለም፤ እባክዎ ትክክለኛ መለያ ያስገቡ።",
  },

  savingverification_notfound: {
    Message_en: "Saving verification record not found.",
    Message_am: "የተጠየቀው የምዝገባ መረጃ አልተገኘም።",
  },

  savingverification_no_update_fields: {
    Message_en: "No valid fields were provided for update.",
    Message_am: "ለማሻሻያ የሚሆን ተገቢ መረጃ አልቀረበም፤ እባክዎ የሚሻሻሉ መረጃዎችን በትክክል ያስገቡ።",
  },

  savingverification_update_blocked_approved_update_application: {
    Message_en:
      "Update is not allowed because an approved update application exists for this record.",
    Message_am: "ለዚህ መረጃ የጸደቀ የማሻሻያ ማመልከቻ በመኖሩ ምክንያት ተጨማሪ ማሻሻያ ማድረግ አይፈቀድም።",
  },

  savingverification_delete_blocked_pending_or_approved_update_application: {
    Message_en:
      "Deletion is not allowed because there is a pending or approved update application for this record.",
    Message_am:
      "ለዚህ መረጃ በመጠባበቅ ላይ ያለ ወይም የጸደቀ የማሻሻያ ማመልከቻ በመኖሩ ምክንያት መረጃውን መሰረዝ አይፈቀድም።",
  },

  savingverification_updated_successfully: (fullname) => ({
    Message_en: `Saving verification for ${fullname} has been updated successfully.`,
    Message_am: `የ ${fullname} የምዝገባ መረጃ በተሳካ ሁኔታ ዘምኗል።`,
  }),

  savingverification_deleted_successfully: {
    Message_en: "Saving verification record has been deleted successfully.",
    Message_am: "የምዝገባ መረጃ በተሳካ ሁኔታ ተሰርዟል።",
  },

  bank_account_doc_required: {
    Message_en:
      "Please provide a scanned copy of the first page of your bank book.",
    Message_am: "እባክዎ የባንክ ሒሳብ ደብተርዎን የመጀመሪያ ገጽ ስካን በማድረግ (በመቅዳት) ያያይዙ።",
  },
  registration_confirmation_doc_required: {
    Message_en: "Registration confirmation document is required.",
    Message_am: "እባክዎ የምዝገባ ማረጋገጫ ሰነድ ያያይዙ።",
  },

  update_application_already_pending: {
    Message_en:
      "An update application for this Applicant ID is already in progress and currently pending review.",
    Message_am:
      "ለዚህ የአመልካች መለያ ቁጥር የቀረበ የማሻሻያ ማመልከቻ በመኖሩ እና በአሁኑ ወቅት በመጠባበቅ ላይ ስለሚገኝ ሌላ ማመልከቻ ማቅረብ አይቻልም።",
  },

  update_application_already_approved: {
    Message_en:
      "An update application for this Applicant ID has already been approved. Further applications are not permitted.",
    Message_am:
      "ለዚህ የአመልካች መለያ ቁጥር የቀረበ የማሻሻያ ማመልከቻ የጸደቀ በመሆኑ አዲስ ማመልከቻ ማቅረብ አይፈቀድም።",
  },

  not_eligible_no_saving_verification: {
    Message_en:
      "You are not eligible to apply. No valid registration record was found for this Applicant ID.",
    Message_am:
      "ማመልከቻ ለማቅረብ የሚያስችል ብቃት አልተገኘም፤ ለዚህ የአመልካች መለያ ቁጥር ተዛማጅ የሆነ የጸደቀ የምዝገባ መረጃ አልተገኘም።",
  },

  update_application_created_successfully: {
    Message_en: "Update application submitted successfully.",
    Message_am: "የማሻሻያ ማመልከቻ በተሳካ ሁኔታ ተልኳል።",
  },

  invalid_updateapplication_notfound: {
    Message_en: "The update application is not found.",
    Message_am: "የማሻሻያ ማመልከቻው አልተገኘም።",
  },
  invalid_status_check: {
    Message_en:
      "Please provide a valid decision: either 'Approved' or 'Rejected'.",
    Message_am: "እባክዎ 'የተረጋገጠ' ወይም 'ውድቅ የተደረገ' ከሚሉት አማራጮች ውስጥ ተገቢውን ውሳኔ ያስገቡ።",
  },
  rejection_explanation_required: {
    Message_en: "Please provide a reason for rejecting the application.",
    Message_am: "ማመልከቻው ውድቅ የተደረገበትን ምክንያት እባክዎ ይግለጹ።",
  },
  invalid_application_decision: {
    Message_en:
      "A final decision has already been rendered for this application. Consequently, it cannot be processed for a new decision.",
    Message_am: "ለዚህ ማመልከቻ ቀደም ሲል ውሳኔ የተሰጠ በመሆኑ፣ በድጋሚ ውሳኔ መስጠት አይቻልም።",
  },
  application_updated_successfully: (fullname, status) => {
    const amharicTranslation =
      status === "approved" ? "ተቀባይነት አግኝቷል" : "ውድቅ ተደርጓል";
    return {
      Message_en: `The application for ${fullname} has been ${status} successfully.`,
      Message_am: `የ ${fullname} ማመልከቻ ${amharicTranslation}።`,
    };
  },
};

module.exports = responseLang2;
