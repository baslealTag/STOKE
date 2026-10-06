const { readFile, writeFile, mkdir } = require("fs/promises");
const { join } = require("path");
const {
  file_validation_error,
  allowed_file_type_error,
} = require("./responseLang");

function toPayload(errLike, fallbackEn = "Invalid file.") {
  if (!errLike) {
    return { Message_am: "", Message_en: fallbackEn };
  }

  if (
    typeof errLike === "object" &&
    ("Message_en" in errLike || "Message_am" in errLike)
  ) {
    return {
      Message_am: errLike.Message_am || "",
      Message_en: errLike.Message_en || "",
    };
  }

  if (typeof errLike === "string") {
    return { Message_am: "", Message_en: errLike };
  }

  return { Message_am: "", Message_en: fallbackEn };
}

async function validateAndSaveFile(
  file,
  { folder, allowedMimeTypes, maxSizeMB }
) {
  if (!file || typeof file !== "object") {
    const e = new Error("FILE_VALIDATION_ERROR");
    e.payload = toPayload(file_validation_error, "File validation failed.");
    throw e;
  }

  const isValidType = allowedMimeTypes?.includes(file?.mimetype);
  const isValidSize = file?.size <= maxSizeMB * 1024 * 1024;

  if (!isValidType || !isValidSize) {
    const errObj = allowed_file_type_error(allowedMimeTypes, maxSizeMB);
    const e = new Error("ALLOWED_FILE_TYPE_ERROR");
    e.payload = toPayload(errObj, "File type or size not allowed.");
    throw e;
  }

  const bytes = await readFile(file.filepath);
  const buffer = Buffer.from(bytes);

  const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
  const filename = uniqueSuffix + "-" + file.originalFilename;

  const dirPath = join("./", "Media", folder);
  await mkdir(dirPath, { recursive: true });

  const savePath = join(dirPath, filename);
  await writeFile(savePath, buffer);

  return filename;
}

module.exports = { validateAndSaveFile };

// While passing to this function use:

// const { validateAndSaveFile } = require("./fileHelper");

// let savedFilePath;

// try {
//   savedFilePath = await validateAndSaveFile(requestLtr, {
//     folder: "TimeExtensionRequestDocument",
//     allowedMimeTypes: ["application/pdf", "application/PDF"],
//     maxSizeMB: 500
//   });

//   console.log("File saved as:", savedFilePath);
// } catch (err) {
//   return res.status(StatusCodes.BAD_REQUEST).json({
//     err.message
//   });
// }
