import Link from "next/link"

const routes = {
  categories: "/categories",
  auth: "/admin/auth",
  dashboard: "/admin/dashboard",
}
const phone = "+70000000000"
const email = "example@main.con"
const formatNumber = (a: string) => a

const AdminLinks = () => {
  return (
    <div className="relative group inline-block">
      <button
        type="button"
        className=" hover:text-gray-300 transition duration-300"
      >
        Админ &#709;
      </button>

      {/* Подменю появляется при наведении */}
      <ul className="absolute hidden top-full left-0 bg-white shadow-md rounded-md py-2 w-60 group-hover:block z-10">
        <li>
          <Link
            href={routes.auth}
            className="block px-4 py-2 bg-primary-500 hover:bg-gray-100 hover:text-black"
          >
            Авторизация
          </Link>
        </li>
        <li>
          <Link
            href={routes.dashboard}
            className="block px-4 py-2 bg-primary-500 hover:bg-gray-100 hover:text-black"
          >
            Панель управления
          </Link>
        </li>
      </ul>
    </div>
  )
}

const ClientLinks = () => {
  return (
    <>
      <Link
        href={routes.categories}
        className="hover:text-gray-300 transition duration-300"
      >
        Категории
      </Link>
      <Link href={"/"}>Главная</Link>
    </>
  )
}

export const Contacts = () => {
  return (
    <div className="flex flex-col gap-y-2">
      <Link href={`tel: $${phone}`}>{formatNumber(phone)}</Link>
      <Link href={`mailto: ${email}`}>{email}</Link>
    </div>
  )
}

export const Header = () => {
  return (
    <header className="bg-primary-900 text-white py-6 px-4 ">
      <nav className="container mx-auto flex justify-between items-center">
        <Link className="font-bold text-lg" href={"/"}>
          Ivver
        </Link>
        <div className="flex gap-x-4">
          <ClientLinks />
          <AdminLinks />
        </div>
        <Contacts />
      </nav>
    </header>
  )
}
