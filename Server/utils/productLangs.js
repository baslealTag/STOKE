const productLangs = {
  name_required: {
    Message_en: "Name is required",
    Message_am: "ስም ያስፈልጋል",
  },
  category_name_unavalable: {
    Message_en: "Category name is required",
    Message_am: "",
  },
  product_categoryname_required: {
    Message_en: " ",
    Message_am: "",
  },
  invalid_status: {
    Message_en: "",
    Message_am: "",
  },
  invalid_description_insertion: {
    Message_en: "",
    Message_am: "",
  },

  product_cate_unavalable: {
    Message_en: "",
    Message_am: "",
  },
  location_required: {
    Message_en: "Location is required",
    Message_am: "አካባቢ ያስፈልጋል",
  },
  invalid_name_caracter: {
    Message_en: "Invalid name caracter.",
    Message_am: "ስተት ያስም ምልክ።",
  },
  negative_number_insertion: {
    Message_en: "Negative number insetion is not allowed ",
    Message_am: "",
  },
  name_exist: (name) => {
    const NameENg = name?.toLocaleLowerCase();
    const NameAm = name;

    return {
      Message_en: `The name with ${NameENg} exist`,
      Message_am: ``,
    };
  },
  weight_created_success: (name) => {
    return {
      Message_en: `weight with ${name} created`,
      Message_am: ``,
    };
  },
  name_exist: (name) => {
    return {
      Message_en: `Weight type with ${name} exists`,
      Message_am: ``,
    };
  },
  no_change_mades: {
    Message_en: "no change has been made",
    Message_am: "",
  },
  weight_not_found: {
    Message_en: "Weight not found",
    Message_am: "",
  },
  warehouse_not_found: {
    Message_en: "Ware house not found .",
    Message_am: "Ware house not found",
  },
  invalid_input: {
    Message_en: "Invalid input Type",
    Message_am: "",
  },
  invalid_nummber_insertion: {
    Messge_em: "Invalid number insertion ",
    Message_am: "Invalid number insertion ",
  },
  weight_deleted: (name) => {
    return {
      Message_en: `Weight ${name} deleted`,
      Message_am: ``,
    };
  },
  wareHouse_deleted: (name) => {
    return {
      Message_en: `Ware House ${name} deleted`,
      Message_am: ``,
    };
  },
  invalid_id: {
    Message_en: "Invalid supplier Id",
    Message_am: "",
  },

  no_change_made: {
    Message_en: "No change has been made",
    Message_am: "",
  },
  invalid_weight: {
    Message_en: "Invalid ware house",
    Message_am: "",
  },
  companyname_required: {
    Message_en: "Company name required",
    Message_am: "",
  },
  owner_name_required: {
    Message_en: "Owner Name required",
    Message_am: "",
  },
  company_phone_required: {
    Message_en: "Company Phone Required",
    Message_am: "",
  },
  company_email_required: {
    Message_en: "Owner email required",
    Messsage_am: "",
  },
  supplier_address_require: {
    Message_en: "Supplier address required",
    Message_am: "",
  },
  bussiness_licence_require: {
    Message_en: "Bussiness licence Required",
    Message_am: "",
  },
  invalid_supplier_id: {
    Message_en: "Invalid supplier id",
    Message_am: "",
  },
  supplier_not_found: {
    Message_en: "Supplier is not Found",
    Message_am: "",
  },
  deleted_supplier: {
    Message_en: "Supplier deleted",
    Message_am: "",
  },
  company_email_exist: (name) => {
    const emailEn = name?.trim()?.toLocaleLowerCase();
    return {
      Message_en: `Email with ${emailEn} exist`,
      Message_am: ``,
    };
  },
  company_name_exist: (name) => {
    return {
      Message_en: `compnay name ${name} exists`,
      Message_am: ``,
    };
  },
  invalid_product_category: {
    Message_en: "Invalid Product category",
    Message_am: "",
  },
  product_category_notfound: {
    Message_en: "Product category not found",
    Message_am: "",
  },
  supplier_not_found: {
    Message_en: "Supplier not found",
    Message_am: "",
  },
  product_supplier_required: {
    Message_en: "Supplier Required",
    Message_am: "",
  },
  product_weight_required: {
    Message_en: "Peosuct weight is required",
    Message_am: "",
  },
  weight_shouldbe_posetivenum: {
    Message_en: "Weight should be none negative number",
    Message_am: "",
  },
  invalid_weight_insertion: {
    Message_en: "Invalid weight insertion",
    Message_am: "",
  },
  invalid_weight_type: {
    Message_en: "Invalid weight type used",
    Message_am: "",
  },
  data_parsing_error: {
    Message_en: "Invalid data format, unable to parse",
    Message_am: "ልክ ያልሆነ የመረጃ ቅርጸት፣ ማንበብ አልተቻለም",
  },

  // ---------- Name / Description ----------
  name_required: {
    Message_en: "Product name is required",
    Message_am: "የምርት ስም ያስፈልጋል",
  },
  description_required: {
    Message_en: "Product description is required",
    Message_am: "የምርት መግለጫ ያስፈልጋል",
  },

  // ---------- Category ----------
  invalid_product_category: {
    Message_en: "Invalid product category",
    Message_am: "ልክ ያልሆነ የምርት ምድብ",
  },
  product_category_notfound: {
    Message_en: "Product category not found",
    Message_am: "የምርት ምድብ አልተገኘም",
  },

  // ---------- Image ----------
  product_image_required: {
    Message_en: "Product image is required",
    Message_am: "የምርት ምስል ያስፈልጋል",
  },
  invalid_product_image: {
    Message_en: "Invalid product image format",
    Message_am: "ልክ ያልሆነ የምርት ምስል ቅርጸት",
  },

  // ---------- Supplier ----------
  supplier_not_found: {
    Message_en: "Supplier not found",
    Message_am: "አቅራቢ አልተገኘም",
  },
  product_supplier_required: {
    Message_en: "Product supplier is required",
    Message_am: "የምርት አቅራቢ ያስፈልጋል",
  },
  invalid_supplier: {
    Message_en: "Invalid supplier identifier",
    Message_am: "ልክ ያልሆነ የአቅራቢ መለያ",
  },

  // ---------- Weight ----------
  product_weight_required: {
    Message_en: "Product weight is required",
    Message_am: "የምርት ክብደት ያስፈልጋል",
  },
  invalid_weight_insertion: {
    Message_en: "Invalid weight insertion",
    Message_am: "ልክ ያልሆነ የክብደት ማስገባት",
  },
  weight_should_be_positive_number: {
    Message_en: "Weight must be a positive number",
    Message_am: "ክብደት አዎንታዊ ቁጥር መሆን አለበት",
  },

  // ---------- Weight type ----------
  product_weighttype_required: {
    Message_en: "Product weight type is required",
    Message_am: "የምርት ክብደት አይነት ያስፈልጋል",
  },
  invalid_weight_type: {
    Message_en: "Invalid weight type used",
    Message_am: "ልክ ያልሆነ የክብደት አይነት ጥቅም ላይ ውሏል",
  },

  // ---------- Price ----------
  product_price_required: {
    Message_en: "Product price is required",
    Message_am: "የምርት ዋጋ ያስፈልጋል",
  },
  invalid_price: {
    Message_en: "Price must be a positive number",
    Message_am: "ዋጋ አዎንታዊ ቁጥር መሆን አለበት",
  },

  // ---------- Stock ----------
  product_stock_required: {
    Message_en: "Product stock is required",
    Message_am: "የምርት ክምችት ያስፈልጋል",
  },
  invalid_stock: {
    Message_en: "Stock must be a positive integer of at least 1",
    Message_am: "ክምችት ቢያንስ 1 የሆነ አዎንታዊ ኢንቲጀር መሆን አለበት",
  },

  // ---------- Status ----------
  invalid_status: {
    Message_en: "Invalid status. Allowed values are 'active' or 'inactive'",
    Message_am: "ልክ ያልሆነ ሁኔታ። የተፈቀዱ እሴቶች 'active' ወይም 'inactive' ናቸው",
  },

  // ---------- Success ----------
  product_created_successfully: {
    Message_en: "Product created successfully",
    Message_am: "ምርቱ በተሳካ ሁኔታ ተፈጥሯል",
  },
  not_authorized: {
    Message_en: "You are not authorized to perform this action",
    Message_am: "ይህን ተግባር ለማከናወን ፈቃድ የለዎትም",
  },
  not_owner: {
    Message_en: "You do not own this product",
    Message_am: "ይህ ምርት የእርስዎ አይደለም",
  },

  // ---------- Generic ----------
  server_error: {
    Message_en: "Server error, please try again later",
    Message_am: "የሰርቨር ስህተት፣ እባክዎ በኋላ እንደገና ይሞክሩ",
  },
  data_parsing_error: {
    Message_en: "Invalid data format, unable to parse",
    Message_am: "ልክ ያልሆነ የመረጃ ቅርጸት፣ ማንበብ አልተቻለም",
  },

  // ---------- ID ----------
  invalid_product_id: {
    Message_en: "Invalid product ID",
    Message_am: "ልክ ያልሆነ የምርት መለያ",
  },
  product_not_found: {
    Message_en: "Product not found",
    Message_am: "ምርት አልተገኘም",
  },

  // ---------- Name / Description ----------
  name_required: {
    Message_en: "Product name is required",
    Message_am: "የምርት ስም ያስፈልጋል",
  },
  description_required: {
    Message_en: "Product description is required",
    Message_am: "የምርት መግለጫ ያስፈልጋል",
  },

  // ---------- Category ----------
  invalid_product_category: {
    Message_en: "Invalid product category",
    Message_am: "ልክ ያልሆነ የምርት ምድብ",
  },
  product_category_notfound: {
    Message_en: "Product category not found",
    Message_am: "የምርት ምድብ አልተገኘም",
  },

  // ---------- Image ----------
  product_image_required: {
    Message_en: "Product image is required",
    Message_am: "የምርት ምስል ያስፈልጋል",
  },
  invalid_product_image: {
    Message_en: "Invalid product image format",
    Message_am: "ልክ ያልሆነ የምርት ምስል ቅርጸት",
  },

  // ---------- Supplier ----------
  supplier_not_found: {
    Message_en: "Supplier not found",
    Message_am: "አቅራቢ አልተገኘም",
  },
  product_supplier_required: {
    Message_en: "Product supplier is required",
    Message_am: "የምርት አቅራቢ ያስፈልጋል",
  },
  invalid_supplier: {
    Message_en: "Invalid supplier identifier",
    Message_am: "ልክ ያልሆነ የአቅራቢ መለያ",
  },

  // ---------- Weight ----------
  product_weight_required: {
    Message_en: "Product weight is required",
    Message_am: "የምርት ክብደት ያስፈልጋል",
  },
  invalid_weight_insertion: {
    Message_en: "Invalid weight insertion",
    Message_am: "ልክ ያልሆነ የክብደት ማስገባት",
  },
  weight_should_be_positive_number: {
    Message_en: "Weight must be a positive number",
    Message_am: "ክብደት አዎንታዊ ቁጥር መሆን አለበት",
  },

  // ---------- Weight type ----------
  product_weighttype_required: {
    Message_en: "Product weight type is required",
    Message_am: "የምርት ክብደት አይነት ያስፈልጋል",
  },
  invalid_weight_type: {
    Message_en: "Invalid weight type used",
    Message_am: "ልክ ያልሆነ የክብደት አይነት ጥቅም ላይ ውሏል",
  },

  // ---------- Price ----------
  product_price_required: {
    Message_en: "Product price is required",
    Message_am: "የምርት ዋጋ ያስፈልጋል",
  },
  invalid_price: {
    Message_en: "Price must be a positive number",
    Message_am: "ዋጋ አዎንታዊ ቁጥር መሆን አለበት",
  },

  // ---------- Stock ----------
  product_stock_required: {
    Message_en: "Product stock is required",
    Message_am: "የምርት ክምችት ያስፈልጋል",
  },
  invalid_stock: {
    Message_en: "Stock must be a positive integer of at least 1",
    Message_am: "ክምችት ቢያንስ 1 የሆነ አዎንታዊ ኢንቲጀር መሆን አለበት",
  },

  // ---------- Status ----------
  invalid_status: {
    Message_en: "Invalid status. Allowed values are 'active' or 'inactive'",
    Message_am: "ልክ ያልሆነ ሁኔታ። የተፈቀዱ እሴቶች 'active' ወይም 'inactive' ናቸው",
  },

  // ---------- Update ----------
  no_fields_to_update: {
    Message_en: "No fields provided to update",
    Message_am: "ለማደስ ምንም መስክ አልተሰጠም",
  },

  // ---------- Success ----------
  product_created_successfully: {
    Message_en: "Product created successfully",
    Message_am: "ምርቱ በተሳካ ሁኔታ ተፈጥሯል",
  },
  products_fetched_successfully: {
    Message_en: "Products fetched successfully",
    Message_am: "ምርቶች በተሳካ ሁኔታ ተመልሰዋል",
  },
  product_fetched_successfully: {
    Message_en: "Product fetched successfully",
    Message_am: "ምርቱ በተሳካ ሁኔታ ተመልሷል",
  },
  product_updated_successfully: {
    Message_en: "Product updated successfully",
    Message_am: "ምርቱ በተሳካ ሁኔታ ተዘምኗል",
  },
  product_deleted_successfully: {
    Message_en: "Product deleted successfully",
    Message_am: "ምርቱ በተሳካ ሁኔታ ተሰርዟል",
  },
  // ---------- Stoke ----------
  invalid_stoke_id: {
    Message_en: "Invalid stoke ID",
    Message_am: "ልክ ያልሆነ የክምችት መለያ",
  },
  stoke_not_found: {
    Message_en: "Stoke not found",
    Message_am: "ክምችት አልተገኘም",
  },
  stoke_name_required: {
    Message_en: "Stoke name is required",
    Message_am: "የክምችት ስም ያስፈልጋል",
  },
  invalid_stoke_name: {
    Message_en: "Stoke name must be a non-empty string",
    Message_am: "የክምችት ስም ባዶ ያልሆነ ጽሑፍ መሆን አለበት",
  },
  stoke_level_required: {
    Message_en: "Stoke level is required",
    Message_am: "የክምችት መጠን ያስፈልጋል",
  },
  invalid_stoke_level: {
    Message_en: "Stoke level must be a non-negative number",
    Message_am: "የክምችት መጠን አሉታዊ ያልሆነ ቁጥር መሆን አለበት",
  },
  invalid_stoke_product: {
    Message_en: "Invalid product reference",
    Message_am: "ልክ ያልሆነ የምርት ማጣቀሻ",
  },
  invalid_stoke_category: {
    Message_en: "Invalid stoke category reference",
    Message_am: "ልክ ያልሆነ የክምችት ምድብ ማጣቀሻ",
  },
  invalid_stoke_supplier: {
    Message_en: "Invalid supplier reference",
    Message_am: "ልክ ያልሆነ የአቅራቢ ማጣቀሻ",
  },
  stoke_created_successfully: {
    Message_en: "Stoke created successfully",
    Message_am: "ክምችቱ በተሳካ ሁኔታ ተፈጥሯል",
  },
  stokes_fetched_successfully: {
    Message_en: "Stokes fetched successfully",
    Message_am: "ክምችቶች በተሳካ ሁኔታ ተመልሰዋል",
  },
  stoke_fetched_successfully: {
    Message_en: "Stoke fetched successfully",
    Message_am: "ክምችቱ በተሳካ ሁኔታ ተመልሷል",
  },
  stoke_updated_successfully: {
    Message_en: "Stoke updated successfully",
    Message_am: "ክምችቱ በተሳካ ሁኔታ ተዘምኗል",
  },
  stoke_deleted_successfully: {
    Message_en: "Stoke deleted successfully",
    Message_am: "ክምችቱ በተሳካ ሁኔታ ተሰርዟል",
  },
};
module.exports = productLangs;
