import Search from "@/app/ui/search";

export default function Page() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between gap-2">
        <Search placeholder="Search date..." />
        <button
          type="button"
          className="rounded bg-gray-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 w-full md:max-w-80"
        >
          Cari
        </button>
      </div>
    </div>
  );
}