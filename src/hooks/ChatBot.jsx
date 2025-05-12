import { useEffect } from "react";
import { useSelector } from "react-redux";

export const ChatBot = () => {
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    const cleanupKommunicate = () => {
      if (window.kommunicate) {
        try {
          window.kommunicate.logout?.();
        } catch (e) {
          console.warn("Kommunicate logout failed:", e);
        }

        window.kommunicate._globals = {};
        delete window.kommunicate;

        document
          .querySelectorAll('[id*="kommunicate"], [class*="kommunicate"]')
          .forEach((el) => el.remove());

        [...Object.keys(localStorage), ...Object.keys(sessionStorage)].forEach(
          (key) => {
            if (key.includes("kommunicate") || key.includes("mck")) {
              localStorage.removeItem(key);
              sessionStorage.removeItem(key);
            }
          }
        );

        document.cookie.split(";").forEach((cookie) => {
          if (cookie.includes("kommunicate") || cookie.includes("mck")) {
            document.cookie = cookie
              .replace(/^ +/, "")
              .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
          }
        });
      }
    };

    const initializeKommunicate = (userId) => {
      if (!userId) return;

      const kmUser = {
        userId,
        email: auth.email || "",
        displayName: auth.username || "Guest",
        metadata: {
          role: auth.role || "user",
        },
      };

      window.kommunicate = window.kommunicate || {};
      window.kommunicate._globals = {
        appId: "35570eaecfe3324633d539c12cce7fbce",
        popupWidget: true,
        automaticChatOpenOnNavigation: true,
        conversationTitle: `WikiSupport - ${kmUser.displayName}`,
        userId: userId,
      };

      const script = document.createElement("script");
      script.type = "text/javascript";
      script.async = true;
      script.src = "https://widget.kommunicate.io/v2/kommunicate.app";
      script.onload = () => {
        window.kommunicate.onLoad = function () {
          window.kommunicate.login(kmUser);

          const conversationObject = {
            appId: "35570eaecfe3324633d539c12cce7fbce",
            userId: kmUser.userId,
            clientConversationId: `wiki_${userId}`,
            isSingleConversation: true,
          };

          window.kommunicate.api.createConversation(conversationObject);
        };
      };
      document.head.appendChild(script);
    };

    if (!auth.isAuthenticated || !auth.userId) {
      cleanupKommunicate();
      sessionStorage.removeItem("lastUserId");
      return;
    }

    const lastUserId = sessionStorage.getItem("lastUserId");
    if (lastUserId && lastUserId !== auth.userId) {
      cleanupKommunicate();
    }

    sessionStorage.setItem("lastUserId", auth.userId);
    initializeKommunicate(auth.userId);
  }, [auth]);

  return null;
};
