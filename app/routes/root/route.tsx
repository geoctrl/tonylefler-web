import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Outlet } from "@remix-run/react";
import { ClientOnly } from "remix-utils/client-only";

import AppHeader from "../../components/app-header";
import { AppNav } from "../../components/app-nav/app-nav";
import { always } from "../../utils/classname-helpers";
import { useMediaQuery } from "../../hooks/use-media-query";

export default function () {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const { lg } = useMediaQuery("lg");

  const onNavCallback = useCallback(() => {
    setDrawerIsOpen(false);
  }, [setDrawerIsOpen]);
  return (
    <>
      <AppHeader />

      <div className="app-container-padding">
        <div
          id="desktop"
          className={always(
            "fixed inset-0 left-[max(0px,calc(50%-76.8rem))] hidden w-[var(--app-menu-width)] overflow-auto pt-[var(--app-header-height)]",
            "lg:block",
          )}
        >
          <AppNav onNavCallback={onNavCallback} />
        </div>
      </div>

      <Outlet context={{ setDrawerIsOpen }} />

      <ClientOnly>
        {() => (
          <motion.div
            id="mobile"
            initial={{ x: "-28rem" }}
            animate={{ x: drawerIsOpen && !lg ? 0 : "-28rem" }}
            transition={{
              ease: "easeInOut",
              duration: 0.3,
            }}
            className={always(
              "fixed inset-0 z-30 w-[var(--app-menu-width)] translate-x-[-28rem] overflow-auto bg-grey-10 pt-[var(--app-header-height)] dark:bg-grey-900",
              "lg:z-0 lg:hidden",
            )}
          >
            <AppNav onNavCallback={onNavCallback} />
          </motion.div>
        )}
      </ClientOnly>

      <AnimatePresence>
        {drawerIsOpen && (
          <motion.div
            onClick={() => setDrawerIsOpen(false)}
            className="fixed inset-0 z-20 bg-grey-990/40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: drawerIsOpen ? 1 : 0 }}
            exit={{ opacity: 0 }}
            transition={{
              ease: "easeInOut",
              duration: 0.3,
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}
