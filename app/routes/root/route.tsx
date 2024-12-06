import AppHeader from "../../components/app-header";
import { Outlet } from "@remix-run/react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useState } from "react";
import { Button } from "root";
import { AppNav } from "../../components/app-nav/app-nav";
import { always } from "../../utils/classname-helpers";
import { useMediaQuery } from "../../hooks/use-media-query";
import { Nav } from "../../components/nav";

export default function () {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const { lg } = useMediaQuery("lg");

  const onNavCallback = useCallback(() => {
    setDrawerIsOpen(false);
  }, [setDrawerIsOpen]);
  return (
    <>
      <AppHeader />

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
      <motion.div
        id="mobile"
        initial={{ x: "-28rem" }}
        animate={{ x: drawerIsOpen && !lg ? 0 : "-28rem" }}
        transition={{
          ease: "easeInOut",
          duration: 0.3,
        }}
        className={always(
          "fixed inset-0 z-30 w-[var(--app-menu-width)] translate-x-[-28rem] overflow-auto bg-grey-900 pt-[var(--app-header-height)]",
          "lg:z-0 lg:hidden",
        )}
      >
        <AppNav onNavCallback={onNavCallback} />
      </motion.div>
      <div
        id="desktop"
        className={always(
          "fixed hidden w-[var(--app-menu-width)] overflow-auto bg-grey-900 pt-[var(--app-header-height)]",
          "lg:block",
        )}
      >
        <AppNav onNavCallback={onNavCallback} />
      </div>
      <div
        className={always(
          "sticky top-[var(--app-header-height)] z-10 flex items-center gap-2 border-b bg-grey-800 app-border",
          "lg:hidden",
        )}
      >
        <Button
          onClick={() => setDrawerIsOpen((prev) => !prev)}
          intent="tertiary"
          iconOnly="bars"
          className="rounded-none"
          formSize="lg"
        />
        <Nav crumbs={[{ label: "Components" }, { label: "Button" }]} />
      </div>
      <div
        className={always(
          "px-8 pt-[var(--app-header-height)]",
          "lg:ml-[var(--app-menu-width)]",
        )}
      >
        <main>
          <div className="pt-8">
            <Outlet />
          </div>
        </main>
      </div>
      {/*<div className="relative top-[4.9rem]">*/}
      {/*  /!*<div className="flex flex-1 overflow-hidden">*!/*/}
      {/*  /!*  <div className="p-8">*!/*/}
      {/*  /!*    <Outlet />*!/*/}
      {/*  /!*  </div>*!/*/}
      {/*  /!*</div>*!/*/}
      {/*  <div className="fixed h-full w-[30rem] bg-almond-500/50">*/}
      {/*    <AppNav />*/}
      {/*  </div>*/}
      {/*  <aside className="absolute right-0 top-0 w-[30rem]">more content</aside>*/}

      {/*  /!* Middle Section *!/*/}
      {/*  <main className="flex flex-col items-center">*/}
      {/*    <Outlet />*/}
      {/*  </main>*/}
      {/*</div>*/}
    </>
  );
}
