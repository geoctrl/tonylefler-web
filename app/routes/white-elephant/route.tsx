import AppHeader from "../../components/app-header";

export default function () {
  return (
    <>
      <AppHeader />
      <div className="fixed inset-0 mt-[var(--app-header-height)] w-40 border-r app-border">
        hey
      </div>
      <div className="pt-[var(--app-header-height)]"></div>
    </>
  );
}
