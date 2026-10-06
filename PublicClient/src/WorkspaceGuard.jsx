import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import apiRequest from "@/utils/request";
import {
  setActiveWorkspaceRef,
  clearActiveWorkspaceRef,
} from "@/utils/activeWorkspaceRef";

/**
 * Paths that should never trigger the guard.
 * Note: /choose-account is excluded so the guard doesn't
 * keep re-running while the user is picking an org.
 */
const isPublicPath = (pathname) => {
  if (!pathname) return true;
  return (
    pathname.startsWith("/login") ||
    pathname.startsWith("/forgot_password") ||
    pathname.startsWith("/reset_password") ||
    pathname.startsWith("/choose-account")
  );
};

const isRecoverableError = (err) => {
  const status = err?.response?.status;
  return (
    status === 400 || status === 401 || status === 403 || status === 404
  );
};

/**
 * WorkspaceGuard — runs on every navigation to ensure the JWT
 * has a valid current org context.
 *
 * Flow:
 *  1. Decode token → read currentOrgId
 *  2. If no currentOrgId → redirect to /choose-account
 *  3. If yes → re-issue token (POST switch_account) to refresh session
 *  4. On recoverable error (inactive org, etc.) → redirect to /choose-account
 *  5. On catastrophic error (expired base token, etc.) → hard logout
 */
export default function WorkspaceGuard({ token, updateToken, onGuardState }) {
  const location = useLocation();
  const navigate = useNavigate();
  const inFlightRef = useRef(false);
  const lastPathnameRef = useRef(null);

  useEffect(() => {
    if (!token) return;
    if (isPublicPath(location.pathname)) return;

    // Avoid re-running for the same pathname (e.g. query-string changes)
    if (lastPathnameRef.current === location.pathname) return;
    lastPathnameRef.current = location.pathname;

    // Avoid concurrent guard runs
    if (inFlightRef.current) return;

    const run = async () => {
      onGuardState?.({ status: "checking" });
      inFlightRef.current = true;

      const redirectToChooseAccount = () => {
        navigate("/choose-account", { replace: true });
        onGuardState?.({ status: "ok" });
      };

      const hardLogout = () => {
        sessionStorage.removeItem("tID");
        sessionStorage.removeItem("tBASE");
        clearActiveWorkspaceRef();
        navigate("/login", { replace: true });
        onGuardState?.({ status: "ok" });
      };

      try {
        // Step 1: Decode token
        let decoded;
        try {
          decoded = jwtDecode(token);
        } catch {
          hardLogout();
          return;
        }

        const currentOrgId = decoded?.currentOrgId;

        // Step 2: No org selected yet
        if (!currentOrgId) {
          redirectToChooseAccount();
          return;
        }

        // Step 3: Re-issue/refresh the token with the same orgId.
        // This also validates that the org is still active on the server.
        const response = await apiRequest.post(
          "/account_switch_api/switch_account",
          { orgId: currentOrgId },
          {
            headers: {
              GET_SWTCHACC_API: import.meta.env.VITE_APP_GET_SWTCHACC_API,
            },
          },
        );

        const newToken = response?.data?.token;
        if (!newToken) {
          redirectToChooseAccount();
          return;
        }

        sessionStorage.setItem("tID", newToken);
        updateToken?.(newToken);
        setActiveWorkspaceRef({ orgId: currentOrgId });
        onGuardState?.({ status: "ok" });
      } catch (err) {
        if (isRecoverableError(err)) {
          // Org may have been deactivated or removed — let user pick again
          redirectToChooseAccount();
        } else {
          // Unrecoverable (network error, expired secret, etc.) — log out
          hardLogout();
        }
      } finally {
        inFlightRef.current = false;
      }
    };

    run();
  }, [token, location.pathname, updateToken, navigate, onGuardState]);

  // Guard is invisible — renders nothing
  return null;
}
