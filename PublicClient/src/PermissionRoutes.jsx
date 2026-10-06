import { IoIosFlag } from "react-icons/io";
import { languageTranslate } from "./utils/data";
import useAppStore from "@/Store/useAppStore";
import useUserPermissionsStore from "@/Store/UserPermissionsStore";
import useUserStore from "@/Store/useUserStore";

const PermissionRoute = ({
  userPermissions: propsUserPermissions,
  user: propsUser,
  permission = [],
  children,
  require = "all",
  selfView = true,
}) => {
  const storeUserPermissions = useUserPermissionsStore((state) => state.permissions);
  const storeUser = useUserStore((state) => state.user);

  const userPermissions = propsUserPermissions ?? storeUserPermissions ?? [];
  const user = propsUser ?? storeUser;

  const isSuperAdmin = user?.isSuperAdmin === "yes";

  if (!selfView) {
    return <UnauthorizedScreen />;
  }

  // SuperAdmin bypass (unless selfView is false)
  if (isSuperAdmin) {
    return children;
  }

  if (!userPermissions || userPermissions.length === 0) {
    return <UnauthorizedScreen />;
  }

  // Extract code_name string array if permissions are objects or strings
  const userPermList = userPermissions
    ?.map((p) => (typeof p === "string" ? p : p?.code_name))
    .filter(Boolean);

  if (!permission || permission.length === 0) {
    return children;
  }

  const hasPermission =
    require === "any"
      ? permission?.some((perm) => userPermList?.includes(perm))
      : permission?.every((perm) => userPermList?.includes(perm));

  return hasPermission ? children : <UnauthorizedScreen />;
};

const UnauthorizedScreen = () => {
  const language = useAppStore((state) => state.language);
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-neutral-50 to-neutral-100 z-50 flex items-center justify-center px-4">
      <div className="text-center">
        <IoIosFlag className="w-28 h-28 mx-auto text-destructive-500 mb-6 animate-pulse" />
        <h1 className="text-5xl font-bold text-gray-800 mb-3">
          {languageTranslate(language, "unAuthorized")}
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
          {languageTranslate(language, "unAuthorizedToView")}
          <br />
          {languageTranslate(language, "contactAdmin")}
        </p>
        <button
          onClick={() => (window.location.href = "/")}
          className="bg-primary-800 hover:bg-brand-primary px-10 py-4 cursor-pointer rounded-full text-white font-semibold text-lg shadow-2xl transition-all transform hover:scale-105"
        >
          {languageTranslate(language, "backToDashboard")}
        </button>
      </div>
    </div>
  );
};

export default PermissionRoute;
