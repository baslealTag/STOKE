const mongoose = require("mongoose");

const ConstructionSchema = new mongoose.Schema(
  {
    contractorNumber: {
      type: String,
      unique: true,
      required: true,
    },

    companyName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    ownerName: {
      type: String,
      required: true,
    },

    phoneNumber: {
      type: String,
      required: true,
    },

    // Contractor Level (Reference)
    level: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ConstructionLevelModel",
      required: true,
    },

    // Status
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },

    // Documents (Stored as URLs - recommended to use Cloudinary/S3)
    documents: {
      vatCertificate: String, // PDF URL
      tinCertificate: String, // PDF URL
      businessLicense: String, // PDF URL
      competenceCertificate: String, // PDF URL
      pppdaCertificate: String, // PDF URL
      revenueClearance: String, // PDF URL
      nationalId: String, // PDF URL
      associationLetter: String, // PDF URL
      notAdvanceLetter: String, // PDF URL
      changeOfAssociation: String, // PDF URL
    },

    // Additional Contractor Details
    competenceIssuer: {
      type: String,
      required: true,
    },

    yearsOfExperience: {
      type: Number,
      required: true,
      min: 0,
    },

    // Photo of Owner / Representative
    photo: {
      type: String, // Image URL (Cloudinary/S3)
    },

    isRepresentative: {
      type: Boolean,
      default: false,
    },

    // Approval & Review Info
    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
    },
  },
  {
    timestamps: true,
  },
);

const ConstructionModel = mongoose.model(
  "ConstructionModel",
  ConstructionSchema,
);

module.exports = ConstructionModel;
