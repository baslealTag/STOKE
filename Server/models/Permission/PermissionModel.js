const mongoose = require("mongoose");

const permissionSchema = new mongoose.Schema(
  {
    code_name: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      // e.g., 'view_users', 'edit_documents'
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      // View Users Permission
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PermissionCategoryModel",
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

permissionSchema.index({ name: 1 });
permissionSchema.index({ category: 1 });

permissionSchema.index({ createdAt: -1, _id: -1 });
permissionSchema.index({ createdAt: 1, _id: 1 });

permissionSchema.index({ category: 1, createdAt: 1 });
permissionSchema.index({ category: 1, createdAt: -1 });
permissionSchema.index({ createdBy: 1, createdAt: -1 });

permissionSchema.index({ category: 1, createdAt: -1, _id: -1 });
permissionSchema.index({ name: 1, createdAt: -1, _id: -1 });

const PermissionModel = mongoose.model("PermissionModel", permissionSchema);
module.exports = PermissionModel;
